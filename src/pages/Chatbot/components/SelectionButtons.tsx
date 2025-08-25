interface SelectionOption {
  label: string;
  value: string;
  selected?: boolean;
}


interface SelectionButtonsProps {
  options: SelectionOption[];
  onSelect: (value: string) => void;
  selectedValue?: string;
}

export default function SelectionButtons ({ options, onSelect, selectedValue }: SelectionButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onSelect(option.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedValue === option.value || option.selected
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-300'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};