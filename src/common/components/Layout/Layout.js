import React from "react";
import Navbar from "../../widgets/Navbar";
import Footer from "../../widgets/Footer/Footer";
import Navbar2 from "../../widgets/Navbar/Navbar2"; 

const Layout = ({ children }) => { 
  return (         
    <html lang="en">
      <body className="no-scrollbar max-w-[2400px] mx-auto">
        {/* Fixed Navbar */}
        <header className="fixed top-0 w-full ">
          {/* <Navbar2 /> */}
          <Navbar />
        </header>
        
        
        <main className="  pb-[80px]">
          {children}
        </main>
        
        {/* Fixed Footer */}
        <footer className=" ">
          <Footer />
        </footer>
      </body>
    </html>
  ); 
}; 

export default Layout;
