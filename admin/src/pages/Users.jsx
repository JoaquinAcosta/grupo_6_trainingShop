import React from 'react'
import './users.css'

export const Users = () => {
  return (
    <div class="cotainer mt-4">
    <div class="row">
        <div class="col table-responsive">
            <table class="table table-striped table-hover table-bordered tabla-users ">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>IMAGE</th>
                        <th>NOMBRE</th>
                        <th>EMAIL</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                {/* <% users.forEach(({id,name,lastname,email}) => { %> */}
                 <tbody >
                    <td>ID </td>
                    <td>IMAGE </td>
                    <td>NAME </td>
                    <td>EMAIL </td>
                    <td>
                      
                        <form /* action="/users/delete/<%= id %>?_method=DELETE" method="POST" */>
                            <button type="submit" className="btn-TraininShop">Borrar</button>
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