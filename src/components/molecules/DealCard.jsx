import { motion } from "framer-motion";
import Avatar from "@/components/atoms/Avatar";
import Badge from "@/components/atoms/Badge";
import { formatCurrency, formatDate } from "@/utils/formatters";

const DealCard = ({ deal, contactName, companyName }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg border border-gray-200 p-4 card-hover cursor-pointer"
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
<h4 className="font-semibold text-gray-900 text-sm">{deal.title_c}</h4>
          <Badge variant={deal.status_c}>{deal.status_c}</Badge>
        </div>
        
<div className="text-lg font-bold text-navy">
          {formatCurrency(deal.value_c)}
        </div>
        
        <div className="flex items-center space-x-2">
          <Avatar name={contactName || "Unknown"} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-600 truncate">{contactName}</p>
            <p className="text-xs text-gray-500 truncate">{companyName}</p>
          </div>
        </div>
        
        <div className="text-xs text-gray-500">
Created {formatDate(deal.created_at_c)}
        </div>
      </div>
    </motion.div>
  );
};

export default DealCard;