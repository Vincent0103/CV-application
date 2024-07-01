const objectSplice = (obj, start, end) => Object.entries(obj).slice(start, end);

const toTitle = (camelCaseString) => camelCaseString
  // Insert a space before all caps
  .replace(/([A-Z])/g, ' $1')
  // Uppercase the first character
  .replace(/^./, (str) => str.toUpperCase())
  .trim();

const typeGiver = (category) => {
  const types = {
    name: 'text',
    lastName: 'text',
    location: 'text',
    skills: 'text',
    languages: 'text',
    email: 'email',
    phoneNumber: 'tel',
    summary: 'textarea',
    hobbies: 'textarea',
  };

  return types[category] || null;
};

export default objectSplice;
export { toTitle, typeGiver };
