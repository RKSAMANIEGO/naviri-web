import React, { useEffect, useState } from 'react'
import CategorieContent from '../../components/categoria/CategorieContent'
import CategorieSearch from '../../components/categoria/CategorieSearch'
import CategorieTable from '../../components/categoria/CategorieTable'
import { getCategories } from '../../services/categoriesService'

const CategoriaPage = () => {

    const [dataCat,setDataCategories]=useState([])

    const listCategories=async()=>{
        const response = await getCategories();
        if(response) {
            setDataCategories(response.data)
        }

    } 

    useEffect(()=>{
        listCategories();
    },[])


    return (
        <>
                <CategorieSearch/>
                <CategorieContent/>
                {dataCat && <CategorieTable dataCategorie={dataCat} /> } 
        </>

    )
}

export default CategoriaPage

