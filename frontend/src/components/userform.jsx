import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import UserUpdate from "./userupdate";



const UserForm = () => {
   const [name,setName] = useState('')
   const [phone,setPhone] = useState('')
   const [email,setEmail] = useState('')
   const [hobbies,setHobbies] = useState('')
   const [row, setRow] = useState([])
   const [editRow, setEditRow] = useState(null);
   const [isModalOpen, setIsModalOpen] = useState(false);

   useEffect(() => {
    fetch(`https://crud-react-jlz6.onrender.com/showAllUser`)
      .then(res => res.json())
      .then(data => setRow(data))
      .catch(error => console.error('Error fetching data:', error));
  });

  const handleEditRow = (rowData) => {
    setEditRow(rowData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  //add user
   const onSubmitHandler = (e) =>{
    e.preventDefault()
    
    fetch(`https://crud-react-jlz6.onrender.com/addUser`,{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({name,phone,email,hobbies})   
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        setName('');
        setPhone('');
        setEmail('');
        setHobbies('')
    })
   }

   //handle delete
   const handleDeleteRow = (id) => {
    // Delete row from frontend
    const updatedRows = row.filter(row => row.id !== id);
    setRow(updatedRows);

    // Delete row from backend
    fetch(`https://crud-react-jlz6.onrender.com/deleteUser/${id}`, {
      method: 'delete'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Row deleted successfully from backend');
    })
    .catch(error => {
      console.error('Error deleting row from backend:', error);
    });
  };

  //send mail

  const sendEmail = (rowData) => {
    const email = "info@redpositive.in";
    const subject = "User Info";
    const body = `Name: ${rowData.name}%0D%0APhone: ${rowData.phone}%0D%0AEmail: ${rowData.email}%0D%0AHobbies: ${rowData.hobbies}`;

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
};


    return<>
            <div className="grid place-items-center h-screen">
                <div className="p-10 m-5 bg-blue-500 rounded-md">
                    <div className="text-2xl">
                        <h2>User Form</h2>
                    </div>
                            <form onSubmit={onSubmitHandler}>
                                <label htmlFor="name">Name:</label><br />
                                <input className="rounded-md p-1" type="text" id="name" name="name" onChange={e => setName(e.target.value)} required /><br />

                                <label htmlFor="phoneNumber">Phone number:</label><br />
                                <input className="rounded-md p-1" type="text" id="phoneNumber" name="phoneNumber"  onChange={e => setPhone(e.target.value)} required /><br />

                                <label htmlFor="email">Email:</label><br />
                                <input className="rounded-md p-1" type="email" id="email" name="email" onChange={e => setEmail(e.target.value)} required /><br />

                                <label htmlFor="hobbies">Hobbies:</label><br />
                                <textarea className="rounded-md p-1 w-full" id="hobbies" name="hobbies"  onChange={e => setHobbies(e.target.value)}></textarea><br />

                                <button className="p-2 m-2 pl-10 pr-10 bg-green-800 rounded-md ">Save</button>
                            </form>
                </div>
                <div className="m-5 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 rounded-md">
                    <thead>
                        <tr className="rounded-md">
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Select</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Hobbies</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Update</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Delete</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Send</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {row.map(row => (
                        <tr key={row._id}>
                            <td className="px-6 py-4 whitespace-no-wrap"><input type="checkbox" checked={row.selected} /></td>
                            <td className="px-6 py-4 whitespace-no-wrap">{row.name}</td>
                            <td className="px-6 py-4 whitespace-no-wrap">{row.phone}</td>
                            <td className="px-6 py-4 whitespace-no-wrap">{row.email}</td>
                            <td className="px-6 py-4 whitespace-no-wrap">{row.hobbies}</td>
                            <td>
                            <button className="p-2 ml-2 mr-2 pl-10 pr-10 bg-purple-600 rounded-md" onClick={() => handleEditRow(row)}>Update</button>
                            </td>
                            <td>
                            <button className="p-2 ml-2 mr-2 pl-10 pr-10 bg-red-600 rounded-md" onClick={() => handleDeleteRow(row._id)}>Delete</button>
                            </td>
                            <td>
                            <button className="p-2 ml-2 mr-2 pl-10 pr-10 bg-yellow-600 rounded-md" onClick={()=> sendEmail(row)}>Send</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>

                <UserUpdate
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    rowData={editRow}/>
            </div>

    
    </>
};

export default UserForm;
