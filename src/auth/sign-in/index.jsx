import { SignIn, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import axios from "axios";

function SignInPage() {
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    const syncUser = async () => {
      if (!isSignedIn || !user) return;

      try {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/clerk-sync`,
          {
            email: user.primaryEmailAddress.emailAddress,
            username: user.username || user.fullName,
            clerkId: user.id,
          },
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_KEY}`,
            },
          }
        );

        console.log("✅ User synced with Strapi");
      } catch (err) {
        console.error("❌ Clerk sync failed:", err);
      }
    };

    syncUser();
  }, [isSignedIn, user]);

  return (
    <div className="flex justify-center my-20 items-center">
      <SignIn />
    </div>
  );
}

export default SignInPage;
