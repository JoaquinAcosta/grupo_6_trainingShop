import React from "react";
import swal from 'sweetalert';

export const Row = ({ id, name, price, getInfo }) => {
  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{name}</td>
      <td className="text-right">{price}</td>
      <td>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-sm btn-primary mx-1"
            style={{ width: "30px" }} title="Info"
            onClick={()=>getInfo(id)} 
          >
            <i className="fas fa-info"></i>
          </button>
          <button
            className="btn btn-sm btn-success mx-1" title="Editar"
            style={{ width: "30px" }}
            onClick={()=>swal('Equipo de desarrollo:','Disculpe, esta sección aún está en proceso')}
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            className="btn btn-sm btn-danger mx-1" title="Eliminar"
            style={{ width: "30px" }}
            onClick={()=>swal('Equipo de desarrollo:','Disculpe, esta sección aún está en proceso')}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  );
};