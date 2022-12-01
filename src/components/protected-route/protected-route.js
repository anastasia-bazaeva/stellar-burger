import React from 'react';
import { Redirect, useLocation, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function ProtectedRoute ({onlyUnAuth, children, ...props}) {
    const location = useLocation();
    const isAuthChecked = useSelector(state => state.reducerAuth.isAuthChecked);
    const user = useSelector(state => state.reducerAuth.user);
    // if(!isAuthChecked) {
    //     return <div>Загрузка</div>
    // }


    if (onlyUnAuth && user ) {
        return <Redirect to='/'/>
    }

    if(!onlyUnAuth && !user){
        return <Redirect to={{ pathname: '/login', state: {from: location}}}/>
    }

    return (
        <Route {...props}>{children}</Route>
    )
}