import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Lazy load page components
const Home = lazy(() => import("./pages/home.jsx"));
const About = lazy(() => import("./pages/about.jsx"));
const Documents = lazy(() => import("./pages/documents.jsx"));
const SinglePost = lazy(() => import("./pages/blogPosts/SinglePost.jsx"));
const MataiWhetu = lazy(() => import("./pages/bookingMataiWhetu.jsx"));
const Fishing = lazy(() => import("./pages/fishingPermits.jsx"));
const Register = lazy(() => import("./pages/register.jsx"));

// Loading component for page transitions
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
      <p className="mt-4 text-gray-600 font-roboto-medium">Loading page...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="w-full overflow-x-hidden">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/post/:id" element={<SinglePost />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/bookingmataiwhetu" element={<MataiWhetu />} />
            <Route path="/fishingpermit" element={<Fishing />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
