"use client"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { User, Calendar, TrendingUp, Award, Clock, Bell, FileText, Shield, Users, MessageSquare } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"

function PlayerDashboard() {
  const { user } = useSelector((state) => state.auth)
  const [playerData, setPlayerData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, fetch player data from API
    // For now, using mock data
    setTimeout(() => {
      setPlayerData({
        firstName: "John",
        lastName: "Doe",
        position: "Forward",
        age: 23,
        currentClub: {
          name: "Nairobi FC",
          logo: "/placeholder.svg",
        },
        marketValue: 250000,
        contractEndDate: "2025-06-30",
        recentMatches: [
          { opponent: "Mombasa United", result: "Win", score: "2-1", goals: 1, assists: 0 },
          { opponent: "Kisumu Stars", result: "Draw", score: "1-1", goals: 0, assists: 1 },
          { opponent: "Eldoret City", result: "Loss", score: "0-2", goals: 0, assists: 0 },
        ],
        notifications: [
          { id: 1, message: "New transfer inquiry from Mombasa United", time: "2 hours ago", read: false },
          { id: 2, message: "Coach added you to the starting lineup", time: "1 day ago", read: true },
          { id: 3, message: "Performance review scheduled for tomorrow", time: "1 day ago", read: false },
        ],
        upcomingEvents: [
          { id: 1, title: "Team Training", date: "Today, 10:00 AM", type: "training" },
          { id: 2, title: "Match vs. Nakuru FC", date: "Saturday, 3:00 PM", type: "match" },
          { id: 3, title: "Performance Review", date: "Tomorrow, 2:00 PM", type: "meeting" },
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
            <p className="text-gray-600">Here's what's happening with your football career</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button asChild variant="outline">
              <Link to="/profile">
                <User className="mr-2 h-4 w-4" /> View Profile
              </Link>
            </Button>
            <Button>
              <FileText className="mr-2 h-4 w-4" /> Update Stats
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Player Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 rounded-full mr-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Current Club</p>
                <p className="text-xl font-bold">{playerData.currentClub.name}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-50 rounded-full mr-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Market Value</p>
                <p className="text-xl font-bold">${(playerData.marketValue / 1000).toFixed(0)}k</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-amber-50 rounded-full mr-4">
                <Award className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Position</p>
                <p className="text-xl font-bold">{playerData.position}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-50 rounded-full mr-4">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Contract Until</p>
                <p className="text-xl font-bold">
                  {new Date(playerData.contractEndDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Performance</CardTitle>
              <CardDescription>Your last 3 matches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {playerData.recentMatches.map((match, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div
                      className={`w-2 h-12 rounded-full mr-4 ${
                        match.result === "Win"
                          ? "bg-green-500"
                          : match.result === "Draw"
                            ? "bg-amber-500"
                            : "bg-red-500"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">vs. {match.opponent}</p>
                        <p
                          className={`font-medium ${
                            match.result === "Win"
                              ? "text-green-600"
                              : match.result === "Draw"
                                ? "text-amber-600"
                                : "text-red-600"
                          }`}
                        >
                          {match.score}
                        </p>
                      </div>
                      <div className="flex mt-1">
                        <span className="text-sm text-gray-500 mr-4">Goals: {match.goals}</span>
                        <span className="text-sm text-gray-500">Assists: {match.assists}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                  <Link to="/stats">View All Performance Stats</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Your schedule for the next few days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {playerData.upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-white rounded-full mr-4 shadow-sm">
                      {event.type === "training" ? (
                        <Users className="h-5 w-5 text-blue-600" />
                      ) : event.type === "match" ? (
                        <Shield className="h-5 w-5 text-green-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-purple-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-gray-500">{event.date}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${
                        event.type === "training"
                          ? "bg-blue-50 text-blue-600 border-blue-200"
                          : event.type === "match"
                            ? "bg-green-50 text-green-600 border-green-200"
                            : "bg-purple-50 text-purple-600 border-purple-200"
                      }`}
                    >
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </Badge>
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
          {/* Profile Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user.profileImage || "/placeholder.svg"} />
                  <AvatarFallback className="bg-kenya-green text-white text-xl">
                    {user.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">
                  {playerData.firstName} {playerData.lastName}
                </h3>
                <p className="text-gray-500 mb-4">{playerData.position}</p>
                <div className="flex justify-center space-x-2 mb-4">
                  <Badge variant="outline" className="bg-gray-50">
                    Age: {playerData.age}
                  </Badge>
                  <Badge variant="outline" className="bg-gray-50">
                    {playerData.currentClub.name}
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
                {playerData.notifications.map((notification) => (
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
                  <Link to="/messages">
                    <MessageSquare className="mr-2 h-4 w-4" /> Messages
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/transfers">
                    <TrendingUp className="mr-2 h-4 w-4" /> Transfer Market
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/scout-network">
                    <Users className="mr-2 h-4 w-4" /> Scout Network
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/teams">
                    <Shield className="mr-2 h-4 w-4" /> Explore Teams
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PlayerDashboard
