import React from 'react'

export const Users = () => {
  return (
    <div class="cotainer mx-auto mt-4">
    <div class="row">
        <div class="col">
            <table class="table table-striped table-hover table-bordered tabla-users">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOMBRE</th>
                        <th>EMAIL</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                {/* <% users.forEach(({id,name,lastname,email}) => { %> */}
                 <tbody >
                    <td>ID </td>
                    <td>NAME </td>
                    <td>EMAIL </td>
                    <td>
                      
                        <form /* action="/users/delete/<%= id %>?_method=DELETE" method="POST" */>
                            <button type="submit" class="btn btn-danger">Borrar</button>
                        </form>
                        
                    </td>
                </tbody>
               {/*  <% }) %>  */}
                
            </table>
        </div>
    </div>
</div>
  )
}