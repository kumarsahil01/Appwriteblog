import React from 'react'
//we are using componets to be better at the place 
const Container = ({children}) => {
  return (
    <div className='w-full max-w-7xl mx-auto px-4'>
      {children}
    </div>
  )
}

export default Container
