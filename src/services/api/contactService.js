import contactsData from "@/services/mockData/contacts.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ContactService {
  constructor() {
    this.contacts = [...contactsData];
  }

  async getAll() {
    await delay(300);
    return [...this.contacts];
  }

  async getById(id) {
    await delay(200);
    const contact = this.contacts.find(contact => contact.Id === parseInt(id));
    return contact ? { ...contact } : null;
  }

  async create(contactData) {
    await delay(400);
    const maxId = this.contacts.length > 0 
      ? Math.max(...this.contacts.map(contact => contact.Id))
      : 0;
    
    const newContact = {
      ...contactData,
      Id: maxId + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.contacts.unshift(newContact);
    return { ...newContact };
  }

  async update(id, updateData) {
    await delay(400);
    const index = this.contacts.findIndex(contact => contact.Id === parseInt(id));
    
    if (index === -1) {
      throw new Error("Contact not found");
    }
    
    this.contacts[index] = {
      ...this.contacts[index],
      ...updateData,
      Id: parseInt(id),
      updatedAt: new Date().toISOString()
    };
    
    return { ...this.contacts[index] };
  }

  async delete(id) {
    await delay(300);
    const index = this.contacts.findIndex(contact => contact.Id === parseInt(id));
    
    if (index === -1) {
      throw new Error("Contact not found");
    }
    
    const deletedContact = this.contacts.splice(index, 1)[0];
    return { ...deletedContact };
  }
}

export const contactService = new ContactService();