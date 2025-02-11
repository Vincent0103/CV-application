import { v4 as uuidv4 } from 'uuid';
import { getRandomItem } from '../utils';
import JohnDoeUrl from '../../assets/johnDoe.jpg';

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
    profilePicture: JohnDoeUrl,
    name: 'John',
    lastName: 'Doe',
    email: 'johndoe@gmail.com',
    phoneNumber: '06 32 73 12 98',
    location: '75010 Paris, France',
    summary: 'I am John Doe, a passionate and dedicated web developer with a proven track record of creating dynamic and user-friendly websites and applications.',
    skills: [
      { skill: 'Networking', expertise: 'Advanced' },
      { skill: 'Coding', expertise: 'Intermediate' },
    ],
    languages: [
      { language: 'French', fluency: 'Fluent' },
      { language: 'English', fluency: 'Advanced' },
      { language: 'Spanish', fluency: 'Beginner' },
    ],
    hobbies: 'In my free time, I enjoy coding personal projects, hiking in nature, reading about the latest technology trends, and volunteering at local community centers.',
  },
  education: [
    {
      schoolName: 'University of Example',
      studyName: 'Bachelor of Science in Computer Science',
      studyDate: {
        from: '2015-08-12',
        to: '2019-05-01',
      },
      location: 'Rio de Janeiro, Brazil',
      summary: 'Graduated with honors, actively participated in coding competitions, and contributed to open-source projects.',
    },
    {
      schoolName: 'Lycée Racine',
      studyName: 'High School Bachelor',
      studyDate: {
        from: '2021-09-01',
        to: '2024-07-03',
      },
      location: 'Saint-Lazare, France',
      summary: 'Graduated with "assez-bien" honors which means pretty good and it\'s given for those who get between 12 and 14 out of 20 in the average total mark',
    },
    {
      schoolName: 'Online University of Tech',
      studyName: 'Master of Science in Software Engineering',
      studyDate: {
        from: '2019-09-01',
        to: '2021-11-15',
      },
      location: 'Online',
      summary: 'Specialized in advanced software development techniques and project management. Completed a thesis on machine learning applications in web development.',
    },
    {
      schoolName: 'Global Language Institute',
      studyName: 'Intensive English Language Program',
      studyDate: {
        from: '2014-06-01',
        to: '2015-07-31',
      },
      location: 'New York, USA',
      summary: 'Achieved fluency in English, focusing on technical language for IT professionals. Participated in multicultural communication workshops.',
    },
  ],
  experiences: [
    {
      companyName: 'regex101',
      positionTitle: 'Tester',
      workDate: {
        from: '2018-02-03',
        to: '2022-01-13',
      },
      jobResponsibilities: [
        { responsibility: 'Analyze internal operations and identify areas of process enhancement' },
        { responsibility: 'Train, coach, and oversee new employees' },
        { responsibility: 'Implement marketing and advertising campaigns' },
        { responsibility: 'Support sales staff' },
      ],
      summary: 'Led a team of developers in a high-stakes project, delivering the product ahead of schedule with exceptional quality.',
    },
    {
      companyName: 'starterpack.co',
      positionTitle: 'Web Developer',
      workDate: {
        from: '2012-11-23',
        to: '2018-04-05',
      },
      jobResponsibilities: [
        { responsibility: 'Collaborate with team members' },
        { responsibility: 'Prepare and review operational reports and schedules' },
      ],
      summary: 'It is where i got started into coding and also where i mastered it. Seriously i\'d recommend you at all cost this campus if you ever want to learn web dev!',
    },
    {
      companyName: 'Tech Innovations Inc.',
      positionTitle: 'Software Engineer',
      workDate: {
        from: '2022-02-01',
        to: '2024-07-17',
      },
      jobResponsibilities: [
        { responsibility: 'Develop and maintain high-quality software products' },
        { responsibility: 'Collaborate with cross-functional teams to define and design new features' },
      ],
      summary: 'Contributing to cutting-edge projects, focusing on innovation and efficiency.',
    },
    {
      companyName: 'Global Tech Solutions',
      positionTitle: 'Project Manager',
      workDate: {
        from: '2018-05-01',
        to: '2022-01-31',
      },
      jobResponsibilities: [
        { responsibility: 'Lead project planning sessions' },
        { responsibility: 'Coordinate staff and internal resources' },
      ],
      summary: 'Managed diverse teams to deliver projects on time and within budget, enhancing client satisfaction.',
    },
  ],
};

const general = {
  accentColor: '#1e293b',
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

const generalPlaceholders = Object.freeze(Placeholders.general);
const educationPlaceholders = Object.freeze(Placeholders.education);
const experiencesPlaceholders = Object.freeze(Placeholders.experiences);

export {
  randomStrings,
  general, education, experiences,
  generalPlaceholders, educationPlaceholders, experiencesPlaceholders,
  defaultGeneral, defaultEducation, defaultExperiences,
};
