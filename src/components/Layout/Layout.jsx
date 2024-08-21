import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
export default function Layout() {
  return (
    <React.Fragment>
      <Header />
      <div className="py-10">
        <Outlet>
      </Outlet>
      </div>
      
      <Footer></Footer>
    </React.Fragment>
  );
}
