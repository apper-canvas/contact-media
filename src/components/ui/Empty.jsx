import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No items found", 
  description = "Get started by creating your first item.",
  actionLabel = "Create New",
  onAction,
  icon = "Plus"
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
        <ApperIcon name={icon} className="w-8 h-8 text-gray-400" />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 max-w-md">{description}</p>
      </div>
      {onAction && (
        <button
          onClick={onAction}
          className="px-6 py-2 bg-gradient-to-r from-navy to-teal text-white rounded-lg hover:from-navy/90 hover:to-teal/90 transition-all duration-200 btn-ripple"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default Empty;