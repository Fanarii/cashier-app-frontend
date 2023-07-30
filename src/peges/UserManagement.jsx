import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StaffSidebar from '../components/StaffSidebar';

const UserManagement = () => {
    const [userList, setUserList] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        role: ''
    });
    const [editingUserId, setEditingUserId] = useState(null);

    const getUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users');
            setUserList(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users', formData);
            setFormData({ name: '', email: '', role: '' });
            getUsers();
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleEdit = (userId) => {
        const userToEdit = userList.find((user) => user.id === userId);
        setFormData({
            name: userToEdit.name,
            role: userToEdit.role
        });
        setEditingUserId(userId);
    };

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            await axios.patch(`http://localhost:5000/users/${editingUserId}`, formData);
            setFormData({ name: '', role: '' });
            setEditingUserId(null);
            getUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/users/${userId}`);
            getUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className='flex'>
            <StaffSidebar />
            <div className='p-4 bg-gray-100 w-full'>
                <h1 className='text-2xl font-bold mb-4'>User Management</h1>
                <form onSubmit={editingUserId !== null ? handleUpdate : handleAdd} className='grid grid-cols-3 gap-4 mb-4'>
                    <input
                        type='text'
                        name='name'
                        placeholder='Name'
                        value={formData.name}
                        onChange={handleChange}
                        className='p-2 rounded-md'
                    />
                    <input
                        type='text'
                        name='role'
                        placeholder='Role'
                        value={formData.role}
                        onChange={handleChange}
                        className='p-2 rounded-md'
                    />
                    <button type='submit' className='p-2 bg-blue-500 text-white rounded-md'>
                        {editingUserId !== null ? 'Update User' : 'Add User'}
                    </button>
                </form>
                <ul className='overflow-y-scroll max-h-[465px]'>
                    {userList.map((user) => (
                        <li key={user.id} className='border p-2 mb-4 flex items-center rounded-xl bg-white shadow-md mr-2'>
                            <div className='flex-1 flex gap-5'>
                                <div className=''>
                                    <h2 className='text-xl font-bold'>{user.name}</h2>
                                    <p>Role: {user.role}</p>
                                </div>
                            </div>
                            <div>
                                <button onClick={() => handleEdit(user.id)} className='p-2 bg-blue-500 text-white rounded-md mr-2'>
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(user.id)} className='p-2 bg-red-500 text-white rounded-md'>
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserManagement;
