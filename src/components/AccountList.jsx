import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      const customer = response.data.filter((user) => user.role === "customer");
      setAccounts(customer);
      setIsLoading(false);
    } catch (error) {
      setError("Error fetching accounts. Please try again later.");
      setIsLoading(false);
    }
  };

  const handleStaffButtonClick = async (accountId) => {
    try {
      await axios.patch(`http://localhost:5000/users/${accountId}`, { isUsed: true });
      setAccounts((prevAccounts) =>
        prevAccounts.map((account) =>
          account.id === accountId ? { ...account, isUsed: true } : account
        )
      );
    } catch (error) {
      setError("Error updating account. Please try again later.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {accounts.map((account) => (
        <Card
          key={account.id}
          account={account}
          isAccountInUse={account.isUsed}
          onStaffButtonClick={handleStaffButtonClick}
        />
      ))}
    </div>
  );
};

export default AccountList;
