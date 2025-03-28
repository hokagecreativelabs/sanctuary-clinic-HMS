import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext"; // Import AuthContext

const ProtectedPage = () => {
  const router = useRouter();
  const { token } = useAuth(); // Get token from context

  useEffect(() => {
    if (!token) {
      // Redirect to login page if no token is found
      router.push("/login");
    }
  }, [token, router]);

  return (
    <div>
      <h1>Welcome to the protected page!</h1>
    </div>
  );
};

export default ProtectedPage;
