"use client"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  Users,
  DollarSign,
  Calendar,
  Bell,
  FileText,
  User,
  Briefcase,
  MessageSquare,
  TrendingUp,
  UserPlus,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"

function AgentDashboard() {
  const { user } = useSelector((state) => state.auth)
  const [agentData, setAgentData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, fetch agent data from API
    // For now, using mock data
    setTimeout(() => {
      setAgentData({
        clients: 8,
        pendingDeals: 3,
        totalEarnings: 125000,
        activeNegotiations: 2,
        clientList: [
          {
            name: "Michael Otieno",
            position: "Forward",
            club: "Nairobi FC",
            age: 24,
            contractEnd: "2025-06-30",
            marketValue: 350000,
            image: "/placeholder.svg",
          },
          {
            name: "John Kamau",
            position: "Midfielder",
            club: "Mombasa United",
            age: 22,
            contractEnd: "2024-12-31",
            marketValue: 280000,
            image: "/placeholder.svg",
          },
          {
            name: "David Njoroge",
            position: "Defender",
            club: "Kisumu Stars",
            age: 25,
            contractEnd: "2026-06-30",
            marketValue: 220000,
            image: "/placeholder.svg",
          },
        ],
        activeDeals: [
          {
            player: "Michael Otieno",
            fromClub: "Nairobi FC",
            toClub: "Eldoret City",
            value: 400000,
            status: "negotiating",
            deadline: "2 weeks",
          },
          {
            player: "John Kamau",
            fromClub: "Mombasa United",
            toClub: "Nakuru FC",
            value: 320000,
            status: "agreed",
            deadline: "1 week",
          },
        ],
        upcomingMeetings: [
          {
            title: "Contract Negotiation - Michael Otieno",
            date: "Tomorrow, 2:00 PM",
            location: "Eldoret City Office",
            with: "Eldoret City Manager",
          },
          {
            title: "Player Meeting - David Njoroge",
            date: "Friday, 10:00 AM",
            location: "Kisumu Stars Training Ground",
            with: "David Njoroge",
          },
        ],
        notifications: [
          { id: 1, message: "New transfer offer for Michael Otieno", time: "2 hours ago", read: false },
          { id: 2, message: "Contract proposal received from Nakuru FC", time: "1 day ago", read: true },
          { id: 3, message: "John Kamau's medical scheduled for next week", time: "2 days ago", read: false },
        ],
      })
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-kenya-green"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Welcome Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.name}!</h1>
            <p className="text-gray-600">Your agent dashboard</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button asChild variant="outline">
              <Link to="/profile">
                <User className="mr-2 h-4 w-4" /> View Profile
              </Link>
            </Button>
            <Button>
              <FileText className="mr-2 h-4 w-4" /> Create Contract
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Agent Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 rounded-full mr-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Clients</p>
                <p className="text-xl font-bold">{agentData.clients} Players</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-50 rounded-full mr-4">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Earnings</p>
                <p className="text-xl font-bold">${(agentData.totalEarnings / 1000).toFixed(0)}k</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-amber-50 rounded-full mr-4">
                <TrendingUp className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Deals</p>
                <p className="text-xl font-bold">{agentData.pendingDeals}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-50 rounded-full mr-4">
                <Briefcase className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Active Negotiations</p>
                <p className="text-xl font-bold">{agentData.activeNegotiations}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Client List */}
          <Card>
            <CardHeader>
              <CardTitle>Your Clients</CardTitle>
              <CardDescription>Players you represent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agentData.clientList.map((client, index) => (
                  <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={client.image || "/placeholder.svg"} />
                      <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{client.name}</p>
                          <div className="flex items-center mt-1">
                            <Badge variant="outline" className="mr-2 bg-gray-100">
                              {client.position}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {client.age} years • {client.club}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${(client.marketValue / 1000).toFixed(0)}k</p>
                          <p className="text-xs text-gray-500">
                            Contract until{" "}
                            {new Date(client.contractEnd).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                  <Link to="/clients">View All Clients</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Active Deals */}
          <Card>
            <CardHeader>
              <CardTitle>Active Deals</CardTitle>
              <CardDescription>Ongoing transfer negotiations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agentData.activeDeals.map((deal, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-medium">{deal.player}</p>
                        <div className="flex items-center mt-1">
                          <p className="text-sm text-gray-500">
                            {deal.fromClub} → {deal.toClub}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={`${
                          deal.status === "negotiating"
                            ? "bg-amber-50 text-amber-600 border-amber-200"
                            : deal.status === "agreed"
                              ? "bg-green-50 text-green-600 border-green-200"
                              : "bg-blue-50 text-blue-600 border-blue-200"
                        }`}
                      >
                        {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="font-medium">${(deal.value / 1000).toFixed(0)}k</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-500">Deadline: {deal.deadline}</span>
                      </div>
                      <Button size="sm" asChild>
                        <Link to={`/deals/${index}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                  <Link to="/deals">View All Deals</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Meetings */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Meetings</CardTitle>
              <CardDescription>Your schedule for the next few days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agentData.upcomingMeetings.map((meeting, index) => (
                  <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-white rounded-full mr-4 shadow-sm">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{meeting.title}</p>
                      <div className="flex items-center mt-1">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500">{meeting.date}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Users className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500">With: {meeting.with}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500">{meeting.location}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <CheckCircle className="h-4 w-4 mr-1" /> Confirm
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">
                        <XCircle className="h-4 w-4 mr-1" /> Cancel
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                  <Link to="/calendar">View Full Calendar</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Agent Profile Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user.profileImage || "/placeholder.svg"} />
                  <AvatarFallback className="bg-kenya-green text-white text-xl">
                    {user.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">{user.name}</h3>
                <p className="text-gray-500 mb-4">Football Agent</p>
                <div className="flex justify-center space-x-2 mb-4">
                  <Badge variant="outline" className="bg-gray-50">
                    {agentData.clients} Clients
                  </Badge>
                </div>
                <Button className="w-full" asChild>
                  <Link to="/profile/edit">Edit Profile</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agentData.notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg flex items-start ${notification.read ? "bg-gray-50" : "bg-blue-50"}`}
                  >
                    <Bell className={`h-5 w-5 mr-3 mt-0.5 ${notification.read ? "text-gray-400" : "text-blue-500"}`} />
                    <div>
                      <p className={`text-sm ${notification.read ? "font-normal" : "font-medium"}`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="ghost" size="sm" className="text-sm" asChild>
                  <Link to="/notifications">View All Notifications</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/clients/add">
                    <UserPlus className="mr-2 h-4 w-4" /> Add Client
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/transfers/create">
                    <TrendingUp className="mr-2 h-4 w-4" /> Initiate Transfer
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/contracts/create">
                    <FileText className="mr-2 h-4 w-4" /> Draft Contract
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/messages">
                    <MessageSquare className="mr-2 h-4 w-4" /> Messages
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Earnings Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Earnings Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">This Month</span>
                    <span className="text-sm font-medium">$18,500</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">This Quarter</span>
                    <span className="text-sm font-medium">$42,000</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">This Year</span>
                    <span className="text-sm font-medium">${(agentData.totalEarnings / 1000).toFixed(0)}k</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
              <div className="mt-4 text-center">
                <Button variant="ghost" size="sm" className="text-sm" asChild>
                  <Link to="/earnings">View Detailed Earnings</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AgentDashboard
