import { Link, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AdminContext } from "../components/AdminContext";

export default function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { admin, setAdmin } = useContext(AdminContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post('/admin-api/login', { email, password });
      if (data == 'not found') alert('Không tồn tại')
      else {
        setAdmin(data);
        alert('Login successful');
        setRedirect(true);
      }
    } catch (e) {
      if (e.response) {
        return alert(e.response.data.message);
      }
      // alert('Đăng nhập thất bại!');
    }
  }

  if (redirect) {
    return <Navigate to={'/admin/users'} />
  }

  if (admin) {
    return <Navigate to={'/admin/users'} />
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
        <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link className="underline text-black" to={"/admin/register"}>
              Register now
            </Link>
        </div>
      </div>
    </div>
  );
}