import React, { useState, useEffect } from "react";
const baseUrl = process.env.REACT_APP_BACKEND_URL;


const UserUpdate = ({ isOpen, onClose, rowData }) => {
    const [name, setName] = useState(rowData ? rowData.name : "");
    const [phone, setPhone] = useState(rowData ? rowData.phone : "");
    const [email, setEmail] = useState(rowData ? rowData.email : "");
    const [hobbies, setHobbies] = useState(rowData ? rowData.hobbies : "");

    useEffect(() => {
        if (rowData) {
            setName(rowData.name);
            setPhone(rowData.phone);
            setEmail(rowData.email);
            setHobbies(rowData.hobbies);
        }
    }, [rowData]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const updatedUser = {
            name: name,
            phone: phone,
            email: email,
            hobbies: hobbies
        };
    
        fetch(`${baseUrl}/updateUser/${rowData._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update user data');
            }
            return response.json();
        })
        .then(data => {
            console.log('User data updated successfully:', data);
            onClose(); 
        })
        .catch(error => {
            console.error('Error updating user data:', error);
        });
    };

    return isOpen && (
        <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-70">
            <div className="p-10 pl-10 pr-10 bg-blue-500 rounded-md">
            <button className="absolute top-2 right-2 text-white size-10" onClick={onClose}>X</button>
                <div className="text-2xl mb-4">
                    <h2>Update User</h2>
                </div>
                <form onSubmit={onSubmitHandler}>
                    <label htmlFor="name">Name:</label><br />
                    <input className="rounded-md p-1" type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)} required /><br />

                    <label htmlFor="phoneNumber">Phone number:</label><br />
                    <input className="rounded-md p-1" type="text" id="phoneNumber" name="phoneNumber" value={phone} onChange={e => setPhone(e.target.value)} required /><br />

                    <label htmlFor="email">Email:</label><br />
                    <input className="rounded-md p-1" type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required /><br />

                    <label htmlFor="hobbies">Hobbies:</label><br />
                    <textarea className="rounded-md p-1 w-full" id="hobbies" name="hobbies" value={hobbies} onChange={e => setHobbies(e.target.value)}></textarea><br />

                    <button className="p-2 m-2 pl-10 pr-10 bg-green-800 rounded-md ">Update</button>
                </form>
            </div>
        </div>
    );
};

export default UserUpdate;
