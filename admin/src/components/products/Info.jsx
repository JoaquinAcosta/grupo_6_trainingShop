import React from 'react'

export const Info = ({ name,description, brand, categories, images }) => {
    let imageProduct = [images][0]?.[0].file;
    return (
        <div className="card">
            <div className="card-header">
                <h5>Información</h5>
            </div>
            <div className="card-body">
                <img className='img-thumbnail' src={imageProduct} alt=""/>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <label>Nombre:</label>
                        <p className='m-0'><b>{name}</b></p>
                    </li>
                    <li className="list-group-item">
                        <label >Marca:</label>
                        <p className='m-0'><b>{brand?.name}</b></p>
                    </li>
                    <li className="list-group-item">
                        <label>Categoría:</label>
                        <p className='m-0'><b>{[categories?.name]}</b></p>
                    </li>
                    <li className="list-group-item">
                        <label>Descripción:</label>
                        <p className='m-0'><b>{description}</b></p>
                    </li>
                </ul>
            </div>
        </div>
    )
}