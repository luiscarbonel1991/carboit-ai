import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { SearchParamProps, TransformationTypeKey } from "@/types/image-transformation";
import { getImageById } from "@/lib/actions/image.action";
import { imageTransformationTypes } from "@/config/links";
import ImageTransformationForm from "@/components/images/image-transformation-form";
import HeaderContent from "@/components/header-content";
import { findUserBy } from "@/lib/actions/user.action";

const Page = async ({ params: { id } }: SearchParamProps) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await findUserBy(userId);
  const image = await getImageById(id);

  const transformation =
    imageTransformationTypes[image.transformationType as TransformationTypeKey];

  return (
    <>
      <HeaderContent title={transformation.title} subtitle={transformation.subTitle} />

      <section className="mt-10">
        <ImageTransformationForm
          action="Update"
          userId={user._id}
          type={image.transformationType as TransformationTypeKey}
          creditBalance={user.creditBalance}
          config={image.config}
          data={image}
        />
      </section>
    </>
  );
};

export default Page;