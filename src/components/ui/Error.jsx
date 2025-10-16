import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
        <ApperIcon name="AlertCircle" className="w-8 h-8 text-red-600" />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">Error</h3>
        <p className="text-gray-600 max-w-md">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-navy text-white rounded-lg hover:bg-navy/90 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default Error;