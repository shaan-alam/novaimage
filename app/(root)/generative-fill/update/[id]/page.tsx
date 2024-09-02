import GenerativeFillForm from "@/components/Transformation/GenerativeFillForm";
import { db } from "@/db";
import { IconDropletHalf2 } from "@tabler/icons-react";
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
    <div className="container mx-auto bg-[#12181D] p-12 border border-secondary rounded-xl">
      <h1 className="flex items-center text-white font-bold text-2xl justify-center">
        <IconDropletHalf2 color="white" />
        &nbsp; Generative Fill
      </h1>
      <p className="mt-4 leadinng-7 w-1/2 text-neutral-400 text-center mx-auto">
        Transform your images with our AI-powered generative fill feature,
        allowing you to seamlessly add or remove elements with ease. 🚀
      </p>
      <div>
        <GenerativeFillForm transformation={transformation} />
      </div>
    </div>
  );
};

export default TransformationPage;
