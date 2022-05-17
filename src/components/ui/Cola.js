import React from 'react'
import { useDispatch, useSelector } from 'react-redux';


export const Cola = () => {
    const { events, activeEvent } = useSelector( state => state.calendar );
    console.log('esto es oro: ', typeof(events),events)
    let cargas =[];
    for (let clave in events){
        cargas.push(events[clave]);
    }
    console.log('carfas listas',cargas)
  return (
        <div>
            {cargas.map(carga=>{
                return(
                    <div className ='container'>
                    <h1>{carga.title}</h1>
                    </div>
                    ) })}
        </div>
    
  )
}
