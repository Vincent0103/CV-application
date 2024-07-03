const objectSplice = (obj, start, end) => {
  if (start >= end) return [];
  if (start < 0 || end > obj.length) return obj;
  return Object.entries(obj).slice(start, end);
};

const toTitle = (camelCaseString) => camelCaseString
  // Replace hyphens with spaces
  .replace(/-/g, ' ')
  // Insert a space before all caps
  .replace(/([a-z])([A-Z])/g, '$1 $2')
  // Uppercase the first character of each word
  .replace(/\b\w/g, (char) => char.toUpperCase())
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

const getRandomItem = (array) => array[Math.round(Math.random() * (array.length - 1))];

const autoIncrementerId = () => {
  let currentId = -1;
  return () => {
    currentId += 1;
    return currentId;
  };
};

export default objectSplice;
export {
  toTitle, typeGiver, getRandomItem, autoIncrementerId,
};
