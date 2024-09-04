import GenerativeFillForm from "@/components/Transformation/GenerativeFill";
import { db } from "@/db";
import { redirect } from "next/navigation";

const TransformationPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const transformation = await db.transformation.findFirst({
    where: {
      id,
    },
  });

  if (!transformation) redirect("/generative-fill");

  return (
    <>
      <GenerativeFillForm transformation={transformation} />
    </>
  );
};

export default TransformationPage;
