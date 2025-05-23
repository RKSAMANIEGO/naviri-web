import TableProducts from 'react-data-table-component';
import styles from '../styles/productAdmin.module.css' // Updated path
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import ModalCrudProduct from './Modal/ModalCrudProduct'; // Path remains relative to component
import ModalProducts from './Modal/ModalProducts'; // Updated path
import {productByName,deleteProduct} from '../services/adminProductsApi' // Updated path

const ProductsTable = ({products,productFilter,productDelete,isUpdateProduct}) => {
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isOpenModalProducts,setOpenModalProducts]=useState(false);
    const [productSelect,setProductSelect]=useState({});
    const [productPutSelect,setProductPutSelect]=useState(null);
    const [openModalDetailsProduct,setOpenModalDetailsProduct]=useState(false)
    const [productsAll, setProductsAll]=useState(products);
    const [confirmProductDelete,setConfirmProductDelete]=useState(false);

    useEffect(()=>{
            const filterProduc= productFilter();
            filterProduc ? setProductsAll(filterProduc) : setProductsAll(products)
    },[productFilter,products])


    useEffect(() => {
        setTotalPages(Math.ceil(productsAll.length / rowsPerPage));
    }, [productsAll.length,rowsPerPage]);

    //Cambiar Pagina
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleRowsPerPageChange = (newPerPage) => {
        setRowsPerPage(newPerPage);
        setCurrentPage(0);
    };

    //Columnas de la Tabla
    const columns=[
    {
        name:"Imagen",
        cell:row=>(
            <img src={row.image[0].url} alt={row.name} className={styles.productImage} width="35" height='37'/>
        ),
        width:"10%"
    },
    {
        name:"Productos",
        selector:row=>row.name,
        sortable:true,
        width:"30%"
    },
    {
        name:"Categoria",
        selector:row=>row.categories.map(subCat=>subCat.sub_categories.map(obj=>obj.name.toLowerCase()).join()),
        sortable:true,
        width:"15%"
    },
    {
        name:"Precio",
        selector:row=>"S/."+ Number(row.price).toFixed(2),
        sortable:true,
        width:"10%"
    },
    {
        name:"Stock",
        selector:row=> (row.stock > 15) ? <p className={styles.stockPositive}> {String(row.stock).padStart(2,"0")} </p>  
                                        :  <p className={styles.stockNegative}> {String(row.stock).padStart(2,"0")} </p>,
        sortable:true,
        width:"10%"
    },
    {
        name:"Dscto",
        selector:row=>row.discount +"%" ,
        sortable:true,
        width:"10%"
    },
    {
        name:"Acciones",
        cell:row=>(
            <div className={styles.wrapperOptions}>
                <i className="fa-solid fa-eye" onClick={ async()=>{
                
                const productById = await productByName(row.name);
                productById &&  setProductSelect(productById.data.data[0]);
                setOpenModalDetailsProduct(true);

                }}></i>
                <i className="fa-solid fa-pencil" onClick={async()=>{
                    localStorage.setItem("nameProduct",row.name);
                    const productById = await productByName(row.name);
                    console.log(productById);
                    productById &&  setProductPutSelect(productById.data.data[0]);
                    setOpenModalProducts(true)
                }}></i>
                <i className="fa-solid fa-trash-can" onClick={()=>{

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
                            console.log(row.name);
                            const response = await deleteProduct(row.name);
                            if(response.status === 200){
                                Swal.fire({
                                    title: 'Producto eliminado',
                                    text: 'El producto ha sido eliminado con éxito',
                                    icon:"success",
                                    timer: 3000
                                })
                                setConfirmProductDelete(!confirmProductDelete);
                                productDelete(!confirmProductDelete);
                            }
                    }})
                }}></i>
            </div>
        ),
        width:"15%"
    } ]

    //Estilos de la Tabla
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
                display:"flex",
                justifyContent:"center"
            }
        }

    }
    //Paginacion Personalizado
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

    ///CONFIRMACION DE LA ACTUALIZACION DEL PRODUCTO PARA PASARLO AL ADMIN Y ACTUALIZAR LA LISTA DE PRODUCTOS
    const confirmaActualizacionProduct=(confirm)=>{
            isUpdateProduct(confirm);
    }

    return (
    <>
    <div className={styles.container}>
        <TableProducts
            className={styles.dataTable}
            columns={columns}
            data={productsAll.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)}
            highlightOnHover
            pointerOnHover
            pagination
            paginationPerPage={rowsPerPage}
            paginationRowsPerPageOptions={[5, 10, 15]}
            paginationTotalRows={productsAll.length}
            customStyles={customStyle}
            paginationComponent={() => (
                <CustomPagination
                    page={currentPage}
                    totalPages={totalPages}
                    onChangePage={handlePageChange}
                    totalRows={productsAll.length}
                />
            )}
            onChangeRowsPerPage={handleRowsPerPageChange}
        />
        {productPutSelect ? <ModalCrudProduct isOpen={isOpenModalProducts} onClose={()=> setOpenModalProducts(false)} titleModal="updateProduct" confirmActualizacionProducto={confirmaActualizacionProduct}  productPutTable={productPutSelect}/>
                        :
                        <ModalCrudProduct isOpen={isOpenModalProducts} onClose={()=> setOpenModalProducts(false)} titleModal="updateProduct"/>
        }
        <ModalProducts isOpen={openModalDetailsProduct}  onClose={()=> setOpenModalDetailsProduct(false)} product={productSelect} title="productAdmin"/>
    </div>
    </>
    )

}

export default ProductsTable