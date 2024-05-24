import { IconButton, Slider } from '@mui/material';
import React, { useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';

const FilterPrice = ({price, setPrice, setPriceFilterActive, priceFilterActive, maxPrice}) =>{
    const [value1, setValue1] = useState([parseInt(price[0]), parseInt(price[1])]);
    function valuetext(value) {
      return `${value}`;
    }
    const minDistance = 50;
  
    const handleChange1 = (event, newValue, activeThumb) => {
      if (!Array.isArray(newValue)) {
        return;
      }
  
      if (activeThumb === 0) {
        setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
      } else {
        setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
      }
    };
    function handleSubmite(e)
    {
      setPrice([value1[0], value1[1]]);
      setPriceFilterActive(true);
    }
    function handleInputChange(e)
    {
      switch(e.target.id)
      {
        case 'min':
          setValue1([e.target.value!=''?parseInt(e.target.value):0, value1[1]])
          break;
        case 'max':
          setValue1([value1[0], e.target.value!=''?parseInt(e.target.value):0])
          break;
      }
    }
    return (
      <>
          <Slider
            getAriaLabel={() => 'Minimum distance'}
            color='liliana_black'
            value={value1}
            onChange={handleChange1}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            disableSwap
            min={10}
            max={maxPrice+200}
          />
          <div className='flex flex-wrap gap-1'>
            <input
                id="min"
                size='small'
                type='number'
                className='h-8 text-sm w-20'
                value={value1[0]}
                onChange={handleInputChange}
              />
            -
              <input
                id="max"
                size='small'
                type='number'
                className='h-8 text-sm w-20'
                value={value1[1]}
                onChange={handleInputChange}
              />
            <IconButton onClick={handleSubmite} color='success' size='small'>
              <FaCheckCircle/>
            </IconButton>
            {priceFilterActive &&
            <IconButton onClick={()=>setPriceFilterActive(false)} size='small'>
              <FaXmark className='text-red-600'/>
            </IconButton>
            }
          </div>
        </>
    )
}

export default FilterPrice;