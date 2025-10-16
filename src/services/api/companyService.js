import { getApperClient } from "@/services/apperClient";

class CompanyService {
  constructor() {
    this.tableName = "company_c";
    this.fields = [
      { field: { Name: "name_c" } },
      { field: { Name: "industry_c" } },
      { field: { Name: "contact_count_c" } },
      { field: { Name: "created_at_c" } }
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
      console.error("Error fetching companies:", error?.message || error);
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
      console.error(`Error fetching company ${id}:`, error?.message || error);
      return null;
    }
  }

  async create(companyData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      // Only include Updateable fields
      const params = {
        records: [
          {
            name_c: companyData.name_c || "",
            industry_c: companyData.industry_c || "",
            contact_count_c: companyData.contact_count_c || 0,
            created_at_c: new Date().toISOString()
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
          throw new Error(result.message || "Failed to create company");
        }
      }

      throw new Error("No response data");
    } catch (error) {
      console.error("Error creating company:", error?.message || error);
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
            industry_c: updateData.industry_c,
            contact_count_c: updateData.contact_count_c
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
          throw new Error(result.message || "Failed to update company");
        }
      }

      throw new Error("No response data");
    } catch (error) {
      console.error("Error updating company:", error?.message || error);
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
          throw new Error(result.message || "Failed to delete company");
        }
      }

      throw new Error("No response data");
    } catch (error) {
console.error("Error deleting company:", error?.message || error);
      throw error;
    }
  }
}

export const companyService = new CompanyService();