import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { UseFetch } from '../../hooks/UseFetch';
import { LastProductInfo } from './LastProductInfo';


export const LastProduct = () => {

    const [lastProduct, setLastProducts] = useState({
        loading: true,
        data: [],
      });
    
      useEffect(() => {
        UseFetch("/products/detail/new")
          .then(({ meta, data }) => {
            if (meta.ok) {
              setLastProducts({
                loading: false,
                data,
              });
            }
          })
          .catch(() => console.error);
      }, []);


  return (
    <div className="col-lg-6 mb-4">
    <div className="card shadow mb-4">
        <div className="card-header py-3">
            <h5 className="m-0 font-weight-bold text-gray-800">Último Producto Agregado</h5>
        </div>
       { 
          lastProduct.loading //se necesito preguntar si el loading del producto esta en true, sino se rompe y te tire undefined
          ?
          <p className='text-center'>Cargando...</p>
          :
          
            <LastProductInfo {...lastProduct}/>
       
       }
    </div>
</div>
  )
}
