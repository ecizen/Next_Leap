import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AccordionFilterProps {
  title: string;
  children: React.ReactNode;
}

const AccordionFilter = ({ title, children }: AccordionFilterProps) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full bg-white rounded-sm  shadow-[0_1px_3px_rgba(0,0,0,0.04)]

"
    >
      <AccordionItem value={title.toLowerCase()}>
        <AccordionTrigger className="text-sm py-0.5 p-2 border-b border-gray-50  rounded-none [data-state=open]:border-b [data-state=open]:border-gray-200">
          {title}
        </AccordionTrigger>

        <AccordionContent className="py-2 px-2">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionFilter;
