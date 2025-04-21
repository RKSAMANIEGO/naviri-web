import React, { useEffect, useState } from 'react'
import ModalSubCat from 'react-modal'
import styles from '../../../styles/subCategorie.module.css'
import TableSubCategorie from 'react-data-table-component'
import {message} from 'antd'
import {getSubCategorie, postSubCategories,deleteSubCategorie} from '../../../services/subCategories.js'
import Swal from 'sweetalert2'
import { listProducts } from '../../../services/productService.js'
ModalSubCat.setAppElement("#root");
const ModalSubCategorie = ({isOpen,onClose,dataSubCategorie,nameCategorie}) => {
    
    const [form,formSubCategorie]=useState({name:""})
    const [updateDataSubCategorie,setUpdateDataSubCategorie]=useState(false);
    const [listSubCategories, setListSubCategories]=useState(dataSubCategorie);


    useEffect(()=>{
        nameCategorie && listarSubCategorie(nameCategorie);
    },[nameCategorie,updateDataSubCategorie])


    //LISTAR SUBCATEGORIAS
    const listarSubCategorie=async(nameSubCat)=>{
        const result = await getSubCategorie(nameSubCat);
        setListSubCategories(result.data)
        return result;
    }
    
    //AGREGAR SUBCATEGORIAS
    const addSubCategorie =async()=>{
        if(form.name===""){
            message.error('Debes ingresar un nombre para la subcategoría')
        }
    
        if(form.name != ""){
            const response = await postSubCategories(nameCategorie,form);
            if(response){
                Swal.fire({
                    title: 'Subcategoría agregada',
                    text: 'La subcategoría se agregó correctamente',
                    icon: 'success',
                    timer:2000
                }); 
                setUpdateDataSubCategorie(!updateDataSubCategorie);
                formSubCategorie({name:""})


            }else{
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo agregar la subcategoría',
                    icon: 'error',
                    timer:2000
                })
            }
        }
    }

    //COLUMNA DE LA TABLA
    const columns=[
        {
            name:"Sub Categoria",
            selector:row=> row.name,
            sortable:true
        },
        {   
            name:"Opciones",
            cell:row=>(
                <div className={styles.subCategorieOptions}>
                    <i className="fa-solid fa-trash-can" onClick={async()=>{

                        //LISTAR LOS PRODUCTOS PARA VALIDAR LA ELIMINACION DE UNA SUB_CATEGORIA
                        const allProducts = await listProducts(1, 1000);
                        if(allProducts){
                            const confirmSubCategorieIncludeProducts = allProducts?.data.data.filter(product => {
                                return product.categories.some(categorie => categorie.sub_categories.some(subcategorie => subcategorie.name === row.name))   
                            })

                            if(confirmSubCategorieIncludeProducts.length > 0){
                                Swal.fire({
                                    title: `${row.name} tiene ${confirmSubCategorieIncludeProducts.length} productos asociados`,
                                    text: 'Primero Elimine los Productos Asociados',
                                    icon: 'warning',
                                    timer: 4000
                                })
                            }else{
                                
                                Swal.fire({
                                    title:"Estas seguro de eliminar la Sub Categoria "+row.name.toUpperCase(),
                                    text: "Esta acción no se puede deshacer",
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Si, eliminar',
                                    cancelButtonText: 'No, cancelar',
                                    }).then(async(result) =>{
                                        if(result.value){
                                            const response = await deleteSubCategorie(row.name);
                                            if(response){                                     
                                                Swal.fire({
                                                    title: 'Subcategoría eliminada',
                                                    text: 'La subcategoría se eliminó correctamente',
                                                    icon: 'success',
                                                    timer:2000
                                                });
                                                setUpdateDataSubCategorie(!updateDataSubCategorie);
                                            }
                                            else{
                                                Swal.fire({
                                                    title: 'Error',
                                                    text: 'No se pudo eliminar la subcategoría',
                                                    icon: 'error',
                                                    timer:2000}) 
                                            }
                                        }
                                    });

                                }
                        }
                        }} />
                </div>
            )
        }
    ]

    //ESTILOS DEL MODAL
    const styleModal={
        overlay: {
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 100
            },
        content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#fff',
                padding: '30px',
        }
    }

    //ESTILOS DE LA TABLA SUBCATEGORIA
    const styleTableSubCategorie={
        headCells:{ 
            style:{
                backgroundColor:"rgb(205, 104, 187)", 
                color: 'white',            
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
                display:"flex",
                justifyContent:"center"  
            }
        }

    }

    //OBTENER DATA DEL FORM
    const getDataForm = (e)=>{
        const {name,value}= e.target;
        formSubCategorie(prevData => ({
            ...prevData,
            [name]:value
        }))
    }

    return (
        <ModalSubCat
            isOpen={isOpen}
            onRequestClose={onClose}
            style={styleModal}


            
        >
            <section className={styles.containerSubCategories}>
                <h2>SUBCATEGORIAS DE {nameCategorie.toUpperCase()}</h2>

                <div className={styles.divForm}>
                        <div >
                            <label htmlFor='txtNombreSubCategoria'>INGRESE SUBCATEGORIA</label>
                            <input id='txtNombreSubCategoria' name="name"  value={form.name} onChange={getDataForm} placeholder='SubCategoria... ✍🏻'/>
                        </div>
                
                    <button onClick={addSubCategorie}>Crear</button>
                </div>

                <TableSubCategorie
                    columns={columns}
                    data={listSubCategories}
                    customStyles={styleTableSubCategorie}
                    highlightOnHover
                    pointerOnHover
                />
                
            </section>
        </ModalSubCat>
    )
}

export default ModalSubCategorie
