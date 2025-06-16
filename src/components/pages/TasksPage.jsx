import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { taskService, categoryService } from '@/services'
import { toast } from 'react-toastify'
import Header from '@/components/organisms/Header'
import CategorySidebar from '@/components/organisms/CategorySidebar'
import TaskList from '@/components/organisms/TaskList'
import TaskInputBar from '@/components/molecules/TaskInputBar'
import EmptyState from '@/components/molecules/EmptyState'

function TasksPage() {
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ])
      setTasks(tasksData)
      setCategories(categoriesData)
    } catch (err) {
      setError('Failed to load data')
      toast.error('Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData)
      setTasks(prev => [...prev, newTask])
      toast.success('Task created successfully!')
    } catch (err) {
      toast.error('Failed to create task')
    }
  }

  const handleUpdateTask = async (id, updates) => {
    try {
      const updatedTask = await taskService.update(id, updates)
      setTasks(prev => prev.map(task => 
        task.Id === id ? updatedTask : task
      ))
      if (updates.completed !== undefined) {
        toast.success(updates.completed ? 'Task completed!' : 'Task reopened')
      }
    } catch (err) {
      toast.error('Failed to update task')
    }
  }

  const handleDeleteTask = async (id) => {
    try {
      await taskService.delete(id)
      setTasks(prev => prev.filter(task => task.Id !== id))
      toast.success('Task deleted')
    } catch (err) {
      toast.error('Failed to delete task')
    }
  }

  const handleCreateCategory = async (categoryData) => {
    try {
      const newCategory = await categoryService.create(categoryData)
      setCategories(prev => [...prev, newCategory])
      toast.success('Category created!')
    } catch (err) {
      toast.error('Failed to create category')
    }
  }

  const filteredTasks = tasks.filter(task => {
    const matchesCategory = activeCategory === 'all' || 
      activeCategory === 'completed' && task.completed ||
      activeCategory === 'today' && isToday(task.dueDate) ||
      activeCategory === 'overdue' && isOverdue(task.dueDate, task.completed) ||
      task.categoryId === activeCategory

    const matchesSearch = !searchQuery || 
      task.title.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  const isToday = (dueDate) => {
    if (!dueDate) return false
    const today = new Date()
    const due = new Date(dueDate)
    return today.toDateString() === due.toDateString()
  }

  const isOverdue = (dueDate, completed) => {
    if (!dueDate || completed) return false
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const due = new Date(dueDate)
    due.setHours(0, 0, 0, 0)
    return due < today
  }

  const getTaskCounts = () => {
    return {
      all: tasks.length,
      completed: tasks.filter(t => t.completed).length,
      today: tasks.filter(t => isToday(t.dueDate)).length,
      overdue: tasks.filter(t => isOverdue(t.dueDate, t.completed)).length,
      ...Object.fromEntries(
        categories.map(cat => [
          cat.Id,
          tasks.filter(t => t.categoryId === cat.Id).length
        ])
      )
    }
  }

  const completionRate = tasks.length > 0 
    ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)
    : 0

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        completionRate={completionRate}
        totalTasks={tasks.length}
        completedTasks={tasks.filter(t => t.completed).length}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <CategorySidebar
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onCreateCategory={handleCreateCategory}
          taskCounts={getTaskCounts()}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <TaskInputBar
              categories={categories}
              onCreateTask={handleCreateTask}
            />
          </div>
          
          <div className="flex-1 overflow-auto p-6">
            <AnimatePresence mode="wait">
              {filteredTasks.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <EmptyState 
                    activeCategory={activeCategory}
                    hasSearch={!!searchQuery}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="tasks"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <TaskList
                    tasks={filteredTasks}
                    categories={categories}
                    onUpdateTask={handleUpdateTask}
                    onDeleteTask={handleDeleteTask}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TasksPage