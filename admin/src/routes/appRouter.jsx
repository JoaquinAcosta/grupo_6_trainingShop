import React from 'react';
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import { Home } from '../pages/Home';

const router = createBrowserRouter(
    createRoutesFromElements(
      
      <Route path='/' element={<Home/>}>
      </Route>
    )
)

export const AppRouter = () => {
    return <RouterProvider router={router}/>
  }