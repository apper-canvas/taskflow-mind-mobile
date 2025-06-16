import { motion } from 'framer-motion'
import SearchBar from '@/components/molecules/SearchBar'
import ProgressIndicator from '@/components/molecules/ProgressIndicator'

function Header({ searchQuery, onSearchChange, completionRate, totalTasks, completedTasks }) {
  return (
    <motion.header 
      className="bg-white border-b border-gray-200 px-6 py-4"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display text-gray-900">
            TaskFlow
          </h1>
          <p className="text-gray-600 mt-1">
            Organize your day, accomplish your goals
          </p>
        </div>
        
        <div className="flex items-center space-x-6">
          <SearchBar 
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search tasks..."
          />
          
          <ProgressIndicator
            completionRate={completionRate}
            totalTasks={totalTasks}
            completedTasks={completedTasks}
          />
        </div>
      </div>
    </motion.header>
  )
}

export default Header