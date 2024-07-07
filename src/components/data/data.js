import { v4 as uuidv4 } from 'uuid';
import { getRandomItem } from '../utils';

const randomStrings = {
  general: {
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
  },
};

const generalPlaceholders = {
  name: 'John',
  lastName: 'Doe',
  email: 'johndoe@gmail.com',
  phoneNumber: '06 32 73 12 98',
  location: '75010 Paris, France',
  summary: 'I am John Doe, a passionate and dedicated web developer with a proven track record of creating dynamic and user-friendly websites and applications.',
  hobbies: 'In my free time, I enjoy coding personal projects, hiking in nature, reading about the latest technology trends, and volunteering at local community centers.',
};

const educationPlaceholders = {
  schoolName: 'University of Example',
  studyName: 'Bachelor of Science in Computer Science',
  date: 'August 2015 - May 2019',
  location: 'Example City, Country',
  diplomas: 'Summa Cum Laude',
};

const general = {
  profilePicture: '',
  name: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  location: '',
  summary: '',
  skills: [
    {
      id: uuidv4(), skill: '', expertise: '', placeholder: getRandomItem(randomStrings.general.skills),
    },
    {
      id: uuidv4(), skill: '', expertise: '', placeholder: getRandomItem(randomStrings.general.skills),
    },
  ],
  languages: [
    {
      id: uuidv4(), language: '', fluency: '', placeholder: getRandomItem(randomStrings.general.languages),
    },
    {
      id: uuidv4(), language: '', fluency: '', placeholder: getRandomItem(randomStrings.general.languages),
    },
  ],
  hobbies: '',
};

const education = [
  {
    id: uuidv4(),
    schoolName: '',
    studyName: '',
    studyDate: {
      from: '',
      to: '',
    },
    location: '',
    schoolSummary: '',
  },
  {
    id: uuidv4(),
    schoolName: '',
    studyName: '',
    studyDate: {
      from: '',
      to: '',
    },
    location: '',
    schoolSummary: '',
  },
];

export default general;
export {
  randomStrings, education, generalPlaceholders, educationPlaceholders,
};
