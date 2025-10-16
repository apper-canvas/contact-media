import dealsData from "@/services/mockData/deals.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class DealService {
  constructor() {
    this.deals = [...dealsData];
  }

  async getAll() {
    await delay(300);
    return [...this.deals];
  }

  async getById(id) {
    await delay(200);
    const deal = this.deals.find(deal => deal.Id === parseInt(id));
    return deal ? { ...deal } : null;
  }

  async create(dealData) {
    await delay(400);
    const maxId = this.deals.length > 0 
      ? Math.max(...this.deals.map(deal => deal.Id))
      : 0;
    
    const newDeal = {
      ...dealData,
      Id: maxId + 1,
      createdAt: new Date().toISOString()
    };
    
    this.deals.unshift(newDeal);
    return { ...newDeal };
  }

  async update(id, updateData) {
    await delay(400);
    const index = this.deals.findIndex(deal => deal.Id === parseInt(id));
    
    if (index === -1) {
      throw new Error("Deal not found");
    }
    
    this.deals[index] = {
      ...this.deals[index],
      ...updateData,
      Id: parseInt(id)
    };
    
    return { ...this.deals[index] };
  }

  async delete(id) {
    await delay(300);
    const index = this.deals.findIndex(deal => deal.Id === parseInt(id));
    
    if (index === -1) {
      throw new Error("Deal not found");
    }
    
    const deletedDeal = this.deals.splice(index, 1)[0];
    return { ...deletedDeal };
  }
}

export const dealService = new DealService();