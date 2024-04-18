import logo from './logo.svg';
import './App.css';
import NavBar from './containers/navbar';
import ProjectCard from './components/individual/projectcard';
import ContributorCard from './components/individual/contributorCard';
import ProjectPage from './containers/ProjectPage';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>
        <Routes >
          <Route path="/" element={<div className='CardView'>
                <ProjectCard/>
                <ContributorCard/>
              </div>}/>
          <Route path="/project" element={<div>
                <ProjectPage/>
              </div>}/>
        </Routes >
      </div>
    </Router>
  );
}

export default App;
