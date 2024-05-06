import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './components/Home';
import MatchDetails from './components/MatchDetails';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/matchDetails/:id/:imgId1/:imgId2' element={<MatchDetails/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
