import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router ,Routes ,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

const routes=(
  <Router>
    <Routes>
      <Route path='/' exact element={<Home></Home>}/>
      <Route path='/dashboard' exact element={<Home></Home>}/>
      <Route path='/login' exact element={<Login></Login>}/>
      <Route path='/signup' exact element={<Signup></Signup>}/>
    </Routes>
  </Router>
);
function App() {
  const [count, setCount] = useState(0)
  return (
    <div>
      {routes}
    </div>
  )
}

export default App
