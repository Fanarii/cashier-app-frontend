import React, { useState, useEffect } from 'react';
import StaffSidebar from '../components/StaffSidebar';
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleFinishOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/orders/${orderId}`, { status: 'completed' });
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
      getOrders()
    } catch (error) {
      console.error('error finishing order:', error);
    }
  };

  return (
    <div className='flex'>
      <StaffSidebar />
      <div className="p-4 bg-gray-100 w-full">
        <h1 className="text-2xl font-bold mb-4">Order List for Kitchen</h1>
        <div className="grid grid-cols-5 gap-4 mb-4 font-bold">
          <div>Customer</div>
          <div>Order ID</div>
          <div>Menu</div>
          <div>Price</div>
          <div>Action</div>
        </div>
        {orders.map((order) => (
          <div key={order.id} className="border p-4 mb-4 bg-white shadow-md rounded-xl">
            <div className="grid grid-cols-5 gap-4">
              <div>{order.customerName}</div>
              <div>{order.id}</div>
              <div>
                <ul>
                  {order.menu.map((menuItem) => (
                    <li key={menuItem.id}>
                      {menuItem.name} (x{menuItem.quantity})
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <ul className=''>
                  {order.menu.map((menuItem) => (
                    <li key={menuItem.id}>Rp. {menuItem.price * menuItem.quantity}</li>
                  ))}
                </ul>
              </div>
              <div>
                <button
                  onClick={() => handleFinishOrder(order.id)}
                  className="bg-red-400 text-white rounded-md p-2"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
