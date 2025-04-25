import React, { useState } from 'react'
import styles from '../../styles/Questions.module.css'
import styled from 'styled-components';
import { Collapse } from 'antd';

const ContentQuestions = () => {
    const [questionFilter, setQuestionFilter] = useState(null);
    const [questionByCategorie,setQuestionByCategorie]=useState([]);


    const CustomCollapse = styled(Collapse)`
    border-radius: 10px;
    border:none;
    .ant-collapse-item {
        border-bottom: none;
    }
    .ant-collapse-header {
        font-weight: bold;
        background-color:  #f3d3e7;

    }
        
    `;


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
    //CLICK AL CARDS CATEGORIE QUESTIONS
    const handlerCatQuestions =(id)=>{
        const catQuestionById = categorie.find(cat => cat.id === id);
        setQuestionFilter(catQuestionById);

        const preguntas= catQuestionById.questions.flatMap(obj=>{
            return {key:`${obj.id}`,label:`${obj.question}`,children:`${obj.answer}`}
        })
        setQuestionByCategorie(preguntas);

        console.log(catQuestionById);
        console.log(preguntas);
    }

    return (
    <div className={styles.container}>

        <section className={styles.contentQuestions}>
            {categorie.map(cat=>(
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
        
        {questionFilter && (
                <div className={styles.questionFilter}>
                    <h3>{questionFilter.name}</h3>
                        
                    <CustomCollapse className={styles.collapse} items={questionByCategorie} defaultActiveKey={questionByCategorie.flatMap(obj=>obj.key)}/>
                </div>

        )} 
            
    </div>
    )
}

export default ContentQuestions
