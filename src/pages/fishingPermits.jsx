import Footer from "../components/footer";
import HeroHeader from "../components/header";

function Fishing() {
  return (
    <div className="w-full">
      <HeroHeader />

      <div className="px-10 py-20 flex flex-col">
        <h1 className="text-3xl font-bold mb-6">Fishing Blog Posts</h1>
      </div>

      <Footer />
    </div>
  );
}

export default Fishing;
