import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";

const Header = ({ title, onMenuClick, searchValue, onSearchChange, showSearch = true }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ApperIcon name="Menu" className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-navy to-teal bg-clip-text text-transparent">
            {title}
          </h1>
        </div>
        
        {showSearch && (
          <div className="hidden md:block w-96">
            <SearchBar
              value={searchValue}
              onChange={onSearchChange}
              placeholder="Search contacts, companies, deals..."
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;