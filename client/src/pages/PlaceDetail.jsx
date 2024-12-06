import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { format, differenceInCalendarMonths, differenceInDays } from 'date-fns';
import InvoiceForm from '../components/InvoiceForm';
import PlaceGallery from '../components/PlaceGallery';
import MapComponent from '../components/MapComponent';

function PlaceDetail() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [redirect, setRedirect] = useState('');
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    let newBookingId = null;

    useEffect(() => {
        if (!id) return;
        axios.get(`/post/placedetail/${id}`).then(response => {
            setPlace(response.data);
        });
    }, [id]);

    if (!place) return '';
    console.log(place.bookings)

    // lấy ra các booking theo từng trạng thái
    let bookingPending = []
    let bookingRented = []
    let bookingNow = null
    if(place && place.bookings.length !== 0) {
        bookingPending = place.bookings.filter(booking => booking.status === "PENDING")
        bookingNow = place.bookings.find(booking => booking.status === "APPROVED") || place.bookings.find(booking => booking.status === "WAIT")
        bookingRented = place.bookings.filter(booking => booking.status === "RENTED")
    }


    async function acceptBooking(bookingId) {
        const data = {
            bookingId: bookingId,
            placeId: id
        };
        const response = await axios.post('/booking/accept', data);
        newBookingId = response.data;
        window.location.reload();
    }

    async function notRentResponse(ev, bookingId) {
        ev.preventDefault();
        const data = {bookingId}
        await axios.put('/booking/not-rent-response', data)
        window.location.reload()
    }


    if (redirect) return <Navigate to={redirect} />;

    // phần thông tin người thuê
    let content;
    let historyRent;
    if (place.bookings.length === 0 || bookingPending.length === 0 && !bookingNow) {
        content = (
            <div className="mt-6 text-center text-xl font-semibold text-gray-600">
                Hiện tại chưa có người thuê.
            </div>
        );
    } else if (bookingPending.length > 0) { // hợp lý, vì là chỉ còn 1 tháng thì mới có thể gửi yêu cầu
        content = (
            <div className="mt-6">
                <p className="text-xl font-semibold text-gray-700">Danh sách người đang chờ duyệt</p>
                <p className="text-lg text-gray-600">Có {bookingPending.length} người đang chờ duyệt</p>
                {bookingPending.map(booking => (
                    <div className="flex items-center justify-between bg-gray-100 p-4 mt-4 rounded-lg shadow-md" key={booking.id}>
                        <p className="text-gray-800">RenterId: {booking.renterId}</p>
                        <button
                            className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 focus:outline-none"
                            onClick={() => acceptBooking(booking.id)}
                        >
                            Duyệt
                        </button>
                    </div>
                ))}
            </div>
        );
    }

    if (bookingNow) {
        const today = new Date();
        const checkOutDate = new Date(bookingNow.checkOut);
        const monthsRemaining = differenceInCalendarMonths(checkOutDate, today);
        const startOfNextMonth = new Date(today.getFullYear(), today.getMonth() + monthsRemaining, 1);
        const remainingDaysInMonth = differenceInDays(checkOutDate, startOfNextMonth);

        let confirmNotBooking = null
        if(bookingNow.status === 'APPROVED') {
            content = (
                <div>
                    {confirmNotBooking}
                    <p className="text-3xl font-semibold text-gray-800">Thông tin người thuê</p>
                    <div className="mt-6 space-y-6">
                        <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-md">
                            <p className="text-lg font-semibold text-gray-800">Người thuê có ID:</p>
                            <p className="text-gray-600">{bookingNow.renterId}</p>
                        </div>
                        <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-md">
                            <p className="text-lg font-semibold text-gray-800">Thời hạn hợp đồng:</p>
                            <p className="text-gray-600">{format(checkOutDate, 'dd-MM-yyyy')}</p>
                        </div>
                        <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-md">
                            <p className="text-lg font-semibold text-gray-800">Thời gian còn lại:</p>
                            <p className="text-gray-600">{monthsRemaining} tháng và {remainingDaysInMonth} ngày</p>
                        </div>
                    </div>

                    <InvoiceForm bookingId={bookingNow.id} />
                </div>
            );
        }

        if(bookingNow.status === 'WAIT') {
            confirmNotBooking = (
                <div>
                    <p className="text-xl font-bold primary">Người thuê đang yêu cầu hủy thuê nhà này.</p>
                    <button onClick={(ev) => notRentResponse(ev, bookingNow.id)} className="primary">Xác nhận</button>
                </div>
            )
        
            content = (
                <div>
                    {confirmNotBooking}
                    <p className="text-3xl font-semibold text-gray-800">Thông tin người thuê</p>
                    <div className="mt-6 space-y-6">
                        <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-md">
                            <p className="text-lg font-semibold text-gray-800">Người thuê có ID:</p>
                            <p className="text-gray-600">{bookingNow.renterId}</p>
                        </div>
                        <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-md">
                            <p className="text-lg font-semibold text-gray-800">Thời hạn hợp đồng:</p>
                            <p className="text-gray-600">{format(checkOutDate, 'dd-MM-yyyy')}</p>
                        </div>
                        <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-md">
                            <p className="text-lg font-semibold text-gray-800">Thời gian còn lại:</p>
                            <p className="text-gray-600">{monthsRemaining} tháng và {remainingDaysInMonth} ngày</p>
                        </div>
                    </div>

                    <InvoiceForm bookingId={bookingNow.id} />
                    
                    <div className="mt-6 bg-white px-8 py-8 rounded-lg shadow-md">
                        <p className="text-xl font-bold text-primary">
                            Người hiện tại đang ở sắp hết hợp đồng. <br />
                            Người khác có thể đặt ở nhưng bạn chưa thể duyệt. <br />
                        </p>

                        <p className="text-xl font-semibold text-gray-700">Danh sách người đang chờ duyệt</p>
                        <p className="text-lg text-gray-600">Có {bookingPending.length} người đang chờ duyệt</p>
                        {bookingPending.map(booking => (
                            <div className="flex items-center justify-between bg-gray-100 p-4 mt-4 rounded-lg shadow-md" key={booking.id}>
                                <p className="text-gray-800">RenterId: {booking.renterId}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
    }

    if (bookingRented.length > 0) {
        historyRent = (
            <div>
                Danh sách người đã thuê nhà này.
            </div>
        )
    } else {
        historyRent = (
            <div className="bg-gray-100 px-8 py-8 border-t mt-6 rounded-lg shadow-md">
                Hiện tại nhà này chưa có ai thuê trước đây.
            </div>
        )
    }

    const deleteHome = async () => {
        if (!confirmPassword) {
          alert('Vui lòng nhập mật khẩu để xác nhận.');
          return;
        }
    
        try {
          const response = await axios.post(
            `/post/delete-home/${id}`,
            {
              password: confirmPassword, // Mật khẩu xác nhận từ người dùng
            }
          );
    
          alert(response.data.message || 'Nhà này đã được xóa thành công.');
          window.location.href = '/account/places'; // Chuyển hướng về trang chủ hoặc trang đăng nhập
        } catch (error) {
          // Xử lý lỗi
          alert(error.response?.data?.message || 'Có lỗi xảy ra khi xóa nhà này!');
        }
    };
    
      // Đóng popup khi nhấp ra ngoài
    const handleClosePopup = (setPopupState) => (e) => {
        if (e.target === e.currentTarget) {
            setPopupState(false);
        }
    };

    return (
        <div>
            {/* Content Based on Booking Status */}
            <div className='mt-10 bg-gray-100 px-8 py-8 rounded-lg shadow-md'>
                {content}
            </div>
            <div className='fixed right-12 bottom-12 group'>
                <button
                    className="mb-3 flex gap-1 bg-red-600 text-white p-2 rounded-lg transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    onClick={() => setShowDeletePopup(true)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    <p className="font-medium">Delete home</p>
                </button>

                <Link className='flex gap-1 bg-gray-600 text-white p-2 rounded-lg' to={'/account/places/' + id}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    <p className='font-medium'>Edit home</p>
                </Link>
            </div>
            
            {/* Place Details Section */}
            <div className="mt-4 bg-gray-100 px-8 py-8 rounded-lg shadow-md">
                <div className='flex gap-4 items-center'>
                    <h1 className="text-3xl font-semibold text-gray-800">{place.title}</h1>
                </div>
                <div className='flex gap-6 my-2'>
                    <p className='flex gap-1 my-2 font-semibold'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        {place.address}
                    </p>
                    {place.latitude && (
                        <MapComponent places={[place]} />
                    )}                    
                    <a
                        className="flex gap-1 px-2 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                        target='_blank'
                        rel='noopener noreferrer'
                        href={'https://maps.google.com/?q=' + place.address}
                    >
                        Xem trên Google Map
                    </a>
                </div>
                
                <PlaceGallery place={place} />
            </div>

            {/* Place Description and Details */}
            <div className="mt-8 bg-gray-100 grid gap-8 grid-cols-1">
                <div className=" p-6 rounded-lg shadow-md">
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl text-gray-800">Mô tả</h2>
                        <p className="text-gray-600 mt-2">{place.description}</p>
                    </div>
                    <div className='grid grid-cols-3 gap-1 border-t-2 pt-4 pl-4'>
                        <p className="text-gray-800 font-bold">Diện tích: {place.area} m²</p>
                        <p className="text-gray-800 font-bold">Thời gian thuê: {place.duration} tháng</p>
                        <p className="text-gray-800 font-bold">Giá thuê: {place.price} VND</p>
                    </div>
                </div>
            </div>

            {/* Extra Info Section */}
            <div className="bg-gray-100 px-8 py-8 border-t mt-6 rounded-lg shadow-md">
                <h2 className="font-semibold text-2xl text-gray-800">Thông tin thêm</h2>
                <p className="text-gray-600 mt-4 leading-6">{place.extraInfo}</p>
            </div>

            {/* History section */}
            {historyRent}

            {/* Delete popup*/}
            {showDeletePopup && !bookingNow && (
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
                        onClick={deleteHome}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                        Xóa tài khoản
                    </button>
                    </div>
                </div>
                </div>
            )}

            {showDeletePopup && bookingNow && (
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

export default PlaceDetail;
