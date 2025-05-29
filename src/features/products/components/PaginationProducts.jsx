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

    const getVisiblePages = () => {
        const maxVisiblePages = 3;
        const pages = [];
        
        // Si hay 5 páginas o menos, mostrar todas
        if (numPage <= maxVisiblePages) {
            for (let i = 1; i <= numPage; i++) {
                pages.push(i);
            }
            return pages;
        }
        
        // Calcular el rango de páginas a mostrar
        let startPage = Math.max(1, activePage - 2);
        let endPage = Math.min(numPage, startPage + maxVisiblePages - 1);
        
        // Ajustar si estamos cerca del final
        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        
        return pages;
    };

    const visiblePages = getVisiblePages();

     return (
        <>
            <div className={styles.pagination}>
                {/* Botón para ir a la primera página */}
                {activePage > 3 && numPage > 5 && (
                    <>
                        <button
                            className={styles.button}
                            onClick={() => {
                                handlerPagina(1);
                                setActivePage(1);
                                setNextActive(false);
                                setHandlerNextPage(false);
                            }}>
                            1
                        </button>
                        {activePage > 4 && <span className={styles.ellipsis}>...</span>}
                    </>
                )}

                {/* Páginas visibles */}
                {visiblePages.map((pagina) => (
                    <button
                        id="products"
                        key={pagina}
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

                {/* Botón para ir a la última página */}
                {activePage < numPage - 2 && numPage > 5 && (
                    <>
                        {activePage < numPage - 3 && <span className={styles.ellipsis}>...</span>}
                        <button
                            className={styles.button}
                            onClick={() => {
                                handlerPagina(numPage);
                                setActivePage(numPage);
                                setNextActive(false);
                                setHandlerNextPage(false);
                            }}>
                            {numPage}
                        </button>
                    </>
                )}

                <button
                    className={`${nextActive ? styles.nextActive : ''} ${activePage === numPage ? styles.nextPageDisabled : ''}`}
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