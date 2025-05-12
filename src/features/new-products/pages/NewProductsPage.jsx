import React from 'react'
import HeaderNewProducts from '../components/HeaderNewProducts/HeaderNewProducts'
import TitleNewProducts from '../components/TitleNewProducts/TitleNewProducts'
import ContentProductNew from '../components/ContentProductNew/ContentProductNew'
import SeccionInAnimation from '../../../shared/animation/SeccionInAnimation'
const NewProductsPage = () => {
    return (
        <>
            <HeaderNewProducts/>
            <SeccionInAnimation title={ <TitleNewProducts/>}/>
            <ContentProductNew/>
        </>
    )
}

export default NewProductsPage
