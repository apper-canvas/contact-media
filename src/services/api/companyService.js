import companiesData from "@/services/mockData/companies.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class CompanyService {
  constructor() {
    this.companies = [...companiesData];
  }

  async getAll() {
    await delay(300);
    return [...this.companies];
  }

  async getById(id) {
    await delay(200);
    const company = this.companies.find(company => company.Id === parseInt(id));
    return company ? { ...company } : null;
  }

  async create(companyData) {
    await delay(400);
    const maxId = this.companies.length > 0 
      ? Math.max(...this.companies.map(company => company.Id))
      : 0;
    
    const newCompany = {
      ...companyData,
      Id: maxId + 1,
      contactCount: 0,
      createdAt: new Date().toISOString()
    };
    
    this.companies.unshift(newCompany);
    return { ...newCompany };
  }

  async update(id, updateData) {
    await delay(400);
    const index = this.companies.findIndex(company => company.Id === parseInt(id));
    
    if (index === -1) {
      throw new Error("Company not found");
    }
    
    this.companies[index] = {
      ...this.companies[index],
      ...updateData,
      Id: parseInt(id)
    };
    
    return { ...this.companies[index] };
  }

  async delete(id) {
    await delay(300);
    const index = this.companies.findIndex(company => company.Id === parseInt(id));
    
    if (index === -1) {
      throw new Error("Company not found");
    }
    
    const deletedCompany = this.companies.splice(index, 1)[0];
    return { ...deletedCompany };
  }
}

export const companyService = new CompanyService();