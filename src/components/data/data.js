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
  education: [
    {
      schoolName: 'University of Example',
      studyName: 'Bachelor of Science in Computer Science',
      date: 'August 2015 - May 2019',
      location: 'Example City, Country',
      diplomas: 'Summa Cum Laude',
    },
    {
      schoolName: 'Institute of Technology',
      studyName: 'Master of Engineering',
      date: 'September 2019 - June 2021',
      location: 'Techville, Country',
      diplomas: 'With Honors',
    },
    {
      schoolName: 'Global Business School',
      studyName: 'MBA in International Business',
      date: 'January 2018 - December 2019',
      location: 'Business City, Country',
      diplomas: 'Magna Cum Laude',
    },
    {
      schoolName: 'Academy of Arts',
      studyName: 'Bachelor of Fine Arts in Graphic Design',
      date: 'March 2016 - April 2020',
      location: 'Artstown, Country',
      diplomas: 'Honorable Mention',
    },
    {
      schoolName: 'School of Languages',
      studyName: 'Diploma in Advanced English',
      date: 'May 2017 - May 2018',
      location: 'Language City, Country',
      diplomas: 'Certification of Proficiency',
    },
    {
      schoolName: 'Polytechnic University',
      studyName: 'Associate Degree in Information Technology',
      date: 'February 2015 - December 2016',
      location: 'Poly City, Country',
      diplomas: 'Certified IT Specialist',
    },
    {
      schoolName: 'International Culinary Center',
      studyName: 'Professional Chef Training Program',
      date: 'July 2018 - August 2019',
      location: 'Culinary Town, Country',
      diplomas: 'Certified Professional Chef',
    },
    {
      schoolName: 'Center for Media Studies',
      studyName: 'Diploma in Digital Marketing',
      date: 'April 2019 - March 2020',
      location: 'Media City, Country',
      diplomas: 'Digital Marketing Expert',
    },
  ],
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
    schoolName: '',
    studyName: '',
    date: '',
    location: '',
    diplomas: '',
  },
  {
    schoolName: '',
    studyName: '',
    date: '',
    location: '',
    diplomas: '',
  },
];

export default general;
export { randomStrings, generalPlaceholders, education };
