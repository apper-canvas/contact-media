import Avatar from "@/components/atoms/Avatar";
import Badge from "@/components/atoms/Badge";

const CompanyCard = ({ company }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 card-hover cursor-pointer transition-all duration-200">
      <div className="flex items-start space-x-4">
<Avatar name={company.name_c} size="lg" />
        <div className="flex-1 min-w-0">
<h3 className="text-lg font-semibold text-gray-900 truncate mb-1">
            {company.name_c}
          </h3>
<p className="text-sm text-gray-600 mb-2">{company.industry_c}</p>
          <div className="flex items-center justify-between">
            <Badge variant="info">
              {company.contact_count_c} {company.contact_count_c === 1 ? "Contact" : "Contacts"}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;