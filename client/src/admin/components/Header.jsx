import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AdminContext } from './AdminContext';
import axios from 'axios';

function Header() {
  const { admin, setAdmin } = useContext(AdminContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  async function logout() {
    try {
      await axios.post('/admin-api/logout');
      setAdmin(null); // Xóa thông tin user
      setMenuOpen(false); // Đóng menu
      window.location.href = '/admin';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }


  return (
    <div className="sticky top-0 bg-white z-20 border-b-2 shadow-sm h-20 flex items-center">
      <header className="w-full flex justify-between lg:px-36 md:px-8 sm:px-4 items-center">
        {/* Logo */}
        <Link to={'/admin/users'} className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <span className="font-bold text-xl">phongtro365-admin_page</span>
        </Link>

        {/* User Section */}
        <div ref={menuRef} className="relative">
          {/* Nếu chưa đăng nhập */}
          {!admin && (
            <Link
              to="/admin/login"
              className="flex items-center gap-2 border border-gray-300 rounded-full py-1 px-1 cursor-pointer"
            >
              <div className="bg-gray-500 text-white rounded-full border border-gray-500">
                {/* Lỗi ở đây: Tại sao không hiển thị được ảnh? */}
                {/* Câu trả lời: src={admin.avatar} => src={admin?.avatar} */}
                {/* <svg xmlns="http://www.w3.org/2000/svg" className="size-11" viewBox="0 0 24 24" version="1.1" alt="logo_uet.png">
                  <g id="surface1">
                    <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,27.843137%,49.803922%);fill-opacity:1;" d="M 0 74.40625 C 0.0742188 33.285156 33.523438 -0.0703125 74.613281 0.0390625 C 115.796875 0.152344 149.089844 33.515625 149 74.558594 C 148.980469 94.339844 141.09375 113.304688 127.070312 127.261719 C 113.050781 141.222656 94.054688 149.027344 74.269531 148.960938 C 33.25 148.878906 -0.0664062 115.445312 0 74.40625 Z M 31.441406 47.617188 L 114.90625 47.617188 C 115.125 46.398438 115.328125 45.273438 115.554688 44.015625 L 33.5 44.015625 C 43.269531 26.746094 64.910156 12.117188 91.484375 14.972656 C 103.726562 16.207031 115.269531 21.277344 124.460938 29.460938 C 135.640625 39.28125 142.21875 51.65625 144.445312 66.367188 C 141.914062 37.285156 116.640625 5.855469 77.613281 4.097656 C 35.773438 2.230469 1.964844 36.71875 4.058594 78.140625 C 5.0625 97.578125 14.0625 115.738281 28.921875 128.308594 C 43.78125 140.882812 63.179688 146.75 82.519531 144.519531 C 98.734375 142.71875 112.699219 135.921875 124.257812 124.429688 C 135.820312 112.9375 142.496094 98.964844 144.511719 82.792969 C 139.066406 118.507812 106.199219 138.335938 76.847656 133.746094 C 80.730469 112.910156 84.613281 92.058594 88.503906 71.191406 L 110.605469 71.191406 C 110.835938 69.980469 111.050781 68.820312 111.292969 67.550781 L 25.46875 67.550781 L 25.808594 65.320312 L 111.652344 65.320312 C 111.882812 64.109375 112.105469 62.964844 112.339844 61.710938 L 26.457031 61.710938 L 27.039062 59.386719 L 112.742188 59.386719 C 112.964844 58.199219 113.179688 57.078125 113.417969 55.820312 L 28.058594 55.820312 L 28.878906 53.503906 L 113.832031 53.503906 L 114.480469 49.933594 L 30.367188 49.933594 Z M 88.832031 102.398438 L 86.140625 102.398438 C 85.300781 106.34375 84.46875 110.253906 83.628906 114.210938 L 86.371094 114.210938 L 87.503906 108.605469 L 87.617188 108.605469 C 87.984375 110.484375 88.347656 112.363281 88.707031 114.199219 L 91.429688 114.199219 C 92.257812 110.246094 93.074219 106.359375 93.910156 102.390625 L 91.171875 102.390625 L 90.050781 108.074219 L 89.929688 108.074219 C 89.566406 106.183594 89.199219 104.296875 88.832031 102.398438 Z M 100.765625 114.234375 C 101.238281 112.015625 101.695312 109.84375 102.164062 107.628906 C 101.957031 107.59375 101.75 107.570312 101.539062 107.554688 C 100.386719 107.554688 99.238281 107.554688 98.023438 107.554688 L 97.582031 109.773438 L 98.964844 109.84375 C 98.886719 110.570312 98.582031 111.25 98.097656 111.792969 C 97.769531 112.15625 97.25 112.277344 96.796875 112.09375 C 96.292969 111.910156 96.34375 111.441406 96.363281 111.019531 C 96.367188 110.863281 96.386719 110.707031 96.414062 110.554688 C 96.707031 109.167969 96.976562 107.777344 97.304688 106.398438 C 97.425781 105.917969 97.609375 105.457031 97.851562 105.023438 C 98.085938 104.597656 98.558594 104.351562 99.042969 104.40625 C 99.65625 104.40625 99.90625 104.675781 99.875 105.285156 C 99.875 105.648438 99.800781 106.003906 99.753906 106.429688 L 102.371094 106.429688 C 103.261719 103.734375 102.210938 102.179688 99.902344 102.09375 C 99.84375 102.09375 99.796875 102.09375 99.746094 102.09375 C 97.179688 102.035156 95.859375 102.875 95.085938 104.8125 C 94.246094 107.023438 93.738281 109.34375 93.578125 111.703125 C 93.460938 113.054688 94.113281 114.007812 95.253906 114.320312 C 96.394531 114.632812 97.429688 114.707031 98.398438 114.058594 C 99.167969 114.40625 99.9375 114.21875 100.765625 114.234375 Z M 105.15625 114.234375 C 105.542969 112.488281 105.90625 110.808594 106.269531 109.171875 L 108.558594 109.171875 C 108.199219 110.878906 107.851562 112.511719 107.5 114.195312 L 110.226562 114.195312 C 111.070312 110.253906 111.898438 106.359375 112.738281 102.402344 L 110.019531 102.402344 L 109.0625 106.730469 L 106.765625 106.730469 C 107.078125 105.269531 107.378906 103.875 107.695312 102.398438 L 104.953125 102.398438 C 104.121094 106.320312 103.28125 110.246094 102.441406 114.230469 Z M 100.800781 92.46875 C 102.6875 92.003906 103.523438 90.621094 103.953125 88.890625 C 104.101562 88.417969 104.222656 87.933594 104.320312 87.445312 C 104.527344 86.074219 104.742188 84.703125 104.824219 83.320312 C 104.921875 82.453125 104.441406 81.617188 103.640625 81.261719 C 101.632812 80.257812 98.847656 81.183594 97.953125 83.273438 C 97.097656 85.367188 96.589844 87.585938 96.445312 89.839844 C 96.328125 91.1875 96.878906 92.082031 98.117188 92.425781 C 98.183594 92.425781 98.226562 92.527344 98.277344 92.578125 L 97.867188 94.632812 L 100.257812 94.632812 C 100.457031 93.898438 100.625 93.191406 100.800781 92.460938 Z M 96.78125 81.261719 L 94.195312 81.261719 L 93.3125 85.28125 L 91.210938 85.28125 L 92.0625 81.261719 L 89.472656 81.261719 C 88.691406 84.945312 87.917969 88.566406 87.128906 92.265625 L 89.707031 92.265625 C 90.058594 90.667969 90.410156 89.101562 90.75 87.566406 L 92.847656 87.566406 C 92.511719 89.15625 92.1875 90.679688 91.84375 92.273438 L 94.429688 92.273438 C 95.203125 88.59375 96.003906 84.964844 96.765625 81.257812 Z M 114.316406 102.382812 C 113.472656 106.335938 112.644531 110.242188 111.804688 114.203125 L 118.332031 114.203125 C 118.492188 113.472656 118.644531 112.789062 118.835938 111.960938 L 115.011719 111.960938 L 115.601562 109.085938 L 119.117188 109.085938 C 119.277344 108.320312 119.417969 107.636719 119.578125 106.84375 L 116.09375 106.84375 C 116.257812 106.054688 116.394531 105.371094 116.550781 104.605469 L 120.371094 104.605469 C 120.546875 103.832031 120.699219 103.140625 120.875 102.382812 Z M 113.410156 85.015625 C 113.472656 84.328125 113.492188 83.640625 113.464844 82.957031 C 113.453125 81.925781 112.65625 81.078125 111.628906 81.007812 C 109.886719 80.707031 107.757812 81.152344 106.90625 83.46875 C 106.441406 84.855469 106.070312 86.277344 105.796875 87.714844 C 105.617188 88.5625 105.515625 89.417969 105.496094 90.28125 C 105.457031 91.039062 105.84375 91.75 106.5 92.125 C 107.953125 93 110.429688 92.554688 111.449219 91.222656 C 112.121094 90.265625 112.558594 89.160156 112.722656 88.003906 L 110.210938 88.003906 C 109.996094 88.617188 109.835938 89.199219 109.589844 89.746094 C 109.277344 90.433594 108.875 90.492188 108.164062 89.964844 C 108.152344 89.542969 108.175781 89.121094 108.226562 88.699219 C 108.449219 87.488281 108.699219 86.285156 108.980469 85.085938 C 109.082031 84.625 109.253906 84.179688 109.484375 83.769531 C 109.722656 83.242188 110.339844 83.003906 110.871094 83.238281 L 110.871094 85.015625 Z M 114.449219 102.023438 L 116.960938 102.023438 L 117.964844 101.085938 L 118.585938 102.011719 L 120.949219 102.011719 L 119.3125 99.273438 L 117.304688 99.273438 Z M 113.582031 114.511719 C 113.425781 115.269531 113.277344 115.992188 113.109375 116.792969 L 115.671875 116.792969 L 116.136719 114.511719 Z M 113.582031 114.511719 " />
                    <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,27.843137%,49.803922%);fill-opacity:1;" d="M 38.789062 112.628906 C 29.039062 100.433594 24.53125 86.71875 25.1875 71.257812 L 46.492188 71.257812 C 43.929688 85.007812 41.375 98.726562 38.789062 112.628906 Z M 38.789062 112.628906 " />
                    <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,27.843137%,49.803922%);fill-opacity:1;" d="M 67.375 114.128906 L 64.8125 114.128906 L 63.664062 108.277344 L 63.503906 108.277344 C 63.113281 110.226562 62.726562 112.175781 62.339844 114.125 L 59.765625 114.125 C 60.59375 110.222656 61.414062 106.386719 62.246094 102.492188 L 64.789062 102.492188 C 65.179688 104.5 65.574219 106.511719 65.964844 108.519531 L 66.105469 108.519531 C 66.492188 106.511719 66.882812 104.5 67.269531 102.492188 L 69.847656 102.492188 C 69.019531 106.398438 68.210938 110.238281 67.375 114.128906 Z M 67.375 114.128906 " />
                    <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,27.843137%,49.803922%);fill-opacity:1;" d="M 78.496094 106.359375 L 75.914062 106.359375 C 75.945312 105.976562 75.988281 105.648438 76 105.308594 C 76 104.597656 75.734375 104.304688 74.996094 104.304688 C 74.449219 104.269531 73.941406 104.582031 73.722656 105.085938 C 73.46875 105.683594 73.261719 106.300781 73.105469 106.933594 C 72.839844 108.027344 72.605469 109.136719 72.398438 110.242188 C 72.339844 110.523438 72.308594 110.8125 72.308594 111.101562 C 72.308594 111.519531 72.28125 111.960938 72.757812 112.179688 C 73.238281 112.371094 73.78125 112.25 74.136719 111.878906 C 74.6875 111.308594 75.015625 110.558594 75.050781 109.765625 L 73.683594 109.765625 L 74.101562 107.675781 L 78.074219 107.675781 C 77.617188 109.839844 77.167969 111.949219 76.710938 114.105469 L 74.824219 114.105469 L 74.589844 113.8125 C 74.511719 113.84375 74.433594 113.878906 74.363281 113.917969 C 73.121094 114.757812 71.851562 114.519531 70.636719 113.917969 C 70.078125 113.621094 69.730469 113.042969 69.722656 112.410156 C 69.644531 111.789062 69.65625 111.15625 69.75 110.535156 C 70.050781 108.960938 70.4375 107.410156 70.796875 105.851562 C 70.832031 105.703125 70.886719 105.550781 70.929688 105.40625 C 71.769531 102.769531 73.644531 101.671875 76.839844 102.3125 C 77.828125 102.4375 78.570312 103.285156 78.554688 104.285156 C 78.578125 104.976562 78.558594 105.671875 78.496094 106.359375 Z M 78.496094 106.359375 " />
                    <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,27.843137%,49.803922%);fill-opacity:1;" d="M 59.457031 105.078125 C 59.300781 107.265625 58.859375 109.421875 58.144531 111.492188 C 57.722656 112.683594 56.828125 113.648438 55.667969 114.15625 C 54.511719 114.664062 53.195312 114.667969 52.03125 114.167969 C 51.285156 113.925781 50.753906 113.265625 50.675781 112.488281 C 50.582031 111.863281 50.582031 111.230469 50.675781 110.609375 C 51.039062 108.839844 51.40625 107.0625 51.910156 105.332031 C 52.839844 102.15625 55.625 101.8125 57.875 102.40625 C 58.585938 102.574219 59.132812 103.148438 59.265625 103.867188 C 59.375 104.296875 59.410156 104.746094 59.457031 105.078125 Z M 56.863281 105.535156 L 56.980469 105.449219 C 56.816406 105.070312 56.597656 104.714844 56.332031 104.402344 C 56 104.121094 55.261719 104.335938 54.921875 104.757812 C 54.683594 105.03125 54.511719 105.351562 54.417969 105.703125 C 54.007812 107.484375 53.632812 109.273438 53.277344 111.066406 C 53.144531 111.484375 53.320312 111.941406 53.699219 112.160156 C 54.101562 112.398438 54.613281 112.347656 54.957031 112.03125 C 55.34375 111.652344 55.636719 111.1875 55.808594 110.675781 C 56.164062 109.417969 56.410156 108.132812 56.683594 106.851562 C 56.75 106.421875 56.796875 105.972656 56.863281 105.535156 Z M 56.863281 105.535156 " />
                    <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,27.843137%,49.803922%);fill-opacity:1;" d="M 62.402344 92.242188 C 62.738281 90.628906 63.042969 89.171875 63.347656 87.671875 L 62.550781 87.5 L 62.910156 85.910156 L 63.78125 85.746094 C 64.089844 84.300781 64.402344 82.851562 64.730469 81.351562 C 64.894531 81.320312 65.0625 81.296875 65.230469 81.289062 C 66.492188 81.289062 67.742188 81.289062 69.011719 81.289062 C 69.558594 81.265625 70.089844 81.46875 70.484375 81.847656 C 70.875 82.226562 71.097656 82.75 71.097656 83.296875 C 71.132812 83.925781 71.089844 84.554688 70.972656 85.171875 C 70.707031 86.613281 70.359375 88.035156 69.921875 89.433594 C 69.3125 91.207031 68.113281 92.355469 65.964844 92.242188 C 64.835938 92.175781 63.683594 92.242188 62.402344 92.242188 Z M 66.210938 85.710938 L 67.394531 85.921875 C 67.234375 86.511719 67.089844 87.027344 66.953125 87.515625 L 65.785156 87.636719 C 65.601562 88.5 65.4375 89.308594 65.28125 90.113281 C 66.511719 90.398438 67.324219 90.070312 67.621094 89.027344 C 68.035156 87.570312 68.320312 86.078125 68.625 84.59375 C 68.640625 84.179688 68.597656 83.765625 68.5 83.363281 L 66.773438 83.257812 C 66.558594 84.105469 66.371094 84.882812 66.210938 85.710938 Z M 66.210938 85.710938 " />
                    <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,27.843137%,49.803922%);fill-opacity:1;" d="M 47.050781 109.699219 L 49.476562 109.699219 C 49.546875 112.929688 46.773438 115.109375 43.726562 114.265625 C 42.71875 114.078125 42.003906 113.183594 42.039062 112.160156 C 42.070312 109.398438 42.695312 106.671875 43.867188 104.167969 C 44.726562 102.457031 47.125 101.695312 48.933594 102.351562 C 49.675781 102.59375 50.21875 103.230469 50.339844 104.003906 C 50.503906 104.773438 50.453125 105.570312 50.199219 106.316406 L 47.757812 106.316406 L 47.757812 104.472656 C 46.933594 104.253906 46.507812 104.367188 46.140625 104.972656 C 45.898438 105.386719 45.71875 105.835938 45.609375 106.304688 C 45.277344 107.734375 44.996094 109.175781 44.703125 110.617188 C 44.65625 110.878906 44.640625 111.140625 44.652344 111.402344 C 44.621094 111.800781 44.886719 112.160156 45.277344 112.246094 C 45.703125 112.375 46.15625 112.15625 46.320312 111.742188 C 46.511719 111.308594 46.679688 110.867188 46.824219 110.417969 C 46.898438 110.203125 46.964844 109.976562 47.050781 109.699219 Z M 47.050781 109.699219 " />
                    <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,27.843137%,49.803922%);fill-opacity:1;" d="M 78.355469 92.171875 L 75.804688 92.171875 L 75.804688 89.609375 L 73.90625 89.609375 C 73.558594 90.445312 73.207031 91.289062 72.835938 92.171875 L 70.269531 92.171875 L 75.15625 81.308594 L 78.167969 81.308594 C 78.214844 84.902344 78.285156 88.503906 78.355469 92.171875 Z M 74.738281 87.527344 L 75.855469 87.527344 L 75.855469 85.136719 L 75.734375 85.085938 C 75.410156 85.867188 75.089844 86.65625 74.738281 87.527344 Z M 74.738281 87.527344 " />
                    <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,27.843137%,49.803922%);fill-opacity:1;" d="M 82.03125 92.171875 L 79.617188 92.171875 C 80.382812 88.523438 81.121094 84.945312 81.902344 81.3125 L 84.316406 81.3125 Z M 82.03125 92.171875 " />
                    <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,27.843137%,49.803922%);fill-opacity:1;" d="M 59.710938 101.953125 L 57.53125 101.953125 L 56.828125 100.910156 C 56.082031 102.195312 54.90625 102.03125 53.542969 101.914062 L 56.054688 99.347656 L 58.179688 99.347656 C 58.648438 100.140625 59.144531 100.980469 59.710938 101.953125 Z M 59.710938 101.953125 " />
                    <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,27.843137%,49.803922%);fill-opacity:1;" d="M 75.15625 92.554688 C 75.011719 93.242188 74.878906 93.894531 74.738281 94.5625 L 72.511719 94.5625 L 72.929688 92.554688 Z M 75.15625 92.554688 " />
                    <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,27.843137%,49.803922%);fill-opacity:1;" d="M 99.128906 90.085938 C 99.113281 90.042969 99.105469 90 99.097656 89.957031 C 99.019531 89.46875 99.0625 88.96875 99.226562 88.5 C 99.375 87.996094 99.535156 86.933594 100.019531 84.808594 C 100.09375 84.503906 100.203125 84.207031 100.347656 83.929688 C 100.730469 83.207031 101.105469 83.054688 101.96875 83.230469 C 102.285156 83.5625 102.394531 84.042969 102.25 84.476562 C 101.964844 85.914062 101.664062 87.347656 101.347656 88.78125 C 101.28125 89.0625 101.175781 89.332031 101.035156 89.585938 C 100.644531 90.292969 100.136719 90.453125 99.128906 90.085938 Z M 99.128906 90.085938 " />
                  </g>
                </svg> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-11"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </Link>
          )}

          {/* Nếu đã đăng nhập */}
          {!!admin && (
            <div>
              <div
                className="flex items-center gap-2 border border-gray-300 rounded-full py-1 px-1 cursor-pointer relative"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <img
                  src={
                    admin?.avatar
                      ? `http://localhost:4000/post/uploads/${user.avatar}`
                      : 'https://banner2.cleanpng.com/20180411/ike/avfjoey57.webp'
                  }
                  alt="Avatar"
                  className="rounded-full w-11 h-11 object-cover"
                />
                {/* Mũi tên ở góc dưới bên phải */}
                <div className="absolute bottom-0 right-0 bg-gray-700 text-white rounded-full p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-3 h-3"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 16.5c-.18 0-.36-.06-.5-.18l-5-4a.75.75 0 1 1 1-.84l4.5 3.6 4.5-3.6a.75.75 0 1 1 1 .84l-5 4c-.14.12-.32.18-.5.18Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              {menuOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  <div
                    className="block px-4 py-2 hover:bg-gray-100 border-b-2"
                    onClick={() => setMenuOpen(false)} // Đóng menu
                  >
                    {admin.email}
                  </div>
                  <Link
                    to="/admin"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)} // Đóng menu
                  >
                    Thêm admin
                  </Link>
                  <Link
                    to="/admin/users"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)} // Đóng menu
                  >
                    Danh sách users
                  </Link>
                  <Link
                    to="/admin/reports"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)} // Đóng menu
                  >
                    Danh sách Reports
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left block px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;