import React from 'react'
import PublicRoutes from './PublicRoutes'
import PrivateRoutes from './PrivateRoutes'
import { Routes, Route } from 'react-router-dom'
import { publicRoutes, privateRoutes, exposedRoutes} from './RoutesData'

function AppRoutes(){
    return(
        <Routes>
            {publicRoutes.map((elem, index) =>{
                return <Route key={index} element={<PublicRoutes>{elem.element}</PublicRoutes>} path={elem.path} />
            })}
             {privateRoutes.map((elem, index) =>{
                return <Route key={index} element={<PrivateRoutes>{elem.element}</PrivateRoutes>} path={elem.path} />
            })}
              {exposedRoutes.map((elem, index) =>{
                return <Route key={index} element={elem.element} path={elem.path} />
            })}
            <Route element = {<h1>Not Found</h1>} path= '*'/>
        </Routes>
    )
}

export default AppRoutes