import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import moment from 'moment';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';

import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from '../../actions/events';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours'); // 3:00:00
const nowPlus1 = now.clone().add(1, 'hours');


const initCarga = {
    ruc: '',
    nombre: '',
    contacto: '',
    tonelaje: '',
    ticket: '',
    acopiador: '',
    mineral: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
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


export const CargaModal = () => {

    const { modalOpen } = useSelector(state => state.ui);
    const { activeEvent }= useSelector(state => state.calendar);
    const dispatch = useDispatch();
    const [dateStart, setDateStart] = useState(now.toDate());
    const [ dateEnd, setDateEnd ] = useState( nowPlus1.toDate() );
    const [titleValid, setTitleValid] = useState(true);   
    const [formValues, setFormValues] = useState(initCarga);
    const { ruc, nombre, contacto, tonelaje, ticket, acopiador, mineral,start,end } = initCarga;
    const [data, setData] = useState(initCarga);

    useEffect(() => {
        if (activeEvent) {
            setFormValues(activeEvent);
        } else {
            setFormValues(initCarga);
        }
    }, [activeEvent, setFormValues])

 

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }


    const closeModal = () => {
        // TODO: cerrar el modal
        dispatch(uiCloseModal());
        dispatch(eventClearActiveEvent());
        setFormValues(initCarga);
    }

    const handleStartDateChange = (e) => {
        setDateStart(e);
        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        console.log(e)

        const momentStart = moment(start);
        const momentEnd = moment(end);

        if (momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire('Error', 'La fecha fin debe de ser mayor a la fecha de inicio', 'error');
        }

        if (nombre.trim().length < 2) {
            return setTitleValid(false);
        }

        if (activeEvent) {
            dispatch(eventStartUpdate(formValues))
        } else {
            dispatch(eventStartAddNew(formValues));
        }


        setTitleValid(true);
        closeModal();

    }


    

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
        <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
        >

            <div className='d-flex flex-row  bg-primary p-4 my-3 ml-4 formingreso '>
                <di className='Container '>
                    <div>
                        <div className='row container-fluid '>
                            <form onSubmit={handleSubmitForm}>
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
                        
                        value={ dateStart }
                        minDate={ dateStart }
                        className="form-control"
                    /> */}
                                    </div>


                                    <h4>Ingreso:</h4>
                                    <button className='btn btn-success py-3 mt-3'>
                                        <i className="far fa-save"></i>

                                        <span>CARGA INGRESADA</span>
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>

                </di>
            </div>
        </Modal>
    )

}
