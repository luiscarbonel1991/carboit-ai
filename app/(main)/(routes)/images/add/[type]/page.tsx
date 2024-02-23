import HeaderContent from "@/components/header-content";
import ImageTransformationForm from "@/components/images/image-transformation-form";
import InsuficientCreditModal from "@/components/insufficient-credit-modal";
import { imageTransformationTypes } from "@/config/links";
import { findUserBy } from "@/lib/actions/user.action";
import { SearchParamProps, TransformationTypeKey } from "@/types/image-transformation";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const AddImageTransformationType = async (
    { params: { type } }: SearchParamProps
) => {
    const { userId } = auth();

    if(!userId) redirect('/sign-in')

    const imageTransformationType = imageTransformationTypes[type];

    const user = await findUserBy(userId)

    return (
        <>
        <HeaderContent 
            title={imageTransformationType.title}
            subtitle={imageTransformationType.subTitle}
        />

        <section className="mt-10">
            <ImageTransformationForm 
                action="Add"
                type={imageTransformationType.type as TransformationTypeKey}
                userId={user._id}
                creditBalance={user.creditBalance}
                config={imageTransformationType.config}
            />
        </section>
        </>
    );
}

export default AddImageTransformationType;