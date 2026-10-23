import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Signin from './components/Signin';
import Mpesa from './components/Mpesa';
import Signup from './components/Signup';
import Getproduct from './components/Getproduct';
import Addproduct from './components/Addproduct';
import Navbar from './components/Navbar';
import CartSummary from './components/Cartsummary';
// 1. Import your Cart Summary component


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1 className="text-danger mt-3">BLESSED MOTORS LIMITED</h1>
          <Navbar/>
        </header>

        <Routes>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/addproduct' element={<Addproduct/>}/>
          <Route path='/' element={<Getproduct/>}/>
          
          {/* 2. Fixed the spelling typo 'elememt' -> 'element' */}
          <Route path='/mpesa' element={<Mpesa/>}/>
          
          {/* 3. Added the new dynamic shopping cart route */}
          <Route path='/cart' element={<CartSummary/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
