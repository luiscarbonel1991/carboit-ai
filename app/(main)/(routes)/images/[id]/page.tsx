import HeaderContent from "@/components/header-content";
import { DeleteConfirmation } from "@/components/images/delete-confirmation";
import ImageTransformed from "@/components/images/image-transformed";
import { Button } from "@/components/ui/button";
import { getImageById } from "@/lib/actions/image.action";
import { getImageSize } from "@/lib/utils";
import { SearchParamProps } from "@/types/image-transformation";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";


const ImageDetailsPage = async ({ params: { id } }: SearchParamProps) => {
  const { userId } = auth();

  const image = await getImageById(id);

  return (
    <>
      <HeaderContent title={image.title} />

      <section className="mt-5 flex flex-wrap gap-4">
        <div className="font-medium md:p-16-medium flex gap-2">
          <p className="text-dark-600">Transformation:</p>
          <p className="capitalize text-purple-400">
            {image.transformationType}
          </p>
        </div>

        {image.prompt && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2 ">
              <p className="text-dark-600">Prompt:</p>
              <p className=" capitalize text-purple-400">{image.prompt}</p>
            </div>
          </>
        )}

        {image.color && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="md:p-16-medium flex gap-2">
              <p className="text-dark-600">Color:</p>
              <p className=" capitalize text-purple-400">{image.color}</p>
            </div>
          </>
        )}

        {image.aspectRatio && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="md:p-16-medium flex gap-2">
              <p className="text-dark-600">Aspect Ratio:</p>
              <p className="capitalize text-purple-400">{image.aspectRatio}</p>
            </div>
          </>
        )}
      </section>

      <section className="mt-10 border-t border-dark-400/15">
        <div className="grid h-fit min-h-[200px] grid-cols-1 gap-5 py-8 md:grid-cols-2">

          <div className="flex flex-col gap-4">
            <h3 className="text-2xl md:text-4xl font-bold">Original</h3>

            <Image
              width={getImageSize(image.transformationType, image, "width")}
              height={getImageSize(image.transformationType, image, "height")}
              src={image.secureURL}
              alt="image"
              className="h-fit min-h-72 w-full rounded-[10px] border border-dashed bg-purple-100/20 object-cover p-2"
            />
          </div>


          <ImageTransformed
            image={image}
            type={image.transformationType}
            title={image.title}
            isTransforming={false}
            transformationConfig={image.config}
            hasDownload={true}
          />
        </div>

        {userId === image.author.clerkId && (
          <div className="mt-4 space-y-4">
            <Button asChild
              type="button"
              size={"lg"}
              className="w-full rounded-full"
             > 
              <Link
                href={`/images/${image._id}/update`}
                aria-label="Update Image"
              >
                Update Image
              </Link>
            </Button>
            <DeleteConfirmation imageId={image._id} />
          </div>
        )}
      </section>
    </>
  );
};


export default ImageDetailsPage;