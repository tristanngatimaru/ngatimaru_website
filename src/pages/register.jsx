import Footer from "../components/footer";
import HeroHeader from "../components/header";
import content from "../components/sitecontent/content";
import { Images, Icons } from "../components/sitecontent/images";
// src/pages/about.jsx
function Register() {
  return (
    <div className="w-full">
      <HeroHeader image={Images.Mihi} title={content.register.title} />
      <Footer />
    </div>
  );
}
export default Register;
