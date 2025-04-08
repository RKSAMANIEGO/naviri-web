import {deleteCategorie} from '../../services/categoriesService'
import TableCategoria from 'react-data-table-component'
import styles from '../../styles/categorie.module.css'
import Swal from 'sweetalert2'
const CategorieTable = ({dataCategorie}) => {

    

    const customStyle ={
        headCells:{
            style:{
                backgroundColor:"rgba(255, 241, 249, 1)", 
                color: 'rgba(255, 107, 188, 1)',            
                fontWeight: 'bold',
                fontSize:"13px",         
            }
        },
        cells:{
            style:{
                padding:"5px 15px",
                fontWeight:"600",
                fontSize:"12px",
                textTransform:"Capitalize"
            }
        }

    }

    const column=[
        {
            name: 'ID',
            selector:row=>row.id,
            sortable:true
        },
        {
            name: 'Categoria',
            selector:row=>row.name,
            sortable:true
        },
        {
            name: 'Opciones',
            cell:row=>(
                <div className={styles.optionCategorieTable}>
                    <i className="fa-solid fa-pencil" onClick={async()=>{
                        
                        localStorage.setItem("idCat",row.id);
                        const res ="a";
                        //const res = await putCategorie(row.id);
                        if(res){
                            Swal.fire({
                                title: 'Categoria Actualizada',
                                text: 'La categoria ha sido actualizada con exito',
                                icon: 'success',
                                timer: 2000
                            })
                        }else{
                            Swal.fire({
                                title: 'Error',
                                text: 'La categoria no ha sido actualizada',
                                icon: 'error',
                                timer: 2000
                            })
                        }
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
                                            })
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
                    <i className="fa-solid fa-eye" onClick={()=> console.log(row.name)}/>
                    
                </div>
            )
        }

    ]

    return (
        <TableCategoria
            className={styles.tablaCategoria}
            columns={column}
            data={dataCategorie}
            customStyles={customStyle}
            pagination
        />
    )
}

export default CategorieTable
