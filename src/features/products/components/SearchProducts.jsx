import { useEffect, useRef, useState } from 'react'
import styles from './producto.module.css' 
import ScrollReveal from "scrollreveal";
const SearchProducts = ({recibirTextInput}) => {

    //Animación
    const sr = useRef(null);
    const searchRef = useRef(null);
    const btnSearchRef = useRef(null);

    const[searchText,setSearchText]=useState("");
    const searchProducts = () =>recibirTextInput(searchText);


    useEffect(() => {
        sr.current = ScrollReveal({
            reset: false, 
            distance: '20px',
            duration: 1000,
            easing: 'cubic-bezier(0.5, 0, 0, 0.3)',
            viewFactor: 0.1, 
        });

        if (searchRef.current) {
            sr.current.reveal(searchRef.current, {
                origin: 'left',
                delay: 300,
            });
        }
        
        if (btnSearchRef.current) {
            sr.current.reveal(btnSearchRef.current, {
                origin: 'right',
                delay: 300,
            });
        }


        return () =>{
            if(sr.current){
                sr.current.clean(searchRef.current);
                sr.current.clean(btnSearchRef.current);
            } 
        }

    }, []);


    return (
    <div  className={styles.search}>
        <section className='container-search'>
            <label  ref={btnSearchRef}>
                <span ref={searchRef}>
                    <input type="text" placeholder='Buscar productos...' value={searchText} onChange={(e)=>setSearchText(e.target.value)} />
                    <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <button onClick={searchProducts}>Buscar</button>
            </label>
        </section>
    </div>
    )
}

export default SearchProducts