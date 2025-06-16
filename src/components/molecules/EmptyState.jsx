import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

function EmptyState({ activeCategory, hasSearch }) {
  const getEmptyStateContent = () => {
    if (hasSearch) {
      return {
        icon: 'Search',
        title: 'No tasks found',
        description: 'Try adjusting your search terms or check a different category.',
        color: 'text-gray-400'
      }
    }

    switch (activeCategory) {
      case 'all':
        return {
          icon: 'Plus',
          title: 'No tasks yet',
          description: 'Create your first task to get started with TaskFlow.',
          color: 'text-secondary'
        }
      case 'today':
        return {
          icon: 'Calendar',
          title: 'Nothing due today',
          description: 'Enjoy your free day or add tasks with today\'s date.',
          color: 'text-blue-500'
        }
      case 'overdue':
        return {
          icon: 'CheckCircle',
          title: 'All caught up!',
          description: 'Great work! You have no overdue tasks.',
          color: 'text-green-500'
        }
      case 'completed':
        return {
          icon: 'Target',
          title: 'No completed tasks',
          description: 'Complete some tasks to see them here.',
          color: 'text-gray-400'
        }
      default:
        return {
          icon: 'FolderOpen',
          title: 'No tasks in this category',
          description: 'Add some tasks to this category to see them here.',
          color: 'text-gray-400'
        }
    }
  }

  const content = getEmptyStateContent()

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`p-4 rounded-full bg-gray-50 mb-4 ${content.color}`}>
        <ApperIcon name={content.icon} size={48} />
      </div>
      
      <h3 className="text-xl font-semibold font-display text-gray-900 mb-2">
        {content.title}
      </h3>
      
      <p className="text-gray-600 max-w-md">
        {content.description}
      </p>
      
      {activeCategory === 'all' && !hasSearch && (
        <motion.div
          className="mt-6 p-4 bg-gradient-primary rounded-lg text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <p className="font-medium mb-2">💡 Pro tip</p>
          <p className="text-sm opacity-90">
            Use the task input bar above to quickly add your first task!
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default EmptyState