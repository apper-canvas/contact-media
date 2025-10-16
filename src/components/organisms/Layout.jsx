import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/organisms/Sidebar";
import Header from "@/components/organisms/Header";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          title="Contact Hub"
          onMenuClick={handleMenuClick}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />
        
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <Outlet context={{ searchValue, setSearchValue }} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;