import Input, { Select, AddBtn } from './Utils.jsx';
import { FormContainer } from './FormSections.jsx';

const GeneralForm = ({ generalInformations, setGeneralInformations }) => {
  const summaryForJohnDoe = 'I am John Doe, a passionate and dedicated web developer with a proven track record of creating dynamic and user-friendly websites and applications.';
  const hobbiesForJohnDoe = 'In my free time, I enjoy coding personal projects, hiking in nature, reading about the latest technology trends, and volunteering at local community centers.';

  const fadingBottomContainer = <div className="absolute -bottom-1 w-full h-24 bg-gradient-to-t from-white
  pointer-events-none"></div>;

  const handleChange = (e, key, [category = null, innerObjectId = null]) => {
    if (!(key in generalInformations)) return;

    if (category && innerObjectId !== null) {
      setGeneralInformations((prevState) => ({
        ...prevState,
        [key]: prevState[key].map((entry) => (
          (entry.id !== innerObjectId) ? entry : { ...entry, [category]: e.target.value }
        )),
      }));
    } else {
      setGeneralInformations((prevState) => ({
        ...prevState,
        [key]: e.target.value,
      }));
    }

    console.log(generalInformations);
  };

  return (
    <FormContainer fadingBottomContainer={fadingBottomContainer}>
      <form>
        <div className="flex">
          <Input type="text" name="name" labelName="Name" placeholder="John" hasAutoFocus={true}
          handleChange={handleChange} dataKey={'name'} value={generalInformations.name} />

          <Input type="text" name="lastName" labelName="Last Name" placeholder="Doe"
          handleChange={handleChange} dataKey={'lastName'} value={generalInformations.lastName} />
        </div>

        <Input type="email" name="email" labelName="Email" placeholder="johndoe@gmail.com"
        handleChange={handleChange} dataKey={'email'} value={generalInformations.email}/>

        <Input type="tel" name="tel" labelName="Phone Number" placeholder="06 32 73 12 98"
        handleChange={handleChange} dataKey={'tel'} value={generalInformations.tel}/>

        <Input type="text" name="location" labelName="Location" placeholder="75010 Paris, France"
        handleChange={handleChange} dataKey={'location'} value={generalInformations.location}/>

        <Input type="textarea" name="summary" labelName="Summary / Profile" minLength="20"
        maxLength="300" placeholder={summaryForJohnDoe} handleChange={handleChange}
        dataKey={'summary'} value={generalInformations.summary} />

        <div>
          <Input type="text" name="skill1" labelName="Skills" placeholder="Web Developer"
          additionalStyles="pb-2" handleChange={handleChange} dataKey={'skills'}
          value={generalInformations.skills[0].skill} category={'skill'} innerObjectId={0}>

            <Select name="expertise1" values={['Beginner', 'Intermediate', 'Advanced', 'Expert']}
            handleChange={handleChange} dataKey={'skills'}
            selectedValue={generalInformations.skills[0].expertise} category={'expertise'}
            innerObjectId={0}/>

          </ Input>

          <Input type="text" name="skill2" placeholder="Artist" additionalStyles="pt-0 pb-3"
          handleChange={handleChange} dataKey={'skills'} value={generalInformations.skills[1].skill}
          category={'skill'} innerObjectId={1}>

            <Select name="expertise2" values={['Beginner', 'Intermediate', 'Advanced', 'Expert']}
            handleChange={handleChange} dataKey={'skills'}
            selectedValue={generalInformations.skills[1].expertise} category={'expertise'}
            innerObjectId={1}/>

          </ Input>

          <AddBtn />
        </div>

        <div>
          <Input type="text" name="language1" labelName="Languages" placeholder="French"
          additionalStyles="pb-2" handleChange={handleChange}
          dataKey={'languages'} value={generalInformations.languages[0].language}
          category={'language'} innerObjectId={0}>

            <Select name="fluency1" values={['Beginner', 'Intermediate', 'Advanced', 'Fluent']}
            handleChange={handleChange} dataKey={'languages'}
            selectedValue={generalInformations.languages[0].fluency} category={'fluency'} innerObjectId={0}/>

          </ Input>

          <Input type="text" name="language2" placeholder="English" additionalStyles="pt-0 pb-3"
          dataKey={'languages'} handleChange={handleChange}
          value={generalInformations.languages[1].language} category={'language'} innerObjectId={1}>

            <Select name="fluency2" values={['Beginner', 'Intermediate', 'Advanced', 'Fluent']}
            handleChange={handleChange} dataKey={'languages'}
            selectedValue={generalInformations.languages[1].fluency}
            category={'fluency'} innerObjectId={1}/>

          </ Input>

          <AddBtn />
        </div>

        <Input type="textarea" name="hobbies" labelName="Hobbies" minLength="20"
        maxLength="300" placeholder={hobbiesForJohnDoe} handleChange={handleChange}
        dataKey={'hobbies'} value={generalInformations.hobbies}/>

      </form>
    </FormContainer>
  );
};

export default GeneralForm;
