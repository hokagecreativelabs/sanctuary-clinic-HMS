export default function Header({ setSidebarOpen }) {
    const handleLogout = () => {
      // Remove token from localStorage
      localStorage.removeItem("token");
  
      // Redirect to login page
      window.location.href = "/login";
    };
  
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
          <button
            className="text-red-500"
            onClick={handleLogout} // Call logout on click
          >
            Logout
          </button>
        </div>
      </header>
    );
  }
  