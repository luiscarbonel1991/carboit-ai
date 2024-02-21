"use client"

import { z } from "zod"
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
import { ImageTransformationSchema } from "@/schemas"
import { ImageTransformationCustomField } from "../form/image-transformation-custom-field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { imageTransformationTypes } from "@/config/links"
import { aspectRatioOptions } from "@/config/aspect-ratio-options"
import { AspectRatioKey } from "@/lib/utils"




declare type Transformations = {
    restore?: boolean;
    fillBackground?: boolean;
    remove?: {
        prompt: string;
        removeShadow?: boolean;
        multiple?: boolean;
    };
    recolor?: {
        prompt?: string;
        to: string;
        multiple?: boolean;
    };
    removeBackground?: boolean;
};


declare type TransformationFormProps = {
    action: "Add" | "Update";
    userId: string;
    type: TransformationTypeKey;
    creditBalance: number;
    data?: IImage | null;
    config?: Transformations | null;
};


declare type TransformedImageProps = {
    image: any;
    type: string;
    title: string;
    transformationConfig: Transformations | null;
    isTransforming: boolean;
    hasDownload?: boolean;
    setIsTransforming?: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultValues = {
    title: "",
    aspectRatio: "",
    color: "",
    prompt: "",
    publicId: "",
};


const ImageTransformationForm = ({ action, data = null, userId, type, creditBalance, config = null }: TransformationFormProps) => {

    const transformationType = imageTransformationTypes[type];
    const [image, setImage] = useState(data)
    const [newTransformation, setNewTransformation] = useState<Transformations | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isTransforming, setIsTransforming] = useState(false);
    const [transformationConfig, setTransformationConfig] = useState(config)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()


    const onSelectFieldHandler = (value: string, onChangeField: (value: string) => void) => {
        // const imageSize = aspectRatioOptions[value as AspectRatioKey]
    
        // setImage((prevState: any) => ({
        //   ...prevState,
        //   aspectRatio: imageSize.aspectRatio,
        //   width: imageSize.width,
        //   height: imageSize.height,
        // }))
    
        // setNewTransformation(transformationType.config);
    
        // return onChangeField(value)
      }


      const onInputChangeHandler = (field: string, value: string, type: string, onChangeField: (value: string) => void) => {
      }
    
    

    const initialValues = data && action === 'Update' ? {
        title: data?.title,
        aspectRatio: data?.aspectRatio,
        color: data?.color,
        prompt: data?.prompt,
        publicId: data?.publicId,
    } : defaultValues

    const form = useForm<z.infer<typeof ImageTransformationSchema>>({
        resolver: zodResolver(ImageTransformationSchema),
        defaultValues: initialValues
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof ImageTransformationSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

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

            </form>
        </Form>
    );
}

export default ImageTransformationForm;