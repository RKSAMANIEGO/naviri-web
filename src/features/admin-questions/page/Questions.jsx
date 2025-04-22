  import React, { useState } from 'react'
  import { Input ,Tooltip} from 'antd'
  import { PlusOutlined } from '@ant-design/icons';
  import styles from '../styles/Questions.module.css'
  import TableQuestions from '../components/TableQuestions/TableQuestions';
  import ModalQuestions from '../components/ModalQuestions/ModalQuestions';


  const Questions = () => {
    const {Search} = Input;
    const [isOpen, setIsOpen] =useState(false);

    return (
      <>
      <div className={styles.wrapperQuestions}> 
          <h1>Preguntas y Respuestas</h1>
          <Search  placeholder='Ingrese la Pregunta...' enterButton className={styles.search}/>
          <TableQuestions/>
          <Tooltip title="Agregar Una Pregunta"  placement="left" overlayInnerStyle={{background:"white",color:"gray",boxShadow:"0 0 15px gray"}}>
            <PlusOutlined className={styles.addOptions} onClick={()=>setIsOpen(true)}/>
          </Tooltip>
          
      </div>
      <ModalQuestions isOpen={isOpen} onClosed={()=>setIsOpen(false)}/>
      </>
    )
  }

  export default Questions
