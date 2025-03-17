import { Button, ButtonGroup } from '@mui/material';
import React from 'react'

const QuentityBar = ({Q, setQ}) =>{
    function subFromCart()
    {
        if (Q > 1)
            setQ(Q-1);
    }
    function addToCart(){
        setQ(Q+1);
    }
    return(
        <>
        <ButtonGroup variant="outlined" aria-label="Basic button group">
            <button onClick={subFromCart} className='bg-black text-white w-12'>-</button>
            <div className='flex w-12 border border-black text-black justify-center items-center'>{Q}</div>
            <button onClick={addToCart} className='bg-black text-white w-12'>+</button>
        </ButtonGroup>
        </>
    )
}

export default QuentityBar;