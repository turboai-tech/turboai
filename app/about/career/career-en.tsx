'use client';

import { FireIcon } from '@heroicons/react/24/solid';
import { Accordion, AccordionItem } from '@heroui/react';

const jobOpenings = [
  {
    id: 1,
    hot: false,
    title: 'Software Engineer (AI Infrastructure)',
    department: 'Engineering',
    location: 'Shanghai, China',
    type: 'Full-time',
    description:
      'As a Software Engineer specializing in LLMs and ML, you will be responsible for building and maintaining the robust infrastructure behind our AI products, ensuring smooth deployment, monitoring, and management of models.',
    responsibilities: [
      'Design, implement, and optimize the deployment, monitoring, and management of models in a production environment.',
      'Collaborate closely with algorithm engineers to ensure seamless integration of algorithmic models into production systems.',
      'Establish and maintain efficient, scalable workflows for model training, deployment, and monitoring.',
    ],
    requirements: [
      'Over 2 years of industry experience with proven experience in deploying, monitoring, and managing machine learning models in a production environment.',
      'Proficiency in one or more programming languages such as Python, Java, or Golang, with experience in frameworks like TensorFlow, PyTorch, or similar.',
      'Experience with machine learning platforms such as Ray or KubeFlow.',
      'Hands-on experience with containerization technologies like Docker, Kubernetes, and Terraform.',
      'Familiarity with DevOps practices, including version control (e.g., Git), continuous integration/continuous deployment (CI/CD), and automated testing.',
      'Experience with cloud platforms such as AWS, Alibaba Cloud, or others.',
      'Strong analytical and problem-solving skills, with good coding practices and strong execution ability.',
    ],
    priorities: [
      "Master's degree in Computer Science or a related technical field.",
      'Deep understanding of machine learning principles, algorithms, and frameworks, especially with expertise in Large Language Models (LLMs).',
      'Experience in deploying and managing large-scale machine learning models and using tools like NVIDIA Triton.',
      'Familiarity with the lifecycle management of machine learning models on cloud platforms.',
      'Demonstrated ability to troubleshoot and resolve operational issues related to LLMs in production.',
    ],
    extend:
      'We are looking for a highly skilled and passionate AI Infrastructure Software Engineer who is enthusiastic about Large Language Models and their real-world applications. If you are passionate about pushing the boundaries of machine learning operations and are eager to work with cutting-edge language models in a production environment, we would love to hear from you.',
  },
  {
    id: 2,
    hot: true,
    title: 'Software Engineer (AI Application)',
    department: 'Engineering',
    location: 'Shanghai, China',
    type: 'Full-time',
    description:
      "This is a crucial role for an AI Application Development Engineer who will lead the design, development, and maintenance of the core systems for our company's AI products. We expect you to have a deep understanding and insight into AI products, keep up with industry trends, actively participate in product definition and planning, and drive technological advancement through innovation. You will have the opportunity to work with an outstanding team to promote the application of cutting-edge technologies and revolutionize AI in the content marketing field.",
    responsibilities: [
      'Design and develop high-performance applications based on Large Language Models (LLMs) according to the needs of product and R&D teams, meeting diverse business requirements and driving product innovation.',
      'Build groundbreaking AI-assisted features (such as scriptwriting, multi-modal content inference and generation) in the content marketing industry to enhance work efficiency and creativity, creating more impactful marketing tools.',
      'Design and optimize a content tagging system to ensure a clear and efficient information structure, improving data usability and processing efficiency.',
      'Closely follow the latest developments in LLM and AIGC technologies, study cutting-edge large model techniques, and conduct innovative application research of generative AI (including AI drawing, LLM, BGM generation, international translation, etc.) in the marketing field to promote new technology adoption and enhance product competitiveness.',
    ],
    requirements: [
      "A degree in Computer Science, Mathematics, Data Science, Artificial Intelligence, or a related field is preferred; a Master's degree or higher is a plus.",
      'Over 3 years of practical experience in backend application development, with a background in AI application development being a plus, capable of independently managing the development and implementation of complex technical projects.',
      'Proficiency in at least one programming language (e.g., Python, Java, C++), with excellent coding skills to independently complete and optimize the development of complex business requirements.',
      'Strong foundation in data structures and algorithms, capable of efficiently analyzing and solving complex problems in large-scale data processing and system design.',
      'Familiarity with mainstream database technologies (e.g., MySQL, MongoDB) and good database design and optimization skills.',
      'Proficiency in Prompt Engineering, vector databases, RAG (Retrieval Augmented Generation), and Agent-related technologies, able to apply these cutting-edge techniques to practical business scenarios to improve system performance and intelligence.',
      "A keen insight into the latest trends in AI technology, with the ability to quickly grasp and adapt to new technologies to drive the team's technical capabilities.",
      'Passionate about marketing technology; experience in large advertising agencies or digital marketing platforms is a plus, able to innovate AI applications based on industry needs.',
      'Good teamwork and cross-departmental communication skills, with strong execution and project management abilities to effectively advance projects in a high-pressure environment.',
    ],
    priorities: [
      'Familiarity with generative AI technologies (e.g., GPT, DALL·E) and their applications in the marketing field.',
      'Practical experience in AdTech or MarTech, with an understanding of the core needs of content creation and digital marketing.',
      'Experience in the architectural design and technical implementation of large-scale AI projects, with successful product launch experience.',
    ],
    extend:
      'If you are passionate about AI technology and eager to contribute in a fast-paced environment, we look forward to having you join us!',
  },
  {
    id: 3,
    hot: false,
    title: 'Software Engineer (AI Data)',
    department: 'Engineering',
    location: 'Shanghai, China',
    type: 'Full-time',
    description:
      'We are looking for an outstanding Software Engineer to join our AI team, focusing on AI algorithm data development. As a member of the team, you will participate in building, optimizing, and scaling data processing systems, driving the application and innovation of AI technology in various business scenarios. This position is suitable for talent with solid programming skills, a strong background in data processing, and a keen interest in AI technology.',
    responsibilities: [
      'Develop applications based on Large Language Models (LLMs) to meet diverse business scenarios and drive product feature innovation and business goal achievement.',
      'Responsible for big data cleaning, preprocessing, and optimization, using advanced AI technology (LLM) to improve data processing efficiency and quality, ensuring efficient data flow and storage.',
      'Design and build stable internal data services, collaborating with algorithm engineers to promote the training, validation, and deployment of AI models; possess excellent system design capabilities to optimize data service architecture for scalability and high availability.',
      'Deeply involved in the technical construction of the AI team, promoting the efficient implementation and continuous optimization of engineering services; responsible for writing technical documentation, facilitating technical discussions and collaboration within and across teams.',
    ],
    requirements: [
      'A degree in Computer Science, Mathematics, Data Science, or a related field is preferred.',
      '1-3 years of practical experience in related fields, with a data development background being a plus.',
      'Proficiency in at least one programming language (e.g., Python, Java, C++), capable of writing high-quality, maintainable code.',
      'Solid foundation in data structures and algorithms, able to solve problems related to large-scale data processing; familiar with the working principles of common distributed file systems (e.g., HDFS, S3) and experience with cloud storage services (e.g., Alibaba Cloud OSS, Huawei Cloud OBS, AWS S3).',
      'Familiarity with mainstream database technologies (e.g., MySQL, MongoDB) and big data technologies (e.g., Hive, Spark, Flink).',
      'Familiarity with the lifecycle of AI/machine learning algorithms and the ability to work closely with algorithm engineers to jointly drive model development and optimization based on business needs.',
      'Experience in data processing, data analysis, and data mining is preferred.',
      'Proactive, with a strong sense of responsibility and execution, self-driven to continuously learn and solve complex problems.',
    ],
    priorities: [
      'Familiarity with deep learning frameworks (e.g., TensorFlow, PyTorch) and their applications.',
      'Familiarity with open-source parallel computing frameworks (e.g., Dask, Ray Data) and their application in large-scale data processing.',
    ],
    extend:
      'If you are passionate about AI-related technologies and eager to contribute in a fast-paced environment, we look forward to your joining us!',
  },
  {
    id: 4,
    hot: true,
    title: 'Python Software Engineer (Fullstack)',
    department: 'Engineering',
    location: 'Shanghai, China',
    type: 'Full-time',
    description:
      'We are hiring a full-stack software engineer proficient in the Python technology stack who can also handle front-end development. As a core member of the team, you will be responsible for designing, developing, and maintaining efficient, scalable application systems and participating in the full development cycle from front-end to back-end. We expect you to have solid programming skills and be able to leverage your technical advantages in a dynamic, fast-paced environment.',
    responsibilities: [
      'Design and develop Python-based backend services and integrate them efficiently with front-end systems.',
      'Develop RESTful APIs using FastAPI/Flask or other Python frameworks to ensure system stability and efficiency.',
      'Participate in front-end development using frameworks like React.js or Next.js to enhance user experience and interface interactivity.',
      'Collaborate closely with product managers, designers, and team members to analyze business requirements, design systems, and implement features.',
      'Write high-quality code and participate in code reviews to ensure project quality.',
      'Design and optimize database structures to handle large-scale data storage and querying.',
      'Work with the operations team to deploy, monitor, and maintain systems, ensuring high availability and stability.',
      'Continuously optimize system performance and user experience, driving product iteration and technological innovation.',
    ],
    requirements: [
      "Bachelor's degree or higher in Computer Science, Software Engineering, or a related field.",
      '2-5 years or more of software development experience, with full-stack development experience being a plus.',
      'Proficiency in Python and familiarity with backend frameworks like FastAPI or Flask, capable of independently completing backend development.',
      'Familiarity with front-end development technologies and experience with frameworks like React.js or Next.js.',
      'Familiarity with common database technologies (e.g., MySQL, PostgreSQL, MongoDB) and good database design and optimization skills.',
      'Familiarity with RESTful API design and implementation for efficient backend-frontend integration.',
      'Good foundation in data structures and algorithms to efficiently solve programming and performance-related problems.',
      'Understanding of and practical experience with software engineering development processes, version control (e.g., Git), and CI/CD.',
      'Good English reading and writing skills, able to understand and write technical documents in English.',
      'Excellent communication and teamwork skills to collaborate effectively with team members and advance projects.',
    ],
    priorities: [
      'Development and deployment experience on cloud platforms (e.g., Alibaba Cloud, AWS, GCP).',
      'Familiarity with containerization technologies like Docker and Kubernetes; DevOps experience is a plus.',
      'Experience in designing and implementing large-scale distributed systems and microservices architecture.',
      'Experience contributing to open-source projects or participating in technical communities.',
    ],
    extend:
      'If you are passionate about AI-related technologies and eager to gain practical experience in a fast-paced environment, we welcome you to join our team!',
  },
  {
    id: 5,
    hot: true,
    title: 'AI Application Development Intern',
    department: 'Engineering',
    location: 'Shanghai, China',
    type: 'Internship',
    description:
      'As an AI Application Development Intern, you will join our vibrant AI team to participate in the development and optimization of cutting-edge AI products and technologies. You will have the opportunity to work with experienced engineers and algorithm experts, learn and practice AI technologies, and drive business needs and innovative solutions. Through this internship, you will gain a deep understanding of the entire AI application development process, enhance your technical skills, and accumulate valuable industry experience.',
    responsibilities: [
      'Assist the development team in designing, developing, and maintaining AI-based application systems.',
      'Participate in tasks related to data preprocessing, feature engineering, and model training to help improve the performance of AI systems.',
      'Write high-quality, maintainable code to complete front-end or back-end development tasks, supporting the iteration and optimization of AI products.',
      'Assist the team in validating and fine-tuning AI models, exploring different technical solutions to improve model performance.',
      'Help the team with project documentation, participate in code reviews, and team technical discussions.',
      'Learn and master the latest AI technologies and participate in the exploration and application of new technologies.',
    ],
    requirements: [
      "Currently enrolled in a Bachelor's or Master's program in Computer Science, Artificial Intelligence, Data Science, Mathematics, or a related field.",
      'A strong interest in AI, machine learning, deep learning, and other related technologies, with a certain algorithmic foundation.',
      'Familiarity with at least one programming language (e.g., Python, Java, C++), with some programming ability.',
      'Familiarity with data structures and algorithms, with good problem analysis and solving skills.',
      'Familiarity with basic database technologies (e.g., MySQL, MongoDB); front-end or back-end development experience is a plus.',
      'Strong learning ability and sensitivity to AI industry trends, able to quickly adapt to new technologies.',
      'Good teamwork and communication skills, with a strong sense of execution and responsibility; ability to work full-time is preferred.',
    ],
    priorities: [
      'Experience in AI projects or related open-source projects is a plus.',
      'Familiarity with common AI deep learning frameworks (e.g., TensorFlow, PyTorch).',
      'Familiarity with big data processing, cloud computing, and related technologies or platforms is a plus.',
    ],
    extend:
      'We offer: the opportunity to work with leading experts in the AI field to rapidly enhance your technical skills; flexible working hours, with the possibility of a return offer for outstanding interns; rich training and learning resources to help you grow in AI technology; and one-on-one mentorship from experienced mentors to help you quickly integrate into the team.\n\nIf you are passionate about AI technology and eager to gain practical experience in a fast-paced environment, we welcome you to join our team!',
  },
];

export default function CareerEnPage() {
  const sortedJobs = [...jobOpenings].sort(
    (a, b) => Number(b.hot) - Number(a.hot),
  );

  return (
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            Join Us, Shape the Future
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We are looking for passionate and talented people to join us. At
            Turbo AI, you will have the opportunity to work with top talent,
            challenge the frontiers of technology, and build products that
            change the world.
          </p>
        </div>

        <Accordion variant="splitted" className="max-w-2xl mx-auto">
          {sortedJobs.map((job) => (
            <AccordionItem
              key={job.id}
              aria-label={job.title}
              title={
                <div className="flex items-center">
                  <span className="text-gray-900 dark:text-white">
                    {job.title}
                  </span>
                  {job.hot && (
                    <FireIcon className="ml-2 h-5 w-5 text-red-500" />
                  )}
                </div>
              }
              subtitle={
                <div className="flex items-center gap-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>{job.department}</span>
                  <span>
                    {job.location} | {job.type}
                  </span>
                </div>
              }
            >
              <div className="flex flex-col gap-6 text-gray-600 dark:text-gray-400">
                <div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">
                    Job Overview
                  </h3>
                  <p>{job.description}</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">
                    Responsibilities
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {job.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">
                    Requirements
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {job.requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">
                    Preferred Qualifications
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {job.priorities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <p className="whitespace-pre-line">{job.extend}</p>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
