
import React from 'react'

import HeroSection from '@/app/Components/HeroSection'
import TVBody from './components/TvBody'


const page = () => {
  return (
    <div>
      <HeroSection data={'tv'}/>
      <TVBody/>
    </div>
  )
}

export default page