export type Milestone = {
  year: string;
  title: string;
  description?: string;
  institution?: string;
};

/** Real education & journey timeline (from the prior portfolio's data). */
export const EDUCATION: Milestone[] = [
  {
    year: "1996",
    title: "Born",
  },
  {
    year: "2012",
    title: "Matriculation",
    description: "Completed matriculation with a 9.6 CGPA.",
    institution: "BCM School",
  },
  {
    year: "2014",
    title: "Higher Secondary (AISSCE)",
    description: "Completed 12th standard with 83.4%.",
    institution: "BCM School",
  },
  {
    year: "2018",
    title: "B.Tech, Information Technology",
    description:
      "Bachelor of Technology in Information Technology, graduating with an 8.48 CGPA.",
    institution: "DAVIET",
  },
  {
    year: "2022",
    title: "DSA & System Design",
    description:
      "Problem Solving & System Design program (September 2022 intake).",
    institution: "Scaler Academy",
  },
  {
    year: "Present",
    title: "Building products",
    description:
      "Designing, building, and shipping products end to end — where tech meets product and business.",
  },
];
