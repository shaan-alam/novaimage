import { IconCheck } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PricingSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Simple, Transparent Pricing
            </h2>
            <p className="max-w-[900px] mt-6 text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Choose the plan that's right for you and start creating today.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-8 md:mt-12 max-w-5xl mx-auto">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle>Free Plan</CardTitle>
              <CardDescription>Perfect for trying out</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-4xl font-bold">$0</p>
              <p className="text-sm text-gray-500">Free forever</p>
              <ul className="space-y-2 pt-4">
                <li className="flex items-center">
                  <IconCheck className="mr-2 h-4 w-4 text-green-500" />
                  <span>10 credits after sign up</span>
                </li>
                <li className="flex items-center">
                  <IconCheck className="mr-2 h-4 w-4 text-green-500" />
                  <span>Access to basic features</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                Sign Up
              </Button>
            </CardFooter>
          </Card>
          <Card className="border border-border">
            <CardHeader>
              <CardTitle>Basic Plan</CardTitle>
              <CardDescription>Perfect for getting started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-4xl font-bold">$20</p>
              <p className="text-sm text-gray-500">One-time purchase</p>
              <ul className="space-y-2 pt-4">
                <li className="flex items-center">
                  <IconCheck className="mr-2 h-4 w-4 text-green-500" />
                  <span>75 credits</span>
                </li>
                <li className="flex items-center">
                  <IconCheck className="mr-2 h-4 w-4 text-green-500" />
                  <span>Access to basic features</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Get Started</Button>
            </CardFooter>
          </Card>
          <Card className="border border-border">
            <CardHeader>
              <CardTitle>Premium Plan</CardTitle>
              <CardDescription>More credits, more value</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-4xl font-bold">$40</p>
              <p className="text-sm text-gray-500">One-time purchase</p>
              <ul className="space-y-2 pt-4">
                <li className="flex items-center">
                  <IconCheck className="mr-2 h-4 w-4 text-green-500" />
                  <span>150 credits</span>
                </li>
                <li className="flex items-center">
                  <IconCheck className="mr-2 h-4 w-4 text-green-500" />
                  <span>Access to all features</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Get Premium</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
