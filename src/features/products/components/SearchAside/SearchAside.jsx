import React, { useEffect, useState } from 'react'

const SearchAside = ({products,recibirValuePrecio,recibirCategories}) => {

    const [checkSelectionCategorie ,setCheckSelectionCategorie] = useState(null);
    const [checkSelectionPrice ,setCheckSelectionPrice] = useState(null);
    const [dataCategorie , setCategorie] = useState(null);
    const [dataPrice , setPrice] = useState(null);

    useEffect(()=>{
        
        if(products) {

            //CATEGORIE
            const categorie= products?.map(prod=> prod.categories.map(subCat=>subCat.name).join());
            const listCategorie= new Set(categorie.flat());

            setCategorie([...listCategorie]);

            //LLENAR EL CHECKSELECTION CATEGORIE
            const statedStart= {};
            [...listCategorie].forEach(cat => {
                statedStart[cat.toLowerCase()] = false;
            })

            setCheckSelectionCategorie(statedStart);
            
            //PRICE 

            const price= products?.map(prod => prod.price);
            const listPrice= new Set(price);
            const listPriceSort= [...listPrice].sort((a,b)=> a-b);
            setPrice(listPriceSort)

            //LLENAR EL CHECKSELECTION PRICE

            const newListPrice = {};
            listPriceSort.forEach(price => newListPrice[price]=false)
            setCheckSelectionPrice(newListPrice);
        }
    },[products])

    const handlerCheck =(e)=>{
        const {checked , name} = e.target;

          // Marcar solo la categoría seleccionada, desmarcar las demás
            const newSelection = Object.fromEntries(
            Object.keys(checkSelectionCategorie).map(key => [key, false])
            );

            newSelection[name] = checked;

            setCheckSelectionCategorie(newSelection);

            recibirCategories(checked ? name.toLowerCase() : "");
    }

    const handlerCheckPrice =(e)=>{
        const {checked , name} = e.target;

          // Marcar solo la categoría seleccionada, desmarcar las demás
            const newSelection = Object.fromEntries(
            Object.keys(checkSelectionPrice).map(key => [key, false])
            );

            newSelection[name] = checked;

            setCheckSelectionPrice(newSelection);

            recibirValuePrecio(checked ? name : "");
    }
    return (

        <div className='flex flex-col gap-5 w-[20%] my-[40px]'>   
            <aside className='flex flex-col justify-around w-full h-[60vh] p-5  border-[1px] border-pink-200  rounded-sm'>
                <h3 className='text-xl font-bold text-pink-500'>Categorias</h3>
                <ul>
                    {dataCategorie?.map((cat,index) => (
                        <li className={` flex gap-3 capitalize`} key={index}><input name={cat.toLowerCase()} type='checkbox' checked={checkSelectionCategorie[cat.toLowerCase()] || false} onChange={handlerCheck} />{cat.toLowerCase()}</li>
                    ))}
                </ul>
            </aside>

            <aside className='flex flex-col justify-around w-full h-[60vh] p-5  border-[1px] border-pink-200  rounded-sm'>
                <h3 className='text-xl font-bold text-pink-500'>Precios</h3>
                <ul>
                    {dataPrice?.map((cat,index) => (
                        <li className='flex gap-3 capitalize' key={index}><input name={cat}  type='checkbox' checked={checkSelectionPrice[cat] || false}  onChange={handlerCheckPrice } />{cat.toLowerCase()}</li>
                    ))}
                </ul>
            </aside>
        </div>
    )
}

export default SearchAside
