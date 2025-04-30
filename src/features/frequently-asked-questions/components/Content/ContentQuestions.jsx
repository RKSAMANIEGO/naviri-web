import React, { useEffect, useState } from 'react'
import styles from '../../styles/Questions.module.css'
import styled from 'styled-components';
import { Collapse, message } from 'antd';
import { DoubleLeftOutlined } from '@ant-design/icons';
import HeaderFrequentlyAskedQuestions from '../Header/HeaderFrequentlyAskedQuestions';

/*
const categorie=[
    {
        id:1,
        name:"Categorie 1",
        description:"Categorie 1 description",
        image:"https://pixcap.com/cdn/library/template/1716824237738/thumbnail/Task_Management_3D_Animated_Icon_transparent_400_emp.webp",
        questions:[
            {
                id: 1,
                question: "What is your question 1?",
                answer: "This is the answer to your question."
                
            },
            {
                id: 2,
                question: "What is your question 2?",
                answer: "This is the answer to your question 1."
                
            },
            {
                id: 3,
                question: "What is your question 3?",
                answer: "This is the answer to your question 2."
                
            },
            {
                id:4,
                question: "What is your question 4?",
                answer: "This is the answer to your question 3."
                
            }
        ]
    },
    {
        id:2,
        name:"Categorie 2",
        description:"Categorie 2 description",
        image:"https://thumbs.dreamstime.com/b/testimoni-d-rendering-illustration-icon-free-photo-235254727.jpg",
        questions: [
            {
                id: 1,
                question: "What is your question 1",
                answer: "This is the answer to your question for Category 2."
            },
            {
                id: 2,
                question: "What is your question 2?",
                answer: "This is the answer to your question for Category 2."
            },
            {
                id: 3,
                question: "What is your question 3?",
                answer: "This is the answer to your question for Category 2."
            }
        ]    
    },
    {
        id:3,
        name:"Categorie 3",
        description:"Categorie 3 description",
        image:"https://thumbs.dreamstime.com/b/d-illustration-representing-rating-system-symbolizing-customer-feedback-reviews-isolated-white-background-368033148.jpg",
        questions: [
            {
                id: 1,
                question: "What is your question for Category 3?",
                answer: "This is the answer to your question for Category 3."
            }
        ]   

    },
    {
        id:4,
        name:"Categorie 4",
        description:"Categorie 4 description",
        image:"https://cdn3d.iconscout.com/3d/premium/thumb/idea-pregunta-8691333-6963916.png?f=webp",
        questions: [
            {
                id: 1,
                question: "What is your question 1",
                answer: "This is the answer to your question for Category 4."
            },
            {
                id: 2,
                question: "What is your question 2",
                answer: "This is the answer to your question for Category 4."
            }
        ]   
    }
]
    */
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

const ContentQuestions = () => {

    //const [questionFilter, setQuestionFilter] = useState(null);
    //const [questionByCategorie,setQuestionByCategorie]=useState([]);
    // const [isVisibleIcon,setVisibleIcon]=useState(true);
    const [catFilter,setCatFilter]=useState(null);
    const [dataQuestions ,setDataQuestions]=useState(null);
    const [widthWindow,setWidthWindow]=useState({width:window.innerWidth,height:window.innerHeight});

    useEffect(()=>{
        (catFilter !== null) ? setDataQuestions(catFilter) : setDataQuestions(categorie);
    },[catFilter,dataQuestions])


    useEffect(()=>{
        const handlerWidthPage=()=>setWidthWindow({width:window.innerWidth,height:window.innerHeight})
        window.addEventListener("resize",handlerWidthPage);

        return ()=> window.removeEventListener("resize",handlerWidthPage)

    },[])


    //ESTILOS DEL COMPONENTE COLLAPSE PARA PC
    const CustomCollapse = styled(Collapse)`
    border-radius: 10px;
    border:none;
    color:white;
    .ant-collapse-item {
        border-bottom: none;
    }
    .ant-collapse-header {
        font-weight: bold;
        color:white;
        background:  #feb4e5;
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
        background-color:  #f3d3e7;
    
    }
    `;
    
    //TRAER EL TEXTO DEL SEARCH
    const getTextSearch=(text)=>{
        if(text!== null){
            const  categorieFilter=categorie.filter(cat => cat.name.toLowerCase().includes(text.toLowerCase()));     
            (categorieFilter.length>0) ? setCatFilter(categorieFilter) :  message.warning("No Existe Esa Sección de Preguntas");
        }
    }
    /*
    //CLICK AL CARDS CATEGORIE QUESTIONS
    const handlerCatQuestions =(id)=>{
        setVisibleIcon(false);
        const catQuestionById = categorie.find(cat => cat.id === id);
        setQuestionFilter(catQuestionById);

        const preguntas= catQuestionById.questions.flatMap(obj=>{
            return {key:`${obj.id}`,label:`${obj.question}`,children:`${obj.answer}`}
        })
        setQuestionByCategorie(preguntas);

        console.log(catQuestionById);
        console.log(preguntas);
    }
    */
    return (
    <div className={styles.container}>
        <HeaderFrequentlyAskedQuestions setTextSearch={getTextSearch}/>
            <label className={styles.wrapperIcon}> <DoubleLeftOutlined className={styles.iconCategorie}/>Resolvemos tus dudas aquí.</label>
            <div className={styles.questionFilter}>
                    {widthWindow.width < 500 ?
                        <CustomCollapseMovil className={styles.collapse} defaultActiveKey={categorie.map(obj=>obj.id.toString())}>
                                    {categorie.map(obj => (
                                        <Collapse.Panel key={obj.id} header={obj.question}>
                                            <p className={styles.answers}>{obj.answer}</p>
                                        </Collapse.Panel>
                                    ))}
                        </CustomCollapseMovil>
                    :
                        <CustomCollapse className={styles.collapse}  defaultActiveKey={categorie.map(obj=>obj.id.toString())}>
                                    {categorie.map(obj => (
                                        <Collapse.Panel key={obj.id} header={obj.question}>
                                            <p className={styles.answers}>{obj.answer}</p>
                                        </Collapse.Panel>
                                    ))}
                        </CustomCollapse>
                    }
            </div>
    </div>
    )
}

    {/**
        <section className={styles.contentQuestions}>
            {dataQuestions && dataQuestions.map(cat=>(
                    <div key={cat.id} className={styles.card} onClick={()=>{
                        handlerCatQuestions(cat.id);
                    }}>
                        <div className={styles.infoCategorie}>
                            <h2>{cat.name}</h2>
                            <p>{cat.description}</p>
                        </div>

                        <img src={cat.image} alt='iconCategorie'/>
                    </div>

            ))} 
        </section>  

        {isVisibleIcon && <label className={styles.wrapperIcon}> <DoubleLeftOutlined className={styles.iconCategorie}/>Haz Click en la Seccion de Preguntas</label>}
        
        
        {questionFilter && (
                <div className={styles.questionFilter}>
                    <h3>{questionFilter.name}</h3>
                    
                    {widthWindow.width < 500 ?
                        <CustomCollapseMovil className={styles.collapse} items={questionByCategorie} defaultActiveKey={questionByCategorie.flatMap(obj=>obj.key)}/>
                    :
                        <CustomCollapse className={styles.collapse} items={questionByCategorie} defaultActiveKey={questionByCategorie.flatMap(obj=>obj.key)}/>
                    }
                    </div>

        )} */}
            

export default ContentQuestions
