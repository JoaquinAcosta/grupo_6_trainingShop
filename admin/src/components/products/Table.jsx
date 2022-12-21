import React from 'react'
import { Row } from './Row';

export const Table = ({products, getInfo }) => {
  return (
    <div className="cotainer">
      <div className="row">
        <div className="col table table-responsive">
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>NOMBRE</th>
                <th>PRECIO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>

            <tbody>
              {products.data.map((product, index) => (
                <Row
                  getInfo={getInfo}
                  {...product}
                  key={product.name + index}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
