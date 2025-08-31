import HeroSection from '@/app/Components/HeroSection'
import React from 'react'
import Body from './components/Body'

const page = () => {
  return (
    <div>
      <HeroSection data={'movie'}/>
      <Body/>
    </div>
  )
}

export default page