const Input = ({children, type, name, labelName, placeholder, minLength, maxLength, hasAutoFocus=false}) => {

  const input = (type !== "textarea")
  ? <input type={type} name={name} id={name} className="mt-1 block w-full px-3 py-2
  bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-400
    focus:border-gray-400 sm:text-sm invalid:outline-none invalid:ring-rose-500
    invalid:border-rose-500" placeholder={placeholder}
    autoFocus={hasAutoFocus} />
  : <textarea name={name} id={name} rows="6" className="mt-1 block w-full px-3 py-2
  bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-400
    focus:border-gray-400 sm:text-sm invalid:ring-rose-500 invalid:border-rose-500"
    placeholder={placeholder} minLength={minLength} maxLength={maxLength}
    autoFocus={hasAutoFocus} >
    </textarea>

  return (
    <div className="p-4 w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{labelName}</label>
      {children
      ? <div className="flex gap-4">{input}{children}</div>
      : input}
    </div>
  )
}

export default Input;
