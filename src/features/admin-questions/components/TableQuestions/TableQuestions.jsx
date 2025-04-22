import React, { useState } from 'react'
import {questions} from '../../utils/Questions'
import Table from 'react-data-table-component'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import styles from './TableQuestions.module.css'
import ModalQuestions from '../ModalQuestions/ModalQuestions'
import Swal from 'sweetalert2'
const TableQuestions = () => {
    const [isOpenModal,setIsOpenModal]=useState(false)

    const styleTableQuestions={
        headCells:{
            style:{
                display:"flex",
                justifyContent:"start",
                fontSize:"0.8rem",
                fontWeight:"bold",
                color: 'rgba(255, 107, 188, 1)',
                backgroundColor:"rgba(255, 241, 249, 1)",
                padding:"10px 15px",
            
            } 
        },
        cells:{
            style:{
                display:"flex",
                justifyContent:"start",
                fontSize:"0.7rem",
                fontWeight:"700",
                padding:"5px 15px",
                textTransform:"capitalize"
            }
        },
    }

    const colums =[
        {
            name:"Preguntas",
            selector:row=>row.questions,
            width:"35%"
        },
        {
            name:"Respuestas",
            selector:row=>row.answers,
            width:"35%"
        },
        {
            name:"Categoria",
            selector:row=>row.categorie,
            width:"15%"
        },
        {
            name:"Opciones",
            cell:row=>(
                <div className={styles.wrapperOptions}>
                    <EditOutlined className={styles.EditOption} onClick={()=>setIsOpenModal(true)}/>
                    <DeleteOutlined className={styles.DeleteOption} onClick={()=>{
                        Swal.fire({
                            title: '¿Estas seguro de eliminar esta pregunta?',
                            text: "No podras revertir este cambio",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: 'rgb(228, 34, 170)',
                            cancelButtonColor: 'rgb(38, 86, 218)',
                            confirmButtonText: 'Si, eliminar!'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                questions.pop(row.id)
                                Swal.fire(
                                    'Eliminado!',
                                    `La pregunta ${row.id} ha sido eliminada.`,
                                    'success'
                                )
                            }
                        }


                        )
                    }}/>
                </div>
            ),
            width:"15%"
        }

    ]

    return (
    <>
        <Table
        columns={colums}
        data={questions}
        customStyles={styleTableQuestions}
        highlightOnHover
        pointerOnHover
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5]}
        pagination
        />
        
        <ModalQuestions isOpen={isOpenModal} onClosed={()=> setIsOpenModal(false)} titleModal="updateQuestion"/>
    </>
    
    )
}

export default TableQuestions
