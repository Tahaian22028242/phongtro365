import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'

function RegisterPage() {
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
        } catch (error) {
            alert("Fail, try again");
        }
    }
    if (redirect) {
        return <Navigate to={'/login'} />;
    }

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
                        placeholder='your@email.com'
                        value={email}
                        onChange={ev => setEmail(ev.target.value)} />
                    <input type="password"
                        placeholder='yourpassword'
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
