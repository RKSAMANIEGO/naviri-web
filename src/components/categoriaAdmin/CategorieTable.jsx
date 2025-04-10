import {deleteCategorie} from '../../services/categoriesService'
import TableCategoria from 'react-data-table-component'
import styles from '../../styles/categorie.module.css'
import Swal from 'sweetalert2'
import { useState } from 'react'
import ModalSubCategorie from './modalSubCategorie/ModalSubCategorie'
import {getSubCategorie} from '../../services/subCategories'

const CategorieTable = ({dataCategorie,updateListCategorie,optionPutCategorie,categorieFilter}) => {

    const[isConfirmDelete,setConfirmDelete]=useState(false);
    const[isConfirmUpdate,setConfirmUpdate]=useState(false);
    const[isModalSubCategorie,setModalSubCategorie]=useState(false)
    const[dataSubCategoria,setDataSubCategoria]=useState([]);
    const[nameCategorie,setNameCategorie]=useState('');
    
    //COLUMNAS DE LA TABLA CATEGORIA
    const column=[
        {
            name: 'Categoria',
            selector:row=>row.name,
            sortable:true,
            style:{
                
            }
        },
        {
            name: 'Opciones',
            cell:row=>(
                <div className={styles.optionCategorieTable}>
                    <i className="fa-solid fa-pencil" onClick={async()=>{              
                        localStorage.setItem("idCat",row.id);
                        setConfirmUpdate(!isConfirmUpdate);
                        optionPutCategorie(!isConfirmUpdate);
                    }}/>    
                    <i className="fa-solid fa-trash-can" onClick={async()=>{
                        Swal.fire({
                                    title: '¿Estás seguro de eliminar este producto?',
                                    text: 'No podrás revertir esto',
                                    icon:"warning",
                                    showCancelButton: true,
                                    cancelButtonColor:"rgb(38, 86, 218)",
                                    confirmButtonColor:"rgb(228, 34, 170)",
                                    confirmButtonText: 'Sí, eliminar',
                                    cancelButtonText:"Cancelar"
                                }).then(async(result)=>{
                                    if(result.value){
                                        const response = await deleteCategorie(row.id);
                                        if(response){
                                            Swal.fire({
                                                title: 'Categoria eliminada',
                                                text: 'La categoria ha sido eliminada con exito',
                                                icon: 'success',
                                                timer: 2000
                                            });
                                            setConfirmDelete(!isConfirmDelete);
                                            updateListCategorie(!isConfirmDelete);


                                        }else{
                                            Swal.fire({
                                                title: 'Error',
                                                text: 'La categoria no se pudo eliminar',
                                                icon: 'error',
                                                timer: 2000
                                            })
                                        }
                                    }
                                })}}
                    />
                    <i className="fa-solid fa-eye" onClick={async()=> {
                        setModalSubCategorie(true);
                        const response = await getSubCategorie(row.name);
                        if(response) {
                            setDataSubCategoria(response.data);
                            setNameCategorie(row.name);
                        } 
                    }}/>
                    
                </div>
            ),
            style:{
                display: 'flex',
                justifyContent: 'center',
            }
        }

    ]

    //ESTILOS DE LA TABLA CATEGORIA
    const customStyle ={
            headCells:{
                style:{
                    backgroundColor:"rgba(255, 241, 249, 1)", 
                    color: 'rgba(255, 107, 188, 1)',            
                    fontWeight: 'bold',
                    fontSize:"13px",
                    display:"flex",
                    justifyContent:"center"         
                }
            },
            cells:{
                style:{
                    padding:"5px 15px",
                    fontWeight:"600",
                    fontSize:"12px",
                    textTransform:"Capitalize",
                }
            }
    
    }
    return (
        <>
            <TableCategoria
            className={styles.tablaCategoria}
            columns={column}
            data={(categorieFilter ===null ) ? dataCategorie : categorieFilter}
            customStyles={customStyle}
            pagination
            pointerOnHover
            highlightOnHover
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5,10,15]}
            />
            {dataSubCategoria   ? <ModalSubCategorie isOpen={isModalSubCategorie} onClose={()=> setModalSubCategorie(false)} dataSubCategorie={dataSubCategoria} nameCategorie={nameCategorie}/>
                                : <ModalSubCategorie isOpen={isModalSubCategorie} onClose={()=> setModalSubCategorie(false)}/>} 
        </>

    )
}

export default CategorieTable
