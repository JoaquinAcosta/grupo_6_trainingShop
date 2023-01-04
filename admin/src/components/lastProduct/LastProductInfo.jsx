import React from 'react'

export const LastProductInfo = ({data}) => {
    let dataOfProduct = data.product[0];
    console.log('asdasdasdasd',dataOfProduct)
  return (
    
    <div className="card-body">
            <div className="text-center">
                <h5>{dataOfProduct.name}</h5>
                <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: "15rem" }} src={dataOfProduct.images[0].file} alt=" Star Wars - Mandalorian " />
            </div>
            <p>{dataOfProduct.description}</p>
        </div>
  )
 
}
