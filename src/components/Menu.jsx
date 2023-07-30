import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ReactComponent as AllIcon } from '../icons/all.svg';
import { ReactComponent as FoodIcon } from '../icons/food.svg';
import { ReactComponent as DrinksIcon } from '../icons/drinks.svg';
import { ReactComponent as CoffeeIcon } from '../icons/coffee.svg';

const Menu = ({ addToOrder }) => {
  const [activeButton, setActiveButton] = useState('all');
  const [menus, setMenus] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);

  const handleButtonClick = (category) => {
    setActiveButton(category);
    filterMenus(category);
  };

  const filterMenus = (category) => {
    if (category === 'all') {
      setFilteredMenus(menus);
    } else {
      const filtered = menus.filter((menu) => menu.category === category);
      setFilteredMenus(filtered);
    }
  };

  const addToOrderHandler = (menu) => {
    addToOrder(menu);
  };

  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = async () => {
    try {
      const response = await axios.get('http://localhost:5000/menus');
      setMenus(response.data);
      setFilteredMenus(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='m-5 mx-[20px] w-[830px] mx-auto'>
      <div>
        <h1 className='text-[25px]'>
          <span className='font-bold'>Menu</span> Category
        </h1>
        <div className='mt-3 flex'>
          <button
            className={`bg-white h-[100px] w-20 rounded-xl flex flex-col items-center justify-center py-1 ${
              activeButton === 'all' ? 'bg-fivth shadow-xl' : ''
            }`}
            onClick={() => handleButtonClick('all')}
          >
            <div
              className={`rounded-xl outline outline-1 h-[62px] w-[62px] flex items-center justify-center mx-auto text-secondary ${
                activeButton === 'all' ? 'bg-white' : ''
              }`}
            >
              <AllIcon
                className={`w-8 h-8 fill-current ${
                  activeButton === 'all' ? 'text-black' : ''
                }`}
              />
            </div>
            <p className={`${activeButton === 'all' ? 'text-black' : 'text-secondary'} mt-1`}>
              All
            </p>
          </button>
          <button
            className={`bg-white h-[100px] w-20 rounded-xl ml-5 flex flex-col items-center justify-center ${
              activeButton === 'food' ? 'bg-fivth shadow-xl' : ''
            }`}
            onClick={() => handleButtonClick('food')}
          >
            <div
              className={`rounded-xl outline outline-1 h-[62px] w-[62px] mx-auto flex items-center justify-center text-secondary ${
                activeButton === 'food' ? 'bg-white' : ''
              }`}
            >
              <FoodIcon
                className={`w-8 h-8 fill-current ${
                  activeButton === 'food' ? 'text-black' : ''
                }`}
              />
            </div>
            <p className={`${activeButton === 'food' ? 'text-black ' : 'text-secondary'}`}>Food</p>
          </button>
          <button
            className={`bg-white h-[100px] w-20 rounded-xl ml-5 flex flex-col items-center justify-center ${
              activeButton === 'drinks' ? 'bg-fivth shadow-xl' : ''
            }`}
            onClick={() => handleButtonClick('drinks')}
          >
            <div
              className={`rounded-xl outline outline-1 h-[62px] w-[62px] outline outline-1 mx-auto flex items-center justify-center text-secondary ${
                activeButton === 'drinks' ? 'bg-white' : ''
              }`}
            >
              <DrinksIcon
                className={`w-8 h-8 fill-current ${
                  activeButton === 'drinks' ? 'text-black' : ''
                }`}
              />
            </div>
            <p className={`${activeButton === 'drinks' ? 'text-black' : 'text-secondary'}`}>
              Drinks
            </p>
          </button>
          <button
            className={`bg-white h-[100px] w-20 rounded-xl ml-5 flex flex-col items-center justify-center ${
              activeButton === 'coffee' ? 'bg-fivth shadow-xl' : ''
            }`}
            onClick={() => handleButtonClick('coffee')}
          >
            <div
              className={`rounded-xl outline outline-1 h-[62px] w-[62px] outline outline-1 mx-auto flex items-center justify-center text-secondary ${
                activeButton === 'coffee' ? 'bg-white' : ''
              }`}
            >
              <CoffeeIcon
                className={`w-8 h-8 fill-current ${
                  activeButton === 'coffee' ? 'text-black' : ''
                }`}
              />
            </div>
            <p className={`${activeButton === 'coffee' ? 'text-black' : 'text-secondary'}`}>
              Coffee
            </p>
          </button>
        </div>
      </div>
      <div>
        <div className='flex mt-4 justify-between'>
          <h1 className='text-[25px]'>
            <span className='font-bold'>Choose</span> Order
          </h1>
          <h1 className='mt-3'>
            Sort By <span className='font-bold cursor-pointer'>None</span>
          </h1>
        </div>
        <div className='h-[340px] grid grid-cols-6 mt-2 gap-1'>
          {filteredMenus.map((menu) => (
            <button
              className='bg-white w-[120px] h-[160px] rounded-xl flex flex-col items-center justify-center'
              key={menu.id}
              onClick={() => addToOrderHandler(menu)}
            >
              <div className='rounded-full bg-fourth h-[80px] w-[80px] mx-auto my-2'>
                <img src={menu.url} alt='Images' />
              </div>
              <p className='text-black text-[13px] mt-2'>{menu.name}</p>
              <p className='text-secondary text-[13px]'>Rp. {menu.price}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
