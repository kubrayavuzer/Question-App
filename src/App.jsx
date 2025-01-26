import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Intro from './pages/intro/Introduce';
import Quiz from './pages/quiz/Quiz';
import './App.css'

function App() {


  return (
    <>
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/Quiz" element={<Quiz />} />
        </Routes>
      </Router>
    </div>
    </>
  )
}

export default App