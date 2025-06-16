import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

function CategoryItem({ category, isActive, taskCount, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className={`
        w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-150
        ${isActive 
          ? 'bg-white shadow-sm ring-1 ring-gray-200 text-gray-900' 
          : 'hover:bg-gray-100 text-gray-700'
        }
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center">
        {category.icon ? (
          <ApperIcon 
            name={category.icon} 
            size={18} 
            className="mr-3"
            style={{ color: category.color }}
          />
        ) : (
          <div 
            className="w-4 h-4 rounded-full mr-3"
            style={{ backgroundColor: category.color }}
          />
        )}
        <span className="font-medium text-sm">{category.name}</span>
      </div>
      
      {taskCount > 0 && (
        <span className={`
          text-xs px-2 py-1 rounded-full font-medium
          ${isActive 
            ? 'bg-gray-100 text-gray-600' 
            : 'bg-gray-200 text-gray-500'
          }
        `}>
          {taskCount}
        </span>
      )}
    </motion.button>
  )
}

export default CategoryItem