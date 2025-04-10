import styles from '../../styles/categorie.module.css'
import {addCategorie, putCategorie} from '../../services/categoriesService'
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import {message} from 'antd'
const CategorieContent = ({updateListCategorie,categoriaSelect}) => {

    const [name, setName] = useState({name:""})
    const [isConfirmAdd,setConfirmAdd]=useState(false);
    const [isConfirmPut,setConfirmPut]=useState(false);
    const [catSelected,setCatSelected]=useState(null);

    //LLENAR LOS DATOS DEL INPUT
    const formData=(e)=>{
        setName(prevData =>({
            ...prevData,
            name:e.target.value
        }))
    }

    ///AGREGAR CATEGORIA
    const handlerAddCategorie = async()=>{

        if(!name.name){
            message.error("Ingrese una Categoria¡");
            return;
        }

        if(name){
            const response = await addCategorie(name);

            if(response.status===200){
                Swal.fire({
                    title: 'Categoria Registrado Correctamente',
                    icon: 'success',
                    timer: 2000
                });
                setConfirmAdd(!isConfirmAdd);
                updateListCategorie(!isConfirmAdd);
                setName(({
                    name:""
                }))
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

    //ACTUALIZAR CATEGORIA
    const handlerUpdateCategorie = async()=>{
        const idCat = catSelected.id;
        const res= await putCategorie( idCat,name);
        if(res){
            Swal.fire({
                title: 'Categoria Actualizada',
                text: 'La categoria ha sido actualizada con exito',
                icon: 'success',
                timer: 2000
            });
            setConfirmPut(!catSelected);  
            updateListCategorie(!isConfirmPut); //se envia al categoira page para actualizar la categorie
            setName({
                name:""
            });  // limpiar campos del form
            setCatSelected(null); //para que retorne al btn agregar

        }else{
            Swal.fire({
                title: 'Error',
                text: 'La categoria no ha sido actualizada',
                icon: 'error',
                timer: 2000
            })
        }
    }

    //LIMPIAR CATEGORIA
    const handlerCleanCategorie = ()=>{
        setName(({
            name:""
            }))
        setCatSelected(null)
        }

    //LLENAR DATA DE LA CATEGORIA SELECCIONADA
    useEffect(()=>{
        setCatSelected(categoriaSelect);

        if(categoriaSelect){
            setName(({
                name:categoriaSelect.name
            }))
        }
    },[categoriaSelect])





    return (
        <section className={styles.gestionCategorie}>
                <h2>Categorias</h2>

            <section>
                    <label > Nombre Categoria
                        <input type='text' value={name.name}  onChange={formData} placeholder='Ingrese el nombre de la Categoria'/>
                    </label>
                    
                    { catSelected   ?   <div style={{display:"flex", gap:"10px"}}>
                                                <button onClick={handlerUpdateCategorie}><i className="fa-solid fa-plus" />Editar</button>
                                                <button onClick={handlerCleanCategorie}><i className="fa-solid fa-plus" />Limpiar</button>  
                                            </div>
 
                                        :   <button onClick={handlerAddCategorie}><i className="fa-solid fa-plus" /> Crear</button>}
            </section>
        </section>
    )
}

export default CategorieContent
