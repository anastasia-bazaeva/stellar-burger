import React, {FC, ReactNode} from 'react';
import { Redirect, useLocation, Route  } from 'react-router-dom';
import { useSelector } from '../../hooks/wrappers';
import { ILocationState } from '../app/app';


interface IProtectedProps {
    onlyUnAuth?: boolean;
    children: ReactNode;
    exact?: boolean;
    path: string;
}

export const ProtectedRoute: FC<IProtectedProps> = ({onlyUnAuth, children, ...props}) => {
    const location = useLocation<ILocationState>();
    const isAuthChecked = useSelector(state => state.reducerAuth.isAuthChecked);
    const user = useSelector(state => state.reducerAuth.user);

    if (onlyUnAuth && user ) {
        return <Redirect to={location?.state?.from || '/'}/>
    }

    if(!onlyUnAuth && !user){
        return <Redirect to={{ pathname: '/login', state: {from: location}}}/>
    }

    return (
        <Route {...props}>{children}</Route>
    )
}