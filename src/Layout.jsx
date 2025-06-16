import { Outlet } from 'react-router-dom'

function Layout() {
  // Single page app - no complex routing needed
  return (
    <div className="min-h-screen bg-white">
      <Outlet />
    </div>
  )
}

export default Layout