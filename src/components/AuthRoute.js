import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = props => {
  const { isAuth, component: Component, ...restProps } = props;

  return (
    <Route
      {...restProps}
      render={routeProps => {
        if (isAuth) {
          if (isAuth.canPostBlog === 1) {
            return <Component {...routeProps} />;
            // return only if user is admin
          } else if (isAuth.canPostBlog === 0) {
              alert("Only admin can posts blog");
              return <Redirect to="/" />;
          }
        }
        else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default AuthRoute;