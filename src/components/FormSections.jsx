import { useState, useCallback } from "react";
import Input, { Select, AddBtn } from "./Utils";

const FormSections = () => {

  const FormContainer = ({ fadingBottomContainer, children }) => {
    const [isFadingVisible, setIsFadingVisible] = useState(true);

    const handleScroll = useCallback((e) => {
      const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

      if (scrollTop + clientHeight >= scrollHeight - 10) setIsFadingVisible(false);
      else setIsFadingVisible(true);
    }, []);

    return (
      <div className="min-height max-w-full relative bg-[#ebebeb] rounded-xl border-2 border-gray-300
        shadow-xl overflow-hidden">
        <div onScroll={handleScroll} className="max-h-full min-w-full overflow-y-scroll scrollbar-thin
        scrollbar-thumb-bar-color scrollbar-track-transparent scrollbar-thumb-rounded-full">
          { children }
        </div>
        {isFadingVisible && fadingBottomContainer};
      </div>
    )
  }

  const GeneralForm = () => {
    const summaryForJohnDoe = "I am John Doe, a passionate and dedicated web developer with a proven track record of creating dynamic and user-friendly websites and applications.";
    const hobbiesForJohnDoe = "In my free time, I enjoy coding personal projects, hiking in nature, reading about the latest technology trends, and volunteering at local community centers.";

    const fadingBottomContainer = <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-white
    pointer-events-none"></div>;

    return (
      <FormContainer fadingBottomContainer={fadingBottomContainer}>
        <form>
          <div className="flex">
            <Input type="text" name="name" labelName="Name" placeholder="John" hasAutoFocus={true} />
            <Input type="text" name="lastname" labelName="Last Name" placeholder="Doe" />
          </div>
          <Input type="email" name="email" labelName="Email" placeholder="johndoe@gmail.com" />
          <Input type="tel" name="tel" labelName="Phone Number" placeholder="07 49 88 98 23" />
          <Input type="text" name="location" labelName="Location" placeholder="15 Rue de Belzunce, 75010 Paris, France" />
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

  const NextFormBtn = () => {
    const rightArrow = <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 translate-y-[1px]" height={24} width={24} fill="white" viewBox="0 0 24 24"><path d="M4,10V14H13L9.5,17.5L11.92,19.92L19.84,12L11.92,4.08L9.5,6.5L13,10H4Z" /></svg>;

    return (
      <div className="flex max-w-full justify-center">
        <div tabIndex="0" role="button" aria-label="Add new skill"
        className="bg-black max-w-48 h-[37.28px] rounded-md flex justify-center items-center cursor-pointer
        my-4">
          <p className="text-white text-xl font-semibold p-4 pr-2">Education</p>
          {rightArrow}
        </div>
      </div>
    )
  }

  return (
    <div className="w-[50%] max-h-full">
      <FormSliderBtns />
      <GeneralForm />
      <NextFormBtn />
    </div>
  );
}

export default FormSections;
