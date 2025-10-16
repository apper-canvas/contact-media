import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Avatar from "@/components/atoms/Avatar";
import Modal from "@/components/molecules/Modal";
import ContactForm from "@/components/organisms/ContactForm";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { contactService } from "@/services/api/contactService";
import { formatPhone, formatDate } from "@/utils/formatters";

const ContactDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const loadContact = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await contactService.getById(parseInt(id));
      if (!data) {
        setError("Contact not found");
      } else {
        setContact(data);
      }
    } catch (err) {
      setError("Failed to load contact details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContact();
  }, [id]);

  const handleContactUpdated = (updatedContact) => {
    setContact(updatedContact);
    setShowEditModal(false);
  };

  const handleDelete = async () => {
    try {
      await contactService.delete(parseInt(id));
      toast.success("Contact deleted successfully");
      navigate("/contacts");
    } catch (error) {
      toast.error("Failed to delete contact");
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error || !contact) {
    return (
      <Error 
        message={error || "Contact not found"} 
        onRetry={() => navigate("/contacts")}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-navy to-teal text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/contacts")}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <ApperIcon name="ArrowLeft" className="w-5 h-5" />
              </button>
              <Avatar name={contact.name} size="lg" />
              <div>
                <h1 className="text-2xl font-bold">{contact.name}</h1>
                <p className="text-white/80">{contact.company}</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="secondary"
                onClick={() => setShowEditModal(true)}
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                <ApperIcon name="Edit" className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-red-500/20 border-red-400/30 text-white hover:bg-red-500/30"
              >
                <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Contact Information
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <ApperIcon name="Mail" className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a 
                      href={`mailto:${contact.email}`}
                      className="text-teal hover:underline"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <ApperIcon name="Phone" className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <a 
                      href={`tel:${contact.phone}`}
                      className="text-teal hover:underline"
                    >
                      {formatPhone(contact.phone)}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <ApperIcon name="Building2" className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Company</p>
                    <p className="text-gray-900">{contact.company}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Additional Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Notes</p>
                  <p className="text-gray-900 whitespace-pre-wrap">
                    {contact.notes || "No notes available"}
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <ApperIcon name="Calendar" className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Added</p>
                    <p className="text-gray-900">{formatDate(contact.createdAt)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <ApperIcon name="Clock" className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="text-gray-900">{formatDate(contact.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Contact"
        size="lg"
      >
        <ContactForm
          contact={contact}
          onSave={handleContactUpdated}
          onCancel={() => setShowEditModal(false)}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Delete Contact"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <ApperIcon name="AlertTriangle" className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Delete {contact.name}?
              </h3>
              <p className="text-gray-600">
                This action cannot be undone. This contact will be permanently deleted.
              </p>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
            >
              Delete Contact
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ContactDetail;