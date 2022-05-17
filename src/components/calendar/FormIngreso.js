import React, { useState, useEffect } from 'react'
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';


const initState = {
    ruc: '',
    nombre: '',
    contacto: '',
    tonelaje: '',
    ticket: '',
    acopiador: '',
    mineral: ''
}
const empresas = [
    {
        id: '1',
        razon: 'ARZAC CONSULTING SAC',
        ruc: '20608227629',
        cel: '999999999'
    },
    {
        id: '2',
        razon: 'MINING LOS LAURELES EIRL ',
        ruc: '206006155281',
        cel: '999999999'
    },
    {
        id: '3',
        razon: 'MINERA PICAPIEDRA 1313 EIRL',
        ruc: '20606448598',
        cel: '999999999'
    },
    {
        id: '4',
        razon: 'CONSORCIO HUERTA MINING EIRL',
        ruc: '20606177977',
        cel: '999999999'
    }
]


const now = moment().minutes(0).seconds(0).add(1,'hours');
export const FormIgreso = () => {
    const [ dateStart, setDateStart ] = useState( now.toDate() );
    const [data, setData] = useState(initState)
    const handleInputChange = ({ target }) => {
        console.log(data)

        setData({
            ...data,
            [target.name]: target.value
        });

    }



    const { ruc, nombre, contacto, tonelaje, ticket, acopiador, mineral } = data;

    const select = ({ target }) => {
        const seleccion = empresas.filter(empresa => empresa.id === target.value)
        JSON.stringify(seleccion)
        const { razon, ruc, cel } = seleccion[0];

        console.log('esta es la seleccion: ', typeof (seleccion), seleccion);
        setData({
            ...data,
            ruc: ruc,
            nombre: razon,
            contacto: cel
        });
    }

    return (
        
        <div className='d-flex flex-row  bg-primary p-4 my-3 ml-4 formingreso '>
            <div className='Container '>
                <div>
                    <div className='row container-fluid '>
                        <form >
                        <div className='Form-group col-12'>
                            <input
                                type='text'
                                className='form-control p-3 my-2 inputs'
                                placeholder='RUC/DNI'
                                value={ruc}
                                name="ruc"
                                onChange={handleInputChange}
                            />
                            <input
                                type='text'
                                className='form-control p-3  my-2 inputs'
                                placeholder='NOMBRE'
                                value={nombre}
                                name='nombre'
                                onChange={handleInputChange}
                            />
                            <input
                                type='text'
                                className='form-control p-3  my-2 inputs'
                                placeholder='NUMERO DE CONTACTO'
                                value={contacto}
                                name='contacto'
                                onChange={handleInputChange}
                            />
                            <div className="dropdown mx-5 offset-2 col-10">
                                <button className="btn btn-warning btn-lg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    EMPRESA ASOCIADA
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <button className="dropdown-item" value="1" onClick={select}  >ARZAC CONSULTING SAC</button>
                                    <button className="dropdown-item" value="2" onClick={select}>MINING LOS LAURELES EIRL</button>
                                    <button className="dropdown-item" value="3" onClick={select}>MINERA PICAPIEDRA 1313 EIRL</button>
                                    <button className="dropdown-item" value='4' onClick={select}>CONSORCIO HUERTA MINING EIRL</button>
                                </div>
                            </div>
                            <input
                                type='number'
                                step={0.10}
                                className='form-control p-3 my-2 inputs'
                                placeholder='Tonelaje de Ingreso'
                                value={tonelaje}
                                name='tonelaje'
                                onChange={handleInputChange}
                            />
                            <input
                                type='text'
                                className='form-control p-3 my-2 inputs'
                                placeholder='NUMERO DE TICKET'
                                value={ticket}
                                name='ticket'
                                onChange={handleInputChange}
                            />
                            <input
                                type='text'
                                className='form-control p-3  my-2 inputs'
                                placeholder='ACOPIADOR'
                                value={acopiador}
                                name='acopiador'
                                onChange={handleInputChange}
                            />
                            <input
                                type='text'
                                className='form-control p-3  my-2 inputs'
                                placeholder='MINERAL'
                                value={mineral}
                                name='mineral'
                                onChange={handleInputChange}
                            />
                            <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    {/* <DateTimePicker
                        onChange={}
                        value={ dateStart }
                        minDate={ dateStart }
                        className="form-control"
                    /> */}
                </div>
           

                            <h4>Ingreso:{now}</h4>
                            <button className='btn btn-success py-3 mt-3'>
                                <i className="far fa-save"></i>

                                <span>CARGA INGRESADA</span>
                            </button>
                 
                        </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>

    )
}
