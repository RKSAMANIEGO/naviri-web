import styles from '../../styles/producto.module.css'
const PaginationProducts = ({numPage,handlerPagina,nextPage}) => {

    const newPages=[]
    for (let i=1 ; i<=numPage ; i++){ 
        newPages.push(i) 
    }

    return (
        <div className={styles.pagination}>
            {newPages.map((pagina,index)=> (
                <button key={index} className={styles.button} onClick={()=>handlerPagina(pagina)}>{pagina}</button>
            ))}
            <button onClick={nextPage}>Siguiente</button>        
        </div>
    )
}

export default PaginationProducts
