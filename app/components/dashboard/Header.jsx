import { useRouter } from "next/navigation";

export default function Header({ setSidebarOpen }) {
  const router = useRouter();

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");

    // Redirect to login page
    router.push("/login");
  };

  return (
    <header className="bg-white shadow-md p-4 flex items-center justify-between">
      <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
        📖 Menu
      </button>

      <h1 className="text-lg font-semibold">Dashboard</h1>

      <div className="flex items-center space-x-3">
        <span>👤 User</span>
        <button className="text-red-500" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
