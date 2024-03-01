import React from 'react'
import Products from '../Products/Products'
import Categories from '../Categories/Categories'
import HomeSlider from '../HomeSlider/HomeSlider'

export default function Home() {
  return (
    <div>
      <HomeSlider/>
      <h2>Category</h2>
      <Categories/>
      <h2>Products</h2>
      <Products/>
    </div>
  )
}
