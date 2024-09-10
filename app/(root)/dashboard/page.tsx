"use client";

import TransformationCards from "@/components/Transformation/TransformationCards";
import { IconTransform } from "@tabler/icons-react";

export default async function Dashboard() {
  return (
    <div>
      <h1 className="flex items-center text-gray-400 font-bold text-2xl">
        <IconTransform />
        &nbsp; Your Transformations
      </h1>
      <div className="mt-8">
        <TransformationCards />
      </div>
    </div>
  );
}
