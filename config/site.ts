export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Jujus AI",
  description: "Free AI Content Generator",
  pinned: true,
  navItems: [
    {
      label: "Agentic AI",
      href: "/agentic",
      defaultActive: false,
      subItems: [
        {
          label: "Chat with Material Labeling Agent",
          href: "/dashboard/agentic/material_labeling",
          description: "An agent to label material via typing a link. support app, ads, etc.",
          icon: 'activity'
        },
      ]
    },
    {
      label: "Algorithm",
      href: "/algorithm",
      defaultActive: true,
      subItems: [
        {
          label: "LLM",
          href: "/llm",
          description: "Large Language Model",
          icon: 'server',
        },
        {
          label: "ML",
          href: "/ml",
          description: "Machine Learning",
          icon: 'lock',
        },
      ]
    },
    {
      label: "Computing",
      href: "/dashboard/computing",
      defaultActive: true,
      subItems: [
        {
          label: "parallel computing",
          href: "/dashboard/computing/parallel",
          description: "parallel computing with multiple core libraries, any cpu, gpu, tpu, etc.",
          icon: 'parallel',
        },
        {
          label: "Tasks",
          href: "/dashboard/tasks",
          description: "Algorithm computing tasks management",
          icon: 'tasks',
        },
        {
          label: "distributed computing",
          href: "/dashboard/computing/distributed",
          description: "coming soon.",
          icon: 'distributed',
        },
      ]
    },
    {
      label: "Docs",
      href: "/docs",
      defaultActive: false,
    },
    {
      label: "About",
      href: "/about",
      defaultActive: false,
    },
  ],
};
