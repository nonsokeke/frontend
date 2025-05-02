"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { fetchApprovedOppurtunities, fetchApprovedUsers, fetchOppurtunityByID, fetchUnapprovedOppurtunities, fetchUnapprovedUsers, fetchUserByUsername, sendApproveOpportunityRequest, sendApproveUserRequest } from "./api";
import { useToast } from "@/hooks/use-toast";

// Define user types
export type UserRole = "none" | "user" | "admin"

export interface User {
  _id: string;
  user_name: string;
  first_name: string;
  last_name: string;
  year_graduated: number;
  major: string;
  company: string;
  title: string;
  email: string;
  linkedin_link: string;
  role: string;
  approved: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
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



// Define the shape of our global state
interface GlobalState {
  authState: UserRole
  setAuthState: (state: UserRole) => void
  currentUser: User | null
  users: User[]
  pendingUsers: User[]
  fetchPendingUsers: () => Promise<void>
  opportunities: Opportunity[]
  pendingOpportunities: Opportunity[]
  fetchPendingOpportunities: () => Promise<void>
  fetchUsers: (page: number) => Promise<void>
  fetchOpportunities: () => Promise<void>
  fetchUser: (username: string) => Promise<User | null>
  fetchOpportunity: (id: string) => Promise<Opportunity | null>
  approveUser: (id: string) => Promise<void>
  rejectUser: (id: string) => Promise<void>
  approveOpportunity: (id: string) => Promise<void>
  rejectOpportunity: (id: string) => Promise<void>
  user: User | null
  setUser: (user: User | null) => void
  accessToken: string | null
  setAccessToken: (token: string | null) => void
}

const GlobalContext = createContext<GlobalState | undefined>(undefined)


// Provider component
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<UserRole>("none")
  const [users, setUsers] = useState<User[]>([])
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [pendingOpportunities, setPendingOpportunities] = useState<Opportunity[]>([])
  const [pendingUsers, setPendingUsers] = useState<User[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const { toast } = useToast()

  let currentUser = authState !== "none" ? JSON.parse(localStorage.getItem("user") || '') : null

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      currentUser = parsedUser;
      setUser(parsedUser)
      setAuthState(parsedUser.role)
    }
  }, [])

  const fetchUsers = async () => {
    console.log(`Fetching users`)
    try {
      let users = await fetchApprovedUsers()
      setUsers(users)
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  const fetchPendingUsers = async () => {
    console.log("Fetching pending users")
    try {
      let users = await fetchUnapprovedUsers()
      setPendingUsers(users)
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  const fetchOpportunities = async () => {
    console.log("Fetching opportunities")
    try {
      let oppurtunities = await fetchApprovedOppurtunities()
      setOpportunities(oppurtunities)
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  const fetchPendingOpportunities = async () => {
    console.log("Fetching pending opportunities")
    try {
      let oppurtunities = await fetchUnapprovedOppurtunities()
      setPendingOpportunities(oppurtunities)
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  const fetchUser = async (username: string): Promise<User | null> => {
    try {
      let user = await fetchUserByUsername(username)
      return user
    } catch (error) {
      console.error("Error fetching users:", error)
      return null
    }

  }

  const fetchOpportunity = async (id: string): Promise<Opportunity | null> => {
    console.log(`Fetching opportunity ${id}`)
    try {
      const opportunity = await fetchOppurtunityByID(id)
      return opportunity
    } catch (error) {
      console.error("Error fetching oppurtunity:", error)
      return null
    }
  }

  const approveUser = async (id: string) => {
    console.log(`Approving user ${id}`)
    let currentUser = pendingUsers.find((user) => user._id === id)
    if (!currentUser) return
    try {
      await sendApproveUserRequest(id)
      // Update the local state to reflect the approval
      setPendingUsers(
        pendingUsers.filter((user) => user._id !== id),
      )
      setUsers((prevUsers) => [
        ...prevUsers,
        { ...currentUser, approved: true },
      ])
      toast({
        title: "User Approved",
        description: `The User "${currentUser.user_name}" has been approved.`,
        variant: "default",
      })
    } catch (error) {
      console.error("Error approving user:", error)
      toast({
        title: "Error",
        description: `Failed to approve the user "${currentUser.user_name}".`,
        variant: "destructive",
      })
    }
  }

  const rejectUser = async (id: string) => {
    console.log(`Rejecting user ${id}`)
    setPendingUsers(pendingUsers.filter((user) => user._id !== id))
  }

  const approveOpportunity = async (id: string) => {
    console.log(`Approving opportunity ${id}`)
    let currentOpportunity = pendingOpportunities.find((opportunity) => opportunity._id === id)
    if (!currentOpportunity) return
    try {
      await sendApproveOpportunityRequest(id)
      // Update the local state to reflect the approval
      setPendingOpportunities(
        pendingOpportunities.filter((opportunity) => opportunity._id !== id),
      )
      setOpportunities((prevOpportunities) => [
        ...prevOpportunities,
        { ...currentOpportunity, isApproved: true },
      ])
      toast({
        title: "Opportunity Approved",
        description: `The opportunity "${currentOpportunity.title}" has been approved.`,
        variant: "default",
      })
    } catch (error) {
      console.error("Error approving opportunity:", error)
      toast({
        title: "Error",
        description: `Failed to approve the opportunity "${currentOpportunity.title}".`,
        variant: "destructive",
      })
    }

  }

  const rejectOpportunity = async (id: string) => {
    console.log(`Rejecting opportunity ${id}`)
    setPendingOpportunities(pendingOpportunities.filter((opportunity) => opportunity._id !== id))
  }

  return (
    <GlobalContext.Provider
      value={{
        authState,
        setAuthState,
        currentUser,
        users,
        pendingUsers,
        fetchPendingUsers,
        opportunities,
        pendingOpportunities,
        fetchPendingOpportunities,
        fetchUsers,
        fetchOpportunities,
        fetchUser,
        fetchOpportunity,
        approveUser,
        rejectUser,
        approveOpportunity,
        rejectOpportunity,
        user,
        setUser,
        accessToken,
        setAccessToken,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

// Custom hook to use the global state
export const useGlobalState = () => {
  const context = useContext(GlobalContext)
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalProvider")
  }
  return context
}
