import { useState } from 'react'
import styles from './producto.module.css'
const PaginationProducts = ({numPage,handlerPagina,nextPage,nextPageDisabled}) => {

    const [activePage,setActivePage]=useState(1);
    const [nextActive,setNextActive]=useState(false);
    const [handlerNextPage,setHandlerNextPage]=useState(false);

    const newPages=[]
    for (let i=1 ; i<=numPage ; i++){
        newPages.push(i)
    }

    return (
        <>
       
        <div className={styles.pagination}>
            {newPages.map((pagina,index)=> (
                
                <button id="products" key={index} className={`${styles.button} ${activePage=== pagina  ? styles.activePage : ''} ${nextActive && styles.isDisabled }`} onClick={()=>{
                    handlerPagina(pagina);
                    setActivePage(pagina);
                    setNextActive(false);
                    setHandlerNextPage(false);

                    setTimeout(()=>{
                        const products = document.getElementById("products");
                        products && products.scrollIntoView({behavior:"smooth"});
                    },800)

                }}>{pagina}</button>

            ))}

            <button className={`${nextActive ? styles.nextActive : '' }  ${activePage === newPages.length ? styles.nextPageDisabled : ''} `}  onClick={()=>{
                setNextActive(true);
                setHandlerNextPage(true);
                nextPage();

                setTimeout(()=>{
                    const element = document.getElementById("products");
                    element && element.scrollIntoView({behavior:"smooth"});
                },800)
                

            }}>{handlerNextPage ? `Pagina ${nextPageDisabled}` : 'Siguiente' }</button>
        </div>
     
        </>
    )
}

export default PaginationProducts;