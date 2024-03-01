import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'

export default function Categories() {
  const [categoryList , setCategory] = useState([])
  async function getcategory(){
   let{data} = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
   setCategory(data.data)
  }
  useEffect(()=>{
    getcategory()
  },[])
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1
  };
  return (
    <div>
      <Slider {...settings}>
        {
          categoryList.map((category)=>{
            return <>
             <img className='w-100 ' src={category.image} height={300}/>
             <p>{category.name}</p>
            </>
          })
        }
      </Slider>
      </div>
  )
}
