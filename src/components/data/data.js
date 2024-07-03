import { getRandomItem } from '../utils';

const randomStrings = {
  skills: [
    'Communication',
    'Teamwork',
    'Problem Solving',
    'Adaptability',
    'Time Management',
    'Leadership',
    'Creativity',
    'Critical Thinking',
    'Emotional Intelligence',
    'Negotiation',
    'Coding',
    'Data Analysis',
    'Project Management',
    'Networking',
    'Marketing',
    'Customer Service',
    'Research',
    'Conflict Resolution',
  ],
  languages: [
    'English',
    'French',
    'German',
    'Spanish',
    'Italian',
    'Portuguese',
    'Japanese',
    'Chinese',
    'Russian',
    'Arabic',
    'Hindi',
    'Bengali',
    'Japanese',
    'Vietnamese',
    'Telugu',
    'mandinka',
    'Guaraní',
    'Nepali',
    'Romansh',
    'Swedish',
    'Marathi',
  ],
};

const general = {
  name: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  location: '',
  summary: '',
  skills: [
    {
      id: 0, skill: '', expertise: '', placeholder: getRandomItem(randomStrings.skills),
    },
    {
      id: 1, skill: '', expertise: '', placeholder: getRandomItem(randomStrings.skills),
    },
  ],
  languages: [
    {
      id: 0, language: '', fluency: '', placeholder: getRandomItem(randomStrings.languages),
    },
    {
      id: 1, language: '', fluency: '', placeholder: getRandomItem(randomStrings.languages),
    },
  ],
  hobbies: '',
};

export default general;
export { randomStrings };
