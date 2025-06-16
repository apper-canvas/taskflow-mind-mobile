import { motion, AnimatePresence } from 'framer-motion'
import TaskCard from '@/components/molecules/TaskCard'

function TaskList({ tasks, categories, onUpdateTask, onDeleteTask }) {
  // Sort tasks: incomplete first, then by priority, then by due date, then by creation date
  const sortedTasks = [...tasks].sort((a, b) => {
    // Completed tasks go to bottom
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }
    
    // Priority order: high, medium, low
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    }
    
    // Due date (tasks with due dates first, then by date)
    if (a.dueDate && !b.dueDate) return -1
    if (!a.dueDate && b.dueDate) return 1
    if (a.dueDate && b.dueDate) {
      const dateA = new Date(a.dueDate)
      const dateB = new Date(b.dueDate)
      if (dateA.getTime() !== dateB.getTime()) {
        return dateA - dateB
      }
    }
    
    // Finally by creation date (newest first for same priority/due date)
    return new Date(b.createdAt) - new Date(a.createdAt)
  })

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {sortedTasks.map((task, index) => (
          <motion.div
            key={task.Id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ 
              duration: 0.2,
              delay: index * 0.05,
              layout: { duration: 0.2 }
            }}
          >
            <TaskCard
              task={task}
              category={categories.find(c => c.Id === task.categoryId)}
              onUpdate={(updates) => onUpdateTask(task.Id, updates)}
              onDelete={() => onDeleteTask(task.Id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default TaskList