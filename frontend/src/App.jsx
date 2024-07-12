import {Route ,BrowserRouter as Router , Routes} from 'react-router-dom';
import './App.css'
import Landingpage from './pages/LandingPage'
import Authentication from './pages/Authentication';
import { AuthProvider } from './contexts/Authentication';
function App() {
  

  return (
    <div className='App'>
      <Router>
        <AuthProvider>
        <Routes>
          <Route path="/" element={<Landingpage/>}/>
          <Route path="/auth" element={<Authentication/>}/>
        </Routes>
        </AuthProvider>
      </Router>
      
    </div> 

  )
}

export default App
