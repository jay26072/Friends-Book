// client/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Don't forget to import CSS

const App = () => {
    const [friend, setFriend] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [mobileno, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [editId, setEditId] = useState(null);

    // Fetch items from the backend
    const fetchFriend = async () => {
        const response = await axios.get('http://localhost:5000/api/items');
        setFriend(response.data);
    };

    useEffect(() => {
        fetchFriend();
    }, []);

    // Handle form submission for creating/updating items
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await axios.put(`http://localhost:5000/api/items/${editId}`, { name, email, dob, mobileno, password });
        } else {
            // Save the data to the backend
            if (!name || !email || !dob || !mobileno || !password) {
                alert('Please fill all fields');
                return;
            }
            await axios.post('http://localhost:5000/api/items', { name, email, dob, mobileno, password });
        }
        setName('');
        setEmail('');
        setDob('');
        setMobile('');
        setPassword('');
        setEditId(null);
        fetchFriend();
    };

    // Handle editing an item
    const handleEdit = (friend) => {
        setName(friend.name);
        setEmail(friend.email);
        setDob(friend.dob);
        setMobile(friend.mobileno);
        setPassword(friend.password);
        setEditId(friend._id);
    };

    // Handle deleting an item
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/items/${id}`);
        fetchFriend();
    };

    return (
        <div className="container">
            <div className="form-container">
                <h1>Friends Information</h1>
                <form onSubmit={handleSubmit}>
                    <label>Name: </label>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <br />
                    <label>Email: </label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <br />
                    <label>DOB: </label>
                    <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                    />
                    <br />
                    <label>Mobile No: </label>
                    <input
                        type="text"
                        placeholder="Mobile No"
                        value={mobileno}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                    />
                    <br />
                    <label>Password: </label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <br />
                    <button type="submit">{editId ? 'Update' : 'Add'}</button>
                </form>
            </div>

            <div className="list-container">
                <h2>Friend List</h2>
                <ul>
                    {friend.map((friend) => (
                        <li key={friend._id}>
                            <strong>{friend.name}</strong> : {friend.dob} : {friend.email} : {friend.mobileno} : {friend.password}
                            <br />
                            <button onClick={() => handleEdit(friend)}>Edit</button>
                            <button onClick={() => handleDelete(friend._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default App;
