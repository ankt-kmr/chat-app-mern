import React, { useContext} from "react";
import { AuthContext } from "../context/authContext";

const IndexPage = () => {

  // Simulated authentication state
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  return (
    // <div>Hey There</div>
    <div className="bg-gray-100 min-h-screen">
      {/* Main content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {!isAuthenticated ? (
          // Limited features for unauthenticated users
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Limited Access
            </h2>
            <p className="text-gray-600 mb-6">
              You need to log in to access all features of the  WebApp.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="/login"
                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
              >
                Login
              </a>
              <a
                href="/register"
                className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition"
              >
                Register
              </a>
            </div>
          </div>
        ) : (
          // Full features for authenticated users
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {/* Content for logged in users */}
             Content for logged in users
          </div>
        )}
      </div>
    </div>
  );
};

export default IndexPage;
