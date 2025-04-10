import React, { useEffect, useState } from 'react'
import CategorieContent from '../../components/categoriaAdmin/CategorieContent'
import CategorieSearch from '../../components/categoriaAdmin/CategorieSearch'
import CategorieTable from '../../components/categoriaAdmin/CategorieTable'
import { getCategories } from '../../services/categoriesService'
import styles from '../../styles/categorie.module.css';
const CategoriaPage = () => {

    const [dataCat,setDataCategories]=useState([])
    const [categorieSelected,setCategorieSelected]=useState(null)
    const [isConfirmAdd , setConfirmAdd]=useState(false);
    const [isConfirmPut , setConfirmPut]=useState(false);
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

    useEffect(()=>{
        listCategories();
    },[isConfirmAdd])


    return (
        <>
                <CategorieSearch/>
                
                <div className={styles.pageCategoria}>
                    {categorieSelected ? <CategorieContent className={styles.catContent} updateListCategorie={getConfirmAdd} categoriaSelect={categorieSelected}/> 
                    : <CategorieContent className={styles.catContent} updateListCategorie={getConfirmAdd}/>}

                    <section className={styles.sectionTable}>
                        {dataCat && <CategorieTable dataCategorie={dataCat} updateListCategorie={getConfirmAdd} optionPutCategorie={getConfirmOptionPut}/> } 
                    </section>
                </div>
        </>

    )
}

export default CategoriaPage

