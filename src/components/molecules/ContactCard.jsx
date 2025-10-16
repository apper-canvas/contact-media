import { useNavigate } from "react-router-dom";
import Avatar from "@/components/atoms/Avatar";
import ApperIcon from "@/components/ApperIcon";
import { formatPhone } from "@/utils/formatters";

const ContactCard = ({ contact }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/contacts/${contact.Id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-lg border border-gray-200 p-4 card-hover cursor-pointer transition-all duration-200"
    >
      <div className="flex items-center space-x-4">
        <Avatar name={contact.name} size="md" />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            {contact.name}
          </h3>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <ApperIcon name="Mail" className="w-4 h-4" />
            <span className="truncate">{contact.email}</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <ApperIcon name="Phone" className="w-4 h-4" />
            <span>{formatPhone(contact.phone)}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-900 font-medium">{contact.company}</p>
          <ApperIcon name="ChevronRight" className="w-4 h-4 text-gray-400 ml-auto mt-1" />
        </div>
      </div>
    </div>
  );
};

export default ContactCard;