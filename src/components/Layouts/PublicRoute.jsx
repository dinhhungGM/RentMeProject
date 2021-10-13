import { AsyncLoadUser } from "features/Auth/AuthSlice";
import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router";
import { socketContext } from "socket";
export function PublicRoute({ component: Component, layout: Layout, ...rest }) {
  const dispatch = useDispatch();
  const socket = useContext(socketContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(AsyncLoadUser());
    }
  }, [dispatch]);

  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}
