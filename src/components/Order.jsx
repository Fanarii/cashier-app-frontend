import React, { useState } from 'react';
import { ReactComponent as MinIcon } from '../icons/min.svg';

const Order = ({ selectedMenus, onMenuQuantityChange, onCharge }) => {
    const [customerNamee, setCustomerNamee] = useState('');

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        selectedMenus.forEach((menu) => {
            totalPrice += menu.price * menu.quantity;
        });
        return totalPrice;
    };

    const handleMenuQuantityChange = (menuId, newQuantity) => {
        if (newQuantity >= 0) {
            onMenuQuantityChange(menuId, newQuantity);
        }
    };

    const handleCharge = () => {
        const order = {
          customerName: customerNamee,
          selectedMenus: selectedMenus,
          totalAmount: calculateTotalPrice(),
          quantity: selectedMenus.map((menu) => menu.quantity)
        };
    
        onCharge(order);
      };

    return (
        <div className='bg-white h-screen w-[320px]'>
            <div className='m-5'>
                <h1 className='text-[25px]'>
                    <span className='font-bold'>Your</span> Order
                </h1>
                <div className='mt-5 h-[350px]'>
                    {selectedMenus.map((menu) => (
                        <div key={menu.id} className='rounded-xl py-3 mt-1 flex mx-auto'>
                            <div className='bg-fourth h-[55px] w-[90px] rounded-xl'>
                                <img src={menu.url} alt='images' className='w-[55px] mx-auto object-cover' />
                            </div>
                            <div className='flex w-[200px] justify-between'>
                                <div className='ml-3'>
                                    <p className='text-black text-[15px]'>{menu.name}</p>
                                    <p className='text-secondary text-[12px]'>Rp. {menu.price}</p>
                                    <p className='text-[10px] text-secondary'>
                                        {menu.quantity}x Rp. {menu.price * menu.quantity}
                                    </p>
                                </div>
                                <button
                                    className='bg-white text-black rounded-xl h-10 w-10 my-auto mr-5'
                                    onClick={() => handleMenuQuantityChange(menu.id, menu.quantity - 1)}
                                >
                                    <MinIcon className='my-auto h-8 mr-[60px]' />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <hr className='mt-5' />
                <div className="flex items-center mb-3">
                    <p className="mr-2">Atas Nama:</p>
                    <input
                        type='text'
                        placeholder='isi nama anda...'
                        value={customerNamee}
                        onChange={(e) => setCustomerNamee(e.target.value)}
                        className='rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                    />
                </div>
                <button
                    className='bg-primary rounded-xl w-[250px] h-[55px] relative left-7 top-4 shadow-lg'
                    onClick={handleCharge}
                    disabled={selectedMenus.length === 0}
                >
                    <p className='text-white'>Charge Rp. {calculateTotalPrice()}</p>
                </button>
            </div>
        </div>
    );
};

export default Order;
