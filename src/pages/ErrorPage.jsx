import { useSearchParams, Link } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

const ErrorPage = () => {
  const [searchParams] = useSearchParams();
  const errorMessage = searchParams.get('message') || 'An error occurred';
  const isPublicProfileError = errorMessage.toLowerCase().includes('public profile');
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <ApperIcon name="AlertCircle" size={32} className="text-red-600" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h1>
        
        {isPublicProfileError ? (
          <div className="mb-6 text-left">
            <p className="text-gray-700 mb-4">{errorMessage}</p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-sm text-yellow-800">
                <strong>Troubleshooting:</strong> This error indicates that public profile access needs to be enabled in the Apper backend settings. Please contact your system administrator or enable this feature in your Apper project dashboard.
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 mb-6">{errorMessage}</p>
        )}
        
        <Link to="/login" className="inline-block px-6 py-3 bg-navy text-white rounded-md hover:bg-teal transition-colors">
          Return to Login
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;