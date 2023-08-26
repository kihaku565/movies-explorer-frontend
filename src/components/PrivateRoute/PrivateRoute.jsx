import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ loggedIn }) {

  if (loggedIn !== null) {
    if (loggedIn) return (<Outlet />);
    return (<Navigate to="/" replace />)
  }
  return null;
}

export default PrivateRoute;
