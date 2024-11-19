import LeftMenu from '@/components/built-in/left-menu/left-menu'
import React from 'react'

const LeftMenuPage = ({ type }: { type: "home" | "profile" }) => {
  return (
    <LeftMenu type={type} /> 
  )
}

export default LeftMenuPage
