interface Action {
  label: string;
  action: string;
  type: 'primary' | 'secondary';
}

interface ActionButtonsProps {
  actions: Action[];
  onAction: (action: string) => void;
}

export default function ActionButtons({ actions, onAction }: ActionButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={() => onAction(action.action)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            action.type === 'primary'
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-300'
          }`}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
};
