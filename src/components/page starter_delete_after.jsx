import Footer from "../components/footer";
import HeroHeader from "../components/header";
import content from "../components/sitecontent/content";
import { Images } from "../components/sitecontent/images";
import FormComponent from "../components/formcomponent";
// src/pages/about.jsx
function MataiWhetu() {
  return (
    <div className="w-full">
      <HeroHeader
        image={Images.MataiWhetu}
        subtitle={content.mataiwhetu.header}
        title={content.mataiwhetu.headerenglish}
      />
      <FormComponent />
      <Footer />
    </div>
  );
}

export default MataiWhetu;
