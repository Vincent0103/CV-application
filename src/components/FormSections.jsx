const FormSections = () => {
  return (
    <div className="w-[40%] flex flex-col">
      <div className="rounded-lg h-10 max-w-full flex justify-center items-end gap-3">
        <button type="button" className="font-bold text-3xl">General</button>
        <button type="button" className="border-x-2 border-gray-300 px-3 h-7 flex items-end">Education</button>
        <button type="button" className="">Experiences</button>
      </div>
    </div>
  );
}

export default FormSections;
