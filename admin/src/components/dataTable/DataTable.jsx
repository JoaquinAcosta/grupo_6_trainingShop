import React from 'react';
import MUIDataTable from "mui-datatables";



export const DataTable = ({products}) => {
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
          label: "PRODUCTO",
          options: {
            filter: true,
            sort: false,
          },
        },
        
        {
          name: "price",
          label: "PRECIO",
          options: {
            filter: true,
            sort: true,
          },
        },
      ];
      const data = products.data
      const options = {
        filterType: "checkbox",
      };
  return (
    <MUIDataTable
    title={'Listado de Productos'}
    data= {data}
    columns={columns}
    options={options}
    />
  )
}
