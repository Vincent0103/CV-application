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
      'Mandinka',
      'Guaraní',
      'Nepali',
      'Romansh',
      'Swedish',
      'Marathi',
    ],
  },
  experiences: {
    jobResponsibilities: [
      'Coordinate and manage project tasks',
      'Ensure compliance with company policies and regulatory requirements',
      'Collaborate with team members',
      'Communicate effectively with clients',
      'Maintain a high level of professionalism and confidentiality',
      'Conduct market research and analyze trends',
      'Develop and implement growth strategies',
      'Train, coach, and oversee new employees',
      'Prepare and review operational reports and schedules',
      'Analyze internal operations and identify areas of process enhancement',
      'Direct administrative activities',
      'Plan and allocate resources',
      'Arrange for maintenance and repair work and supervise the process',
      'Review performance data',
      'Manage relationships with key operations vendors',
      'Track and replace office supplies',
      'Implement marketing and advertising campaigns',
      'Prepare marketing and advertising strategies',
      'Plan meetings and trade shows',
      'Support sales staff',
    ],
  },
};

const Placeholders = {
  general: {
    name: 'John',
    lastName: 'Doe',
    email: 'johndoe@gmail.com',
    phoneNumber: '06 32 73 12 98',
    location: '75010 Paris, France',
    summary: 'I am John Doe, a passionate and dedicated web developer with a proven track record of creating dynamic and user-friendly websites and applications.',
    hobbies: 'In my free time, I enjoy coding personal projects, hiking in nature, reading about the latest technology trends, and volunteering at local community centers.',
  },
  education: {
    schoolName: 'University of Example',
    studyName: 'Bachelor of Science in Computer Science',
    date: 'August 2015 - May 2019',
    location: 'Rio de Janeiro, Brazil',
    summary: 'Graduated with honors, actively participated in coding competitions, and contributed to open-source projects.',
  },
  experiences: {
    companyName: 'regex101',
    positionTitle: 'Tester',
    workDate: {
      from: '',
      to: '',
    },
    summary: 'Led a team of developers in a high-stakes project, delivering the product ahead of schedule with exceptional quality.',
  },
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
    summary: '',
  },
];

const experiences = [
  {
    id: uuidv4(),
    positionTitle: '',
    companyName: '',
    workDate: {
      from: '',
      to: '',
    },
    jobResponsibilities: [
      { id: uuidv4(), responsibility: '', placeholder: getRandomItem(randomStrings.experiences.jobResponsibilities) },
      { id: uuidv4(), responsibility: '', placeholder: getRandomItem(randomStrings.experiences.jobResponsibilities) },
    ],
    summary: '',
  },
];

// Creating a deep copy so whenever the states change, it doesn't get updated
const defaultGeneral = Object.freeze(general);
const defaultEducation = Object.freeze(education[0]);
const defaultExperiences = Object.freeze(experiences[0]);

const generalPlaceholders = Placeholders.general;
const educationPlaceholders = Placeholders.education;
const experiencesPlaceholders = Placeholders.experiences;

export {
  randomStrings,
  general, education, experiences,
  generalPlaceholders, educationPlaceholders, experiencesPlaceholders,
  defaultGeneral, defaultEducation, defaultExperiences,
};
