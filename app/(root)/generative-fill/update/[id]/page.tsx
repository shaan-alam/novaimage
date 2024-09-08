import GenerativeFillForm from "@/components/Transformation/GenerativeFill";
import { db } from "@/db";
import { REDIRECTION } from "@/types";
import { redirect } from "next/navigation";

const TransformationPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const transformation = await db.transformation.findFirst({
    where: {
      id,
    },
  });

  if (!transformation) redirect(`/${REDIRECTION.GENERATIVE_FILL}`);

  return (
    <>
      <GenerativeFillForm transformation={transformation} />
    </>
  );
};

export default TransformationPage;
