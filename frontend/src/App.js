import {
  HashRouter as Router,
  Route,
  Routes
} from "react-router-dom";


import './App.css';
import Header from './components/Header'
import NotesListPage from './pages/NotesListPage'
import NotePage from './pages/NotePage'

function App() {
  return (
    <Router>
      <div className="container dark">
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<NotesListPage />} />
          <Route path="note/:noteId" element={<NotePage />} />
        </Routes>
      </div>
      </div>
    </Router>
  );
}


export default App;
