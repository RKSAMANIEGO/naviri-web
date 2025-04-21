import React, { useEffect, useState } from 'react'
import CategorieContent from '../components/CategorieContent' // Adjusted path
import CategorieSearch from '../components/CategorieSearch' // Adjusted path
import CategorieTable from '../components/CategorieTable' // Adjusted path
import { getCategories } from '../services/adminCategoriesApi' // Updated path
import styles from '../styles/categorie.module.css'; // Updated path

const CategoryAdminPage = () => { // Renamed component

    const [dataCat,setDataCategories]=useState([])
    const [categorieSelected,setCategorieSelected]=useState(null)
    const [isConfirmAdd , setConfirmAdd]=useState(false);
    const [isConfirmPut , setConfirmPut]=useState(false);
    const [textSearchCat, setTextSearchCat]=useState('');
    const [filterCategorie, setFilterCategoriew]=useState(null)

    useEffect(()=>{
        listCategories();
    },[isConfirmAdd])


    useEffect(()=>{
        if(textSearchCat){
            const filtroCategoria = dataCat.filter(categorie  => categorie.name.toLowerCase().includes(textSearchCat.toLowerCase()));
            console.log(filtroCategoria);
            setFilterCategoriew(filtroCategoria);
        }else{
            setFilterCategoriew(null);
        }
    },[dataCat,textSearchCat])

    //LISTAR CATEGORIA
    const listCategories=async()=>{
        const response = await getCategories();
        if(response) {
            setDataCategories(response.data)
        }

    }

    //METODO PARA ACTUALIZAR LA LISTA DE CATEGORIA
    const getConfirmAdd=(confirm)=>{
        if(confirm === isConfirmAdd){
            setConfirmAdd(!isConfirmAdd)
        }else{
            setConfirmAdd(confirm)
        }
    }

    //GET CONFIRM OPTION PUT
    const getConfirmOptionPut= (confirm)=>{
        setConfirmPut(confirm);
        console.log(isConfirmPut);
        console.log()
        if(dataCat){
            const idCat = localStorage.getItem("idCat");
            const catSelect = dataCat.find(obj => obj.id === Number(idCat));
            setCategorieSelected(catSelect)
        }
    }

    //OBTENIENDO EL TEXTO DE BUSCAR CATEGORIA
    const getTextSearch = (textSearch)=>{
        console.log(textSearch);
        textSearch!==null ?  setTextSearchCat(textSearch) : setTextSearchCat(null) ;
    }

    return (
        <>
                <CategorieSearch getTextSerch={getTextSearch}/>

                <div className={styles.pageCategoria}>
                    {categorieSelected ? <CategorieContent className={styles.catContent} updateListCategorie={getConfirmAdd} categoriaSelect={categorieSelected}/>
                    : <CategorieContent className={styles.catContent} updateListCategorie={getConfirmAdd}/>}

                    <section className={styles.sectionTable}>
                        {dataCat && <CategorieTable dataCategorie={dataCat} updateListCategorie={getConfirmAdd} optionPutCategorie={getConfirmOptionPut} categorieFilter={filterCategorie}/> }
                    </section>
                </div>
        </>

    )
}

export default CategoryAdminPage // Updated export