"use client";

import { fetchMyTransformations } from "@/app/actions/transformation.action";
import { useServerActionQuery } from "@/hooks/server-action-hooks";
import { useSession } from "@clerk/nextjs";
import { IconLoader2 } from "@tabler/icons-react";
import TransformationCard from "../Transformation/TransformationCard";

export default function MyTransformations() {
  const { session } = useSession();
  const user = session?.user;

  const { data, isLoading } = useServerActionQuery(fetchMyTransformations, {
    queryKey: ["fetch-my-transformations"],
    input: {
      userId: user?.id as string,
    },
  });

  return (
    <div>
      {isLoading && (
        <div className="flex items-center justify-center space-x-2 py-4">
          <IconLoader2 className="animate-spin" />
          <span>Loading...</span>
        </div>
      )}
      {data?.length === 0 && (
        <p className="bg-destructive text-destructive-foreground p-3 rounded-lg w-full max-w-md mx-auto text-center">
          You do not have any Transformations yet.
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {data &&
          data.map((transformation) => (
            <TransformationCard
              key={transformation.id}
              transformation={transformation}
            />
          ))}
      </div>
    </div>
  );
}
