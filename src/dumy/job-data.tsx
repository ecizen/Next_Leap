
interface SalaryRange {
  type: "range";
  min: number;
  max: number;
}

interface SalaryFixed {
  type: "fixed";
  amount: number;
}

type Salary = SalaryRange | SalaryFixed;

interface CardProps {
  id: number;
  company_name: string;
  company_image: string;
  job_title: string;
  tags: string[];
  salary: Salary;
  city: string;
  country: string;
  total_application: number;
  postedAt: string;
}

const JobData:CardProps[] = [
  {
    id: 1,
    company_name: "Google.dev",
    job_title: "UX Researcher",
    company_image: "https://i.pinimg.com/originals/12/06/1f/12061f54ee55f6336c972ad01350b857.png",
    tags: ["Full-time", "1-3 years", "Onsite"],
    salary: {
      type: "range",
      min: 500,
      max: 1000,
    },
    city: "Manhattan",
    country: "USA",
    total_application: 50,
    postedAt: "5 minutes ago",
  },
  {
    id: 2,
    company_name: "Apple.tech",
    job_title: "UI Designer",
    company_image: "https://i.pinimg.com/originals/12/06/1f/12061f54ee55f6336c972ad01350b857.png",
    tags: ["Contract", "2-5 years", "Remote"],
    salary: {
      type: "fixed",
      amount: 800,
    },
    city: "Cupertino",
    country: "USA",
    total_application: 35,
    postedAt: "2 hours ago",
  },
  {
    id: 3,
    company_name: "Tokopedia",
    job_title: "Frontend Engineer",
    company_image: "https://i.pinimg.com/originals/12/06/1f/12061f54ee55f6336c972ad01350b857.png",
    tags: ["Full-time", "Entry-level", "Onsite"],
    salary: {
      type: "range",
      min: 700,
      max: 120,
    },
    city: "Jakarta",
    country: "Indonesia",
    total_application: 60,
    postedAt: "1 day ago",
  },
  {
    id: 4,
    company_name: "Shopify Inc",
    job_title: "Backend Developer",
    company_image: "https://i.pinimg.com/originals/12/06/1f/12061f54ee55f6336c972ad01350b857.png",
    tags: ["Full-time", "3+ years", "Remote"],
    salary: {
      type: "fixed",
      amount: 150,
    },
    city: "Toronto",
    country: "Canada",
    total_application: 42,
    postedAt: "3 hours ago",
  },
  {
    id: 5,
    company_name: "Grab",
    job_title: "Data Analyst",
    company_image: "https://i.pinimg.com/originals/12/06/1f/12061f54ee55f6336c972ad01350b857.png",
    tags: ["Internship", "0-1 year", "Hybrid"],
    salary: {
      type: "range",
      min: 300,
      max: 500,
    },
    city: "Singapore",
    country: "Singapore",
    total_application: 20,
    postedAt: "12 minutes ago",
  },
  {
    id: 6,
    company_name: "Netflix Studio",
    job_title: "Motion Graphic Designer",
    company_image: "https://i.pinimg.com/originals/12/06/1f/12061f54ee55f6336c972ad01350b857.png",
    tags: ["Part-time", "1-3 years", "Remote"],
    salary: {
      type: "fixed",
      amount: 600,
    },
    city: "Los Angeles",
    country: "USA",
    total_application: 18,
    postedAt: "6 hours ago",
  },
  {
    id: 7,
    company_name: "Traveloka",
    job_title: "Product Manager",
    company_image: "https://i.pinimg.com/originals/12/06/1f/12061f54ee55f6336c972ad01350b857.png",
    tags: ["Full-time", "Senior", "Onsite"],
    salary: {
      type: "range",
      min: 300,
      max: 500,
    },
    city: "Jakarta",
    country: "Indonesia",
    total_application: 55,
    postedAt: "2 days ago",
  },
];

export default JobData
