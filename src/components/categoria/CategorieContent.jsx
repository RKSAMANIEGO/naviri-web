import styles from '../../styles/categorie.module.css'
import {addCategorie} from '../../services/categoriesService'
import { useState } from 'react';
import Swal from 'sweetalert2'
const CategorieContent = () => {

    const [name, setName] = useState({name:""})

    const formData=(e)=>{
        setName(prevData =>({
            ...prevData,
            name:e.target.value
        }))
    }

    ///

    const handlerAddCategorie = async()=>{
        if(name){
            const response = await addCategorie(name);

            if(response.status===200){
                Swal.fire({
                    title: 'Categoria Registrado Correctamente',
                    icon: 'success',
                    timer: 2000
                })
            }else{
                Swal.fire({
                    title: 'Error al registrar categoria',
                    text:response.message,
                    icon: 'error',
                    timer: 2000
                })
            }
        }
    }
    return (
        <section className={styles.gestionCategorie}>
                <h2>Categorias</h2>

            <section>
                <div className={styles.div}>   
                    <input type='text' value={name.name}  onChange={formData} placeholder='Ingrese el nombre de la Categoria'/>
                    <div className={styles.optionCategorie}>
                        <i className="fa-solid fa-plus" onClick={handlerAddCategorie}/>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default CategorieContent
