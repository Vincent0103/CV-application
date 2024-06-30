import Input, { Select, AddBtn } from "./Utils";
import { FormContainer } from "./FormSections";

const GeneralForm = ({generalInformations, setGeneralInformations}) => {
  const summaryForJohnDoe = "I am John Doe, a passionate and dedicated web developer with a proven track record of creating dynamic and user-friendly websites and applications.";
  const hobbiesForJohnDoe = "In my free time, I enjoy coding personal projects, hiking in nature, reading about the latest technology trends, and volunteering at local community centers.";

  const fadingBottomContainer = <div className="absolute -bottom-1 w-full h-24 bg-gradient-to-t from-white
  pointer-events-none"></div>;

  const handleChange = (e, key) => {
    if (!(key in generalInformations)) return;

    setGeneralInformations({
      ...generalInformations,
      [key]: e.target.value,
    });
  }

  return (
    <FormContainer fadingBottomContainer={fadingBottomContainer}>
      <form>
        <div className="flex">
          <Input type="text" name="name" labelName="Name" placeholder="John" hasAutoFocus={true}
          handleChange={handleChange} value={generalInformations.name} />

          <Input type="text" name="lastName" labelName="Last Name" placeholder="Doe"
          handleChange={handleChange} value={generalInformations.lastName} />
        </div>

        <Input type="email" name="email" labelName="Email" placeholder="johndoe@gmail.com"
        handleChange={handleChange} value={generalInformations.email}/>

        <Input type="tel" name="tel" labelName="Phone Number" placeholder="06 32 73 12 98"
        handleChange={handleChange} value={generalInformations.tel}/>

        <Input type="text" name="location" labelName="Location" placeholder="75010 Paris, France"
        handleChange={handleChange} value={generalInformations.location}/>

        <Input type="textarea" name="summary" labelName="Summary / Profile" minLength="20"
        maxLength="300" placeholder={summaryForJohnDoe} />

        <div>
          <Input type="text" name="skill" labelName="Skills" placeholder="Web Developer"
          additionalStyles="pb-2" >
            <Select name="expertise" values={["beginner", "intermediate", "advanced", "expert"]} />
          </ Input>

          <Input type="text" name="skill1" placeholder="Artist" additionalStyles="pt-0 pb-3">
            <Select name="expertise1" values={["beginner", "intermediate", "advanced", "expert"]} />
          </ Input>

          <AddBtn />
        </div>

        <div>
          <Input type="text" name="language" labelName="Languages" placeholder="French"
          additionalStyles="pb-2" >
            <Select name="fluency" values={["beginner", "intermediate", "advanced", "fluent"]} />
          </ Input>

          <Input type="text" name="language1" placeholder="English" additionalStyles="pt-0 pb-3">
            <Select name="fluency1" values={["beginner", "intermediate", "advanced", "fluent"]} />
          </ Input>

          <AddBtn />
        </div>

        <Input type="textarea" name="hobbies" labelName="Hobbies" minLength="20"
        maxLength="300" placeholder={hobbiesForJohnDoe} />
      </form>
    </FormContainer>
  );
}

export default GeneralForm;
