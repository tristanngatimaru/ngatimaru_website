import Footer from "../components/footer";
import HeroHeader from "../components/header";
import content from "../components/sitecontent/content";
// Removed static Images import - all images should be dynamic from Strapi
import FormComponent from "../components/formcomponent";
// src/pages/about.jsx
function MataiWhetu() {
  return (
    <div className="w-full">
      <HeroHeader
        image={null} // TODO: Load MataiWhetu header image dynamically from Strapi content
        subtitle={content.mataiwhetu.header}
        title={content.mataiwhetu.headerenglish}
      />
      <FormComponent />
      <Footer />
    </div>
  );
}

export default MataiWhetu;
