import { ChevronRight } from "lucide-react";

interface Props {
  value: number;
  label: string;
  symbol?: string;
  Icon: React.ElementType;
}

const InformationLine: React.FC<Props> = ({ value, label, symbol, Icon }) => {
  return (
    <div className="mb-5">
      <div className="flex justify-start text-sm font-semibold">
        <Icon className="mt-0.5 mr-1" size={16} />
        <span>{label}</span>
        <div className="ml-auto flex">
          <span>
            {value.toFixed(0)}
            {symbol}
          </span>
          <ChevronRight className="mt-0.5" size={16} />
        </div>
      </div>
    </div>
  );
};

export default InformationLine;
