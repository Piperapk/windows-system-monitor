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
        <span className="ml-auto">
          {value.toFixed(0)}
          {symbol}
        </span>
      </div>
    </div>
  );
};

export default InformationLine;
