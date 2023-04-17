import './App.css';
import Create from './components/create';
import Read from './components/read';
import Update from './components/update';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePhoneFlip}  from '@fortawesome/free-solid-svg-icons'






function App() {
  return (
    <Router>
      <div className="main">
      <FontAwesomeIcon className='phone-icon' icon={faSquarePhoneFlip} />
        <h2 className="main-header">Contact Manager</h2>
        <div>
          <Routes>

            <Route exact path='*' element={<Create />} />
            <Route exact path='/read' element={<Read />} />
            <Route exact path='/update' element={<Update />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
