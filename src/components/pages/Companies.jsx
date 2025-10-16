import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import CompanyCard from "@/components/molecules/CompanyCard";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { useSearch } from "@/hooks/useSearch";
import { companyService } from "@/services/api/companyService";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { searchValue = "" } = useOutletContext() || {};

  const { searchTerm, setSearchTerm, filteredData } = useSearch(
    companies,
    ["name", "industry"]
  );

  // Sync with header search
  useEffect(() => {
    setSearchTerm(searchValue);
  }, [searchValue, setSearchTerm]);

  const loadCompanies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await companyService.getAll();
      setCompanies(data);
    } catch (err) {
      setError("Failed to load companies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  if (loading) {
    return <Loading type="grid" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadCompanies} />;
  }

  if (companies.length === 0) {
    return (
      <Empty
        icon="Building2"
        title="No companies yet"
        description="Companies will appear here as you add contacts with company information."
        actionLabel="Add Company"
        onAction={() => {}}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
          <p className="text-gray-600 mt-1">
            {filteredData.length} of {companies.length} companies
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="w-64 md:hidden">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search companies..."
            />
          </div>
          <Button>
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            Add Company
          </Button>
        </div>
      </div>

      {filteredData.length === 0 && searchTerm ? (
        <Empty
          icon="Search"
          title="No companies found"
          description={`No companies match "${searchTerm}". Try adjusting your search.`}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((company) => (
            <CompanyCard key={company.Id} company={company} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Companies;