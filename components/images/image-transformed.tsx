"use client";


import { ImageTransformedProps } from "@/types/image-transformation";
import HeaderContent from "../header-content";
import { Button } from "../ui/button";
import { FiDownload } from "react-icons/fi";
import { Loader2 } from "lucide-react";
import { CldImage, getCldImageUrl } from "next-cloudinary";
import { dataUrl, debounce, download, getImageSize } from "@/lib/utils";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";



const ImageTransformed = (
    { image, type, title, transformationConfig, isTransforming, setIsTransforming, hasDownload = false }: ImageTransformedProps
) => {

    const onDownloadHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
    
        download(getCldImageUrl({
          width: image?.width,
          height: image?.height,
          src: image?.publicId,
          ...transformationConfig
        }), title)
      }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between">
                <HeaderContent title="Transformed" />

                {hasDownload && (
                    <Button
                        className="cursor-pointer"
                        variant={"secondary"}
                        size={"icon"}
                        onClick={onDownloadHandler}
                    >
                        <FiDownload className="h-6 w-6" />
                    </Button>
                )

                }
            </div>

            {image?.publicId && transformationConfig  ? (
                <div className="relative">
                    <CldImage
                        width={getImageSize(type, image, "width")}
                        height={getImageSize(type, image, "height")}
                        src={image?.publicId}
                        alt={title}
                        sizes={"(max-width: 767px) 100vw, 50vw"}
                        placeholder={dataUrl as PlaceholderValue}
                        className="rounded-[10px] border border-dashed bg-slate-100/20 object-cover p-2 w-full h-fit min-h-72"
                        onLoad={() => {
                            setIsTransforming && setIsTransforming(false);
                        }}
                        onError={() => {
                            debounce(() => {
                                setIsTransforming && setIsTransforming(false);
                            }, 8000)()
                        }}
                        {...transformationConfig}
                    />

                    {isTransforming && (
                        <div className="flex flex-col justify-center items-center gap-4">
                            <Loader2 className="animate-spin h-10 w-10 text-white/80" />
                            <p className="text-white/80">Please wait...</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center h-full gap-4 rounded-[16px] bg-background p-5 shadow-sm shadow-slate-200/50">
                    <p className="text-muted-foreground">Tranformed Image</p>
                </div>
            )}
        </div>
    )
}

export default ImageTransformed