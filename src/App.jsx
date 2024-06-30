import { useState } from "react";
import FormSections from './components/FormSections';
import GeneralForm from './components/GeneralForm';
import CVpreview from './components/CVpreview';

function App() {
  const [generalInformations, setGeneralInformations] = useState({
    name: "John",
    lastName: "Doe",
    email: "",
    tel: "",
    location: "",
    summary: "",
    skills: {
      "Web Developer": "Expert",
      "Artist": "Intermediate",
    },
    languages: {
      "French": "Fluent",
      "English": "Advanced",
    },
    hobbies: "",
  });

  return (
    <div className='max-w-[1500px] w-[1500px] max-h-[29.7cm] flex justify-center gap-6
    p-5'>
      <FormSections>
        <GeneralForm generalInformations={generalInformations} setGeneralInformations={setGeneralInformations} />
      </FormSections>
      <CVpreview generalInformations={generalInformations} />
    </div>
  )
}

export default App
