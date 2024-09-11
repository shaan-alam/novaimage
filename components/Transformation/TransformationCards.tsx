import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TransformationCard = () => {
  return (
    <section className="h-full w-full flex items-center justify-center">
      <Tabs defaultValue="ai-tools">
        <TabsList>
          <TabsTrigger value="ai-tools">AI Tools</TabsTrigger>
          <TabsTrigger value="your-transformations">Your Transformations</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </section>
  );
};

export default TransformationCard;
