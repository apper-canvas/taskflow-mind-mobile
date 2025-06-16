import mockCategories from '@/services/mockData/categories.json'

class CategoryService {
  constructor() {
    this.categories = this.loadCategories()
  }

  loadCategories() {
    const stored = localStorage.getItem('taskflow_categories')
    if (stored) {
      return JSON.parse(stored)
    }
    // Initialize with mock data
    this.saveCategories(mockCategories)
    return [...mockCategories]
  }

  saveCategories(categories) {
    localStorage.setItem('taskflow_categories', JSON.stringify(categories))
    this.categories = categories
  }

  async getAll() {
    await this.delay()
    return [...this.categories]
  }

  async getById(id) {
    await this.delay()
    const category = this.categories.find(c => c.Id === id)
    return category ? { ...category } : null
  }

  async create(categoryData) {
    await this.delay()
    const newCategory = {
      Id: Math.max(0, ...this.categories.map(c => c.Id)) + 1,
      name: categoryData.name,
      color: categoryData.color,
      order: this.categories.length
    }
    const updatedCategories = [...this.categories, newCategory]
    this.saveCategories(updatedCategories)
    return { ...newCategory }
  }

  async update(id, updates) {
    await this.delay()
    const index = this.categories.findIndex(c => c.Id === parseInt(id))
    if (index === -1) throw new Error('Category not found')
    
    const updatedCategory = { ...this.categories[index], ...updates }
    const updatedCategories = [...this.categories]
    updatedCategories[index] = updatedCategory
    this.saveCategories(updatedCategories)
    return { ...updatedCategory }
  }

  async delete(id) {
    await this.delay()
    const filteredCategories = this.categories.filter(c => c.Id !== parseInt(id))
    this.saveCategories(filteredCategories)
    return true
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, 200))
  }
}

export default new CategoryService()