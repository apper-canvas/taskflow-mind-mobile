import { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import { format } from 'date-fns'

function TaskInputBar({ categories, onCreateTask }) {
  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState('work')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')
  const [showDetails, setShowDetails] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim()) {
      onCreateTask({
        title: title.trim(),
        categoryId,
        priority,
        dueDate: dueDate || null
      })
      setTitle('')
      setDueDate('')
      setShowDetails(false)
    }
  }

  const priorityColors = {
    high: 'text-red-600 bg-red-50',
    medium: 'text-amber-600 bg-amber-50',
    low: 'text-green-600 bg-green-50'
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-gray-200 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a new task..."
              className="w-full text-lg placeholder-gray-400 border-none outline-none bg-transparent"
            />
          </div>
          
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className={`
              p-2 rounded-lg transition-all duration-150
              ${showDetails ? 'bg-secondary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
            `}
          >
            <ApperIcon name="Settings" size={18} />
          </button>
          
          <button
            type="submit"
            disabled={!title.trim()}
            className="bg-gradient-primary text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Add Task
          </button>
        </div>
        
        {showDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-4 pt-4 border-t border-gray-100"
          >
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-secondary focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category.Id} value={category.Id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-secondary focus:border-transparent"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.form>
  )
}

export default TaskInputBar