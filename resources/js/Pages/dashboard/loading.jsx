import React from 'react'
import { Skeleton } from '@mui/material'
const loading = () => {
  return (
    <>
      <Skeleton variant='text' width={120} height={50} animation={'wave'} />
      <Skeleton variant='rectangular' animation={'wave'} height={400} width={800} />
    </>
  )
}

export default loading;