import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ProtectedPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Redirect to login page if no token is found
      router.push("/login");
    }
  }, [router]);

  return (
    <div>
      <h1>Welcome to the protected page!</h1>
    </div>
  );
};

export default ProtectedPage;
