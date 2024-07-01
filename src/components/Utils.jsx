import { v4 as uuidv4 } from 'uuid';

const Input = ({
  children, type, name, labelName, placeholder, handleChange,
  value, minLength, maxLength, dataKey, hasAutoFocus = false, additionalStyles = '',
  category = null, innerObjectId = null,
}) => {
  const classes = `mt-1 block w-full px-3 py-2
  bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-400
    focus:border-gray-400 sm:text-sm invalid:outline-none invalid:ring-rose-500
    invalid:border-rose-500`;

  const handleChangeParameterized = (e) => handleChange(e, dataKey, [category, innerObjectId]);

  const input = ((type !== 'textarea')

    ? <input type={type} name={name} id={name} className={classes}
  placeholder={placeholder} autoFocus={hasAutoFocus} value={value}
  onChange={handleChangeParameterized} />

    : <textarea name={name} id={name} rows="6" className={classes} placeholder={placeholder}
  minLength={minLength} maxLength={maxLength} value={value} autoFocus={hasAutoFocus}
  onChange={handleChangeParameterized} >
  </textarea>);

  return (
    <div className={`p-4 w-full${additionalStyles && ` ${additionalStyles}`}`}>
      {labelName && <label htmlFor={name} className="block text-sm font-medium text-gray-700">{labelName}</label>}
      {
        (children)
          ? <div className="flex gap-4">{input}{children}</div>
          : input
      }
    </div>
  );
};

const Select = ({
  name, values, dataKey, handleChange, selectedValue,
  category = null, innerObjectId = null,
}) => {
  const classes = `mt-1 block w-[50%] px-3 py-2
    bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-400
    focus:border-gray-400 sm:text-sm`;

  const handleChangeParameterized = (e) => handleChange(e, dataKey, [category, innerObjectId]);

  return (
    <select name={name} id={name} className={classes}
    value={selectedValue} onChange={handleChangeParameterized}>
      {values.map((value) => <option key={uuidv4()} value={value}>
        {value[0].toUpperCase() + value.slice(1)}
      </option>)}
    </select>
  );
};

const AddBtn = () => {
  const PlusIcon = <svg className="transition-transform group-hover:rotate-180" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" id="plus"><path d="M12 24c-3.2 0-6.2-1.2-8.5-3.5-4.7-4.7-4.7-12.3 0-17C5.8 1.2 8.8 0 12 0s6.2 1.2 8.5 3.5c4.7 4.7 4.7 12.3 0 17-2.3 2.3-5.3 3.5-8.5 3.5zm0-22C9.3 2 6.8 3 4.9 4.9 1 8.8 1 15.2 4.9 19.1 6.8 21 9.3 22 12 22s5.2-1 7.1-2.9C23 15.2 23 8.9 19.1 5c-1.9-2-4.4-3-7.1-3z"></path><path d="M12 18c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1s1 .4 1 1v10c0 .6-.4 1-1 1z"></path><path d="M17 13H7c-.6 0-1-.4-1-1s.4-1 1-1h10c.6 0 1 .4 1 1s-.4 1-1 1z"></path></svg>;

  return (
    <div className="w-full pb-4 px-4">
      <div tabIndex="0" role="button" aria-label="Add new skill"
      className="bg-black h-[37.28px] rounded-md flex justify-center items-center cursor-pointer group">
        {PlusIcon}
      </div>
    </div>
  );
};

export default Input;
export { Select, AddBtn };
