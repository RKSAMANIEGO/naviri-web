import { useState } from 'react'
import styles from '../../styles/producto.module.css'

const SearchProducts = ({recibirTextInput,recibirValuePrecio,products}) => {

    const[searchText,setSearchText]=useState("");
    const[valuePrecio,setValuePrecio]=useState(0);

    //PRECIOS
    const precios= products.map(obj => obj.precio);
    const listPrecios= new Set(precios);

    const searchProducts = () =>{
            recibirTextInput(searchText);
    }

    return (
    <div  className={styles.search}>
        <section className='container-search'>
            <label>
                <span>
                    <input type="text" placeholder='Buscar productos...' value={searchText} onChange={(e)=>setSearchText(e.target.value)} /> 
                    <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <button onClick={searchProducts}>Buscar</button>
            </label>
            
            <h4>Filtros</h4>

            <div>   
                <section >
                    <p>Sub categorias</p>
                    <select>
                        <option>Todas las categorias</option>
                    </select>
                </section>



                <section>
                    <p>Precios</p>

                        <select value={valuePrecio} onChange={(e)=>{
                            setValuePrecio(e.target.value)
                            recibirValuePrecio(e.target.value)
                            console.log(e.target.value);
                        }}>
                            <option value={''}>Todos los precios</option>
                        { [...listPrecios].map(precio => (
                            <option  key={precio} value={precio}>{precio}</option>     
                        ))}
                        </select>
            
                </section>


            </div>
            
        </section>
    </div>
    )
}

export default SearchProducts
