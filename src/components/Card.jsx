import React, { useState } from "react";
import axios from "axios";

const Card = ({ account, isAccountInUse, onStaffButtonClick }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const handleLogin = async () => {
    if (isLoading || isLoggedIn) {
      return;
    }

    setIsLoading(true);
    setLoginError(null);

    try {
      const response = await axios.post("http://localhost:5000/user-login", {
        name: account.name,
      });

      if (response.data && response.data.success) {
        console.log("Login successful!");
        setIsLoggedIn(true);
        onStaffButtonClick(account.id);
      } else {
        console.log("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setLoginError("An error occurred during login. Please try again later.");
    }

    setIsLoading(false);
  };

  const buttonText = isLoggedIn ? "Sedang Digunakan" : "Masuk";

  return (
    <div className="border border-gray-300 bg-white rounded-md p-4">
      <h2 className="text-lg font-bold">{account.name}</h2>
      <p>Kapasitas: {account.capacity}</p>
      <button
        className={`mt-4 py-2 px-4 rounded-md ${
          isAccountInUse ? "cursor-not-allowed" : "bg-primary text-white"
        }`}
        onClick={handleLogin}
        disabled={isAccountInUse || isLoggedIn || isLoading}
      >
        {isLoading ? "Loading..." : loginError || buttonText}
      </button>
    </div>
  );
};

export default Card;
