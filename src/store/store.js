import {configureStore} from '@reduxjs/toolkit'
import authreducer from '../store/authslice'
const store=configureStore(
    //this is the store where we configure all of our store elements  
    {
        reducer:{
         auth:authreducer
        }
    }
)

export default  store