import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

function Banner() {
  const slides = [
    {
      title: "Chào mừng đến với Phongtro365",
      description: "Kết nối bền chặt giữa chủ nhà và người thuê",
      image: "/images/thiet-ke-nha-tro-dep.jpg"
    },
    {
      title: "Tìm phòng trọ tiện lợi, nhanh chóng",
      description: "Hệ thống phòng trọ đa dạng, phong phú",
      image: "/images/phong-tro-dep.jpg"
    },
    {
      title: "Quản lý dễ dàng, hiệu quả",
      description: "Công cụ quản lý tuyệt vời cho chủ nhà",
      image: "/images/noi-that-phong-tro1.jpg"
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    appendDots: dots => (
      <div style={{ position: 'absolute', bottom: '0px', width: '100%' }}>
        <ul style={{ margin: '0px' }}> {dots} </ul>
      </div>
    ),
  };

  return (
    <div className='w-full'>
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <div key={index} className="relative h-[500px] flex items-center bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="flex items-center justify-center p-8 text-white bg-black bg-opacity-50">
            <div className='w-full h-1/2'>
              <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
              <p className="text-xl mb-6">{slide.description}</p>
              <ul className="text-lg font-semibold space-y-4">
                <li className="flex items-center space-x-3">
                  <span className='size-3 bg-white rounded-full'></span>
                  <span>Hỗ trợ tìm kiếm trên địa bàn thành phố Hà Nội</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-3 h-3 bg-white rounded-full"></span>
                  <span>Quản lý phòng trọ hiệu quả</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-3 h-3 bg-white rounded-full"></span>
                  <span>Đa dạng lựa chọn phòng trọ</span>
                </li>
              </ul>
              <Link to="/home">
                <button className="mt-5 bg-white text-blue-500 font-semibold py-3 px-6 rounded-full 
                  shadow-lg transform hover:scale-105 hover:bg-blue-500 hover:text-white 
                  hover:shadow-xl transition-all duration-300 ease-in-out">
                  Xem danh sách phòng trọ
                </button>
              </Link>
            </div>
            <div className="w-full h-full">
              <img src={slide.image} alt={slide.title} className="object-contain" />
            </div>
        </div>
      </div>
      ))}
    </Slider>
    </div>
  );
}

// {/* Footer */}
// <footer className="text-gray-700 bg-gradient-to-t from-blue-100 to-white py-6">
// <div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
//   <div className="text-lg font-bold mb-2">PhongTro365</div>
//   <div className="text-sm">
//     Email:{" "}
//     <a href="mailto:dbnk1510@gmail.com" className="text-blue-600">
//       dbnk1510@gmail.com
//     </a>{" "}
//     | Điện thoại: (+84) 37 6827 387
//   </div>
//   <div className="mt-4 space-x-4">
//     <a href="#" className="text-gray-600 hover:text-blue-600">
//       Trang chủ
//     </a>
//     <a href="#" className="text-gray-600 hover:text-blue-600">
//       Thông tin
//     </a>
//   </div>
// </div>
// </footer>

export default Banner;