import { useState } from 'react'
import styles from './producto.module.css' // Updated path
const PaginationProducts = ({numPage,handlerPagina,nextPage}) => {

    const [activePage,setActivePage]=useState(1);

    const newPages=[]
    for (let i=1 ; i<=numPage ; i++){
        newPages.push(i)
    }

    return (
        <div className={styles.pagination}>
            {newPages.map((pagina,index)=> (
                
                <button key={index} className={`${styles.button} ${activePage===pagina ? styles.activePage : ''}`} onClick={()=>{
                    handlerPagina(pagina);
                    console.log(pagina);
                    setActivePage(pagina);
                }}>{pagina}</button>

            ))}
            <button onClick={()=>{nextPage();}}>Siguiente</button>
        </div>
    )
}

export default PaginationProducts