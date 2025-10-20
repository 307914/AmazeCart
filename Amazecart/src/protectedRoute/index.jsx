import React, { useState } from 'react'
import { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'
import { UserContext } from '../usercontextprovider'
import UseIsLoggedIn from '../useIsLoggedIn'
import { useEffect } from 'react'

const ProtectedRoute = () => {
    const { isLoading, isLoggedIn } = UseIsLoggedIn();
    const [navigatetologin, setNavigateToLogin] = useState(null);
    const { pathname } = useLocation();

    useEffect(() => {
        if (isLoading === false) {
            if (isLoggedIn) {
                setNavigateToLogin(false);
            }
            else {
                console.log("in the useeffect");
                setNavigateToLogin(true);
            }
        }
    }, [isLoading, isLoggedIn])


    if (navigatetologin === true) {
        console.log("navigating to login");
        return <Navigate to='/login' replace={true} state={pathname} />
    }
    else if (navigatetologin === false) {
        return <Outlet />
    }
    return null;
}

export default ProtectedRoute
