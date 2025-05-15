  import { useState } from 'react'
  import { Input ,Tooltip} from 'antd'
  import { PlusOutlined } from '@ant-design/icons';
  import styles from '../styles/Questions.module.css'
  import TableQuestions from '../components/TableQuestions/TableQuestions';
  import ModalQuestions from '../components/ModalQuestions/ModalQuestions';


  const Questions = () => {
    const {Search} = Input;
    const [isOpen, setIsOpen] =useState(false);
    const [updateDataTable,setUpdateDataTable] = useState(false);

    const updateListQuestions = (confirm)=> (confirm === updateDataTable) ? setUpdateDataTable(!confirm) : setUpdateDataTable(confirm);
    
    return (
      <>
      <div className={styles.wrapperQuestions}> 
          <h1>Preguntas y Respuestas</h1>
          <Search  placeholder='Ingrese la Pregunta...' enterButton className={styles.search}/>
          <TableQuestions confirmaddQuestion = {updateDataTable}/>
          <Tooltip title="Agregar Una Pregunta"  placement="left" overlayInnerStyle={{background:"white",color:"gray",boxShadow:"0 0 15px gray"}}>
            <PlusOutlined className={styles.addOptions} onClick={()=>setIsOpen(true)}/>
          </Tooltip>
          
      </div>
      <ModalQuestions isOpen={isOpen} onClosed={()=>setIsOpen(false)}  addConfirm={ updateListQuestions} />
      </>
    )
  }

  export default Questions
