export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
    return (
      <>
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
  
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform md:translate-x-0 md:relative md:w-64 z-50`}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b flex justify-between">
            <h2 className="text-lg font-semibold">Sanctuary Hospitals (Clinic)</h2>
            <button
              className="md:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              ✖️
            </button>
          </div>
  
          {/* Navigation */}
          <nav className="p-4 space-y-2">
            <a href="/dashboard" className="block p-2 rounded hover:bg-gray-200">
              🏠 Dashboard
            </a>
            <a href="/dashboard/patients" className="block p-2 rounded hover:bg-gray-200">
              🏥 Patients
            </a>
            <a href="/dashboard/appointments" className="block p-2 rounded hover:bg-gray-200">
              📅 Appointments
            </a>
            <a href="/dashboard/settings" className="block p-2 rounded hover:bg-gray-200">
              ⚙️ Settings
            </a>
          </nav>
        </aside>
      </>
    );
  }
  