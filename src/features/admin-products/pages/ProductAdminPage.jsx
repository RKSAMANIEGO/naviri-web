import React, { useEffect, useState } from 'react'
import ProductSearch from '../components/ProductSearch'
import ProductsTable from '../components/ProductsTable'
import ProductsCards from '../components/ProductsCards';
import styles from '../styles/productAdmin.module.css'
import { listProducts } from '../services/adminProductsApi';
import ModalCrudProduct from '../components/Modal/ModalCrudProduct';
import { Tooltip } from 'antd';

const ProductAdminPage = () => { // Renamed component
    const[onChangeStyleProducts,setOnChangeStyleProducts]=useState(false);
    const[isOpenModal,setOpenModal]=useState(false);
    const[allProducts,setAllProducts]=useState(null);
    const[totalProduct,setTotalProducts]=useState(0);
    const[textSearch,setTextSearch]=useState(null)
    const[isProductDelete,setProductDelete]=useState(false);
    const[isProductUpdate,setProductUpdate]=useState(false);


    useEffect(()=>{
        totalProd();
        totalProduct && listAllProducts(1,totalProduct);
    },[totalProduct,isProductDelete,isProductUpdate]);

    //total de productos a listar
    const totalProd=async() => {
        const productos= await listProducts();
        productos &&  setTotalProducts(productos.data.total);
    }

    //listar Productos
    const listAllProducts =async(nPage,limit) => {
        const productos= await listProducts(nPage,limit);
        productos && setAllProducts(productos.data.data);
        }

    // recibir texto del filtro
    const recibirDataSearch=(dataSearch)=>{
        console.log(dataSearch);
        setTextSearch(dataSearch);
    }
    // recibir confirmacion del producto eliminado para Actualizar la lista de Productos
    const updateListProducts=(confirm)=>{
        if(confirm === isProductDelete){
            setProductDelete(!confirm);
            setProductUpdate(!confirm);
        }else{
            setProductDelete(confirm);
            setProductUpdate(confirm);
        }
    }
    //
    const recibirEstilo =(data)=>{
        setOnChangeStyleProducts(data);
    }

    return (
        <>
            <ProductSearch setRecibirEstilo={recibirEstilo} recibirTextSearch={recibirDataSearch}/>

            {(allProducts)  &&   ( (onChangeStyleProducts) ?
                    <ProductsCards products={allProducts}
                                productFilter={()=>{
                                    if(textSearch) return allProducts.filter(obj => obj.name.toLowerCase().includes(textSearch.toLowerCase()) || obj.categories.some(subCat => subCat.sub_categories.some(obj=> obj.name.toLowerCase().includes(textSearch.toLowerCase()))) );}}
                                productDelete={updateListProducts}
                                isUpdateProduct={updateListProducts}
                    />
                    :
                    <ProductsTable products={allProducts}
                                productFilter={()=>{
                                    if(textSearch) return allProducts.filter(obj => obj.name.toLowerCase().includes(textSearch.toLowerCase())  || obj.categories.some(subCat => subCat.sub_categories.some(obj=> obj.name.toLowerCase().includes(textSearch.toLowerCase()))) );}}
                                productDelete={updateListProducts}
                                isUpdateProduct ={updateListProducts}

                    />
            )}
            
            <Tooltip title="Agregar Un Producto"  placement="left" styles={{fontSize:"12px", color:"white"}}>
                <div className={styles.addProduct} onClick={()=> setOpenModal(true)}>  <i className="fa-solid fa-plus"></i>  </div>
            </Tooltip>

            <ModalCrudProduct isOpen={isOpenModal} onClose={()=> setOpenModal(false)} titleModal="productoAdmin" confirmAddProduct={updateListProducts} />
        
        </>
    )
}

export default ProductAdminPage // Updated export