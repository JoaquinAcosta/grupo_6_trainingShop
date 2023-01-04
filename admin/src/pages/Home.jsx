import React from 'react';
import { Categories } from '../components/categories/Categories';
import {Metrics} from '../components/metricas/Metrics'


export const Home = () => {
  return (
    <div className="container-fluid">
    <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800 mt-2">Dashboard Comisión 16</h1>
    </div>

    <Metrics/>




    <div className="row">



    <Categories/>

    
    </div>
</div>
  )
}