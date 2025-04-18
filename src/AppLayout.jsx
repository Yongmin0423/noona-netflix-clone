import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import "./index.css";

function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default AppLayout;
