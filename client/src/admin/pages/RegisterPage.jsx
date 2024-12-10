import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'

function RegisterPage() {
<<<<<<< HEAD:client/src/pages/RegisterPage.jsx
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    async function registerUser(ev) {
        ev.preventDefault();
        try {
            await axios.post("/auth/register", {
                name, email, password
            });
            alert('Registration successfull');
            setRedirect(true);
=======
    // Kiểm tra xem cookie có tên 'tokenAdmin' có tồn tại không
    const tokenAdmin = document.cookie.split('; ').find(row => row.startsWith('tokenAdmin='));

    // Nếu không có tokenAdmin, khởi tạo nó với giá trị rỗng
    if (!tokenAdmin) {
    document.cookie = "tokenAdmin="; // Khởi tạo cookie 'tokenAdmin' với giá trị rỗng
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    async function registerAdmin(ev) {
        ev.preventDefault();
        try {
            const {res} = await axios.post("/admin-api/register", {
                email, password
            })
            if(res!=='not') {
                alert('Registration successfull')
                window.location.reload()
            } else {
                alert('Chưa đăng nhập')
            }
            
>>>>>>> 856db7a22c050424d1ade53b57682979b380587c:client/src/admin/pages/RegisterPage.jsx
        } catch (error) {
            alert("Fail, try again");
        }
    }
    if (redirect) {
        return <Navigate to={'/login'} />;
    }

<<<<<<< HEAD:client/src/pages/RegisterPage.jsx
    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className="mb-64">
                <h1 className='text-4xl text-center mb-4'>Register</h1>
                <form className='max-w-lg mx-auto' onSubmit={registerUser}>
                    <input type="text"
                        placeholder='Tran Tam'
                        value={name}
                        onChange={ev => setName(ev.target.value)} />
                    <input type="email"
=======
  return (
    <div className='mt-4 grow flex items-center justify-around'>
        <div className="mb-64">
            <h1 className='text-4xl text-center mb-4'>Thêm admin</h1>
            <form className='max-w-lg mx-auto' onSubmit={registerAdmin}>
                <input type="email" 
>>>>>>> 856db7a22c050424d1ade53b57682979b380587c:client/src/admin/pages/RegisterPage.jsx
                        placeholder='your@email.com'
                        value={email}
                        onChange={ev => setEmail(ev.target.value)} />
                    <input type="password"
                        placeholder='yourpassword'
<<<<<<< HEAD:client/src/pages/RegisterPage.jsx
                        value={password}
                        onChange={ev => setPassword(ev.target.value)} />
                    <button className='primary'>Register</button>
                    <div className="text-center text-gray-500 py-2 ">
                        Already a member? <Link className='underline text-black' to={'/login'}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;
=======
                        value={password} 
                        onChange={ev => setPassword(ev.target.value)}/>
                <button className='primary'>Thêm</button>
            </form>
        </div> 
    </div>
  )
}

export default RegisterPage
>>>>>>> 856db7a22c050424d1ade53b57682979b380587c:client/src/admin/pages/RegisterPage.jsx
