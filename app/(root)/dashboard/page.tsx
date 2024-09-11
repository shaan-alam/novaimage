"use client";

import TransformationCards from "@/components/Transformation/TransformationCards";

export default async function Dashboard() {
  return (
    <div>
      <div className="mt-8">
        <TransformationCards />
      </div>
    </div>
  );
}
