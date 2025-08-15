import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home.js";
import Upload from "c:/Users/prerna naik/Documents/GitHub/StudentResourceHub-Aspire/frontend/src/pages/upload.js";
import Notes from "c:/Users/prerna naik/Documents/GitHub/StudentResourceHub-Aspire/frontend/src/pages/notes.js";
import About from "c:/Users/prerna naik/Documents/GitHub/StudentResourceHub-Aspire/frontend/src/pages/about.js";


function App() {
  return (
    <Router>
      <div>
       <h1>Student Resource Hub</h1>
      </div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/upload">Upload</Link>
        <Link to="/notes">Notes</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
