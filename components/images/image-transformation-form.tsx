"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { IImage } from "@/lib/database/models/image.model"
import { ImageTransformationCustomField } from "../form/image-transformation-custom-field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { imageTransformationTypes } from "@/config/links"
import { aspectRatioOptions } from "@/config/aspect-ratio-options"
import { AspectRatioKey, debounce, deepMergeObjects } from "@/lib/utils"

import {
    ImageTransformationFormValues,
    ImageTransformationSchema
} from "@/schemas"
import CloudinaryMediaUploader from "../cloudinary-media-uploader"
import { ImageTransformationFormProps, TransformationTypeKey, Transformations } from "@/types/image-transformation"
import ImageTransformed from "./image-transformed"
import { updateUserCreditBalance } from "@/lib/actions/user.action"
import { getCldImageUrl } from "next-cloudinary"
import { addImage, updateImage } from "@/lib/actions/image.action"
import { useInsuficientCreditModal } from "@/hooks/use-insufficient-credit-modal"
import { set } from "mongoose"



const defaultValues = {
    title: "",
    aspectRatio: "",
    color: "",
    prompt: "",
    publicId: "",
};


const ImageTransformationForm = ({ action, data = null, userId, type, creditBalance, config = null }: ImageTransformationFormProps) => {

    const transformationType = imageTransformationTypes[type];
    const [image, setImage] = useState(data)
    const [newTransformation, setNewTransformation] = useState<Transformations | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isTransforming, setIsTransforming] = useState(false);
    const [transformationConfig, setTransformationConfig] = useState(config)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const isufficientCreditModal = useInsuficientCreditModal()

    const initialValues = data && action === 'Update' ? {
        title: data?.title,
        aspectRatio: data?.aspectRatio,
        color: data?.color,
        prompt: data?.prompt,
        publicId: data?.publicId,
    } : defaultValues

    const form = useForm<ImageTransformationFormValues>({
        resolver: zodResolver(ImageTransformationSchema),
        defaultValues: initialValues
    })



    const onSelectFieldHandler = (value: string, onChangeField: (value: string) => void) => {

        checkCredit()

        const imageSize = aspectRatioOptions[value as AspectRatioKey]

        setImage((prevState: any) => ({
            ...prevState,
            aspectRatio: imageSize.aspectRatio,
            width: imageSize.width,
            height: imageSize.height,
        }))

        setNewTransformation(transformationType.config);

        return onChangeField(value)
    }


    const onInputChangeHandler = (fieldName: string, value: string, type: string, onChangeField: (value: string) => void) => {
        checkCredit()
        debounce(() => {
            setNewTransformation((prevState: any) => ({
                ...prevState,
                [type]: {
                    ...prevState?.[type],
                    [fieldName === 'prompt' ? 'prompt' : 'to']: value
                }
            }))
        }, 1000)();

        return onChangeField(value)
    }

    const onTransformHandler = async () => {

        checkCredit()
        setIsTransforming(true)

        setTransformationConfig(
            deepMergeObjects(newTransformation, transformationConfig)
        )

        setNewTransformation(null)

        startTransition(async () => {
            await updateUserCreditBalance(userId, - 1)
        })
    }


    const checkCredit = () => {
        if (creditBalance < 1) {
            isufficientCreditModal.onOpen()
            return
        }
    }


    const onSubmit = async (values: ImageTransformationFormValues) => {

        checkCredit()

        if (!image) return

        setIsSubmitting(true)

        if (data || image) {
            const transformationUrl = getCldImageUrl({
                width: image.width,
                height: image.height,
                src: image.publicId as string,
                ...transformationConfig
            })

            const imageData = {
                title: values.title,
                publicId: image.publicId as string,
                transformationType: type,
                width: image.width as number,
                height: image.height as number,
                config: transformationConfig,
                secureURL: image.secureURL as string,
                transformationURL: transformationUrl,
                aspectRatio: values.aspectRatio,
                prompt: values.prompt,
                color: values.color,
            }

            if (action === 'Add') {
                try {
                    const newImage = await addImage({
                        image: imageData,
                        userId,
                        path: '/images'
                    })

                    if (newImage) {
                        form.reset()
                        setImage(data)
                        router.push(`/images/${newImage._id}`)
                    }
                } catch (error) {
                    console.log(error);
                }
            }

            if (action === 'Update') {
                try {
                    const updatedImage = await updateImage({
                        image: {
                            ...imageData,
                            _id: data?._id
                        },
                        userId,
                        path: `/images/${data?._id}`
                    })

                    if (updatedImage) {
                        router.push(`/images/${updatedImage._id}`)
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }

        setIsSubmitting(false)
    }

    useEffect(() => {
        if (image && (type === 'restore' || type === 'removeBackground')) {
            setNewTransformation(transformationType.config)
        }
    }, [image, transformationType.config, type])

    useEffect(() => {
        checkCredit()
    }, [creditBalance])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">


          
                <ImageTransformationCustomField
                    control={form.control}
                    name="title"
                    formLabel="Image Title"
                    className="w-full"
                    render={({ field }) => <Input {...field} className="input-field" />}
                />

                {type === 'fill' && (
                    <ImageTransformationCustomField
                        control={form.control}
                        name="aspectRatio"
                        formLabel="Aspect Ratio"
                        className="w-full"
                        render={({ field }) => (
                            <Select
                                onValueChange={(value) => onSelectFieldHandler(value, field.onChange)}
                                value={field.value}
                            >
                                <SelectTrigger className="select-field">
                                    <SelectValue placeholder="Select size" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.keys(aspectRatioOptions).map((key) => (
                                        <SelectItem key={key} value={key} className="select-item">
                                            {aspectRatioOptions[key as AspectRatioKey].label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                )}

                {(type === 'remove' || type === 'recolor') && (
                    <div className="prompt-field">
                        <ImageTransformationCustomField
                            control={form.control}
                            name="prompt"
                            formLabel={
                                type === 'remove' ? 'Object to remove' : 'Object to recolor'
                            }
                            className="w-full"
                            render={({ field }) => (
                                <Input
                                    value={field.value}
                                    className="input-field"
                                    onChange={(e) => onInputChangeHandler(
                                        'prompt',
                                        e.target.value,
                                        type,
                                        field.onChange
                                    )}
                                />
                            )}
                        />

                        {type === 'recolor' && (
                            <ImageTransformationCustomField
                                control={form.control}
                                name="color"
                                formLabel="Replacement Color"
                                className="w-full"
                                render={({ field }) => (
                                    <Input
                                        value={field.value}
                                        className="input-field"
                                        onChange={(e) => onInputChangeHandler(
                                            'color',
                                            e.target.value,
                                            'recolor',
                                            field.onChange
                                        )}
                                    />
                                )}
                            />
                        )}
                    </div>
                )}

                <div className="grid h-fit min-h-[200px] grid-cols-1 gap-5 py-4 md:grid-cols-2">
                    <ImageTransformationCustomField
                        control={form.control}
                        name="publicId"
                        className="flex flex-col size-full"

                        render={({ field }) => (
                            <CloudinaryMediaUploader
                                onValueChange={field.onChange}
                                setImage={setImage}
                                publicId={field.value}
                                image={image}
                                type={type}
                                hasCredit={creditBalance > 1}
                            />
                        )}
                    />

                    <ImageTransformed
                        image={image}
                        type={type}
                        title={form.getValues().title}
                        isTransforming={isTransforming}
                        setIsTransforming={setIsTransforming}
                        transformationConfig={transformationConfig}    
                    />
                </div>


                <div className="flex flex-col gap-4">
                    <span>{JSON.stringify(image)}</span>
                    </div>


                <div className="flex flex-col gap-4">
                    <Button
                        type="button"
                        variant="secondary"
                        size="lg"
                        className="w-full rounded-3xl"
                        disabled={isTransforming || newTransformation === null}
                        onClick={onTransformHandler}
                    >
                        {isTransforming ? 'Transforming....' : 'Apply Tranformation'}
                    </Button>

                    <Button
                        type="submit"
                        variant="default"
                        size="lg"
                        className="w-full rounded-3xl"
                        disabled={isSubmitting || isPending}
                    >
                        {isSubmitting ? 'Submiting....' : 'Save'}
                    </Button>
                   
                </div>
            </form>
        </Form>
    );
}

export default ImageTransformationForm;