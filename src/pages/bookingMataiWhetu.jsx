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
      <div className="grid grid-cols-2 p-20">
        <div className="grid grid-cols-2 gap-5">
          <FormComponent
            id="First Name"
            label="First Name"
            name="First Name"
            placeholder="First Name Here"
            required={true}
            type=""
          />
          <FormComponent
            id="Last Name"
            label="Last Name"
            name="Last Name"
            placeholder="Last Name Here"
            required={true}
            type=""
          />
          <FormComponent
            id="Last Name"
            label="Last Name"
            name="Last Name"
            placeholder="Last Name Here"
            required={true}
            type=""
          />
        </div>
        <div></div>
      </div>

      <Footer />
    </div>
  );
}

export default MataiWhetu;
