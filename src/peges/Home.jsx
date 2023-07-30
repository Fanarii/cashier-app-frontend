import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Menu from "../components/Menu";
import Order from "../components/Order";
import axios from "axios";

const Home = () => {
  const [selectedMenus, setSelectedMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [customerName, setCustomerName] = useState('');
  
  const addToOrder = (menu) => {
    const existingMenu = selectedMenus.find((selectedMenu) => selectedMenu.id === menu.id);
  
    if (existingMenu) {
      const updatedMenus = selectedMenus.map((selectedMenu) =>
        selectedMenu.id === menu.id ? { ...selectedMenu, quantity: selectedMenu.quantity + 1 } : selectedMenu
      );
      setSelectedMenus(updatedMenus);
    } else {
      setSelectedMenus((prevSelectedMenus) => [...prevSelectedMenus, { ...menu, quantity: 1 }]);
    }
  };  

  const removeFromOrder = (menuId, quantity) => {
    if (quantity === 0) {
      setSelectedMenus((prevSelectedMenus) => prevSelectedMenus.filter((selectedMenu) => selectedMenu.id !== menuId));
    } else {
      const updatedMenus = selectedMenus.map((selectedMenu) =>
        selectedMenu.id === menuId ? { ...selectedMenu, quantity } : selectedMenu
      );
      setSelectedMenus(updatedMenus);
    }
  };
  
  const handleCharge = async () => {
    if (selectedMenus.length === 0) {
      alert("Please select at least one menu");
      return;
    }

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    selectedMenus.forEach((menu) => {
      totalPrice += menu.price * menu.quantity;
    });
    return totalPrice;
  };

  const confirmCharge = async () => {
    setShowModal(false);
    setIsLoading(true);

    try {
      const totalAmount = calculateTotalPrice();

      const order = {
        customerName: customerName,
        totalAmount: totalAmount,
        menu: selectedMenus.map((menu) => ({
          id: menu.id,
          name: menu.name,
          price: menu.price,
          category: menu.category,
          quantity: menu.quantity,
          file: menu.file,
          url: menu.url,
          stock: menu.stock
        })),
      };

      console.log(order);

      await axios.post("http://localhost:5000/orders", order);
      alert("Order created successfully");
      setSelectedMenus([]);
    } catch (error) {
      alert("Failed to create order");
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex bg-gray-100">
      <Sidebar activePage="/" />
      <Menu addToOrder={addToOrder} />
      <Order
        selectedMenus={selectedMenus}
        onMenuQuantityChange={removeFromOrder}
        isLoading={isLoading}
        onCharge={handleCharge}
        calculateTotalPrice={calculateTotalPrice}
        setCustomerName={setCustomerName}
      />
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-75 bg-black">
          <div className="bg-white p-5 rounded-xl">
            <p>Apakah Anda yakin ingin melakukan charge?</p>
            <div className="mt-4 flex justify-center">
              <button
                className="bg-gray-200 rounded-lg px-4 py-2 mr-2"
                onClick={closeModal}
              >
                Batal
              </button>
              <button
                className={`bg-primary rounded-lg px-4 py-2 text-white`}
                onClick={confirmCharge}
              >
                Ya, Charge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
