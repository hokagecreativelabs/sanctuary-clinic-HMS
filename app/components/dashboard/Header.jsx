export default function Header({ setSidebarOpen }) {
    return (
      <header className="bg-white shadow-md p-4 flex items-center justify-between">
        {/* Menu Button (Mobile) */}
        <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
          📖 Menu
        </button>
  
        {/* Page Title */}
        <h1 className="text-lg font-semibold">Dashboard</h1>
  
        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <span>👤 User</span>
          <button className="text-red-500">Logout</button>
        </div>
      </header>
    );
  }
  