import { useState, useEffect } from 'react'
import styles from './producto.module.css'
const PaginationProducts = ({ numPage, handlerPagina, nextPage, nextPageDisabled, currentPage }) => {
    const [activePage, setActivePage] = useState(currentPage || 1);
    const [nextActive, setNextActive] = useState(false);
    const [handlerNextPage, setHandlerNextPage] = useState(false);

    // Sincronizar activePage con currentPage cuando cambie desde el padre
    useEffect(() => {
        setActivePage(currentPage || 1);
    }, [currentPage])

    const newPages=[]
    for (let i=1 ; i<=numPage ; i++){
        newPages.push(i)
    }

    return (
        <>
            <div className={styles.pagination}>
                {newPages.map((pagina, index) => (
                    <button
                        id="products"
                        key={index}
                        className={`${styles.button} ${activePage === pagina ? styles.activePage : ''} ${nextActive && styles.isDisabled}`}
                        onClick={() => {
                            handlerPagina(pagina);
                            setActivePage(pagina);
                            setNextActive(false);
                            setHandlerNextPage(false);
                        }}>
                        {pagina}
                    </button>
                ))}

                <button
                    className={`${nextActive ? styles.nextActive : ''} ${activePage === newPages.length ? styles.nextPageDisabled : ''}`}
                    onClick={() => {
                        setNextActive(true);
                        setHandlerNextPage(true);
                        nextPage();
                    }}>
                    {handlerNextPage ? `Pagina ${nextPageDisabled + 1}` : 'Siguiente'}
                </button>
            </div>
        </>
    )
}

export default PaginationProducts;