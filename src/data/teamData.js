export const summitChairs = [
  {
    name: "Prof. Mukesh Saraswat",
    role: "Organizing Chair",
    category: "Leadership",
    image: "/imgs/team/mukesh-saraswat.jpg",
    filename: "mukesh-saraswat.jpg",
    department: "Computer Science & Engineering",
  },
  {
    name: "Dr. Himani Bansal",
    role: "Organizing Co-Chair",
    category: "Leadership",
    image: "/imgs/team/himani-bansal.jpg",
    filename: "himani-bansal.jpg",
    department: "Information Technology",
  },
  {
    name: "Dr. Vinay Anand Tikkiwal",
    role: "Functional Head",
    category: "Leadership",
    image: "/imgs/team/vinay-tikkiwal.jpg",
    filename: "vinay-tikkiwal.jpg",
    department: "Engineering & Technology",
  }
];

export const teamCategories = [
  {
    id: "design-pr",
    name: "Design and PR",
    description: "Visual identity, creative media, communications, and public relations.",
    members: [
      { name: "Aakriti Bhardwaj", role: "Team Lead", filename: "aakriti-bhardwaj.jpg" },
      { name: "Aparna Arya", role: "Faculty Member", filename: "aparna-arya.jpg" },
      { name: "Shagun Gupta", role: "Faculty Member", filename: "shagun-gupta.jpg" }
    ]
  },
  {
    id: "registration",
    name: "Registration",
    description: "Participant onboarding, registrations, delegate passes, and helpdesk.",
    members: [
      { name: "Piyush Sharma", role: "Team Lead", filename: "piyush-sharma.jpg" },
      { name: "Niraj Kumar", role: "Faculty Member", filename: "niraj-kumar.jpg" }
    ]
  },
  {
    id: "technical",
    name: "Technical",
    description: "Hackathon architecture, technical tracks, computing labs, and execution.",
    members: [
      { name: "Akanksha Mehndiratta", role: "Lead - Planning", filename: "akanksha-mehndiratta.jpg" },
      { name: "Sandeep Raj", role: "Lead - Execution", filename: "sandeep-raj.jpg" },
      { name: "Ruchika Bala", role: "Faculty Member", filename: "ruchika-bala.jpg" },
      { name: "Akanksha Singh", role: "Faculty Member", filename: "akanksha-singh.jpg" },
      { name: "Meenu Shukla", role: "Faculty Member", filename: "meenu-shukla.jpg" },
      { name: "Neeraj Pathak", role: "Faculty Member", filename: "neeraj-pathak.jpg" },
      { name: "Noor Mohammad", role: "Faculty Member", filename: "noor-mohammad.jpg" },
      { name: "Santosh Ray", role: "Faculty Member", filename: "santosh-ray.jpg" },
      { name: "Jiddu Krishnan O P", role: "Faculty Member", filename: "jiddu-krishnan-op.jpg" },
      { name: "Piyush Kushwaha", role: "Faculty Member", filename: "piyush-kushwaha.jpg" },
      { name: "Santosh Kumar", role: "Faculty Member", filename: "santosh-kumar.jpg" }
    ]
  },
  {
    id: "leadership-outreach",
    name: "Leadership Outreach",
    description: "Institutional partnerships, academic liaisons, and dignitary invitations.",
    members: [
      { name: "Sajai Vir Singh", role: "Team Lead", filename: "sajai-vir-singh.jpg" },
      { name: "Ankur Gupta", role: "Faculty Member", filename: "ankur-gupta.jpg" },
      { name: "Ila Naqvi", role: "Faculty Member", filename: "ila-naqvi.jpg" },
      { name: "Rajshree Singh", role: "Faculty Member", filename: "rajshree-singh.jpg" },
      { name: "Vaibhav Sharma", role: "Faculty Member", filename: "vaibhav-sharma.jpg" }
    ]
  },
  {
    id: "roundtable-planning",
    name: "Roundtable Planning",
    description: "Executive roundtables, policy forums, and strategic brainstorms.",
    members: [
      { name: "Divya Kaushik", role: "Team Lead", filename: "divya-kaushik.jpg" },
      { name: "Kumar Mohit", role: "Faculty Member", filename: "kumar-mohit.jpg" },
      { name: "Deepti Singh", role: "Faculty Member", filename: "deepti-singh.jpg" }
    ]
  },
  {
    id: "panel-expert-talks",
    name: "Panel Discussion & Expert Talks",
    description: "Keynote curation, industry panellists, and academic discourse moderation.",
    members: [
      { name: "Anubhuti Roda Mohindra", role: "Team Lead", filename: "anubhuti-roda-mohindra.jpg" },
      { name: "Aditi Sharma", role: "Faculty Member", filename: "aditi-sharma.jpg" },
      { name: "Lakhveer Kaur", role: "Faculty Member", filename: "lakhveer-kaur.jpg" },
      { name: "Madhav Bansal", role: "Faculty Member", filename: "madhav-bansal.jpg" }
    ]
  },
  {
    id: "expo",
    name: "Expo",
    description: "Startup demo booths, tech showcases, and sponsor engagement arena.",
    members: [
      { name: "Amit Verma", role: "Team Lead", filename: "amit-verma.jpg" },
      { name: "Bhartendu Chaturvedi", role: "Faculty Member", filename: "bhartendu-chaturvedi.jpg" },
      { name: "Amita Bhagat", role: "Faculty Member", filename: "amita-bhagat.jpg" },
      { name: "Harish Bishwakarma", role: "Faculty Member", filename: "harish-bishwakarma.jpg" },
      { name: "Minal Tandekar", role: "Faculty Member", filename: "minal-tandekar.jpg" },
      { name: "Rishabh Negi", role: "Faculty Member", filename: "rishabh-negi.jpg" }
    ]
  },
  {
    id: "hospitality",
    name: "Hospitality",
    description: "Guest reception, accommodation, catering, and campus protocol.",
    members: [
      { name: "Himanshu Agrawal", role: "Team Lead", filename: "himanshu-agrawal.jpg" },
      { name: "Jyoti Rani", role: "Faculty Member", filename: "jyoti-rani.jpg" }
    ]
  },
  {
    id: "logistic",
    name: "Logistic",
    description: "Venue infrastructure, transportation, equipment, and event operations.",
    members: [
      { name: "Praveen Kumar Sharma", role: "Team Lead", filename: "praveen-kumar-sharma.jpg" },
      { name: "Ankit Kumar Saini", role: "Faculty Member", filename: "ankit-kumar-saini.jpg" },
      { name: "Gaurav Sinha", role: "Faculty Member", filename: "gaurav-sinha.jpg" },
      { name: "Ravi Prakash Verma", role: "Faculty Member", filename: "ravi-prakash-verma.jpg" }
    ]
  }
];

// Helper to get initials
export function getInitials(name) {
  if (!name) return "AI";
  const cleaned = name.replace(/^(Prof\.|Dr\.)\s*/i, "").trim();
  const parts = cleaned.split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
