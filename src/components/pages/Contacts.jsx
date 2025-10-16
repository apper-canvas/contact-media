import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import ContactCard from "@/components/molecules/ContactCard";
import SearchBar from "@/components/molecules/SearchBar";
import Modal from "@/components/molecules/Modal";
import ContactForm from "@/components/organisms/ContactForm";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { useSearch } from "@/hooks/useSearch";
import { contactService } from "@/services/api/contactService";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const { searchValue = "" } = useOutletContext() || {};

const { searchTerm, setSearchTerm, filteredData } = useSearch(
    contacts,
    ["name_c", "email_c", "phone_c", "company_c"]
  );

  // Sync with header search
  useEffect(() => {
    setSearchTerm(searchValue);
  }, [searchValue, setSearchTerm]);

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await contactService.getAll();
      setContacts(data);
    } catch (err) {
      setError("Failed to load contacts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleContactSaved = (savedContact) => {
    setContacts(prev => {
      const existing = prev.find(c => c.Id === savedContact.Id);
      if (existing) {
        return prev.map(c => c.Id === savedContact.Id ? savedContact : c);
      } else {
        return [savedContact, ...prev];
      }
    });
    setShowAddModal(false);
  };

  if (loading) {
    return <Loading type="table" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadContacts} />;
  }

  if (contacts.length === 0) {
    return (
      <Empty
        icon="Users"
        title="No contacts yet"
        description="Start building your contact list by adding your first contact."
        actionLabel="Add Contact"
        onAction={() => setShowAddModal(true)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
          <p className="text-gray-600 mt-1">
            {filteredData.length} of {contacts.length} contacts
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="w-64 md:hidden">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search contacts..."
            />
          </div>
          <Button onClick={() => setShowAddModal(true)}>
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            Add Contact
          </Button>
        </div>
      </div>

      {filteredData.length === 0 && searchTerm ? (
        <Empty
          icon="Search"
          title="No contacts found"
          description={`No contacts match "${searchTerm}". Try adjusting your search.`}
        />
      ) : (
        <div className="grid gap-4">
          {filteredData.map((contact) => (
            <ContactCard key={contact.Id} contact={contact} />
          ))}
        </div>
      )}

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Contact"
        size="lg"
      >
        <ContactForm
          onSave={handleContactSaved}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>
    </div>
  );
};

export default Contacts;