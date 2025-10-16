import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useSearch } from "@/hooks/useSearch";
import { dealService } from "@/services/api/dealService";
import { contactService } from "@/services/api/contactService";
import { companyService } from "@/services/api/companyService";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import Button from "@/components/atoms/Button";
import DealCard from "@/components/molecules/DealCard";
import SearchBar from "@/components/molecules/SearchBar";

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { searchValue = "" } = useOutletContext() || {};

const { searchTerm, setSearchTerm, filteredData } = useSearch(
    deals,
    ["title_c", "status_c"]
  );

  // Sync with header search
  useEffect(() => {
    setSearchTerm(searchValue);
  }, [searchValue, setSearchTerm]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [dealsData, contactsData, companiesData] = await Promise.all([
        dealService.getAll(),
        contactService.getAll(),
        companyService.getAll()
      ]);
      setDeals(dealsData);
      setContacts(contactsData);
      setCompanies(companiesData);
    } catch (err) {
      setError("Failed to load deals. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

const getContactName = (contactLookup) => {
    if (!contactLookup) return "Unknown Contact";
    return contactLookup.Name || "Unknown Contact";
  };

const getCompanyName = (companyLookup) => {
    if (!companyLookup) return "Unknown Company";
    return companyLookup.Name || "Unknown Company";
  };

const dealsByStatus = {
    "Lead": filteredData.filter(deal => deal.status_c === "Lead"),
    "Negotiation": filteredData.filter(deal => deal.status_c === "Negotiation"),
    "Closed Won": filteredData.filter(deal => deal.status_c === "Closed Won"),
    "Closed Lost": filteredData.filter(deal => deal.status_c === "Closed Lost")
  };

  const statusColors = {
    "Lead": "text-yellow-600",
    "Negotiation": "text-blue-600",
    "Closed-Won": "text-green-600",
    "Closed-Lost": "text-red-600"
  };

  if (loading) {
    return <Loading type="kanban" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }

  if (deals.length === 0) {
    return (
      <Empty
        icon="TrendingUp"
        title="No deals yet"
        description="Start tracking your sales opportunities by adding your first deal."
        actionLabel="Add Deal"
        onAction={() => {}}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Deals Pipeline</h1>
          <p className="text-gray-600 mt-1">
            {filteredData.length} of {deals.length} deals
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="w-64 md:hidden">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search deals..."
            />
          </div>
          <Button>
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            Add Deal
          </Button>
        </div>
      </div>

      {filteredData.length === 0 && searchTerm ? (
        <Empty
          icon="Search"
          title="No deals found"
          description={`No deals match "${searchTerm}". Try adjusting your search.`}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(dealsByStatus).map(([status, statusDeals]) => (
            <div key={status} className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className={`font-semibold ${statusColors[status]}`}>
                  {status.replace("-", " ")}
                </h2>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {statusDeals.length}
                </span>
              </div>
              
              <div className="space-y-3">
                {statusDeals.map((deal) => (
<DealCard
                    key={deal.Id}
                    deal={deal}
                    contactName={getContactName(deal.contact_id_c)}
                    companyName={getCompanyName(deal.company_id_c)}
                  />
                ))}
                {statusDeals.length === 0 && (
                  <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg text-center text-gray-500 text-sm">
                    No {status.toLowerCase().replace("-", " ")} deals
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Deals;