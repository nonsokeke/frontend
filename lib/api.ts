import { Message } from "@/components/profile-view"

const API_BASE_URL = 'http://192.241.148.178/api'

export interface SignupData {
  user_name: string
  first_name: string
  last_name: string
  year_graduated: number
  major: string
  company: string
  title: string
  email: string
  linkedin_link: string
  password: string
}

export async function signupUser(data: SignupData) {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to signup')
  }
  return response.json()
}

export interface AuthResponse {
  userWithoutSensitiveData: {
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
    role: string
    approved: boolean
    createdAt: string
    updatedAt: string
  }
  accessToken: string
  refreshToken: string
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  return data;
}

export const fetchApprovedUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  })
  if (!response.ok) {
    throw new Error('Fetching users failed');
  }

  const data = await response.json();
  return data;
}

export const fetchUserByUsername = async (user_name: string) => {
  const response = await fetch(`${API_BASE_URL}/users/username/${user_name}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  })
  if (!response.ok) {
    throw new Error('Fetching user failed');
  }

  const data = await response.json();
  return data;
}

export const fetchApprovedOppurtunities = async () => {
  const response = await fetch(`${API_BASE_URL}/opportunities`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  })
  if (!response.ok) {
    throw new Error('Fetching opportunities failed');
  }

  const data = await response.json();
  return data;
}

export const fetchUnapprovedOppurtunities = async () => {
  const response = await fetch(`${API_BASE_URL}/opportunities/unapproved`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  })
  if (!response.ok) {
    throw new Error('Fetching opportunities failed');
  }

  const data = await response.json();
  return data;
}

export const fetchOppurtunityByID = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/opportunities/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  })
  if (!response.ok) {
    throw new Error('Fetching oppurtunity failed');
  }

  const data = await response.json();
  return data;
}

export const sendApproveOpportunityRequest = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/opportunities/${id}/approve`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  })
  if (!response.ok) {
    throw new Error('Approving opportunity failed');
  }

  const data = await response.json();
  return data;
}

export const fetchUnapprovedUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users/unapproved`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  })
  if (!response.ok) {
    throw new Error('Fetching users failed');
  }

  const data = await response.json();
  return data;
}

export const sendApproveUserRequest = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/users/${id}/approve`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  })
  if (!response.ok) {
    throw new Error('Approving user failed');
  }

  const data = await response.json();
  return data;
}

export const sendMessage = async (recipient: string, content: string) => {
  const response = await fetch(`${API_BASE_URL}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    },
    body: JSON.stringify({ recipient, content })
  })
  if (!response.ok) {
    throw new Error('Sending user message failed');
  }

  const data = await response.json();
  return data;
}

export const fetchConversation = async (id: string): Promise<Message[]> => {
  const response = await fetch(`${API_BASE_URL}/messages/conversation/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  })
  if (!response.ok) {
    throw new Error('Fetching messages failed');
  }

  const data = await response.json();
  return data;
}