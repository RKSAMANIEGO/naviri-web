import React from 'react'
import styles from '../../styles/Questions.module.css'
const ContentQuestions = () => {

    const categorie=[
        {
            id:1,
            name:"Categorie 1",
            description:"Categorie 1 description",
            image:"https://pixcap.com/cdn/library/template/1716824237738/thumbnail/Task_Management_3D_Animated_Icon_transparent_400_emp.webp"
        },
        {
            id:2,
            name:"Categorie 2",
            description:"Categorie 2 description",
            image:"https://thumbs.dreamstime.com/b/testimoni-d-rendering-illustration-icon-free-photo-235254727.jpg"
        },
        {
            id:3,
            name:"Categorie 3",
            description:"Categorie 3 description",
            image:"https://thumbs.dreamstime.com/b/d-illustration-representing-rating-system-symbolizing-customer-feedback-reviews-isolated-white-background-368033148.jpg"
        },
        {
            id:4,
            name:"Categorie 4",
            description:"Categorie 4 description",
            image:"https://cdn3d.iconscout.com/3d/premium/thumb/idea-pregunta-8691333-6963916.png?f=webp"
        }
    ]

    return (
        <section className={styles.contentQuestions}>
            {categorie.map(cat=>(
                <div key={cat.id} className={styles.card}>
                    <div className={styles.infoCategorie}>
                        <h2>{cat.name}</h2>
                        <p>{cat.description}</p>
                    </div>

                    <img src={cat.image} alt='iconCategorie' width='50'/>
                </div>
            ))}
        </section>
    )
}

export default ContentQuestions
