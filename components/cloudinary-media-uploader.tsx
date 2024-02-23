"use client";

import HeaderContent from "./header-content";
import { useToast } from "./ui/use-toast";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { UploadCloudIcon } from "lucide-react";
import { dataUrl, getImageSize } from "@/lib/utils";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import { useInsuficientCreditModal } from "@/hooks/use-insufficient-credit-modal";

type CloudinaryMediaUploaderProps = {
    onValueChange: (value: string) => void;
    setImage: React.Dispatch<any>;
    publicId: string;
    image: any;
    type: string;
    hasCredit?: boolean;
}

const CloudinaryMediaUploader = ({
    onValueChange,
    setImage,
    image,
    publicId,
    type,
    hasCredit
}: CloudinaryMediaUploaderProps) => {

    const { toast } = useToast();
    const isufficientCreditModal = useInsuficientCreditModal()

    const onUploadSuccessHandler = (result: any) => {
        setImage((prevState: any) => ({
            ...prevState,
            publicId: result?.info?.public_id,
            width: result?.info?.width,
            height: result?.info?.height,
            secureURL: result?.info?.secure_url
        }))

        onValueChange(result?.info?.public_id)

        console.log({ result });

        toast({
            title: "Image uploaded successfully!",
            description: "The image has been uploaded to the server.",
            duration: 5000,
            className: "bg-green-100 text-green-900",

        })
    }

    const onUploadErrorHandler = (error: any) => {
        toast({
            title: "Something went wrong!",
            description: "The image failed to upload. Please try again.",
            variant: "destructive",
            duration: 5000,
            className: "bg-red-100 text-red-900",
        });
    }

    return (
        <>
            <CldUploadWidget
                uploadPreset="carboi_ai"
                options={{
                    multiple: false,
                    resourceType: "image",
                    sources: ["local", "url", "unsplash"],
                }}
                onSuccess={onUploadSuccessHandler}
                onError={onUploadErrorHandler}
            >
                {({ open }) => {

                    return (
                        <div className="flex flex-col gap-4">
                            <HeaderContent
                                title="Original"
                            />

                            {publicId ? (
                                <>
                                    <div className="cursor-pointer overflow-hidden rounded-[10px]">
                                        <CldImage
                                            width={getImageSize(type, image, "width")}
                                            height={getImageSize(type, image, "height")}
                                            src={publicId}
                                            alt="Image uploaded to Cloudinary"
                                            sizes={"(max-width: 767px) 100vw, 50vw"}
                                            placeholder={dataUrl as PlaceholderValue}
                                            className="h-fit min-h-72 w-full rounded-[10px] border border-dashed bg-slate-100/20 object-cover p-2"
                                        />
                                    </div>
                                </>
                            ) : (
                                <div
                                    onClick={() => {
                                        if(hasCredit) {
                                            open();
                                        } else {
                                            isufficientCreditModal.onOpen();
                                        }
                                    }}
                                    className="flex flex-col  h-72 cursor-pointer  gap-5 rounded-[16px] border border-dashed bg-slate-100/20 shadow-inner">
                                    <figure className="flex flex-col justify-center items-center h-full gap-4 rounded-[16px] bg-background p-5 shadow-sm shadow-slate-200/50">
                                        <UploadCloudIcon className="w-16 h-16 shadow-md p-2 rounded-2xl" />
                                        <figcaption className="text-sm font-medium text-muted-foreground">Upload {type}</figcaption>
                                    </figure>
                                </div>
                            )}
                        </div>
                    );
                }}

            </CldUploadWidget>
        </>
    )
}

export default CloudinaryMediaUploader;