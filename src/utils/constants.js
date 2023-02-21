import { RiShieldCheckLine, RiStackLine, RiUser3Line } from "react-icons/ri";

export const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const filterOptions = [
  {
    name: "Gender",
    options: ["male", "female"],
  },
  {
    name: "Age bracket",
    options: ["18 - 30", "30 - 45", "46 - 59", "60 - 79", "80 +"],
  },
  {
    name: "Year contested",
    options: [],
  },
  {
    name: "Position",
    options: [],
  },
  {
    name: "Party",
    options: [],
  },
  {
    name: "Qualification",
    options: [],
  },
  {
    name: "State",
    options: [],
  },
  {
    name: "Senatorial District",
    options: [],
  },
  {
    name: "Federal Constituency",
    options: [],
  },
  {
    name: "State Constituency",
    options: [],
  },
  {
    name: "LGA",
    options: [],
  },
  {
    name: "Ward",
    options: [],
  },
  {
    name: "Polling Unit",
    options: [],
  },
];

export const navLinks = [
  { name: "Data Management", icon: RiStackLine, href: "/admin/data" },
  { name: "Data Analytics", icon: RiShieldCheckLine, href: "/admin/analytics" },
  { name: "Account Management", icon: RiUser3Line, href: "/admin/accounts" },
];

export const candidatePositions = ["PRESIDENT", "GOVERNOR", "SENATE"];
