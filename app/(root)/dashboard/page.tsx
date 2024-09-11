import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const Dashboard = () => {
  return (
    <section className="h-full w-full flex items-center p-12">
      <Tabs defaultValue="ai-tools">
        <TabsList>
          <TabsTrigger value="ai-tools">AI Tools</TabsTrigger>
          <TabsTrigger value="your-transformations">
            Your Transformations
          </TabsTrigger>
        </TabsList>
        <TabsContent value="ai-tools">
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>AI Generative Image</CardTitle>
                <CardDescription>
                  Automatically fill in missing parts of your images with
                  realistic and creative results. Say goodbye to incomplete
                  photos!
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/generative-fill">
                  <Button>Use</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>AI Generative Recolor</CardTitle>
                <CardDescription>
                  Recolor your images with a single click. Change colors to
                  match your brand or create entirely new moods.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/generative-recolor">
                  <Button>Use</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>AI Object Removal</CardTitle>
                <CardDescription>
                  Remove unwanted objects from your photos seamlessly. No more
                  photobombs or distracting elements!
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/object-removal">
                  <Button>Use</Button>
                </Link>
              </CardFooter>
            </Card>
            <p className="text-muted-foreground text-sm">More coming soon!!</p>
          </div>
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </section>
  );
};

export default Dashboard;
