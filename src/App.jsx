import { useState } from 'react'
import { Outlet } from "react-router-dom";
import './App.css';
import MenuBar from '../src/components/view/MenuBar';
import Header from './components/view/header/Header';
import Footer from './components/view/footer/Footer';

function App() {
  return (
    // <div className="w-full h-screen ">
    //   <div className="w-full h-full flex overflow-hidden">
    //     <div>
    //       <MenuBar />
    //     </div>
    //     <div className="w-full h-full overflow-y-scroll">
    //       <Header />
    //       <Outlet />          
    //     </div>
    //   </div>
    //   {/* <div><Footer /></div> */}
    // </div>

    <div className="w-screen h-screen flex flex-col">
      <div className="w-full h-full flex overflow-hidden">
        <div>
          <MenuBar />
        </div>
        <div className="w-full h-full overflow-y-scroll flex flex-col">
          <Header />
          <Outlet /> 
          {/* <Footer /> */}
        </div>
      </div>
      <div><Footer /></div>
    </div>
  )
}
export default App;
