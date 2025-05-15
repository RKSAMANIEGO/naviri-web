import React, { useEffect, useState } from 'react'
import styles from '../../styles/Questions.module.css'
import styled from 'styled-components';
import { Collapse, message } from 'antd';
import { DoubleLeftOutlined } from '@ant-design/icons';
import HeaderFrequentlyAskedQuestions from '../Header/HeaderFrequentlyAskedQuestions';

const categorie=[
    {
        id: 1,
        question: "¿Los productos son 100% naturales?",
        answer: "Sí, todos nuestros productos están elaborados con ingredientes naturales, libres de parabenos, sulfatos y químicos agresivos."
        
    },
    {
        id: 2,
        question: "¿Qué métodos de pago aceptan?",
        answer: "Aceptamos tarjetas de débito, crédito, transferencias bancarias y pagos por billeteras digitales."
        
    },
    {
        id: 3,
        question: "¿Realizan envíos a todo el país?",
        answer: "Sí, hacemos envíos a nivel nacional. El tiempo de entrega varía entre 2 y 5 días hábiles dependiendo de la ubicación."
        
    },
    {
        id:4,
        question: "¿Cuánto cuesta el envío?",
        answer: "El costo del envío se calcula automáticamente al finalizar tu compra, dependiendo de tu ubicación y el peso del paquete."
    },
    {
        id: 5,
        question: "¿Puedo devolver un producto si no estoy satisfecho?",
        answer: "Sí, aceptamos devoluciones dentro de los 7 días posteriores a la entrega, siempre que el producto esté sin uso y en su empaque original."
        
    },
    {
        id: 6,
        question: "¿Ofrecen kits de regalo o promociones?",
        answer: "¡Claro! Contamos con kits temáticos y promociones especiales que puedes encontrar en nuestra sección de ofertas o promociones."
        
    },
    {
        id: 7,
        question: "¿Cómo puedo saber qué tipo de exfoliante o aceite es adecuado para mí?",
        answer: "En cada producto incluimos una descripción detallada con recomendaciones según el tipo de piel o necesidad. También puedes contactarnos para una asesoría personalizada."
        
    },
    {
        id:8,
        question: "¿Los aceites y jabones son aptos para pieles sensibles?",
        answer: "Sí, muchos de nuestros productos están formulados específicamente para pieles sensibles. Te recomendamos revisar la descripción y los ingredientes antes de comprar."
    }
]
import {listQuestions} from '../../../admin-questions/services/questionService';
const ContentQuestions = () => {
    const [activeKey, setActiveKey] = useState(null);
    const [catFilter,setCatFilter]=useState(null);
    const [dataQuestions ,setDataQuestions]=useState(null);
    const [widthWindow,setWidthWindow]=useState({width:window.innerWidth,height:window.innerHeight});


    const [dataFAQ, setDataFAQ] = useState(null);
    useEffect(()=>{
        (catFilter !== null) ? setDataQuestions(catFilter) : setDataQuestions(categorie);
    },[catFilter,dataQuestions]);


    const questionsData = async() =>{
      const response = await listQuestions();
      if(response.status === 200){
        setDataFAQ(response.data.data);
        console.log(response.data.data);
      } 
    }

    useEffect(()=>{
      questionsData();
    },[])


    useEffect(()=>{
        const handlerWidthPage=()=>setWidthWindow({width:window.innerWidth,height:window.innerHeight})
        window.addEventListener("resize",handlerWidthPage);

        return ()=> window.removeEventListener("resize",handlerWidthPage)

    },[])

    const handlePanelChange = (keys) => {
        setActiveKey(keys.length > 0 ? keys[0] : null); 
    };


    //ESTILOS DEL COMPONENTE COLLAPSE PARA PC
    const CustomCollapse = styled(Collapse)`
    border-radius: 10px;
    border:none;
    .ant-collapse-item {
        border-bottom: none;
    }
    .ant-collapse-header {
        font-weight: bold;
        color: white !important;
        background: linear-gradient(to right,#ef5fac, #f18ec3) ;
    }
    `;

    //ESTILOS DEL COMPONENTE COLLAPSE PARA MOVILE
    const CustomCollapseMovil = styled(Collapse)`
    border-radius: 6px;
    border:none;
    .ant-collapse-item {
        border-bottom: none;
        font-size:11px
    }
    .ant-collapse-header {
        font-size:10px
        font-weight: bold;
        color:white !important;
        background-color:  #f278ca;
    
    }
    `;
    
    //TRAER EL TEXTO DEL SEARCH
    const getTextSearch=(text)=>{
        if(text!== null){
            const  categorieFilter=categorie.filter(cat => cat.name.toLowerCase().includes(text.toLowerCase()));     
            (categorieFilter.length>0) ? setCatFilter(categorieFilter) :  message.warning("No Existe Esa Sección de Preguntas");
        }
    }
    return (
        <div className={styles.container}>
        <HeaderFrequentlyAskedQuestions setTextSearch={getTextSearch}/>
        <label className={styles.wrapperIcon}> <DoubleLeftOutlined className={styles.iconCategorie}/>Resolvemos tus dudas aquí.</label>
        
        {dataFAQ && 
        <div className={styles.questionFilter}>
          {widthWindow.width < 500 ?
            <CustomCollapseMovil
              className={styles.collapse}
              activeKey={activeKey ? [activeKey] : []} 
              onChange={handlePanelChange} 
              accordion 
        >
              {dataFAQ.map(obj => (
                <Collapse.Panel key={obj.id} header={obj.question}>
                  <p className={styles.answers}>{obj.answer}</p>
                </Collapse.Panel>
              ))}
            </CustomCollapseMovil>
            :
            <CustomCollapse
              className={styles.collapse}
              activeKey={activeKey ? [activeKey] : []} 
              onChange={handlePanelChange}
              accordion
            >
              {dataFAQ.map(obj => (
                <Collapse.Panel key={obj.id} header={obj.question}>
                  <p className={styles.answers}>{obj.answer}</p>
                </Collapse.Panel>
              ))}
            </CustomCollapse>
          }
        </div>
        }
      </div>
    )
}

            

export default ContentQuestions
