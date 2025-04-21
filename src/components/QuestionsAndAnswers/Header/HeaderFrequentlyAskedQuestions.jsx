import React from 'react'
import styles from '../../../styles/Questions.module.css'
import { SearchOutlined } from '@ant-design/icons'
const HeaderFrequentlyAskedQuestions = () => {
    return (
        <div className={styles.headerQuestions}>
                <h1>Preguntas Frecuentes</h1>
                <p>En esta sección encontrarás respuestas a las dudas más comunes sobre nuestros productos/servicios, métodos de pago, políticas de devolución y mucho más.</p>
                <div className={styles.search}>
                    <input type='text' placeholder='Ingrese la seccion de Preguntas...' />
                    <SearchOutlined className={styles.icSearch}/>
                </div>
        </div>
    )
}

export default HeaderFrequentlyAskedQuestions
