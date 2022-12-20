import React, { useState, useEffect } from "react";
import { DataTable } from "../components/dataTable/DataTable";
import { UseFetch } from "../hooks/UseFetch";

export const ProductsTable = () => {
  const [products, setProducts] = useState({
    loading: true,
    data: [],
  });

  useEffect(() => {
    UseFetch("/products")
      .then(({ meta, data }) => {
        if (meta.ok) {
          setProducts({
            loading: false,
            data,
          });
        }
      })
      .catch(() => console.error);
  }, []);


  return (
    <div className="container">
      <h4 className="text-center mt-3">Tabla de Productos</h4>
      <DataTable products={products.data} />
    </div>
  );
};
