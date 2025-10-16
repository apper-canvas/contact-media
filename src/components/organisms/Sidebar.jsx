import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Sidebar = ({ isOpen, onClose }) => {
  const navigation = [
    { name: "Contacts", href: "/contacts", icon: "Users" },
    { name: "Companies", href: "/companies", icon: "Building2" },
    { name: "Deals", href: "/deals", icon: "TrendingUp" },
  ];

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-navy text-white">
      <div className="p-6 border-b border-navy/20">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-cyan to-teal rounded-lg flex items-center justify-center">
            <ApperIcon name="Users" className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold">Contact Hub</h2>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            onClick={onClose}
            className={({ isActive }) =>
              cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-white/10 text-white border-l-4 border-cyan"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              )
            }
          >
            <ApperIcon name={item.icon} className="w-5 h-5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-navy/20">
        <div className="text-xs text-white/50">
          © 2024 Contact Hub CRM
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-60 h-screen bg-navy">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden fixed left-0 top-0 h-full w-60 z-50"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;