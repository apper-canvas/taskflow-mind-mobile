import { motion } from 'framer-motion'

function ProgressIndicator({ completionRate, totalTasks, completedTasks }) {
  return (
    <div className="flex items-center space-x-4">
      <div className="text-right">
        <div className="text-sm font-medium text-gray-900">
          {completedTasks} of {totalTasks} completed
        </div>
        <div className="text-xs text-gray-500">
          {completionRate}% complete
        </div>
      </div>
      
      <div className="relative w-16 h-16">
        {/* Background circle */}
        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="#E5E7EB"
            strokeWidth="4"
            fill="none"
          />
          {/* Progress circle */}
          <motion.circle
            cx="32"
            cy="32"
            r="28"
            stroke="url(#gradient)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={176}
            strokeDashoffset={176 - (176 * completionRate) / 100}
            initial={{ strokeDashoffset: 176 }}
            animate={{ strokeDashoffset: 176 - (176 * completionRate) / 100 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#7C3AED' }} />
              <stop offset="100%" style={{ stopColor: '#5B21B6' }} />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-gray-900">
            {completionRate}%
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProgressIndicator