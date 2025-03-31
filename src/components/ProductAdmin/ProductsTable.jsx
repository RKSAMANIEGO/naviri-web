import TableProducts from 'react-data-table-component';
import { products } from '../../utils/products';
import styles from '../../styles/productAdmin.module.css'
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';

const ProductsTable = () => {
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        setTotalPages(Math.ceil(products.length / rowsPerPage));
    }, [rowsPerPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleRowsPerPageChange = (newPerPage) => {
        setRowsPerPage(newPerPage);
        setCurrentPage(0);
    };


    const columns=[
    {
        name:"Imagen",
        cell:row=>(
            <img src={row.imagen} alt={row.subCategoria} className={styles.productImage} width="35px"/>
        ),
        width:"15%"
    },
    {
        name:"Titulo",
        selector:row=>row.subCategoria,
        sortable:true,
        width:"40%"
    },
    {
        name:"Categoria",
        selector:row=>row.producto,
        sortable:true,
        width:"10%"
    },
    {
        name:"Precio",
        selector:row=>"S/."+ Number(row.precio).toFixed(2),
        sortable:true,
        width:"10%"
    },
    {
        name:"Stock",
        selector:row=>row.id,
        sortable:true,
        width:"10%"
    },
    {
        name:"Acciones",
        cell:row=>(
            <div className={styles.wrapperOptions}>
                <i className="fa-solid fa-eye" onClick={()=>console.log(row.id)}></i>
                <i className="fa-solid fa-pencil"></i>
                <i className="fa-solid fa-trash-can" onClick={()=>{

                    Swal.fire({
                        title: '¿Estás seguro de eliminar este producto?',
                        text: 'No podrás revertir esto',
                        icon:"warning",
                        showCancelButton: true,
                        cancelButtonColor:"rgb(196, 22, 13)",
                        confirmButtonColor:" rgb(26, 47, 210)",
                        confirmButtonText: 'Sí, eliminar',
                    }).then((result)=>{
                        if(result.value){
                            console.log(row.id);
                        }else{
                            console.log("No se eliminó");
                        }
                    })
                }}></i>
            </div>
        ),
        width:"15%"
    } ]

    const customStyle ={
        headCells:{
            style:{
                backgroundColor:"rgba(255, 241, 249, 1)", 
                color: 'rgba(255, 107, 188, 1)',            
                fontWeight: 'bold',
                fontSize:"13px"          
            }
        },
        cells:{
            style:{
                padding:"5px 15px",
                fontWeight:"600",
                fontSize:"12px" 
            }
        }

    }

    const CustomPagination = ({ page, totalPages, onChangePage,totalRows }) => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between',alignItems:"center", padding:"20px 40px"}}>
                
                <p style={{color:"rgb(122,122,122,1)", fontSize:"13px",fontWeight:"600"}}>Mostrando<span> { page === totalPages-1 ?  (page*5)+(totalRows%5)  : (page+1)*5 } </span> de <span> {totalRows} </span></p>

                <div  style={{display:"flex",gap:"10px"}}>
                <button className={styles.btnPaginacion}
                    onClick={() => onChangePage(page - 1)}
                    disabled={page === 0}> Anterior </button>

                <button  className={styles.btnPaginacion}
                    onClick={() => onChangePage(page + 1)} 
                    disabled={page === totalPages - 1}> Siguiente </button>
                </div>

            </div>
        );
    };

    return (
    <>
    <div className={styles.container}></div>
        <TableProducts
            className={styles.dataTable}
            columns={columns}
            data={products.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)}
            highlightOnHover
            pointerOnHover
            pagination
            paginationPerPage={rowsPerPage}
            paginationRowsPerPageOptions={[5, 10, 15]}
            paginationTotalRows={products.length}
            customStyles={customStyle}
            paginationComponent={() => (
                <CustomPagination
                    page={currentPage}
                    totalPages={totalPages}
                    onChangePage={handlePageChange}
                    totalRows={products.length}
                />
            )}
            onChangeRowsPerPage={handleRowsPerPageChange} 
        />
    </>
    )

}

export default ProductsTable
