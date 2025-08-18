import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Performance monitoring
const logPerformance = (label, startTime) => {
  const endTime = performance.now();
  console.log(`⚡ ${label}: ${(endTime - startTime).toFixed(2)}ms`);
};

// Lazy load page components with performance tracking
const Home = lazy(() => {
  const start = performance.now();
  return import("./pages/home").then((module) => {
    logPerformance("Home page loaded", start);
    return module;
  });
});

const About = lazy(() => {
  const start = performance.now();
  return import("./pages/about").then((module) => {
    logPerformance("About page loaded", start);
    return module;
  });
});

const Documents = lazy(() => {
  const start = performance.now();
  return import("./pages/documents").then((module) => {
    logPerformance("Documents page loaded", start);
    return module;
  });
});

const SinglePost = lazy(() => {
  const start = performance.now();
  return import("./pages/blogPosts/SinglePost").then((module) => {
    logPerformance("SinglePost page loaded", start);
    return module;
  });
});

const MataiWhetu = lazy(() => {
  const start = performance.now();
  return import("./pages/bookingMataiWhetu").then((module) => {
    logPerformance("MataiWhetu page loaded", start);
    return module;
  });
});

const Fishing = lazy(() => {
  const start = performance.now();
  return import("./pages/fishingPermits").then((module) => {
    logPerformance("Fishing page loaded", start);
    return module;
  });
});

const Register = lazy(() => {
  const start = performance.now();
  return import("./pages/register").then((module) => {
    logPerformance("Register page loaded", start);
    return module;
  });
});

// Optimized loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
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
