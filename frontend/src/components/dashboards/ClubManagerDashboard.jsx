"use client"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  Users,
  TrendingUp,
  DollarSign,
  Calendar,
  Shield,
  Bell,
  FileText,
  BarChart,
  MessageSquare,
  UserPlus,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"

function ClubManagerDashboard() {
  const { user } = useSelector((state) => state.auth)
  const [clubData, setClubData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, fetch club data from API
    // For now, using mock data
    setTimeout(() => {
      setClubData({
        name: "Nairobi FC",
        logo: "/placeholder.svg",
        budget: 1500000,
        budgetSpent: 850000,
        playerCount: 28,
        transfersInProgress: 3,
        upcomingMatches: [
          { opponent: "Mombasa United", date: "Saturday, 3:00 PM", venue: "Home", competition: "Premier League" },
          { opponent: "Kisumu Stars", date: "Next Wednesday, 7:00 PM", venue: "Away", competition: "Cup" },
        ],
        recentTransfers: [
          {
            player: "James Omondi",
            type: "in",
            from: "Eldoret City",
            fee: "120,000",
            status: "completed",
            date: "2 weeks ago",
          },
          {
            player: "Daniel Kimani",
            type: "out",
            to: "Nakuru FC",
            fee: "85,000",
            status: "completed",
            date: "1 month ago",
          },
        ],
        topPlayers: [
          {
            name: "Michael Otieno",
            position: "Forward",
            image: "/placeholder.svg",
            goals: 12,
            assists: 5,
            marketValue: 350000,
          },
          {
            name: "John Kamau",
            position: "Midfielder",
            image: "/placeholder.svg",
            goals: 6,
            assists: 10,
            marketValue: 280000,
          },
          {
            name: "David Njoroge",
            position: "Defender",
            image: "/placeholder.svg",
            goals: 2,
            assists: 1,
            marketValue: 220000,
          },
        ],
        notifications: [
          { id: 1, message: "New transfer offer for Michael Otieno", time: "2 hours ago", read: false },
          { id: 2, message: "Contract renewal needed for 3 players", time: "1 day ago", read: true },
          { id: 3, message: "Match report available: vs Eldoret City", time: "2 days ago", read: false },
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
          <div className="flex items-center">
            <Avatar className="h-16 w-16 mr-4">
              <AvatarImage src={clubData.logo || "/placeholder.svg"} />
              <AvatarFallback className="bg-kenya-green text-white text-xl">{clubData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{clubData.name}</h1>
              <p className="text-gray-600">Club Manager Dashboard</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button asChild variant="outline">
              <Link to="/club/profile">
                <Shield className="mr-2 h-4 w-4" /> Club Profile
              </Link>
            </Button>
            <Button>
              <FileText className="mr-2 h-4 w-4" /> Club Reports
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Club Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 rounded-full mr-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Squad Size</p>
                <p className="text-xl font-bold">{clubData.playerCount} Players</p>
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
                <p className="text-sm font-medium text-gray-500">Transfer Budget</p>
                <p className="text-xl font-bold">${(clubData.budget / 1000000).toFixed(1)}M</p>
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
                <p className="text-sm font-medium text-gray-500">Active Transfers</p>
                <p className="text-xl font-bold">{clubData.transfersInProgress}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <div className="p-2 bg-purple-50 rounded-full mr-4">
                  <BarChart className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Budget Spent</p>
                  <p className="text-xl font-bold">${(clubData.budgetSpent / 1000000).toFixed(1)}M</p>
                </div>
              </div>
              <Progress value={(clubData.budgetSpent / clubData.budget) * 100} className="h-2" />
              <p className="text-xs text-gray-500 mt-2">
                {((clubData.budgetSpent / clubData.budget) * 100).toFixed(0)}% of total budget
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Upcoming Matches */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Matches</CardTitle>
              <CardDescription>Next fixtures for your team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clubData.upcomingMatches.map((match, index) => (
                  <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-kenya-green mr-2" />
                        <p className="font-medium">vs. {match.opponent}</p>
                        <Badge
                          variant="outline"
                          className={`ml-3 ${
                            match.venue === "Home"
                              ? "bg-green-50 text-green-600 border-green-200"
                              : "bg-blue-50 text-blue-600 border-blue-200"
                          }`}
                        >
                          {match.venue}
                        </Badge>
                      </div>
                      <div className="flex mt-2">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500">{match.date}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-gray-100">
                      {match.competition}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                  <Link to="/fixtures">View All Fixtures</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transfers */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transfers</CardTitle>
              <CardDescription>Latest transfer activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clubData.recentTransfers.map((transfer, index) => (
                  <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div
                      className={`w-2 h-12 rounded-full mr-4 ${
                        transfer.type === "in" ? "bg-green-500" : "bg-amber-500"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">{transfer.player}</p>
                        <p className="font-medium">${transfer.fee}</p>
                      </div>
                      <div className="flex mt-1">
                        <span className="text-sm text-gray-500">
                          {transfer.type === "in" ? `From ${transfer.from}` : `To ${transfer.to}`}
                        </span>
                        <span className="text-xs text-gray-400 ml-4">{transfer.date}</span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${
                        transfer.status === "completed"
                          ? "bg-green-50 text-green-600 border-green-200"
                          : "bg-amber-50 text-amber-600 border-amber-200"
                      }`}
                    >
                      {transfer.status.charAt(0).toUpperCase() + transfer.status.slice(1)}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                  <Link to="/transfers">View Transfer Market</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Top Players */}
          <Card>
            <CardHeader>
              <CardTitle>Top Players</CardTitle>
              <CardDescription>Your squad's key performers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clubData.topPlayers.map((player, index) => (
                  <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={player.image || "/placeholder.svg"} />
                      <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{player.name}</p>
                          <p className="text-sm text-gray-500">{player.position}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${(player.marketValue / 1000).toFixed(0)}k</p>
                          <p className="text-sm text-gray-500">
                            {player.goals} G / {player.assists} A
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                  <Link to="/squad">View Full Squad</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Manager Profile Card */}
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
                <p className="text-gray-500 mb-4">Club Manager</p>
                <div className="flex justify-center space-x-2 mb-4">
                  <Badge variant="outline" className="bg-gray-50">
                    {clubData.name}
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
                {clubData.notifications.map((notification) => (
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
                  <Link to="/transfers/create">
                    <TrendingUp className="mr-2 h-4 w-4" /> Initiate Transfer
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/players/add">
                    <UserPlus className="mr-2 h-4 w-4" /> Add Player
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/scout-network">
                    <Users className="mr-2 h-4 w-4" /> Scout Network
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

          {/* Budget Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Budget Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Transfer Budget</span>
                    <span className="text-sm font-medium">
                      ${(clubData.budgetSpent / 1000000).toFixed(1)}M / ${(clubData.budget / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <Progress value={(clubData.budgetSpent / clubData.budget) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Wage Budget</span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Youth Development</span>
                    <span className="text-sm font-medium">40%</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
              </div>
              <div className="mt-4 text-center">
                <Button variant="ghost" size="sm" className="text-sm" asChild>
                  <Link to="/finances">View Financial Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ClubManagerDashboard
