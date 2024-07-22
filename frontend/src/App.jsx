import {Route ,BrowserRouter as Router , Routes} from 'react-router-dom';
import './App.css'
import Landingpage from './pages/LandingPage'
import Authentication from './pages/Authentication';
import { AuthProvider } from './contexts/AuthContext';
import VideoMeet from './pages/VideoMeet';

import HomeComponent from './pages/Home';
import History from './pages/History';
function App() {
  

  return (
    <div className='App'>
      <Router>
        <AuthProvider>
        <Routes>
          <Route path="/" element={<Landingpage/>}/>
          <Route path="/auth" element={<Authentication/>}/>

          <Route path='/home' element={<HomeComponent />} />
          <Route path='/history' element={<History />} />

          <Route path='/:url' element={<VideoMeet />} />
        </Routes>
        </AuthProvider>
      </Router>
      
    </div> 

  )
}

export default App
