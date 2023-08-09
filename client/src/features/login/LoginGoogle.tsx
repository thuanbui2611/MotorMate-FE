import { useEffect } from "react";

declare global {
  interface Window {
    google: any;
  }
}
export default function LoginGoogle() {
  useEffect(() => {
    const handleGoogleLoginSuccess = (response: any) => {
      // Handle the response here
      console.log(response);

      // Example: perform a POST request to send the data to your server
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(response),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from your server
          console.log(data);
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
    };

    const loadGoogleSignInScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      script.onload = () => {
        // Google Sign-In script loaded

        window.google.accounts.id.initialize({
          client_id:
            "248508653252-6vk23s9roilcu60b7c8053i6qmqikk9q.apps.googleusercontent.com",
          callback: handleGoogleLoginSuccess,
        });
      };

      return () => {
        // Cleanup function
        document.head.removeChild(script);
      };
    };

    loadGoogleSignInScript();
  }, []);
  return (
    <>
      <div className="">
        <div
          id="g_id_onload"
          data-client_id="248508653252-6vk23s9roilcu60b7c8053i6qmqikk9q.apps.googleusercontent.com"
          data-login_uri="http://localhost:3000/login"
        ></div>
        <div
          className="g_id_signin"
          data-type="standard"
          data-size="large"
          data-theme="outline"
          data-text="sign_in_with"
          data-shape="rectangular"
          data-logo_alignment="left"
        ></div>
      </div>
    </>
  );
}
