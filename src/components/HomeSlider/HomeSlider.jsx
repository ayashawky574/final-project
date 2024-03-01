import React from 'react'
import Slider from 'react-slick'
import myimg1 from "../../assets/img/img1.jpg";
import myimg2 from "../../assets/img/img2.jpg";
import myimg3 from "../../assets/img/img3.webp";
export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className='row g-0'>
      <div className="col-md-8">
         <Slider {...settings}>
         <img src={myimg1} alt="img1" height={500} className='w-100'/>
        <img src={myimg2} alt="img2" height={500} className='w-100'/>
        <img src={myimg3} alt="img2" height={500} className='w-100'/>
         </Slider>
      </div>
      <div className="col-md-4">
        <img src={myimg1} alt="img1" height={250} className='w-100'/>
        <img src={myimg2} alt="img2" height={250} className='w-100'/>
      </div>
    </div>
  )
}
