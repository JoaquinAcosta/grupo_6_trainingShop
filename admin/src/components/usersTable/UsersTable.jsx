import React from 'react';
import MUIDataTable from "mui-datatables";



export const UsersTable = ({users}) => {
    const columns = [
        {
          name: "id",
          label: "ID",
          options: {
            filter: true,
            sort: true,
          },
        },
        {
          name: "name",
          label: "NOMBRE",
          options: {
            filter: true,
            sort: true,
          },
        },
        
        {
          name: "lastName",
          label: "APELLIDO",
          options: {
            filter: true,
            sort: true,
          },
        },
        {
          name: "email",
          label: "EMAIL",
          options: {
            filter: true,
            sort: true,
          },
        },
      ];
      const data = users.data
      const options = {
        filterType: "checkbox",
      };
     
  return (
    <MUIDataTable
    title={'Listado de Usuarios'}
    data= {data}
    columns={columns}
    options={options}
    />
  )
}