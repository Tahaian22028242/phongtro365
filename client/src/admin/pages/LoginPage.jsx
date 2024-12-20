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
        alert('Đăng nhập tư cách quản trị viên thành công!');
        setRedirect(true);
      }
    } catch (e) {
      if (e.response) {
        return alert(e.response.data.message);
      }
      alert('Đăng nhập tư cách quản trị viên thất bại!');
    }
  }

  if (redirect) {
    return <Navigate to={'/admin/users'} />
  }

  if (admin) {
    return <Navigate to={'/admin/users'} />
  }

  return (
    <div className="flex flex-col">
      <main className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8 border">
          <h2 className="text-center text-2xl font-semibold mb-6">Đăng nhập</h2>
          <form className="space-y-4" onSubmit={handleLoginSubmit}>
            <div>
              <label className="block text-gray-700 mb-1">Tên đăng nhập / Email</label>
              <input
                type="email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={ev => setEmail(ev.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Mật khẩu</label>
              <input
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={ev => setPassword(ev.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-blue-500"
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Đăng nhập
              </button>
            </div>
          </form>
          <div className="text-center py-2 text-gray-500">
            Chưa có tài khoản quản trị viên?{" "} Hãy đăng ký tại{" "}
            {/* How to make text bigger when hovering */}

            <Link className="underline text-orange-500 hover:text-orange-700 hover:size-8" to={"/admin/register"}>
              đây
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

