export type SkillGroup = {
  label: string;
  skills: string[];
};

/**
 * Skills grouped by domain (rendered as chips). Sourced from the prior
 * portfolio's declared skillset, plus tech evidenced in shipped products.
 */
export const SKILL_GROUPS: SkillGroup[] = [
  { label: "Languages", skills: ["TypeScript", "JavaScript"] },
  {
    label: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "SCSS", "Material UI"],
  },
  { label: "State", skills: ["Redux", "Recoil", "Zustand"] },
  {
    label: "Backend",
    skills: ["Node.js", "Express", "NestJS", "Hono", "Hapi"],
  },
  {
    label: "Databases",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
  },
  {
    label: "Infra & Tooling",
    skills: ["AWS", "Firebase", "Git", "GitHub", "GitLab"],
  },
  {
    label: "Messaging & Search",
    skills: ["GraphQL", "Kafka", "RabbitMQ", "ElasticSearch"],
  },
];

/** Flat, de-duplicated list for a compact marquee/strip. */
export const ALL_SKILLS: string[] = Array.from(
  new Set(SKILL_GROUPS.flatMap((g) => g.skills))
);
