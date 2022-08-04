import React from 'react'
import PuffLoader from "react-spinners/PuffLoader";

function MiniLoader({message}) {
  return (
    <div className='flex-col items-center justify-center'>
        <div>
        <PuffLoader color="#00FF00" loading={true} speedMultiplier={3} />

  </div>
  <div className='text-green-500'>{message}</div>
  </div>)
}

export default MiniLoader