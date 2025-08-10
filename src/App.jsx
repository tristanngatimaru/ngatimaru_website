import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadSiteContent } from "./api/siteContent";

// Page components
import Home from "./pages/home";
import About from "./pages/about";
import Documents from "./pages/documents";
import SinglePost from "./pages/blogPosts/SinglePost";
import MataiWhetu from "./pages/bookingMataiWhetu";
import Fishing from "./pages/fishingPermits";
import Register from "./pages/register";

function App() {
  const [siteContent, setSiteContent] = useState(null);

  useEffect(() => {
    async function fetchContent() {
      const content = await loadSiteContent();
      setSiteContent(content);
    }
    fetchContent();
  }, []);

  if (!siteContent) return <div>Loading content...</div>;

  return (
    <Router>
      <div className="w-full overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home content={siteContent.home} />} />
          <Route
            path="/about"
            element={<About content={siteContent.about} />}
          />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route
            path="/documents"
            element={<Documents content={siteContent.documents} />}
          />
          <Route
            path="/bookingmataiwhetu"
            element={<MataiWhetu content={siteContent.bookingMataiWhetu} />}
          />
          <Route
            path="/fishingpermit"
            element={<Fishing content={siteContent.fishingPermit} />}
          />
          <Route
            path="/register"
            element={<Register content={siteContent.register} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
