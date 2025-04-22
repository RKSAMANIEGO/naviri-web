import React from 'react'
import Modal from 'react-modal'
import { message } from 'antd';
import styles from './ModalQuestions.module.css'
import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { questions } from '../../utils/Questions';


Modal.setAppElement("#root")
const ModalQuestions = ({isOpen,onClosed,titleModal}) => {

    const [form] = Form.useForm();

    questions && console.log(questions.length);

    const onFinish = (values) => {
      const newQuestion = {
        id: questions.length + 1,
        questions: values.question,
        answers: values.respuestas,
        categorie: "Preguntas Basicas"
      }
      if(questions.push(newQuestion)){
        message.success("Pregunta Agregada con exito");
      };
      console.log(newQuestion );

      };
    
    //ESTILOS AL MODAL
    const styleModal={
        content:{
            top:'50%',
            left:'50%',
            right:'auto',
            bottom:'auto',
            transform:'translate(-50%,-50%)',
            width:'50%',
            height:'auto',
            backgroundColor:'#fff',
            borderRadius:'10px',
            position:'relative',
        },
        overlay:{
            backgroundColor:'rgba(0,0,0,0.5)',
            zIndex:'100',
        }
    }

    let titleModalState;
    if(titleModal === "updateQuestion"){
      titleModalState="Actualizar"
    }else{
      titleModalState="Agregar"
    }
  return (
    <Modal
        isOpen={isOpen}
        onRequestClose={onClosed}
        style={styleModal}
        shouldCloseOnOverlayClick={false}
    >   
    <section className={styles.modalContainer}>
      <h2>{titleModalState} Preguntas</h2>
      <Form className={styles.form} layout='vertical' form={form} name="respuestas_form" onFinish={onFinish} autoComplete="off">
        <Form.Item 
          className={styles.pregunta} 
          name="question"
          label="Ingrese la Pregunta" 
          >
          <Input placeholder='Escribiendo...✍🏻' className={styles.inputPregunta} style={{width:"100%", border:"1px solid gray"}}/>
        </Form.Item>
      
        <Form.List name="respuestas">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', width:"100%", height:"50px"}} align='baseline'>
                <Form.Item
                  {...restField}
                  style={{width:"100%"}}
                  name={name}
                  rules={[{ required: true, message: 'Ingrese una respuesta' }]}
                >
                  <Input placeholder="Respuesta..." className={styles.inputRespuestas}  style={{width:"590px", border:"1px solid gray"}}/>
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()}   style={{border:"1px dashed rgb(42, 42, 221)"}} icon={<PlusOutlined/>}>Agregar respuesta</Button>
            </Form.Item>
          </>
        )}
        </Form.List>

        <Form.Item>
          <Button  type="primary" htmlType="submit">Guardar</Button>
        </Form.Item>

      <label className={styles.closedModal} onClick={onClosed} > &#215;</label>

    </Form>

    </section>
    </Modal>
  )
}

export default ModalQuestions
