export interface User {
  _id: string
  user_name: string
  first_name: string
  last_name: string
  year_graduated: number
  major: string
  company: string
  title: string
  email: string
  linkedin_link: string
  role: "admin" | "user"
  approved: boolean
  createdAt: string
  updatedAt: string
}

export interface LoginResponse {
  userWithoutSensitiveData: User
  accessToken: string
  refreshToken: string
}

export interface Opportunity {
  _id: string;
  title: string;
  posted_by: string;
  type: string;
  description: string;
  needs_approval: boolean;
  approved: boolean;
  approved_by: string;
  is_paid: boolean;
  amount: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}
