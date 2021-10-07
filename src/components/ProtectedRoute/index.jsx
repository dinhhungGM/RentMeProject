import React, { useEffect, useState } from "react";
import { Redirect, Route, useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { AsyncLoadUser } from "features/Auth/AuthSlice";
import Loading from "components/Loading";
export default function ProtectedRoute({ component: Component, ...rest }) {
  const { loading, isAuthenticated } = useSelector((state) => state.auth);
  // // const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(AsyncLoadUser());
    }
    console.log(isAuthenticated)
  }, []);
  
  if (loading) {
    return <Loading/>
  }

  


  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <>
            <Component {...props} />
          </>
        ) : (
          <Redirect
            to={{ pathname: "/signin", state: { referrer: location.pathname } }}
          />
        )
      }
    />
  );
}
