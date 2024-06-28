import Input, { Select, AddBtn } from "./Utils";

const FormSections = () => {
  const GeneralForm = () => {
    const summaryForJohnDoe = "I am John Doe, a passionate and dedicated web developer with a proven track record of creating dynamic and user-friendly websites and applications.";
    const hobbiesForJohnDoe = "In my free time, I enjoy coding personal projects, hiking in nature, reading about the latest technology trends, and volunteering at local community centers.";

    return (
      <div className="h-min w-full bg-[#ebebeb] rounded-xl border-2 border-gray-300 shadow-xl">
        <form>
          <div className="flex">
            <Input type="text" name="name" labelName="Name" placeholder="John" hasAutoFocus={true} />
            <Input type="text" name="lastname" labelName="Last Name" placeholder="Doe" />
          </div>
          <Input type="email" name="email" labelName="Email" placeholder="johndoe@gmail.com" />
          <Input type="tel" name="tel" labelName="Phone Number" placeholder="07 49 88 98 23" />
          <Input type="text" name="location" labelName="Location" placeholder="15 Rue de Belzunce, 75010 Paris, France" />
          <Input type="textarea" name="summary" labelName="Summary / Profile" minLength="50"
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

          <Input type="textarea" name="hobbies" labelName="Hobbies" minLength="50"
          maxLength="300" placeholder={hobbiesForJohnDoe} />
        </form>
      </div>
    );
  }

  const FormSliderBtns = () => {
    return (
      <div className="flex flex-col mb-2">
        <div className="rounded-lg h-10 max-w-full flex justify-center items-end gap-3">
          <button type="button" className="font-bold text-3xl" aria-selected="true"
          role="tab">General</button>
          <button type="button" className="border-x-2 border-gray-300 px-3 h-7 flex items-end"
          role="tab">Education</button>
          <button type="button" className="" role="tab">Experiences</button>
        </div>
      </div>
    );
  }

  // const NextFormBtn = () => {
  //   return ()
  // }

  return (
    <div className="w-[50%]">
      <FormSliderBtns />
      <GeneralForm />
    </div>
  );
}

export default FormSections;
