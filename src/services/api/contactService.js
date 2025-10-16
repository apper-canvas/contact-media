import { getApperClient } from "@/services/apperClient";

class ContactService {
  constructor() {
    this.tableName = "contact_c";
    this.fields = [
      { field: { Name: "name_c" } },
      { field: { Name: "email_c" } },
      { field: { Name: "phone_c" } },
      { field: { Name: "company_c" } },
      { field: { Name: "notes_c" } },
      { field: { Name: "created_at_c" } },
      { field: { Name: "updated_at_c" } }
    ];
  }

  async getAll() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const params = {
        fields: this.fields,
        pagingInfo: { limit: 1000, offset: 0 }
      };

      const response = await apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching contacts:", error?.message || error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const params = {
        fields: this.fields
      };

      const response = await apperClient.getRecordById(this.tableName, parseInt(id), params);

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data || null;
    } catch (error) {
      console.error(`Error fetching contact ${id}:`, error?.message || error);
      return null;
    }
  }

  async create(contactData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      // Only include Updateable fields
      const params = {
        records: [
          {
            name_c: contactData.name_c || "",
            email_c: contactData.email_c || "",
            phone_c: contactData.phone_c || "",
            company_c: contactData.company_c || "",
            notes_c: contactData.notes_c || "",
            created_at_c: new Date().toISOString(),
            updated_at_c: new Date().toISOString()
          }
        ]
      };

      const response = await apperClient.createRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          return result.data;
        } else {
          throw new Error(result.message || "Failed to create contact");
        }
      }

      throw new Error("No response data");
    } catch (error) {
      console.error("Error creating contact:", error?.message || error);
      throw error;
    }
  }

  async update(id, updateData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      // Only include Updateable fields
      const params = {
        records: [
          {
            Id: parseInt(id),
            name_c: updateData.name_c,
            email_c: updateData.email_c,
            phone_c: updateData.phone_c,
            company_c: updateData.company_c,
            notes_c: updateData.notes_c,
            updated_at_c: new Date().toISOString()
          }
        ]
      };

      const response = await apperClient.updateRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          return result.data;
        } else {
          throw new Error(result.message || "Failed to update contact");
        }
      }

      throw new Error("No response data");
    } catch (error) {
      console.error("Error updating contact:", error?.message || error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          return { success: true };
        } else {
          throw new Error(result.message || "Failed to delete contact");
        }
      }

      throw new Error("No response data");
    } catch (error) {
      console.error("Error deleting contact:", error?.message || error);
      throw error;
    }
  }
}

export const contactService = new ContactService();