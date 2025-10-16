import { getApperClient } from "@/services/apperClient";

class DealService {
  constructor() {
    this.tableName = "deal_c";
    this.fields = [
      { field: { Name: "title_c" } },
      { field: { Name: "value_c" } },
      { field: { Name: "status_c" } },
      { field: { Name: "contact_id_c" } },
      { field: { Name: "company_id_c" } },
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
      console.error("Error fetching deals:", error?.message || error);
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
      console.error(`Error fetching deal ${id}:`, error?.message || error);
      return null;
    }
  }

  async create(dealData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      // Only include Updateable fields, lookup fields as integers
      const params = {
        records: [
          {
            title_c: dealData.title_c || "",
            value_c: parseFloat(dealData.value_c) || 0,
            status_c: dealData.status_c || "Lead",
            contact_id_c: parseInt(dealData.contact_id_c) || null,
            company_id_c: parseInt(dealData.company_id_c) || null,
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
          throw new Error(result.message || "Failed to create deal");
        }
      }

      throw new Error("No response data");
    } catch (error) {
      console.error("Error creating deal:", error?.message || error);
      throw error;
    }
  }

  async update(id, updateData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      // Only include Updateable fields, lookup fields as integers
      const params = {
        records: [
          {
            Id: parseInt(id),
            title_c: updateData.title_c,
            value_c: parseFloat(updateData.value_c),
            status_c: updateData.status_c,
            contact_id_c: parseInt(updateData.contact_id_c),
            company_id_c: parseInt(updateData.company_id_c)
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
          throw new Error(result.message || "Failed to update deal");
        }
      }

      throw new Error("No response data");
    } catch (error) {
      console.error("Error updating deal:", error?.message || error);
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
          throw new Error(result.message || "Failed to delete deal");
        }
      }

      throw new Error("No response data");
    } catch (error) {
      console.error("Error deleting deal:", error?.message || error);
      throw error;
    }
  }
}

export const dealService = new DealService();