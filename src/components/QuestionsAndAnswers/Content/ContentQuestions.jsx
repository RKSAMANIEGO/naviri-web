import React from 'react'
import styles from '../../../styles/Questions.module.css'
const ContentQuestions = () => {

    const categorie=[
        {
            id:1,
            name:"Categorie 1",
            description:"Categorie 1 description"
        },
        {
            id:2,
            name:"Categorie 2",
            description:"Categorie 2 description"

        },
        {
            id:3,
            name:"Categorie 3",
            description:"Categorie 3 description"
        },
        {
            id:4,
            name:"Categorie 4",
            description:"Categorie 4 description"
        }
    ]

    return (
        <section className={styles.contentQuestions}>
            {categorie.map(cat=>(
                <div key={cat.id} className={styles.card}>
                    <h2>{cat.name}</h2>
                    <p>{cat.description}</p>
                </div>
            ))}
        </section>
    )
}

export default ContentQuestions
