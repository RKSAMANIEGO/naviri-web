import Modal from "react-modal";
import { message } from "antd";
import styles from "./ModalQuestions.module.css";
import { Form, Input, Button, Space } from "antd";
import {addQuestions,updateQuestions,	questionById} from "../../services/questionService";
import { useState } from "react";

Modal.setAppElement("#root");
const ModalQuestions = ({ isOpen, onClosed, titleModal,addConfirm,putConfirm }) => {

	const [form] = Form.useForm();
  	const [successModified,setSuccesModified] = useState(false);

  //BUSCAR PREGUNTA POR SU ID PARA ACTUALIZAR
	if (titleModal === "updateQuestion") {
		const idQues = localStorage.getItem("idQuestions");
    const getQuestionsId = async (idQues) => {
		  const response = await questionById(idQues);
		  if (response.status === 200) {
			    form.setFieldsValue({
				    question: response.data.question, 
				    answer: response.data.answer, 
			    });
		}};

		getQuestionsId(idQues);
	}

	//ENVIAR LOS DATOS DEL FORM
	const onFinish = async (values) => {
		const newQuestion = {
			question: values.question,
			answer: values.answer,
		};

		
		if (titleModal === "updateQuestion") {                //ACTUALIZAR PREGUNTA  
      console.log(newQuestion);
			const idQues = localStorage.getItem("idQuestions");
			const response = await updateQuestions(idQues, newQuestion);
			if(response.status === 200){
        setSuccesModified(!successModified);
        putConfirm(!successModified);
        message.success("Pregunta Actualizado con exito");
        form.resetFields();
        onClosed();
      }else{
        message.error(response.message);
      }

		} else {                                                //AGREGAR PREGUNTA
			const response = await addQuestions(newQuestion);
			if(response.status === 201){
          setSuccesModified(!successModified);
          addConfirm(!successModified);
          message.success("Pregunta Agregada con exito");
          form.resetFields();
          onClosed();
      }else{
          message.error(response.message);
      }
		}
	};

	//ESTILOS AL MODAL
	const styleModal = {
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			transform: "translate(-50%,-50%)",
			width: "50%",
			height: "auto",
			backgroundColor: "#fff",
			borderRadius: "10px",
			position: "relative",
		},
		overlay: {
			backgroundColor: "rgba(0,0,0,0.5)",
			zIndex: "100",
		},
	};

	//ACTUALIZAR EL TITULO Y EL BOTON DE ACUERDO AL CLICK
	let titleModalState;
	(titleModal === "updateQuestion") ?titleModalState = "Actualizar":titleModalState = "Agregar";
	

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onClosed}
			style={styleModal}
			shouldCloseOnOverlayClick={false}>
			<section className={styles.modalContainer}>
				<h2>{titleModalState} Preguntas</h2>
				<Form
					className={styles.form}
					layout="vertical"
					form={form}
					name="respuestas_form"
					onFinish={onFinish}
					autoComplete="off">
					<Form.Item
						className={styles.pregunta}
						name="question"
						label="Ingrese la Pregunta">
						<Input
							placeholder="Escribiendo...✍🏻"
							className={styles.inputPregunta}
							style={{ width: "100%", border: "1px solid gray" }}
						/>
					</Form.Item>

					<Form.Item
						className={styles.pregunta}
						name="answer"
						label="Ingrese la Respuesta">
						<Input
							placeholder="Escribiendo...✍🏻"
							className={styles.inputPregunta}
							style={{ width: "100%", border: "1px solid gray" }}
						/>
					</Form.Item>

					{/**
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
      */}
					<Form.Item>
						<Button type="primary" htmlType="submit">
							{titleModalState}
						</Button>
					</Form.Item>

					<label className={styles.closedModal} onClick={onClosed}>
						{" "}
						&#215;
					</label>
				</Form>
			</section>
		</Modal>
	);
};

export default ModalQuestions;
