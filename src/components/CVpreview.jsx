const CVpreview = () => {
  const CV_ASPECT_RATIO = 0.707;

  return (
    <div className={`bg-slate-100 h-full max-h-[95vh] aspect-[${CV_ASPECT_RATIO}] shadow-lg rounded-md`}></div>
  );
}

export default CVpreview;
