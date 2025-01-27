interface Props {
  value: number;
  total: number;
  label: string;
  symbol: string;
  Icon: React.ElementType;
}

const InformationLineAndBar: React.FC<Props> = ({ value, total, label, symbol, Icon }) => {
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
      <div className="h-2 bg-gray-200 rounded-lg overflow-hidden">
        <div
          className="h-full bg-slate-700 transition-all ease-in"
          style={{ width: `${total}%` }}
        ></div>
      </div>
    </div>
  );
};

export default InformationLineAndBar;
