import React, { useState, useEffect } from "react";
import { UsersTable } from "../components/usersTable/UsersTable";
import { UseFetch } from "../hooks/UseFetch";

export const Users = () => {
  const [users, setUsers] = useState({
    loading: true,
    data: [],
  });

  useEffect(() => {
    UseFetch("/users")
      .then(({ ok,data }) => {
        if (ok) {
          setUsers({
            loading: false,
            data,
          });
        }
      })
      .catch(() => console.error);
  }, []);
 

  return (
    <div className="container">
      <h4 className="text-center mt-3">Tabla de Usuarios</h4>
      <UsersTable users={users.data} />
    </div>
  );
};
