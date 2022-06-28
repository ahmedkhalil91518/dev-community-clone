import React from 'react'
import TopCSS from "./Top.module.css"
import { Outlet } from "react-router-dom";
const Top = () => {
  return (
    <div><Outlet /></div>
  )
}

export default Top