import GenerativeRecolorForm from "@/components/Transformation/GenerativeRecolor/GenerativeRecolorForm";
import { db } from "@/db";
import { REDIRECTION } from "@/types";
import { redirect } from "next/navigation";

const TransformationPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const transformation = await db.transformation.findFirst({
    where: {
      id,
    },
    include: {
      recolor: true
    }
  });

  if (!transformation) redirect(`/${REDIRECTION.GENERATIVE_RECOLOR}`);

  return (
    <>
      <GenerativeRecolorForm transformation={transformation} />
    </>
  );
};

export default TransformationPage;
