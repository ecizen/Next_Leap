import { Label } from "@/components/ui/label";

interface InfoBoxProps {
  icon: React.ElementType;
  title: string;
  content: string;
}

const InfoBox = ({ icon: Icon, title, content }: InfoBoxProps) => (
  <div className="w-full p-4 py-6 rounded-md border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col">
    <div className="flex items-center gap-2">
      <Icon size={16} className="text-gray-500" />
      <span className="text-xs text-gray-500">{title}</span>
    </div>
    <Label className="text-md font-semibold mt-2">{content}</Label>
  </div>
);
export default InfoBox;
