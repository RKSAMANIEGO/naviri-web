import React, { useState } from 'react'
import styles from '../../styles/Questions.module.css'
import { SearchOutlined } from '@ant-design/icons'
const HeaderFrequentlyAskedQuestions = ({setTextSearch}) => {

    const [search,setSearch]=useState(null);

    return (
        <div className={styles.headerQuestions}>
                <h1>Preguntas Frecuentes</h1>
                <div className={styles.search}>
                    <section className={styles.wrapperInfo}>   
                        <input type='text' value={search} onChange={(e)=>setSearch(e.target.value)}  placeholder='Ingrese la seccion de Preguntas...' />
                        <SearchOutlined className={styles.icSearch} onClick={()=>setTextSearch(search)}/>
                    </section>
                </div>
        </div>
    )
}

export default HeaderFrequentlyAskedQuestions
