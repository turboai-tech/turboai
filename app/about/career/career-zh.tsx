'use client';

import { FireIcon } from '@heroicons/react/24/solid';
import { Accordion, AccordionItem } from '@heroui/react';

const jobOpenings = [
  {
    id: 1,
    hot: false,
    title: '软件工程师（AI Infrastructure）',
    department: '技术部',
    location: '上海, 中国',
    type: '全职',
    description:
      '作为一名专注于LLMs与ML领域的软件工程师，您将负责构建和维护我们AI产品背后的强大基础设施，确保模型的顺畅部署、监控和管理。',
    responsibilities: [
      '设计、实施和优化在生产环境中部署、监控和模型管理工作。',
      '与算法工程师紧密合作，确保算法模型在生产系统中的无缝集成。',
      '建立并维护高效、可扩展的模型训练、部署和监控工作流程。',
    ],
    requirements: [
      '具有2年以上行业工作经验，具备在生产环境中使机器学习模型投入使用的经验，包括模型部署、监控和管理；',
      '能够使用以下一种或多种语言编程：Python、Java、Golang，并具备TensorFlow、PyTorch或类似库和框架的经验；',
      '具有机器学习平台相关的工作经验（Ray、KubeFlow）；',
      '具有Docker、Kubernetes和Terraform等容器化技术的实践经验；',
      '熟悉DevOps实践，如版本控制（例如，Git）、持续集成/持续部署（CI/CD）和自动化测试；',
      '具有AWS、阿里云或者其它云计算平台的经验；',
      '具备较强的分析和解决问题的能力，以及良好的编码习惯和执行力。',
    ],
    priorities: [
      '计算机科学或相关技术领域的硕士学位；',
      '对机器学习原理、算法和框架有深入理解，尤其是在大型语言模型方面的专业知识；',
      '有在大规模部署和管理机器学习模型的经验，以及使用NVidia Triton等工具的经验；',
      '熟悉云平台上机器学习模型的生命周期管理；',
      '能够展示在生产中排查和解决与LLMs相关的操作问题的能力。',
    ],
    extend:
      '我们正在寻找一位高技能且充满激情的AI Infrastructure软件工程师，热衷于大型语言模型及其在现实世界中的应用。如果您对推动机器学习操作的边界充满热情，并渴望在生产环境中与尖端语言模型合作，我们非常希望听到您的消息。',
  },
  {
    id: 2,
    hot: true,
    title: '软件工程师 (AI Application)',
    department: '技术部',
    location: '上海, 中国',
    type: '全职',
    description:
      '这是一个AI应用开发工程师岗位，将在我们的团队中发挥至关重要的作用，主导设计、开发和维护公司AI产品的核心系统。我们期待您对AI产品的深刻理解与洞察力，能够紧跟行业动态，积极参与产品的定义与规划，并通过创新推动产品的技术发展。您将有机会与优秀的团队一起，共同推动前沿技术的应用，开启AI在内容营销领域的革命。',
    responsibilities: [
      '根据产品和研发团队的需求，设计并开发基于大型语言模型（LLM）的高性能应用，满足多元化的业务需求并推动产品创新；',
      '在内容营销行业中，构建具有突破性的AI辅助功能（如脚本创作、多模态内容推理与生成等），推动工作效率与创意的提升，创造更具影响力的营销工具；',
      '设计并优化内容标签体系，确保信息结构的清晰性与高效性，以提升数据的可操作性与处理效率；',
      '密切关注LLM和AIGC技术的最新发展，深入学习大型模型前沿技术，开展生成式AI（包括AI绘图、LLM、BGM生成、国际化翻译等）在营销领域的创新应用研究，推动新技术落地并提升产品竞争力。',
    ],
    requirements: [
      '计算机、数学、数据科学、人工智能等相关专业优先，硕士及以上学历者优先考虑；',
      '3年以上后端应用领域的实际工作经验，具备AI应用开发背景者更佳，能够独立负责复杂技术项目的开发和实现；',
      '精通至少一种编程语言（如 Python、Java、C++ 等），具备出色的编码能力，能够独立完成并优化复杂的业务需求开发；',
      '深厚的数据结构与算法基础，能够高效分析和解决大规模数据处理与系统设计中的复杂问题；',
      '熟悉主流数据库技术（如 MySQL、MongoDB 等），并具备良好的数据库设计与优化能力；',
      '精通Prompt工程、向量数据库、RAG（Retrieval Augmented Generation）与Agent等相关技术，能够将这些前沿技术应用于实际业务中，提升系统性能与智能化水平；',
      '对AI技术的最新发展趋势具有敏锐的洞察力，能够快速掌握并适应新技术，推动团队技术能力的提升；',
      '对营销技术充满激情，具备大型广告公司或数字营销平台的从业经验者优先，能够结合行业需求创新应用AI技术；',
      '良好的团队合作与跨部门沟通能力，具有较强的执行力和项目管理能力，能够在高压环境下有效推动项目进展。',
    ],
    priorities: [
      '熟悉生成式AI（如GPT、DALL·E等）技术及其在营销领域的应用；',
      '有广告技术（AdTech）或营销科技（MarTech）领域的实际经验，理解内容创作与数字营销的核心需求；',
      '参与过大型AI项目的架构设计与技术实施，具备产品落地的成功经验。',
    ],
    extend:
      '如果您对AI技术充满激情，并渴望在快速发展的环境中贡献自己的力量，我们期待您的加入！',
  },
  {
    id: 3,
    hot: false,
    title: '软件工程师（AI数据方向）',
    department: '技术部',
    location: '上海, 中国',
    type: '全职',
    description:
      '我们正在寻找一位优秀的软件工程师，加入我们的AI团队，专注于AI算法数据开发。作为团队的一员，您将参与构建、优化和扩展数据处理系统，推动AI技术在多个业务场景中的应用和创新。此岗位适合具有扎实编程能力、深厚的数据处理背景，并对AI技术有浓厚兴趣的人才。',
    responsibilities: [
      '根据产品和研发团队的需求，开发基于大型语言模型（LLM）的应用，满足多样化的业务场景，推动产品功能的创新和业务目标的实现；',
      '负责大数据的清洗、预处理与优化工作，充分利用先进的AI技术（LLM）提升数据处理效率和质量，确保高效的数据流转和存储；',
      '设计并构建稳定的内部数据服务，协同算法工程师推动AI模型的训练、验证与部署；具备优秀的系统设计能力，优化数据服务架构，确保服务的可扩展性和高可用性；',
      '深度参与AI团队的技术建设，推动工程服务的高效实施和持续优化；负责撰写技术文档，促进团队内部及跨团队的技术讨论与协作，推动技术知识的共享与传递。',
    ],
    requirements: [
      '计算机、数学、数据科学或人工智能相关专业优先；',
      '1-3年相关领域的实际工作经验，具备数据开发背景者更佳；',
      '熟练掌握至少一种编程语言（如 Python、Java、C++ 等），能够编写高质量、可维护的代码；',
      '扎实的数据结构与算法基础，能够解决大规模数据处理的相关问题；熟悉常见的分布式文件系统（如 HDFS、S3 等）工作原理，具备云存储服务（如阿里云 OSS、华为云 OBS、AWS S3 等）经验；',
      '熟悉主流数据库技术（如 MySQL、MongoDB 等），以及大数据技术（如 Hive、Spark、Flink 等）；',
      '熟悉 AI/机器学习算法的生命周期，并能够与算法工程师紧密合作，根据业务需求共同推动模型开发与优化；',
      '具备数据处理、数据分析、数据挖掘的相关经验者优先；',
      '积极主动、具备强烈的责任感和执行力，能够自我驱动，持续学习并解决复杂问题。',
    ],
    priorities: [
      '熟悉深度学习框架（如 TensorFlow、PyTorch 等）及其应用；',
      '熟悉开源并行计算框架（如 Dask、Ray Data 等）及其在大规模数据处理中的应用。',
    ],
    extend:
      '如果您对AI相关的技术充满激情，并渴望在快速发展的环境中贡献自己的力量，我们期待您的加入！',
  },
  {
    id: 4,
    hot: true,
    title: 'Python软件工程师（Fullstack）',
    department: '技术部',
    location: '上海, 中国',
    type: '全职',
    description:
      '我们正在招聘一位全栈的软件工程师，精通Python技术栈并且能够胜任一定的前端开发工作。作为团队的核心成员，您将负责设计、开发和维护高效、可扩展的应用系统，并参与从前端到后端的全面开发工作。我们期望您具备扎实的编程功底，并能够在动态、快速发展的技术环境中发挥技术优势。',
    responsibilities: [
      '负责设计和开发基于Python的后端服务，并与前端系统进行高效集成；',
      '使用 FastAPI/Flask 或其他Python框架开发RESTful API，确保系统稳定、高效运行；',
      '参与前端开发，使用 React.js 或 Next.js 等前端框架，提升用户体验和界面交互；',
      '与产品经理、设计师及团队成员密切合作，分析业务需求，进行系统设计和功能实现；',
      '编写高质量的代码，参与代码评审，确保项目质量；',
      '设计并优化数据库结构，处理大规模数据的存储与查询问题；',
      '配合运维团队进行系统的部署、监控与维护，确保系统高可用性和稳定性；',
      '持续优化系统性能和用户体验，推动产品的迭代和技术创新。',
    ],
    requirements: [
      '计算机科学、软件工程等相关专业本科及以上学历；',
      '2-5年或以上的软件开发经验，具有全栈开发经验者优先；',
      '精通 Python 编程语言，并熟悉 FastAPI、Flask 等Python后端框架，能够独立完成后端开发工作。',
      '熟悉前端开发技术，具有 React.js 或 Next.js 等前端框架的开发经验。',
      '熟悉常见的数据库技术（如 MySQL、PostgreSQL、MongoDB 等），具备良好的数据库设计和优化能力。',
      '熟悉 RESTful API 的设计与实现，能够进行后端与前端的高效集成。',
      '具备良好的数据结构与算法基础，能够高效解决编程和性能相关的问题。',
      '对软件工程的开发流程、版本控制（如 Git）及 CI/CD 有一定了解和实践经验。',
      '英语读写能力良，能够理解和编写英文技术文档。',
      '具备优秀的沟通能力，能与团队成员协作高效推进项目进展。',
    ],
    priorities: [
      '具备云计算平台（如 阿里云、AWS、GCP）上的开发和部署经验。',
      '熟悉容器化技术，如 Docker、Kubernetes 等，具备 DevOps 相关经验者优先。',
      '有大规模分布式系统、微服务架构设计与实施经验。',
      '有开源项目贡献或技术社区参与经历。',
    ],
    extend:
      '如果您对 AI 相关技术充满热情，渴望在快速发展的环境中积累实践经验，欢迎加入我们的团队！',
  },
  {
    id: 5,
    hot: true,
    title: 'AI应用开发实习生',
    department: '技术部',
    location: '上海, 中国',
    type: '实习',
    description:
      '作为 AI 应用开发实习生，您将加入我们充满活力的 AI 团队，参与前沿的 AI 产品与技术的开发与优化。您将有机会与经验丰富的工程师和算法专家共同合作，学习并实践 AI 技术，推动业务需求与创新解决方案的实现。通过实习，您将深入了解 AI 应用开发的全过程，提升技术能力并积累宝贵的行业经验。',
    responsibilities: [
      '协助开发团队进行基于 AI 的应用系统的设计、开发和维护工作。',
      '参与数据预处理、特征工程和模型训练的相关任务，帮助提升 AI 系统的性能。',
      '编写高质量、可维护的代码，完成前端或后端开发任务，支持 AI 产品的迭代与优化。',
      '协助团队进行 AI 模型的验证和调优，探索不同的技术方案，提升模型效果。',
      '配合团队完成项目文档编写，参与代码评审及团队技术讨论。',
      '学习和掌握最新的 AI 技术，参与新技术的探索和应用。',
    ],
    requirements: [
      '计算机科学、人工智能、数据科学、数学等相关专业在读本科或研究生。',
      '对 AI、机器学习、深度学习等技术充满兴趣，具备一定的算法基础。',
      '熟悉至少一种编程语言（如 Python、Java、C++ 等），具备一定的编程能力。',
      '熟悉数据结构与算法，具备良好的问题分析与解决能力。',
      '熟悉基本的数据库技术（如 MySQL、MongoDB 等），有一定的前端或后端开发经验者优先。',
      '对 AI 行业发展趋势有较强的学习能力与敏感度，能够快速适应新技术。',
      '具备良好的团队合作精神和沟通能力，具备较强的执行力与责任感，能够全职实习优先。',
    ],
    priorities: [
      '参与过 AI 项目或相关的开源项目，有实践经验者优先。',
      '熟悉常见的 AI 深度学习框架（如 TensorFlow、PyTorch 等）。',
      '熟悉大数据处理、云计算等相关技术或平台者优先。',
    ],
    extend:
      '我们提供：与 AI 领域领先专家共同工作的机会，快速提升技术能力；灵活的工作时间，可为优秀实习生提供Return Offer；丰富的培训和学习资源，帮助您在 AI 技术上不断成长；我们将为您安排经验丰富的导师进行一对一指导，帮助您快速融入团队。\n\n如果您对 AI 技术充满热情，渴望在快速发展的环境中积累实践经验，欢迎加入我们的团队！',
  },
];

export default function CareerZhPage() {
  const sortedJobs = [...jobOpenings].sort(
    (a, b) => Number(b.hot) - Number(a.hot),
  );

  return (
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            加入我们，共创未来
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            我们正在寻找充满激情、才华横溢的你。在Turbo
            AI，你将有机会与顶尖人才共事，挑战技术前沿，共同打造改变世界的产品。
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
                    职位概述
                  </h3>
                  <p>{job.description}</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">
                    岗位职责
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {job.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">
                    任职要求
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {job.requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">
                    优先资格
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
