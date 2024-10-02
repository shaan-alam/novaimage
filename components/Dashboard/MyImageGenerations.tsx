"use client";

import { fetchUsersImageGenerations } from "@/app/actions/image-gen.actions";
import { useServerActionQuery } from "@/hooks/server-action-hooks";
import { useSession } from "@clerk/nextjs";
import { IconLoader2 } from "@tabler/icons-react";
import ImageGenerationCard from "../Generations/ImageGenerationCard";

const MyImageGenerations = () => {
  const { session } = useSession();
  const user = session?.user;

  const { data, isLoading } = useServerActionQuery(fetchUsersImageGenerations, {
    queryKey: ["fetch-my-image-generations"],
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
          data.map((generation) => (
            <ImageGenerationCard key={generation.id} generation={generation} />
          ))}
      </div>
    </div>
  );
};

export default MyImageGenerations;

