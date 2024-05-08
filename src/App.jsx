import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './components/Home';
import MatchDetails from './components/MatchDetails';
import Table from './components/Table';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/table' element={<Table/>} />
          <Route path='/matchDetails/:id' element={<MatchDetails/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
