import React, { useEffect, useState } from 'react'
import { Upload,Button,message,Form,Tag,Input } from 'antd';
import { UploadOutlined, DeleteOutlined,FileAddOutlined  } from '@ant-design/icons';
import ModalProducto from 'react-modal'
import styles from '../../../styles/productAdmin.module.css';
import {getCategories} from '../../../services/categoriesService'
import { addProduct, updateProduct } from '../../../services/productService';
import {PropTypes} from 'prop-types'
import Swal from 'sweetalert2';

const ModalCrudProduct = ({isOpen,onClose,titleModal,confirmAddProduct,confirmActualizacionProducto,productPutTable}) => {

    const [dataForm,setDataForm]=useState({name:'',characteristics:'',benefits:'',compatibility:'',price:"",stock:"",pdf:"",subcategory_id:[""],image:''})
    const [benefits, setBenefits] = useState([]);
    const [imageUrl, setImageUrl] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [dataCategories,setDataCategories]=useState(null)
    const [confirmAddProd,setConfirmAddProd]=useState(false)
    const [confirmPutProd,setConfirmPutProd]=useState(false)

    //LISTAR CATEGORIAS 
    const listCategories= async()=>{
        const response =await getCategories();
        response && setDataCategories(response.data);
    }

    useEffect(()=>{
        listCategories();
    },[])

    
    useEffect(()=>{
        if (productPutTable!=null) {
            setDataForm({
                name:productPutTable?.name || '',
                characteristics:productPutTable?.characteristics || '',
                benefits:productPutTable?.benefits || '',
                compatibility:productPutTable?.compatibility || '',
                price:productPutTable?.price || '',
                stock:productPutTable?.stock || '',
                //pdf:productPutTable?.pdf || '',
                subcategory_id:[productPutTable?.subcategories[0]?.id],
                image:productPutTable?.image.url || ''
            })
            setImageUrl(productPutTable?.image.url);
            setBenefits(productPutTable?.benefits || []);
        }
    },[productPutTable])

    //MANEJO DE BENEFICIOS
    const handleAddBenefit = () => {
        if (!inputValue) return;
    
        if (benefits.includes(inputValue)) {
            message.warning('Este beneficio ya ha sido agregado.');
            return;
        }
    
        setBenefits([...benefits, inputValue]);
        setInputValue(''); // Limpiar el campo de entrada
        };

    const handleDeleteBenefit = (benefit) => {
            setBenefits(benefits.filter((item) => item !== benefit));
    };

    //MANEJO DE LA IMAGEN 
    const props = {
        beforeUpload: (file, onSuccess) => {
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
                message.error('Solo se pueden cargar imágenes!');
                return false; 
            } else {
                const reader = new FileReader();
    
                reader.onloadend = () => {
                    const base64Image = reader.result;
                    setImageUrl(base64Image);
                };
            
                reader.readAsDataURL(file); 
            }
            onSuccess();  
            return false; 
        },
    };

    //OBTENER LOS DATOS DEL FORM
    const getDataInput= (e)=>{
        const {name,value}=e.target;

        if(name==="subcategory_id"){    
            setDataForm((prevData)=>({
                ...prevData,
                [name]:[Number(value)]
            }));
        }else{
            setDataForm((prevData)=>({
                ...prevData,
                [name]:value
            }));
        }

    }

    //ENVIAR FORMULARIO DE AGREGAR
    const handlerAddProduct = async (e) => {
        e.preventDefault();

        if (!dataForm.name) { message.error("Ingrese el Nombre del Producto"); return; }
        if (!dataForm.price) { message.error("Ingrese el Precio del Producto"); return; }
        if (!dataForm.stock) {message.error("Ingrese el Stock del Producto"); return;}
        if (!dataForm.compatibility) {message.error("Ingrese la Descripcion del Producto"); return;}
        if (!imageUrl) { message.error('Debes cargar una imagen');return;}
        if (benefits.length === 0) { message.error('Debes agregar al menos un beneficio'); return;}

        const updatedDataForm = {
            ...dataForm,
            characteristics:"string",
            benefits,
            image: imageUrl, 
        };
    

        if (updatedDataForm.characteristics !== '') {

            if(titleModal==="updateProduct"){
                const nameProd= localStorage.getItem("nameProduct");
                const response = await updateProduct(nameProd, updatedDataForm);
                console.log(updatedDataForm);
                if (response.status!==200) {
                    Swal.fire({
                        title:  response.message,
                        text: 'Error al Actualizar el producto',
                        icon: 'error',
                        timer: 2000,
                    });
                    }
                    else if(response.status===200){
                    Swal.fire({
                        title: '¡Producto Actualizado con éxito!',
                        icon: 'success',
                        timer: 2000,
                    });
                    confirmActualizacionProducto(!confirmPutProd);
                    setConfirmPutProd(!confirmPutProd);
                    clearForm();
                    }
            }else{
                const response = await addProduct(updatedDataForm);
    
                if (response.status!==200) {
                Swal.fire({
                    title:  response.message,
                    text: 'Error al agregar producto',
                    icon: 'error',
                    timer: 2000,
                });
                }
                else if(response.status===200){
                Swal.fire({
                    title: '¡Producto agregado con éxito!',
                    icon: 'success',
                    timer: 2000,
                });
                clearForm();
                setConfirmAddProd(!confirmAddProd);
                confirmAddProduct(!confirmAddProd);
                }
            }
        } else {
            message.error('Debes completar las características del producto');
        }
    };
    //LIMPIAR CAMPOS DEL FORM
    const clearForm=()=>{
        setImageUrl(null);
        setBenefits([]);
        setDataForm({
            name:'',
            compatibility:'',
            price:0,
            stock:0
        })
    }

   //ESTILOS DEL MODAL
    const customStyles= {
        content:{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#f9f9f9',
            padding: '20px 30px',
            height:"500px",
            width:"750px",
        },
        overlay:{
            backgroundColor: 'rgba(0,0,0,0.5)',
        }
        
    }

    //VALIDACION DEPENDIENDO DE QUE OPCION (ADD || PUT )INVOCA AL MODAL
    let title="";
    let descripcion="";

    if(titleModal==="updateProduct"){
        title="Editar Producto";
        descripcion="Modifica los detalles del producto";
    }else{
        title="Nuevo Producto"
        descripcion="Añade un nuevo producto a tu catálogo"
    }

    return (
        <ModalProducto
            isOpen={isOpen}
            onRequestClose={onClose}
            style={customStyles}
        >
        <div className={styles.productoAdminCrud}>
            <h3>{title}</h3>

            <p style={{fontSize:"12px"}}>{descripcion}</p>

            <form className={styles.form}>
                <section className={styles.sectionFirts}>
                    <label>Producto
                        <input type='text' 
                            placeholder='Nombre del producto' 
                            name='name'
                            value={dataForm.name}
                            onChange={getDataInput}
                            required/>
                    </label>
                    
                    <label>Categoria
                        <select 
                            name="subcategory_id"
                            value={dataForm.subcategory_id} 
                            onChange={getDataInput}>
                            <option value=''>Selecione una categoria</option>

                            {dataCategories?.map((obj) => (
                                obj.subcategories.map(subCat => (
                                    <option key={subCat.id} value={subCat.id}>{subCat.name.toLowerCase()}</option>
                                ))                           
                            ))}

                        </select>
                    </label>

                    <div className={styles.div}>
                        <label>Precio
                            <input 
                                type='number' 
                                name='price' 
                                value={dataForm.price}
                                onChange={getDataInput}
                            />  
                        </label>

                        <label>Stock
                            <input 
                                type='number'  
                                name='stock'  
                                value={dataForm.stock}
                                onChange={getDataInput}
                                />
                        </label>
                    </div>
                    <label className={styles.descripcion}>Descripcion
                        <textarea 
                            name="compatibility" 
                            placeholder='Breve descripcion...' 
                            value={dataForm.compatibility}
                            onChange={getDataInput}
                            />
                    </label>

                    <label >Beneficios
                        <div style={{display:"flex", gap:"5px"}}>
                        <Input style={{ width: '90%' , border: "1px solid rgb(173, 170, 170)"}} value={inputValue} onChange={(e) => setInputValue(e.target.value)} onPressEnter={handleAddBenefit} placeholder="Agregar beneficio"/>
                        <Button icon={<FileAddOutlined/>} type="primary" onClick={handleAddBenefit} style={{ width: '10%'}} />
                        </div>
                    </label>


                </section>

                <section className={styles.sectionLast}>
                    <label>Imagen del Producto
                    
                    {imageUrl ? 
                        <div style={{border:"none"}}>
                            <div>
                                <Upload {...props} showUploadList={false} customStyles={{padding:"0",margin:"0",boxSizing:"border-box", border:"none"}} />
                                <DeleteOutlined className={styles.deleteImage} onClick={()=> setImageUrl(null)} />  
                            </div>

                            {imageUrl && (
                                <div style={{
                                    width: '100%',
                                    backgroundImage: `url(${imageUrl})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center 70%',  }}>   
                                </div>)}
                            
                        </div>
                        :   
                        <div style={{
                            overflow:"hidden",
                            border: "1px solid rgb(173, 170, 170)",
                            borderRadius: "5px",
                            fontSize: "10px",
                            padding: "10px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent:"space-around",
                            cursor: "pointer",
                            height: "78%",
                            backgroundImage: `url(${imageUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',}}>

                            <i className="fa-solid fa-cloud-arrow-down"></i>
                            <p>Arrastra una imagen o haz clic para seleccionar</p>

                            <Upload {...props}>
                                <Button icon={<UploadOutlined />} style={{height:"120px", border:"1px dashed black"}}>Cargar imagen</Button>
                            </Upload>
                            
                        </div>
                    }
                    </label>


                    <div className={styles.wrapperBtnProducts}>
                        <button onClick={handlerAddProduct}>{title}</button>
                    </div>
                </section>
            </form>

            <div style={{width:"100%", display:"flex" , flexWrap:"wrap",borderRight:"1px solid  rgba(213, 213, 213, 1)",borderLeft:"1px solid  rgba(213, 213, 213, 1)",borderBottom:"1px solid  rgba(213, 213, 213, 1)",borderBottomLeftRadius:"5px",borderBottomRightRadius:"5px" }}>
                {benefits.map((benefit, index) => (
                <Tag key={index} closable onClose={() => handleDeleteBenefit(benefit)} style={{ margin: '5px'}}>
                                    {benefit}
                </Tag> ))}
            </div>

            <label onClick={()=>{
                onClose();
                setImageUrl("")
            }} className={styles.closeModal}>&#215;
            </label>
        </div>

        </ModalProducto>
    )
}
ModalCrudProduct.propTypes={
    titleModal:PropTypes.string,
    confirmAddProduct:PropTypes.func,
    confirmPutProduct:PropTypes.func,

}
export default ModalCrudProduct
