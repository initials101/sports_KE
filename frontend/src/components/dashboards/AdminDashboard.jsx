"use client"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  Users,
  Shield,
  TrendingUp,
  UserCheck,
  Bell,
  FileText,
  User,
  Settings,
  BarChart,
  AlertTriangle,
  CheckCircle,
  XCircle,
  UserPlus,
  Database,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

function AdminDashboard() {
  const { user } = useSelector((state) => state.auth)
  const [adminData, setAdminData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, fetch admin data from API
    // For now, using mock data
    setTimeout(() => {
      setAdminData({
        totalUsers: 256,
        totalClubs: 24,
        totalPlayers: 420,
        pendingApprovals: 15,
        recentUsers: [
          {
            name: "James Omondi",
            email: "james.omondi@example.com",
            role: "player",
            joinDate: "2 days ago",
            image: "/placeholder.svg",
          },
          {
            name: "Sarah Wanjiku",
            email: "sarah.wanjiku@example.com",
            role: "scout",
            joinDate: "3 days ago",
            image: "/placeholder.svg",
          },
          {
            name: "David Ochieng",
            email: "david.ochieng@example.com",
            role: "clubManager",
            joinDate: "1 week ago",
            image: "/placeholder.svg",
          },
        ],
        pendingTransfers: [
          {
            player: "Michael Otieno",
            fromClub: "Nairobi FC",
            toClub: "Eldoret City",
            value: 400000,
            status: "pending",
          },
          {
            player: "John Kamau",
            fromClub: "Mombasa United",
            toClub: "Nakuru FC",
            value: 320000,
            status: "pending",
          },
        ],
        systemAlerts: [
          {
            title: "Database Backup Completed",
            description: "Daily backup completed successfully",
            type: "success",
            time: "2 hours ago",
          },
          {
            title: "High Server Load",
            description: "Server load reached 85% during peak hours",
            type: "warning",
            time: "1 day ago",
          },
          {
            title: "New Version Available",
            description: "System update v2.3.1 is available for installation",
            type: "info",
            time: "2 days ago",
          },
        ],
        notifications: [
          { id: 1, message: "New user registration requires approval", time: "2 hours ago", read: false },
          { id: 2, message: "System backup completed successfully", time: "1 day ago", read: true },
          { id: 3, message: "Transfer dispute reported by Nairobi FC", time: "2 days ago", read: false },
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
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">System overview and management</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button asChild variant="outline">
              <Link to="/admin/settings">
                <Settings className="mr-2 h-4 w-4" /> System Settings
              </Link>
            </Button>
            <Button>
              <FileText className="mr-2 h-4 w-4" /> Generate Reports
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Admin Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 rounded-full mr-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <p className="text-xl font-bold">{adminData.totalUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-50 rounded-full mr-4">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Clubs</p>
                <p className="text-xl font-bold">{adminData.totalClubs}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-amber-50 rounded-full mr-4">
                <User className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Players</p>
                <p className="text-xl font-bold">{adminData.totalPlayers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-50 rounded-full mr-4">
                <UserCheck className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Approvals</p>
                <p className="text-xl font-bold">{adminData.pendingApprovals}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Users */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>New user registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {adminData.recentUsers.map((user, index) => (
                  <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarImage src={user.image || "/placeholder.svg"} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant="outline"
                            className={`${
                              user.role === "player"
                                ? "bg-blue-50 text-blue-600 border-blue-200"
                                : user.role === "scout"
                                  ? "bg-green-50 text-green-600 border-green-200"
                                  : "bg-purple-50 text-purple-600 border-purple-200"
                            }`}
                          >
                            {user.role === "clubManager"
                              ? "Club Manager"
                              : user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">Joined {user.joinDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                  <Link to="/admin/users">Manage Users</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Pending Transfers */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Transfers</CardTitle>
              <CardDescription>Transfers requiring approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {adminData.pendingTransfers.map((transfer, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-medium">{transfer.player}</p>
                        <div className="flex items-center mt-1">
                          <p className="text-sm text-gray-500">
                            {transfer.fromClub} → {transfer.toClub}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                        Pending Approval
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="font-medium">${(transfer.value / 1000).toFixed(0)}k</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600 border-green-200 hover:bg-green-50"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" /> Approve
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                          <XCircle className="h-4 w-4 mr-1" /> Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                  <Link to="/admin/transfers">View All Transfers</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* System Analytics */}
          <Card>
            <CardHeader>
              <CardTitle>System Analytics</CardTitle>
              <CardDescription>Platform usage statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="users">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="users">User Activity</TabsTrigger>
                  <TabsTrigger value="transfers">Transfers</TabsTrigger>
                  <TabsTrigger value="system">System Load</TabsTrigger>
                </TabsList>
                <TabsContent value="users" className="mt-4">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">New Registrations (Last 7 days)</span>
                        <span className="text-sm font-medium">32</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Active Users (Daily)</span>
                        <span className="text-sm font-medium">128</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">User Retention Rate</span>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="transfers" className="mt-4">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Completed Transfers (This Month)</span>
                        <span className="text-sm font-medium">18</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Pending Transfers</span>
                        <span className="text-sm font-medium">12</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Total Transfer Value</span>
                        <span className="text-sm font-medium">$3.2M</span>
                      </div>
                      <Progress value={70} className="h-2" />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="system" className="mt-4">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">CPU Usage</span>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Memory Usage</span>
                        <span className="text-sm font-medium">62%</span>
                      </div>
                      <Progress value={62} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Database Storage</span>
                        <span className="text-sm font-medium">38%</span>
                      </div>
                      <Progress value={38} className="h-2" />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                  <Link to="/admin/analytics">View Detailed Analytics</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Admin Profile Card */}
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
                <p className="text-gray-500 mb-4">System Administrator</p>
                <div className="flex justify-center space-x-2 mb-4">
                  <Badge variant="outline" className="bg-gray-50">
                    Full Access
                  </Badge>
                </div>
                <Button className="w-full" asChild>
                  <Link to="/profile/edit">Edit Profile</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* System Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {adminData.systemAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg flex items-start ${
                      alert.type === "success" ? "bg-green-50" : alert.type === "warning" ? "bg-amber-50" : "bg-blue-50"
                    }`}
                  >
                    {alert.type === "success" ? (
                      <CheckCircle className="h-5 w-5 mr-3 mt-0.5 text-green-500" />
                    ) : alert.type === "warning" ? (
                      <AlertTriangle className="h-5 w-5 mr-3 mt-0.5 text-amber-500" />
                    ) : (
                      <Bell className="h-5 w-5 mr-3 mt-0.5 text-blue-500" />
                    )}
                    <div>
                      <p className="font-medium">{alert.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="ghost" size="sm" className="text-sm" asChild>
                  <Link to="/admin/alerts">View All Alerts</Link>
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
                {adminData.notifications.map((notification) => (
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
                  <Link to="/admin/users/add">
                    <UserPlus className="mr-2 h-4 w-4" /> Add User
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/admin/clubs/add">
                    <Shield className="mr-2 h-4 w-4" /> Add Club
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/admin/database">
                    <Database className="mr-2 h-4 w-4" /> Database Management
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/admin/reports">
                    <BarChart className="mr-2 h-4 w-4" /> Generate Reports
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

export default AdminDashboard
