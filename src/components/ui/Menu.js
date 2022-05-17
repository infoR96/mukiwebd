import React, { useState } from 'react'
import { CalendarScreen } from '../calendar/CalendarScreen'
import { Cola } from './Cola'
import { Navbar } from './Navbar'

export const Menu = () => {
    const [cola, setCola] = useState({vista:true})
    const {vista}= cola;





  return (
    <div>
        <Navbar/>
        <button 
    className="btn btn-primary"
    onClick={()=> setCola({...cola,vista:!vista}) }
>
    
    <i className="fa fa-bolt" aria-hidden="true"></i>
    <span>  Cola</span>
</button>

        {vista ? <CalendarScreen/>:<Cola/>}
        
    </div>
  )
}
