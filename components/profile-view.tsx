"use client"

import { useEffect, useState } from "react"
import { useGlobalState, type User } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Cake, GraduationCap, Briefcase, Linkedin, MessageSquare, PencilIcon, Building, Send } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { fetchConversation, sendMessage } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

interface MessageUser {
  _id: string;
  user_name: string;
}

export interface Message {
  _id: string;
  sender: MessageUser;
  recipient: MessageUser;
  content: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ProfileViewProps {
  user: User
  isCurrentUser?: boolean
  currentUser?: User | null
}

export default function ProfileView({ user, isCurrentUser = false }: ProfileViewProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [newMessage, setNewMessage] = useState("")
  const { user: currentUser } = useGlobalState()
  const { toast } = useToast()

  const [messages, setMessages] = useState<Message[]>([])

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !currentUser) return
    const message: Message = {
      _id: Date.now().toString(),
      sender: {
        _id: currentUser._id,
        user_name: currentUser.user_name,
      },
      recipient: {
        _id: user._id,
        user_name: user.user_name,
      },
      content: newMessage,
      read: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0,
    }
    try {
      const response = await sendMessage(user._id, newMessage)
      if (response) {
        setMessages((prevMessages) => [...prevMessages, message])
        setNewMessage("")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
      console.error("Error sending message:", error)
    }

  }

  async function fetchMessages() {
    try {
      const messages = await fetchConversation(user._id)
      if (!messages) return
      setMessages(messages.reverse())
    } catch (error) {
      console.error("Error fetching messages:", error)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <div className="bg-[#0C5640] h-36 rounded-t-2xl">

        </div>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-32 w-32 -mt-20">
                <AvatarFallback>{user.user_name.charAt(0)}</AvatarFallback>
              </Avatar>

              {!isCurrentUser && (
                <Button className="mt-4 w-full bg-[#46923D] text-white hover:bg-[#377231]" size="sm" onClick={() => setIsChatOpen(!isChatOpen)}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {isChatOpen ? "Close Chat" : "Message"}
                </Button>
              )}
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{user.first_name} {user.last_name}</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-muted-foreground">
                  <Briefcase className="mr-2 h-4 w-4 text-[#46923D]" />
                  <span>{user.title}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Building className="mr-2 h-4 w-4 text-[#46923D]" />
                  <span>{user.company}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <GraduationCap className="mr-2 h-4 w-4 text-[#46923D]" />
                  <span>{user.major}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Linkedin className="mr-2 h-4 w-4 text-[#46923D]" />
                  <a
                    href={`https://${user.linkedin_link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {user.linkedin_link}
                  </a>
                </div>
              </div>

              <div className="border-t pt-4">
                <h2 className="text-lg font-semibold mb-2">About</h2>
                <p className="text-muted-foreground">{user.email}</p>
              </div>

              {isCurrentUser && (
                <div className="mt-6">
                  <Button className="bg-[#0C5640] text-white">Edit Profile <PencilIcon /></Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>

        {isChatOpen && (
          <CardContent className="border-t">
            <div className="space-y-4 max-h-[300px] overflow-y-auto p-4">
              {messages.map((message) => (
                <div
                  key={message._id}
                  className={`flex ${message.sender._id === currentUser?._id ? "justify-end" : "justify-start"
                    }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${message.sender._id === currentUser?._id
                      ? "bg-[#0C5640] text-white"
                      : "bg-gray-100"
                      }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs opacity-70">
                      {formatDate(message.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 p-4">
              <Textarea
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="resize-none"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
              <Button
                onClick={handleSendMessage}
                className="bg-[#0C5640] text-white"
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
