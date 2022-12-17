import React from 'react'
import { Row } from './Row';

export const Table = ({products}) => {
  return (
    <div class="cotainer">
      <div class="row">
        <div class="col table table-responsive">
          <table class="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>IMAGEN</th>
                <th>NOMBRE</th>
                <th>PRECIO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>

            <tbody>
              {products.data.map((product, index) => (
                <Row
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
