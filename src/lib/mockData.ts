export interface CrimeResult {
  id: string;
  crime: string;
  lawSection: string;
  punishment: string;
  fineAmount: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  bailable: boolean;
  explanation: string;
}

export interface SimilarCase {
  id: string;
  caseName: string;
  crime: string;
  punishment: string;
  year: number;
}

export interface HistoryItem {
  id: string;
  crime: string;
  date: string;
  severity: CrimeResult["severity"];
  lawSection: string;
}

export const exampleCrimes = [
  "Theft of personal property worth $5,000",
  "Assault causing grievous bodily harm",
  "Cybercrime - unauthorized access to computer systems",
  "Fraud through forged documents",
  "Drug possession for personal use",
  "Drunk driving causing property damage",
];

export const mockResults: Record<string, CrimeResult> = {
  default: {
    id: "1",
    crime: "",
    lawSection: "Section 378 IPC - Theft",
    punishment: "Imprisonment up to 3 years",
    fineAmount: "$2,500",
    severity: "Medium",
    bailable: true,
    explanation:
      "Section 378 of the Indian Penal Code defines theft as the dishonest taking of moveable property out of the possession of any person without that person's consent. The punishment includes imprisonment of either description for a term which may extend to three years, or with fine, or with both. The severity depends on the value of property stolen and circumstances of the theft.",
  },
};

export const similarCases: SimilarCase[] = [
  { id: "1", caseName: "State v. Kumar (2022)", crime: "Theft of electronics", punishment: "2 years imprisonment", year: 2022 },
  { id: "2", caseName: "People v. Singh (2021)", crime: "Burglary and theft", punishment: "3 years imprisonment + $3,000 fine", year: 2021 },
  { id: "3", caseName: "R v. Sharma (2023)", crime: "Grand theft auto", punishment: "5 years imprisonment", year: 2023 },
  { id: "4", caseName: "State v. Patel (2020)", crime: "Shoplifting", punishment: "6 months + community service", year: 2020 },
  { id: "5", caseName: "Crown v. Doe (2024)", crime: "Identity theft", punishment: "4 years imprisonment + $10,000 fine", year: 2024 },
];

export const crimeHistory: HistoryItem[] = [
  { id: "1", crime: "Theft of personal property", date: "2024-03-01", severity: "Medium", lawSection: "Section 378 IPC" },
  { id: "2", crime: "Assault causing injury", date: "2024-02-28", severity: "High", lawSection: "Section 325 IPC" },
  { id: "3", crime: "Online fraud", date: "2024-02-25", severity: "High", lawSection: "Section 66D IT Act" },
  { id: "4", crime: "Drug possession", date: "2024-02-20", severity: "Critical", lawSection: "Section 20 NDPS Act" },
  { id: "5", crime: "Drunk driving", date: "2024-02-15", severity: "Low", lawSection: "Section 185 MV Act" },
];

export const dashboardStats = {
  totalCrimes: 1247,
  mostCommonCrime: "Theft",
  avgPunishment: "2.5 years",
  analyzedToday: 34,
};

export const punishmentChartData = [
  { crime: "Theft", years: 3 },
  { crime: "Assault", years: 5 },
  { crime: "Fraud", years: 7 },
  { crime: "Cybercrime", years: 4 },
  { crime: "Drug Offense", years: 10 },
  { crime: "DUI", years: 1 },
];

export const crimeCategoryData = [
  { name: "Property Crimes", value: 35, fill: "hsl(217, 91%, 50%)" },
  { name: "Violent Crimes", value: 20, fill: "hsl(0, 72%, 51%)" },
  { name: "Cyber Crimes", value: 18, fill: "hsl(199, 89%, 48%)" },
  { name: "Drug Offenses", value: 15, fill: "hsl(38, 92%, 50%)" },
  { name: "Financial Crimes", value: 12, fill: "hsl(142, 71%, 45%)" },
];
