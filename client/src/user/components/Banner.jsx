import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Banner() {
  const slides = [
    {
      title: "Welcome to Phongtro365",
      description: "Nền tảng hỗ trợ tra cứu và quản lý phòng trọ",
      image: "https://source.unsplash.com/1600x900/?apartment"
    },
    {
      title: "Tìm phòng trọ dễ dàng",
      description: "Đa dạng lựa chọn phòng trọ tại Hà Nội",
      image: "https://source.unsplash.com/1600x900/?room"
    },
    {
      title: "Quản lý hiệu quả",
      description: "Công cụ quản lý cho chủ nhà",
      image: "https://source.unsplash.com/1600x900/?house"
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true
  };

  return (
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <div key={index}>
          <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 px-6 text-center h-[500px]">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-50" 
              style={{ backgroundImage: `url('${slide.image}')` }}
            ></div>
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-4">{slide.title}</h1>
              <p className="text-2xl mb-6">{slide.description}</p>
              <ul className="text-lg text-white font-semibold space-y-4 mb-8">
                <li className="flex items-center justify-center space-x-3">
                  <span className="w-3 h-3 bg-gray-700 rounded-full"></span>
                  <span>Hỗ trợ tìm kiếm trên địa bàn thành phố Hà Nội</span>
                </li>
                <li className="flex items-center justify-center space-x-3">
                  <span className="w-3 h-3 bg-gray-700 rounded-full"></span>
                  <span>Hỗ trợ người cho thuê quản lý</span>
                </li>
                <li className="flex items-center justify-center space-x-3">
                  <span className="w-3 h-3 bg-gray-700 rounded-full"></span>
                  <span>Chính xác, hiệu quả, tiện lợi</span>
                </li>
              </ul>
              <Link to="/home">
                <button className="bg-white text-blue-500 font-semibold py-3 px-6 rounded-full 
                  shadow-lg transform hover:scale-105 hover:bg-blue-500 hover:text-white 
                  hover:shadow-xl transition-all duration-300 ease-in-out">
                  Xem danh sách phòng trọ
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default Banner;