import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format, isToday, isPast, parseISO } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'

function TaskCard({ task, category, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)

  const handleToggleComplete = () => {
    onUpdate({ completed: !task.completed })
  }

  const handleSaveEdit = () => {
    if (editTitle.trim() && editTitle !== task.title) {
      onUpdate({ title: editTitle.trim() })
    }
    setIsEditing(false)
    setEditTitle(task.title)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditTitle(task.title)
  }

  const getDueDateStatus = () => {
    if (!task.dueDate) return null
    const dueDate = parseISO(task.dueDate)
    
    if (isPast(dueDate) && !isToday(dueDate) && !task.completed) {
      return { status: 'overdue', color: 'text-red-600', bg: 'bg-red-50' }
    }
    if (isToday(dueDate)) {
      return { status: 'today', color: 'text-blue-600', bg: 'bg-blue-50' }
    }
    return { status: 'upcoming', color: 'text-gray-600', bg: 'bg-gray-50' }
  }

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high': return 'border-red-500'
      case 'medium': return 'border-amber-500'
      case 'low': return 'border-green-500'
      default: return 'border-gray-300'
    }
  }

  const dueDateStatus = getDueDateStatus()

  return (
    <motion.div
      layout
      className={`
        bg-white rounded-lg border-l-4 shadow-sm hover:shadow-md transition-all duration-150 hover:scale-102
        ${getPriorityColor()}
        ${task.completed ? 'opacity-60' : ''}
      `}
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="p-4">
        <div className="flex items-start space-x-3">
          {/* Checkbox */}
          <motion.button
            onClick={handleToggleComplete}
            className={`
              mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
              ${task.completed 
                ? 'bg-gradient-primary border-transparent text-white' 
                : 'border-gray-300 hover:border-secondary'
              }
            `}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence>
              {task.completed && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center justify-center"
                >
                  <ApperIcon name="Check" size={12} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onBlur={handleSaveEdit}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveEdit()
                    if (e.key === 'Escape') handleCancelEdit()
                  }}
                  className="flex-1 text-gray-900 font-medium bg-transparent border-none outline-none focus:ring-2 focus:ring-secondary rounded px-2 py-1"
                  autoFocus
                />
              </div>
            ) : (
              <div className="space-y-2">
                <h3 
                  className={`
                    font-medium cursor-pointer hover:text-secondary transition-colors duration-150
                    ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}
                  `}
                  onClick={() => setIsEditing(true)}
                >
                  {task.title}
                </h3>
                
                <div className="flex items-center space-x-4 text-sm">
                  {/* Category */}
                  {category && (
                    <div className="flex items-center space-x-1">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-gray-600">{category.name}</span>
                    </div>
                  )}
                  
                  {/* Priority */}
                  <span className={`
                    px-2 py-1 rounded text-xs font-medium
                    ${task.priority === 'high' ? 'text-red-600 bg-red-50' : ''}
                    ${task.priority === 'medium' ? 'text-amber-600 bg-amber-50' : ''}
                    ${task.priority === 'low' ? 'text-green-600 bg-green-50' : ''}
                  `}>
                    {task.priority}
                  </span>
                  
                  {/* Due Date */}
                  {task.dueDate && dueDateStatus && (
                    <span className={`
                      px-2 py-1 rounded text-xs font-medium
                      ${dueDateStatus.color} ${dueDateStatus.bg}
                    `}>
                      {dueDateStatus.status === 'today' && 'Due today'}
                      {dueDateStatus.status === 'overdue' && 'Overdue'}
                      {dueDateStatus.status === 'upcoming' && format(parseISO(task.dueDate), 'MMM d')}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-150"
            >
              <ApperIcon name="Edit2" size={14} />
            </button>
            <button
              onClick={onDelete}
              className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-150"
            >
              <ApperIcon name="Trash2" size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskCard