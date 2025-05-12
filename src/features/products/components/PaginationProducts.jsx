import { useEffect, useState } from 'react'
import styles from './producto.module.css' // Updated path
import SeccionScrollAnimation from '../../../shared/animation/SeccionScrollAnimation';
const PaginationProducts = ({numPage,handlerPagina,nextPage,nextPageDisabled}) => {

    const [activePage,setActivePage]=useState(1);
    const [nextActive,setNextActive]=useState(false);
    const [handlerNextPage,setHandlerNextPage]=useState(false);

    const newPages=[]
    for (let i=1 ; i<=numPage ; i++){
        newPages.push(i)
    }


    useEffect(()=>{

    })

    return (
        <>
        <SeccionScrollAnimation direction='rigth'>
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
            }}>{handlerNextPage ? `Pagina ${nextPageDisabled}` : 'Siguiente' }</button>
        </div>
        </SeccionScrollAnimation>
        </>
    )
}

export default PaginationProducts;