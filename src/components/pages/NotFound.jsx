import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
          <ApperIcon name="AlertCircle" className="w-12 h-12 text-gray-400" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">404</h1>
          <h2 className="text-xl font-semibold text-gray-700">Page Not Found</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => navigate("/contacts")}>
            <ApperIcon name="Home" className="w-4 h-4 mr-2" />
            Go Home
          </Button>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;