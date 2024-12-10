import {Link, Navigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import { AdminContext } from "../components/AdminContext";

export default function LoginPage() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {admin, setAdmin} = useContext(AdminContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
<<<<<<< HEAD:client/src/pages/LoginPage.jsx
      const {data} = await axios.post('/auth/login', {email,password});
      setUser(data);
      alert('Đăng nhập thành công!');
      setRedirect(true);
=======
      const {data} = await axios.post('/admin-api/login', {email,password});
      if(data == 'not found') alert('Không tồn tại')
      else {
        setAdmin(data);
        alert('Login successful');
        setRedirect(true);
      }
>>>>>>> 856db7a22c050424d1ade53b57682979b380587c:client/src/admin/pages/LoginPage.jsx
    } catch (e) {
      if (e.response) {
        return alert(e.response.data.message);
      }
      // alert('Đăng nhập thất bại!');
    }
  }

  if (redirect) {
<<<<<<< HEAD:client/src/pages/LoginPage.jsx
    return <Navigate to={'/home'} />;
=======
    return <Navigate to={'/admin/users'} />
  }

  if(admin) {
    return <Navigate to={'/admin/users'} />
>>>>>>> 856db7a22c050424d1ade53b57682979b380587c:client/src/admin/pages/LoginPage.jsx
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login admin</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input type="email"
                 placeholder="your@email.com"
                 value={email}
                 onChange={ev => setEmail(ev.target.value)} />
          <input type="password"
                 placeholder="password"
                 value={password}
                 onChange={ev => setPassword(ev.target.value)} />
          <button className="primary">Login</button>
        </form>
      </div>
    </div>
  );
}