const objectSplice = (obj, start, end) => Object.entries(obj).slice(start, end);

const toTitle = (camelCaseString) => {
  const words = [];
  const charArr = camelCaseString.split('');
  let prevIndex = 0;
  let currentIndex;
  let isEndOfArray = false;
  charArr.forEach((letter, index) => {
    if (index !== charArr.length - 1) {
      currentIndex = index;
    } else {
      currentIndex = charArr.length;
      isEndOfArray = true;
    }

    if (letter === letter.toUpperCase() || isEndOfArray) {
      words.push(camelCaseString[prevIndex].toUpperCase()
        + camelCaseString.slice(prevIndex + 1, currentIndex));
      prevIndex = currentIndex;
    }
  });
  return words.join(' ');
};

const typeGiver = (category) => {
  const types = {
    text: ['name', 'lastName', 'location', 'skills', 'languages'],
    email: ['email'],
    tel: ['phoneNumber'],
    textarea: ['summary', 'hobbies'],
  };

  const entry = Object.entries(types).find(([_, categories]) => categories.includes(category))
    || [null];
  const [foundType] = entry;
  return foundType;
};

export default objectSplice;
export { toTitle, typeGiver };
