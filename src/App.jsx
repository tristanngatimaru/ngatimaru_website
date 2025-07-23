import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about"; // Example other page
import Documents from "./pages/documents";
import SinglePost from "./pages/blogPosts/SinglePost";

function App() {
  return (
    <Router>
      <div className="w-full overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/documents" element={<Documents />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
