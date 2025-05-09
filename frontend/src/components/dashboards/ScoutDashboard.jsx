"use client"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  Users,
  Search,
  Star,
  MapPin,
  Calendar,
  Bell,
  FileText,
  User,
  Eye,
  TrendingUp,
  MessageSquare,
  UserPlus,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

function ScoutDashboard() {
  const { user } = useSelector((state) => state.auth)
  const [scoutData, setScoutData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, fetch scout data from API
    // For now, using mock data
    setTimeout(() => {
      setScoutData({
        region: "Nairobi",
        specialization: "Youth Talent",
        experience: 8,
        rating: 4.8,
        discoveredPlayers: 24,
        successfulTransfers: 12,
        recentDiscoveries: [
          {
            name: "Alex Mwangi",
            age: 17,
            position: "Forward",
            club: "Nairobi Youth Academy",
            potential: 85,
            image: "/placeholder.svg",
          },
          {
            name: "Brian Ochieng",
            age: 18,
            position: "Midfielder",
            club: "Mombasa FC Youth",
            potential: 80,
            image: "/placeholder.svg",
          },
          {
            name: "Charles Kimani",
            age: 16,
            position: "Defender",
            club: "Nakuru United Academy",
            potential: 78,
            image: "/placeholder.svg",
          },
        ],
        upcomingEvents: [
          {
            title: "Youth Tournament - Nairobi",
            date: "This Weekend",
            location: "Kasarani Stadium",
            type: "tournament",
          },
          {
            title: "Player Assessment - Alex Mwangi",
            date: "Tomorrow, 2:00 PM",
            location: "Nairobi Youth Academy",
            type: "assessment",
          },
          {
            title: "Meeting with Nairobi FC Manager",
            date: "Friday, 10:00 AM",
            location: "Nairobi FC Office",
            type: "meeting",
          },
        ],
        watchlist: [
          {
            name: "David Njoroge",
            age: 19,
            position: "Forward",
            club: "Eldoret City",
            marketValue: 120000,
            image: "/placeholder.svg",
          },
          {
            name: "Samuel Wanjala",
            age: 20,
            position: "Midfielder",
            club: "Kisumu Stars",
            marketValue: 150000,
            image: "/placeholder.svg",
          },
        ],
        notifications: [
          { id: 1, message: "New player recommendation request from Nairobi FC", time: "2 hours ago", read: false },
          { id: 2, message: "Alex Mwangi's assessment report is due tomorrow", time: "1 day ago", read: true },
          { id: 3, message: "New youth tournament announced in Mombasa", time: "2 days ago", read: false },
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
            <p className="text-gray-600">Your scouting dashboard</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button asChild variant="outline">
              <Link to="/profile">
                <User className="mr-2 h-4 w-4" /> View Profile
              </Link>
            </Button>
            <Button>
              <FileText className="mr-2 h-4 w-4" /> Create Report
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scout Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 rounded-full mr-4">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Region</p>
                <p className="text-xl font-bold">{scoutData.region}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-50 rounded-full mr-4">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Rating</p>
                <p className="text-xl font-bold">{scoutData.rating}/5.0</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-amber-50 rounded-full mr-4">
                <Users className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Discovered Players</p>
                <p className="text-xl font-bold">{scoutData.discoveredPlayers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-50 rounded-full mr-4">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Successful Transfers</p>
                <p className="text-xl font-bold">{scoutData.successfulTransfers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Discoveries */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Discoveries</CardTitle>
              <CardDescription>Players you've recently discovered</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scoutData.recentDiscoveries.map((player, index) => (
                  <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={player.image || "/placeholder.svg"} />
                      <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{player.name}</p>
                          <div className="flex items-center mt-1">
                            <Badge variant="outline" className="mr-2 bg-gray-100">
                              {player.position}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {player.age} years • {player.club}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                            <p className="font-medium">Potential: {player.potential}/100</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                  <Link to="/discoveries">View All Discoveries</Link>
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
                {scoutData.upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-white rounded-full mr-4 shadow-sm">
                      {event.type === "tournament" ? (
                        <Users className="h-5 w-5 text-blue-600" />
                      ) : event.type === "assessment" ? (
                        <Eye className="h-5 w-5 text-green-600" />
                      ) : (
                        <Calendar className="h-5 w-5 text-purple-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{event.title}</p>
                      <div className="flex items-center mt-1">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500">{event.date}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500">{event.location}</span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${
                        event.type === "tournament"
                          ? "bg-blue-50 text-blue-600 border-blue-200"
                          : event.type === "assessment"
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

          {/* Player Search */}
          <Card>
            <CardHeader>
              <CardTitle>Player Search</CardTitle>
              <CardDescription>Find players based on criteria</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="position">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="position">Position</TabsTrigger>
                  <TabsTrigger value="age">Age</TabsTrigger>
                  <TabsTrigger value="region">Region</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>
                <TabsContent value="position" className="mt-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <Button variant="outline">Goalkeepers</Button>
                    <Button variant="outline">Defenders</Button>
                    <Button variant="outline">Midfielders</Button>
                    <Button variant="outline">Forwards</Button>
                  </div>
                </TabsContent>
                <TabsContent value="age" className="mt-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <Button variant="outline">Under 18</Button>
                    <Button variant="outline">18-21</Button>
                    <Button variant="outline">22-25</Button>
                    <Button variant="outline">Over 25</Button>
                  </div>
                </TabsContent>
                <TabsContent value="region" className="mt-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <Button variant="outline">Nairobi</Button>
                    <Button variant="outline">Mombasa</Button>
                    <Button variant="outline">Kisumu</Button>
                    <Button variant="outline">Nakuru</Button>
                    <Button variant="outline">Eldoret</Button>
                    <Button variant="outline">Other Regions</Button>
                  </div>
                </TabsContent>
                <TabsContent value="advanced" className="mt-4">
                  <div className="text-center py-4">
                    <Button asChild>
                      <Link to="/players/search">
                        <Search className="mr-2 h-4 w-4" /> Advanced Search
                      </Link>
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Scout Profile Card */}
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
                <p className="text-gray-500 mb-4">{scoutData.specialization}</p>
                <div className="flex justify-center space-x-2 mb-4">
                  <Badge variant="outline" className="bg-gray-50">
                    {scoutData.experience} years exp.
                  </Badge>
                  <Badge variant="outline" className="bg-gray-50">
                    {scoutData.region}
                  </Badge>
                </div>
                <Button className="w-full" asChild>
                  <Link to="/profile/edit">Edit Profile</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Watchlist */}
          <Card>
            <CardHeader>
              <CardTitle>Player Watchlist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scoutData.watchlist.map((player, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={player.image || "/placeholder.svg"} />
                      <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{player.name}</p>
                      <div className="flex items-center mt-0.5">
                        <span className="text-xs text-gray-500">
                          {player.age} yrs • {player.position} • {player.club}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${(player.marketValue / 1000).toFixed(0)}k</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="ghost" size="sm" className="text-sm" asChild>
                  <Link to="/watchlist">View Full Watchlist</Link>
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
                {scoutData.notifications.map((notification) => (
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
                  <Link to="/players/add">
                    <UserPlus className="mr-2 h-4 w-4" /> Add Discovery
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/reports/create">
                    <FileText className="mr-2 h-4 w-4" /> Create Report
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/messages">
                    <MessageSquare className="mr-2 h-4 w-4" /> Messages
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/players">
                    <Search className="mr-2 h-4 w-4" /> Browse Players
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

export default ScoutDashboard
