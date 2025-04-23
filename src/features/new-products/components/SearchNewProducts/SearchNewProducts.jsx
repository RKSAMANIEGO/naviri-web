import React, { useState } from 'react'
import styles from '../../styles/producto.module.css'

const SearchNewProducts = ({recibirTextInput,recibirValuePrecio,recibirCategories,products}) => {

    const[searchText,setSearchText]=useState("");
    const[valuePrecio,setValuePrecio]=useState(0);
    const[valueCategorie,setValueCategorie]=useState("");

    //PRECIOS
    const precios= products?.map(obj => obj.price);
    const listPrecios= new Set(precios);

    //SUB CATEGORIAS
    const categorie= products.map(obj=> obj.categories.map(subCat=>subCat.sub_categories.map(objSub=> objSub.name).join()));
    const listCategorie= new Set(categorie.flat());


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
                    <p>Categorias</p>
                    <select value={valueCategorie} onChange={(e)=>{
                                setValueCategorie(e.target.value);
                                recibirCategories(e.target.value);
                            }} style={{textTransform:"capitalize"}}>

                        <option value=''>Todas las sub categorias</option>


                        {[...listCategorie]?.map( (cat,index)=> (
                            <option key={index} >
                                {cat}
                            </option>
                        ))}

                    </select>
                </section>



                <section>
                    <p>Precios</p>

                        <select value={valuePrecio} onChange={(e)=>{
                            setValuePrecio(e.target.value)
                            recibirValuePrecio(e.target.value)
                        }}>
                            <option value={''}>Todos los precios</option>
                        { [...listPrecios].sort((a,b) => a-b).map(precio => (
                            <option  key={precio} value={precio}>{precio}</option>
                        ))}
                        </select>

                </section>


            </div>

        </section>
    </div>
    )
}

export default SearchNewProducts
