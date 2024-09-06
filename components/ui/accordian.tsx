import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQAccordion = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="border-b border-neutral-600">
        <AccordionTrigger className="text-2xl hover:no-underline">
          Is there a free trial available for Nova Image?
        </AccordionTrigger>
        <AccordionContent className="text-xl text-neutral-300">
          Yes! When you sign up, you receive 10 free credits to explore our
          features and try out different tools. After using your free credits,
          you'll need to choose a plan or purchase additional credits to
          continue using the service.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className="border-b border-neutral-600">
        <AccordionTrigger className="text-2xl hover:no-underline">
          How many credits does each feature use?
        </AccordionTrigger>
        <AccordionContent className="text-xl text-neutral-300">
          The number of credits required depends on the feature you're using.
          Basic tasks like background removal might cost 1 credit, while more
          advanced processes like AI Image generation require 3 credits. You can
          always check the credit cost before applying a feature.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3" className="border-b border-neutral-600">
        <AccordionTrigger className="text-2xl hover:no-underline">
          Is it animated?
        </AccordionTrigger>
        <AccordionContent className="text-xl text-neutral-300">
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
