import Footer from "../components/footer";
import HeroHeader from "../components/header";
import { Content } from "../components/sitecontent/content";
import { Images, Icons } from "../components/sitecontent/images";
// src/pages/register.jsx
function Register() {
  return (
    <div className="w-full">
      <HeroHeader image={Images.Mihi} title={Content.register.title} />
      <Footer />
    </div>
  );
}
export default Register;
