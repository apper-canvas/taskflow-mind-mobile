import mockTasks from '@/services/mockData/tasks.json'
import { categoryService } from '@/services'

class TaskService {
  constructor() {
    this.tasks = this.loadTasks()
  }

  loadTasks() {
    const stored = localStorage.getItem('taskflow_tasks')
    if (stored) {
      return JSON.parse(stored)
    }
    // Initialize with mock data
    this.saveTasks(mockTasks)
    return [...mockTasks]
  }

  saveTasks(tasks) {
    localStorage.setItem('taskflow_tasks', JSON.stringify(tasks))
    this.tasks = tasks
  }

  async getAll() {
    await this.delay()
    return [...this.tasks]
  }

  async getById(id) {
    await this.delay()
    const task = this.tasks.find(t => t.Id === parseInt(id))
    return task ? { ...task } : null
  }

  async create(taskData) {
    await this.delay()
    const newTask = {
      Id: Math.max(0, ...this.tasks.map(t => t.Id)) + 1,
      title: taskData.title,
      completed: false,
      categoryId: taskData.categoryId || 'general',
      priority: taskData.priority || 'medium',
      dueDate: taskData.dueDate || null,
      createdAt: new Date().toISOString(),
      order: this.tasks.length
    }
    const updatedTasks = [...this.tasks, newTask]
    this.saveTasks(updatedTasks)
    return { ...newTask }
  }

  async update(id, updates) {
    await this.delay()
    const index = this.tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) throw new Error('Task not found')
    
    const updatedTask = { ...this.tasks[index], ...updates }
    const updatedTasks = [...this.tasks]
    updatedTasks[index] = updatedTask
    this.saveTasks(updatedTasks)
    return { ...updatedTask }
  }

  async delete(id) {
    await this.delay()
    const filteredTasks = this.tasks.filter(t => t.Id !== parseInt(id))
    this.saveTasks(filteredTasks)
    return true
  }

  async getByCategory(categoryId) {
    await this.delay()
    return this.tasks.filter(t => t.categoryId === categoryId).map(t => ({ ...t }))
  }

  async getOverdue() {
    await this.delay()
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return this.tasks.filter(t => {
      if (!t.dueDate || t.completed) return false
      const dueDate = new Date(t.dueDate)
      dueDate.setHours(0, 0, 0, 0)
      return dueDate < today
    }).map(t => ({ ...t }))
  }

  async getDueToday() {
    await this.delay()
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    return this.tasks.filter(t => {
      if (!t.dueDate) return false
      const dueDate = new Date(t.dueDate)
      dueDate.setHours(0, 0, 0, 0)
      return dueDate >= today && dueDate < tomorrow
    }).map(t => ({ ...t }))
  }

  async reorderTasks(taskIds) {
    await this.delay()
    const updatedTasks = this.tasks.map(task => {
      const newOrder = taskIds.findIndex(id => id === task.Id)
      return newOrder !== -1 ? { ...task, order: newOrder } : task
    })
    this.saveTasks(updatedTasks)
    return updatedTasks.map(t => ({ ...t }))
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, 200))
  }
}

export default new TaskService()