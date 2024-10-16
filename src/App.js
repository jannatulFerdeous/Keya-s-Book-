import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Bookdetails from "./modules/Books/partials/Bookdetails";
import Layout from "./common/components/Layout/Layout";
import BookList from "./modules/Books/partials/BookList";





function App() {
  return (
    <BrowserRouter> 
      <Routes>     
        <Route path='/' element={<Home/>}/>  
        {/* <Route path="/books" element={<Layout><BookList/></Layout>} /> */}
        <Route path="/books/:id" element={<Layout><Bookdetails/></Layout>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
