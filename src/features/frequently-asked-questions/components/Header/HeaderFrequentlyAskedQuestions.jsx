import React from 'react'
import styles from '../../styles/Questions.module.css'
import { SearchOutlined } from '@ant-design/icons'
const HeaderFrequentlyAskedQuestions = () => {
    return (
        <div className={styles.headerQuestions}>
                <h1>Preguntas Frecuentes</h1>
                <div className={styles.search}>
                    <section className={styles.wrapperInfo}>   
                        <input type='text' placeholder='Ingrese la seccion de Preguntas...' />
                        <SearchOutlined className={styles.icSearch}/>
                    </section>
                </div>
        </div>
    )
}

export default HeaderFrequentlyAskedQuestions
