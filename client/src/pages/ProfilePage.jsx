import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../components/UserContext';
import axios from 'axios'

function ProfilePage() {
  const { ready, user, setUser } = useContext(UserContext);
  const [showAvatarPopup, setShowAvatarPopup] = useState(false);
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [updatedAvatar, setUpdatedAvatar] = useState(null);
  const [updatedInfo, setUpdatedInfo] = useState({
    name: '',
    phone: '',
    zalo: '',
  });
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checkToDelete, setCheckToDelete] = useState(false)

  // Cập nhật giá trị updatedInfo khi user được load
  useEffect(() => {
    if (user) {
      setUpdatedInfo({
        name: user.name || '',
        phone: user.phone || '',
        zalo: user.zalo || '',
      });
    }
  }, [user]);

  function uploadPhoto(ev) {
    const files = ev.target.files[0]
    const data = new FormData()
    data.append('photos', files)
    axios.post('/post/upload', data, {
        headers: {'Content-type': 'multipart/form-data'}
    }).then(response => {
        const {data: filenames} = response
        setUpdatedAvatar(filenames[0])
    })
}

  const saveAvatar = () => {
    axios.put('/auth/change-avatar', {id: user.id, updatedAvatar})
    setShowAvatarPopup(false);
    window.location.reload()
  };

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInfo((prev) => ({ ...prev, [name]: value }));
  };

  const saveInfo = async () => {
    try {
      const response = await axios.post(
        '/auth/update-profile',
        {
          name: updatedInfo.name,
          phone: updatedInfo.phone,
          zalo: updatedInfo.zalo,
        }
      );
      alert(response.data.message || 'Thông tin cá nhân đã được cập nhật thành công!');
      setShowInfoPopup(false);
      window.location.reload()
    } catch (error) {
      alert(error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật thông tin cá nhân!');
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const savePassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('Mật khẩu mới và xác nhận mật khẩu không khớp!');
      return;
    }
  
    try {
      const response = await axios.post(
        '/auth/change-password',
        {
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        }
      );

      alert(response.data.message || 'Mật khẩu đã được thay đổi thành công!');
      setShowPasswordPopup(false);
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
      window.location.reload()
    } catch (error) {
      alert(
        error.response?.data?.message || 'Có lỗi xảy ra khi thay đổi mật khẩu, vui lòng thử lại!'
      );
    }
  };

  const checkDeleteAccountCondition = async () => {
    try {
        const response = await axios.get('/auth/check-delete-account');

        // Kết quả từ API
        if (response.data.result) {
          setCheckToDelete(true)
        } else {
          setCheckToDelete(false)
        }
        
        setShowDeletePopup(true)
        console.log(response.data.result)
    } catch (error) {
        console.error('Lỗi khi kiểm tra điều kiện xóa tài khoản:', error);
        alert('Không thể kiểm tra điều kiện xóa tài khoản.');
    }
  };

  const deleteAccount = async () => {
    if (!confirmPassword) {
      alert('Vui lòng nhập mật khẩu để xác nhận.');
      return;
    }

    try {
      // Gửi request xóa tài khoản
      const response = await axios.post(
        '/auth/delete-account',
        {
          password: confirmPassword, // Mật khẩu xác nhận từ người dùng
        }
      );

      // Hiển thị thông báo thành công và chuyển hướng
      alert(response.data.message || 'Tài khoản đã được xóa thành công.');
      setUser(null)
      window.location.href = '/'; // Chuyển hướng về trang chủ hoặc trang đăng nhập
    } catch (error) {
      // Xử lý lỗi
      alert(error.response?.data?.message || 'Có lỗi xảy ra khi xóa tài khoản!');
    }
  };

  // Đóng popup khi nhấp ra ngoài
  const handleClosePopup = (setPopupState) => (e) => {
    if (e.target === e.currentTarget) {
      setPopupState(false);
    }
  };

  if (!ready) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="text-center mt-10">
        <p>User not logged in.</p>
        <a href="/login" className="text-blue-500 underline">
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-xl mx-auto bg-gray-100 rounded-lg shadow-lg py-6 px-16 mt-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Thông tin cá nhân</h1>
        {/* Avatar Section */}
        <div className="relative w-full pb-52">
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div className="relative w-44 h-44 rounded-full overflow-hidden border-2 border-gray-500 shadow-2xl p-1">
              <img
                src={
                  user?.avatar 
                    ? `http://localhost:4000/post/uploads/${user.avatar}` 
                    : 'https://banner2.cleanpng.com/20180411/ike/avfjoey57.webp'
                }
                alt="Avatar"
                className="object-cover w-full h-full rounded-full"
              />
            </div>
            <div
              onClick={() => setShowAvatarPopup(true)}
              className="absolute bottom-2 right-2 bg-gray-700 text-white w-9 h-9 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between border-b pb-4">
            <span className="text-gray-600 font-semibold text-xl pl-4">Tên của bạn</span>
            <span className="text-gray-800 font-semibold text-md pr-4">{user.name || 'Chưa được cung cấp'}</span>
          </div>
          <div className="flex justify-between border-b pb-4">
            <span className="text-gray-600 font-semibold text-xl pl-4">Số điện thoại</span>
            <span className="text-gray-800 font-semibold text-md pr-4">{user.phone || 'Chưa được cung cấp'}</span>
          </div>
          <div className="flex justify-between border-b pb-4">
            <span className="text-gray-600 font-semibold text-xl pl-4">Số zalo</span>
            <span className="text-gray-800 font-semibold text-md pr-4">{user.zalo || 'Chưa được cung cấp'}</span>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={() => setShowInfoPopup(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg shadow"
          >
            Thay đổi Thông tin
          </button>
          <button
            onClick={() => setShowPasswordPopup(true)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow"
          >
            Thay đổi Mật khẩu
          </button>
          <button
            onClick={() => checkDeleteAccountCondition()}
            className="bg-red-700 text-white px-4 py-2 rounded-lg shadow"
          >
            Xóa Tài khoản
          </button>
        </div>
      </div>

      {/* Avatar Popup */}
      {showAvatarPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleClosePopup(setShowAvatarPopup)}
        >
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Thay đổi Avatar</h2>
            <img className='rounded-2xl w-full object-cover m-2' src={'http://localhost:4000/post/uploads/'+updatedAvatar} alt="" />
            {!updatedAvatar && (<label className='h-32 cursor-pointer flex items-center justify-center gap-1 border bg-transparent rounded-2xl p-2'>
                <input type="file" multiple className='hidden' onChange={uploadPhoto}/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
                Upload
            </label>)}
            <div className="flex justify-end">
              <button
                onClick={saveAvatar}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info Popup */}
      {showInfoPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleClosePopup(setShowInfoPopup)}
        >
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Thay đổi Thông tin</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Tên của bạn</label>
              <input
                type="text"
                name="name"
                value={updatedInfo.name}
                onChange={handleInfoChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Số điện thoại</label>
              <input
                type="text"
                name="phone"
                value={updatedInfo.phone}
                onChange={handleInfoChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Zalo</label>
              <input
                type="text"
                name="zalo"
                value={updatedInfo.zalo}
                onChange={handleInfoChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={saveInfo}
                className="bg-primary text-white px-4 py-2 rounded-lg"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Popup */}
      {showPasswordPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleClosePopup(setShowPasswordPopup)}
        >
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Thay đổi Mật khẩu</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Mật khẩu hiện tại</label>
              <input
                type="password"
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Mật khẩu mới</label>
              <input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Xác nhận mật khẩu mới</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={savePassword}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeletePopup && checkToDelete && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleClosePopup(setShowDeletePopup)}
        >
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4 text-red-500">Xác nhận xóa tài khoản</h2>
            <p className="text-gray-700 mb-4">
              Bạn có chắc chắn muốn xóa tài khoản không? Hành động này không thể hoàn tác.
            </p>
            <div className="mb-4">
              <label className="block text-gray-700">Nhập mật khẩu để xác nhận</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Nhập mật khẩu của bạn"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={deleteAccount}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Xóa tài khoản
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeletePopup && !checkToDelete && (
        <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        onClick={handleClosePopup(setShowDeletePopup)}
      >
        <div className="bg-white rounded-lg p-6 max-w-lg">
          <h2 className="text-lg font-bold mb-4 text-red-500">Bạn không thể xóa tài khoản vào lúc này</h2>
          <p className="text-gray-700 mb-4">
            Bạn đang có người đang thuê, vui lòng liên hệ người thuê để hủy phòng trước khi xóa tài khoản!
          </p>
        </div>
      </div>
      )}
    </div>
  );
}

export default ProfilePage;
