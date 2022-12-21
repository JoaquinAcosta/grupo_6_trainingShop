import React, { useEffect, useState } from 'react'
import { UseFetch } from '../../hooks/UseFetch';
import { Metric } from './Metric'

export const Metrics = () => {
    console.log(process.env.REACT_APP_API_URL_BASE);

    const [products, setProducts] = useState({
        title: "Total Productos",
        icon: "fa-boxes",
        value: 0,
        color: "primary"
    });
    const [users, setUsers] = useState({
        title: "Usuarios registrados",
        icon: "fa-users",
        value: 0,
        color: "success"
    })
    const [categories, setCategories] = useState({
        title: "Categorias activas",
        icon: "fa-folder",
        value: 0,
        color: "warning"
    })

    useEffect(() => {



        UseFetch('/products')
            .then(({ data }) => {
                setProducts({
                    ...products,
                    value: data.totalProduct
                })
            }).catch(error => console.error)

        UseFetch('/users')
            .then(({ data }) => {
                console.log(data);
                setUsers({
                    ...users,
                    value: data.totalUser
                })
            }).catch(error => console.error)
        UseFetch('/users')
            .then(({ data }) => {
                console.log(data);
                setUsers({
                    ...users,
                    value: data.totalCategory
                })
            }).catch(error => console.error)

    }, []);
    /* useEffect(() => {
       
        UseFetch('/users')
            .then(({data}) => {
                setState({
                    users: {
                        ...state.users,
                        value: data.count
                    }
                })
                
            }).catch(error => console.error)

        
    }, []); */

    return (
        <div className="row">
            <Metric {...products} />
            <Metric {...users} />
            {/* <Metric {...categories}/> */}
        </div>

    )
}