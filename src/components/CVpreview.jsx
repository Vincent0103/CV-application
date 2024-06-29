import profilePicture from "../assets/IMG_0250.jpg";

const CVpreview = () => {
  return (
    <div className={`bg-white w-[60%] max-h-[29.7cm] aspect-[0.707] shadow-lg rounded-md self-start
    flex font-serif`}>
      <div className="bg-slate-800 h-full w-[33%] text-white flex
      flex-col items-center">
        <div className="self-stretch flex justify-center items-center p-6">
          <img src={profilePicture} alt="Your custom profile picture"
          className="h-32 w-32 object-cover object-center rounded-full shadow-lg"/>
        </div>
        <hr className="border-t-1 my-1 border-white w-[90%]"/>
        <div className="self-stretch">
          <h3 className="font-bold text-2xl p-1 text-center">Skills</h3>
          <ul>
            <li className="p-1 pl-10">Web Developer</li>
            <li className="p-1 pl-10">Artist</li>
          </ul>
        </div>
        <hr className="border-t-1 my-1 border-white w-[90%]"/>
        <div className="self-stretch">
          <h3 className="font-bold text-2xl p-1 text-center">Languages</h3>
          <ul>
            <li className="p-1 flex justify-between gap-4">
              <p className="pl-10">French</p>
              <p className="pr-10">Fluent</p>
            </li>
            <li className="p-1 flex justify-between gap-4">
              <p className="pl-10">English</p>
              <p className="pr-10">Advanced</p>
            </li>
          </ul>
        </div>
        <hr className="border-t-1 my-1 border-white w-[90%]"/>
        <div className="self-stretch flex flex-col items-center">
          <h3 className="font-bold text-2xl p-1 text-center">Hobbies</h3>
          <p className="w-[90%]">In my free time, I enjoy coding personal projects, hiking in nature, reading about the latest technology trends, and volunteering at local community centers.</p>
        </div>
      </div>
      <div className="bg-white h-full w-[67%]"></div>
    </div>
  );
}

export default CVpreview;
