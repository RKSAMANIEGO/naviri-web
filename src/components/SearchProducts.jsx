import styles from '../styles/producto.module.css'

const SearchProducts = () => {
    return (
    <div  className={styles.search}>
        <section className='container-search'>
            <label>
                <input type="text" placeholder='Buscar productos...'/> 
                <button>Buscar</button>
            </label>
            
            <h4>Filtros</h4>

            <div>   
                <section >
                    <p>Categorias</p>
                    <select>
                        <option>Todas las categorias</option>
                    </select>
                </section>

                <section>
                    <p>Precios</p>
                    <select>
                        <option>Todas las precios</option>
                    </select>
                </section>
            </div>
            
        </section>
    </div>
    )
}

export default SearchProducts
