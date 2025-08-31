import React from 'react'
import HeroSection from './Components/HeroSection'
import Body from './(pages)/movies/components/Body'
import TVBody from './(pages)/tv/components/TvBody'

const page = () => {

  const datas = ['movie','tv']
  return (
    <div>
      <HeroSection data={datas[Math.floor(Math.random()*2)]}/>
      <Body/>
      <TVBody/>
    </div>
  )
}

export default page