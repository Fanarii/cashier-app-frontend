import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AccountList from "../components/AccountList";
import Sidebar from "../components/Sidebar";

const Settings = () => {
  const [staffPassword, setStaffPassword] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isStaffPasswordIncorrect, setIsStaffPasswordIncorrect] = useState(
    false
  );

  const navigate = useNavigate();

  useEffect(() => {
    getAccount();
  }, []);

  const getAccount = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      const staff = response.data.filter((user) => user.role === "staff");

      if (staff.length > 0) {
        setStaffPassword(staff[0].staffPassword);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStaffPasswordSubmit = () => {
    if (inputPassword === staffPassword) {
      setIsStaffPasswordIncorrect(false);
      setInputPassword("");
      navigate("/staff");
    } else {
      setIsStaffPasswordIncorrect(true);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="container mx-auto p-4 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Pilih Meja</h1>
        <div className="mb-8 overflow-y-scroll max-h-[400px]">
          <p className="text-lg mx-2">Pilih meja untuk pesan:</p>
          <AccountList />
        </div>
        <div className="border-t border-gray-300 pt-4">
          <p className="text-lg">Saya sorang staff:</p>
          <input
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded mb-2"
          />
          {isStaffPasswordIncorrect && (
            <p className="text-red-500 text-sm mb-2">Password salah</p>
          )}
          <button
            onClick={handleStaffPasswordSubmit}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
