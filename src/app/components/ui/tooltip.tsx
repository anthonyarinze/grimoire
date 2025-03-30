interface ToolTipProps {
  text: string;
}

export default function ToolTip({ text }: ToolTipProps) {
  return (
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden w-max max-w-xs bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow-md group-hover:block z-50">
      {text}
    </div>
  );
}
