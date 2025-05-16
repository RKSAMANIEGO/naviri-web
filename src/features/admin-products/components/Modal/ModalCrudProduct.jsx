import React, { useEffect, useState } from 'react'
import { Upload,Button,message,Form,Tag,Input } from 'antd';
import { UploadOutlined, DeleteOutlined,FileAddOutlined, InboxOutlined  } from '@ant-design/icons';
import ModalProducto from 'react-modal'
import styles from '../../styles/productAdmin.module.css';
import {getCategories} from '../../services/adminCategoriesApi'
import { addProduct, updateProduct } from '../../services/adminProductsApi';
import {PropTypes} from 'prop-types'
import Swal from 'sweetalert2';

const ModalCrudProduct = ({isOpen,onClose,titleModal,confirmAddProduct,confirmActualizacionProducto,productPutTable}) => {

    const [dataForm,setDataForm]=useState({name:'',characteristics:'',benefits:'',compatibility:'',price:"",stock:"",discount:"",pdf:"",subcategory_id:[""],use_case:""})
    const [imageFiles, setImageFiles] = useState([]);
    const [benefits, setBenefits] = useState([]);
    const [deleteImgs, setDeleteImgs] = useState([]);
    const [imageUrl, setImageUrl] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [dataCategories,setDataCategories]=useState(null)
    const [confirmAddProd,setConfirmAddProd]=useState(false)
    const [confirmPutProd,setConfirmPutProd]=useState(false)
    
    //add prop Dscto
    //const [dscto,setDscto]=useState(0);
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
                discount:productPutTable?.discount || 0,  
                subcategory_id:[productPutTable?.subcategories[0]?.id],
                use_case: productPutTable.use_case || '',
                image: productPutTable?.image?.map(img => img.url) || []     

            })

            setImageFiles(productPutTable?.image)
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

    const uploadProps = {
        beforeUpload: (file) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('Solo se permiten imágenes (JPG, PNG, WEBP)!');
        }
        return isImage ? false : Upload.LIST_IGNORE;
        },
        onChange: ({ file,fileList: newFileList }) => {

            if (file.status === 'removed') {
                if (file.id) {
                    // message.info(`Se eliminó la imagen: ${file.id}`);
                    setDeleteImgs(prev => [...prev, file.id]);
                }
            }

            newFileList = newFileList.map(file => {
            if (file.originFileObj && !file.preview) {
                file.preview = URL.createObjectURL(file.originFileObj);
            }
            return file;
            });
            setImageFiles(newFileList);
        },
        
        imageFiles,
        listType: "picture-card",
        maxCount: 6,
        accept: "image/jpeg,image/png,image/webp",
        multiple: true,
    };

    //OBTENER LOS DATOS DEL FORM
    const getDataInput= (e)=>{
        const {name,value}=e.target;

        if(name==="subcategory_id"){
            // console.log(value);
            
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
        if (!dataForm.subcategory_id[0]) { message.error("Ingrese Una Categoria"); return; }
        if (!dataForm.price) { message.error("Ingrese el Precio del Producto"); return; }
        if (!dataForm.stock) {message.error("Ingrese el Stock del Producto"); return;}
        if (!dataForm.compatibility) {message.error("Ingrese la Descripcion del Producto"); return;}
        if (benefits.length === 0) { message.error('Agrega al menos un beneficio'); return; }
        if (imageFiles.length   === 0) { message.error('Carga al menos una imagen'); return; }
        if (!dataForm.discount) {
                
            message.error("Ingrese el descuento del Producto"); return;
        }

        const formData = new FormData();
        
        formData.append('name', dataForm.name);
        formData.append('characteristics', dataForm.compatibility);
        formData.append('price', dataForm.price);
        formData.append('stock', dataForm.stock);
        formData.append('discount',parseInt(dataForm.discount));
        formData.append('compatibility', dataForm.compatibility);
        formData.append('use_case', dataForm.use_case);
        formData.append('subcategory_id', dataForm.subcategory_id[0]);
        deleteImgs && deleteImgs.forEach(i => formData.append('delete_images[]', i));

        benefits.forEach(b => formData.append('benefits[]', b));

        // Agregar imágenes
        imageFiles.forEach(file => {
            if (file.originFileObj) formData.append('images[]', file.originFileObj);
        });


            let response;
            if(titleModal==="updateProduct"){
                const nameProd= localStorage.getItem("nameProduct");

                formData.append('_method', 'PUT');

                const response = await updateProduct(nameProd, formData);

                if(response.status === 422){
                    Swal.fire({
                        title: '¡El Producto Ya Existe!',
                        text: 'Intente con otro nombre',
                        icon: 'warning',
                        timer: 2000,
                    });
                }
                else if (response.status!==200) {
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
                    onClose();
                }

            }else{
            
                response = await addProduct(formData);

                if (response.status===422 || response.status===409) {
                Swal.fire({
                        title: '¡El Producto Ya Existe!',
                        text: 'Intente con otro nombre',
                        icon: 'warning',
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
                onClose();
                }
            }
    
    };
    //LIMPIAR CAMPOS DEL FORM
    const clearForm=()=>{

        setImageFiles([]);
        setBenefits([]);
        setDataForm({
            name:'',
            compatibility:'',
            price:0,
            stock:0,
            use_case: '',
            discount:0, // add field discount
            image: [],
            subcategory_id: [''],   
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
            zIndex: 100
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

            <form className={styles.form} >
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
                            value={dataForm?.subcategory_id || ''}
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

                        {/**** add prop Dscto ****/}

                        <label>Dscto
                            <input
                                type='number'
                                name='discount'
                                value={dataForm.discount}
                                onChange={getDataInput}
                            />
                        </label>

                        {/** ------------------*/}

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
                    <label className={styles.descripcion}>Modo de Uso
                        <textarea
                            name="use_case"
                            placeholder='Modo de aplicar'
                            value={dataForm.use_case}
                            onChange={getDataInput}
                            />
                    </label>

                    <label >Beneficios
                        <div style={{display:"flex", gap:"5px"}}>
                        <Input
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === 'Enter') {
                                e.preventDefault();    // evita el submit
                                handleAddBenefit();
                                }
                            }}
                            placeholder="Agregar beneficio"
                        />

                        <Button icon={<FileAddOutlined/>} type="primary" onClick={handleAddBenefit} style={{ width: '10%'}} />
                        </div>
                    </label>

                    <div style={{height: "20px" , width:"100%", display:"flex" , flexWrap:"wrap"}}>
                        {benefits.map((benefit, index) => (
                        <Tag key={index} closable onClose={() => handleDeleteBenefit(benefit)} style={{ margin: '5px'}}>
                                            {benefit}
                        </Tag> ))}
                    </div>

                </section>

                
                <section className={styles.sectionLast}>
                

                    <Upload.Dragger {...uploadProps} fileList={imageFiles} height={120} >
                        <div className="text-center">
                            <UploadOutlined className="text-2xl mb-2" />
                            <p className="text-sm">Arrastra tu imagen aquí o haz clic para seleccionar</p>
                        </div>
                    </Upload.Dragger>
                

                    <div className={styles.footerButtonWrapper}> 
                        <button
                            className='bg-pink-500 h-10 text-sm text-white px-4 rounded hover:bg-pink-600 cursor-pointer'
                            onClick={handlerAddProduct}
                        >
                            {title}
                        </button>
                    </div>                
                </section>

            </form>
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