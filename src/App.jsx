import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Page components
import Home from "./pages/home";
import About from "./pages/about";
import Documents from "./pages/documents";
import SinglePost from "./pages/blogPosts/SinglePost";
import MataiWhetu from "./pages/bookingMataiWhetu";
import Fishing from "./pages/fishingPermits";
import Register from "./pages/register";

function App() {
  return (
    <Router>
      <div className="w-full overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/bookingmataiwhetu" element={<MataiWhetu />} />
          <Route path="/fishingpermit" element={<Fishing />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
