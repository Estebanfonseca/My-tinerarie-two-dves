import React,{useEffect} from 'react';

export default function ScrollToTop() {
    useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, []);

    return (
        <div>
        <button className='scrollTop' onClick={() => {window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}} > ^ </button>
        </div>
    );
}