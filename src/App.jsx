import FormSections from './components/FormSections';
import GeneralForm from './components/GeneralForm';
import CVpreview from './components/CVpreview';

function App() {

  return (
    <div className='max-w-[1500px] w-[1500px] h-[100vh] max-h-[29.7cm] flex justify-center items-center gap-6
    p-5'>
      <FormSections>
        <GeneralForm />
      </FormSections>
      <CVpreview />
    </div>
  )
}

export default App
