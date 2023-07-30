import React, { useState, useEffect } from 'react';
import StaffSidebar from '../components/StaffSidebar';
import axios from 'axios';

const MenuManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuList, setMenuList] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    file: null,
  });

  const [editingIndex, setEditingIndex] = useState(-1);
  const [isError, setIsError] = useState([]);

  const getMenus = async () => {
    const response = await axios.get('http://localhost:5000/menus');
    setMenuList(response.data);
  };

  useEffect(() => {
    getMenus();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'file') {
      if (files.length > 0) {
        setFormData((prevData) => ({
          ...prevData,
          file: files[0],
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setIsOpen(true);

    if (!formData.name) return setIsError([...isError, 'name']);
    if (!formData.price) return setIsError([...isError, 'price']);
    if (!formData.category) return setIsError([...isError, 'category']);
    if (!formData.stock) return setIsError([...isError, 'stock']);
    if (!formData.file) return setIsError([...isError, 'file']);

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('stock', formData.stock);
    formDataToSend.append('file', formData.file);

    try {
      await axios.post('http://localhost:5000/menus', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(formDataToSend);
      setFormData({ name: '', price: '', category: '', stock: '', file: null });
      getMenus();
    } catch (error) {
      console.error('Error adding menu:', error);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData({ ...menuList[index], image: null });
    setIsOpen(true)
  };

  const handleUpdate = async () => {
    try {
      const menuId = menuList[editingIndex].id;
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('stock', formData.stock);
      formDataToSend.append('file', formData.file);

      await axios.patch(`http://localhost:5000/menus/${menuId}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMenuList((prevList) => {
        const newList = [...prevList];
        newList[editingIndex] = formData;
        return newList;
      });

      setEditingIndex(-1);
      setFormData({ name: '', price: '', category: '', stock: '', file: null });
      setIsOpen(false);
    } catch (error) {
      console.log('Error updating menu:', error);
    }
  };

  const handleDelete = async (menuId) => {
    try {
      await axios.delete(`http://localhost:5000/menus/${menuId}`);
      getMenus();
    } catch (error) {
      console.log('Error deleting menu:', error);
    }
  };

  return (
    <div className='flex'>
      <StaffSidebar />
      <div className="p-4 bg-gray-100">
        <div className='flex justify-between'>
          <h1 className="text-2xl font-bold mb-4">Menu Management</h1>
          {editingIndex === -1 ? (
            <button onClick={handleAdd} className="mb-2 p-2 bg-blue-500 text-white rounded-md col-span-2">Add Menu</button>
          ) : (
            <button onClick={handleUpdate} className="mg-2 p-2 bg-blue-500 text-white rounded-md col-span-2">Update Menu</button>
          )}
        </div>
        <div className={`grid grid-cols-5 gap-4 mb-4 ${isOpen ? 'visible' : ''}`}>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="p-2 rounded-md" />
          <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="p-2 rounded-md" />
          <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="p-2 rounded-md" />
          <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} className="p-2 rounded-md" />
          <input type="file" name="file" onChange={handleChange} className={`${isError.includes('file') ? 'bordered bg-blue-200' : ''}`} />
        </div>
        <ul className='overflow-y-scroll max-h-[465px]'>
          {menuList.map((menu, index) => (
            <li key={menu.id} className="border p-2 mb-4 flex items-center rounded-xl bg-white shadow-md mr-2">
              <div className='h-25 w-[100px] rounded-xl mr-4 bg-fourth'>
                <img src={menu.url} alt={menu.name} className="w-22 h-20 mx-auto object-cover" />
              </div>
              <div className='flex-1 flex gap-5'>
                <div className="">
                  <h2 className="text-xl font-bold">{menu.name}</h2>
                  <p>Stock: {menu.stock} pcs</p>
                  <p>Category: {menu.category}</p>
                </div>
                <p className='my-auto'>Rp. {menu.price}</p>
              </div>

              <div>
                <button onClick={() => handleEdit(index)} className="p-2 bg-blue-500 text-white rounded-md mr-2">Edit</button>
                <button onClick={() => handleDelete(menu.id)} className="p-2 bg-red-500 text-white rounded-md">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuManagement;
