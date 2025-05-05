"use client"

import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { User, MapPin, Calendar, TrendingUp, Clock, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { setSelectedPlayer, setLoading, setError } from "../store/slices/playerSlice"

// Import ShadCN components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Progress } from "../components/ui/progress"
import { Separator } from "../components/ui/separator"
import { Button } from "../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"

// Import chart components
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

function PlayerProfile() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { selectedPlayer, isLoading, error } = useSelector((state) => state.players)
  const { user } = useSelector((state) => state.auth)

  // Mock data for charts
  const performanceData = [
    { month: "Jan", goals: 2, assists: 1, rating: 7.2 },
    { month: "Feb", goals: 1, assists: 3, rating: 7.5 },
    { month: "Mar", goals: 3, assists: 0, rating: 8.1 },
    { month: "Apr", goals: 0, assists: 2, rating: 6.8 },
    { month: "May", goals: 2, assists: 2, rating: 7.9 },
    { month: "Jun", goals: 1, assists: 1, rating: 7.3 },
  ]

  const marketValueData = [
    { year: "2020", value: 150000 },
    { year: "2021", value: 220000 },
    { year: "2022", value: 280000 },
    { year: "2023", value: 350000 },
    { year: "2024", value: 420000 },
  ]

  useEffect(() => {
    const fetchPlayerData = async () => {
      if (!id) return

      dispatch(setLoading(true))
      try {
        const response = await fetch(`/api/players/${id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch player data")
        }

        const data = await response.json()
        dispatch(setSelectedPlayer(data))
      } catch (err) {
        dispatch(setError(err.message))
      } finally {
        dispatch(setLoading(false))
      }
    }

    fetchPlayerData()
  }, [id, dispatch])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-kenya-green"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button asChild variant="outline">
            <Link to="/players">Back to Players</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (!selectedPlayer) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <p className="mb-4">Player not found</p>
          <Button asChild variant="outline">
            <Link to="/players">Back to Players</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const playerAge = calculateAge(selectedPlayer.dateOfBirth)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back button */}
      <div className="mb-6">
        <Button variant="ghost" asChild className="flex items-center gap-2">
          <Link to="/players">
            <ArrowLeft size={16} />
            <span>Back to Players</span>
          </Link>
        </Button>
      </div>

      {/* Player Header */}
      <motion.div
        className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="h-48 bg-gradient-to-r from-kenya-green to-kenya-green/70 relative">
          {selectedPlayer.coverImage && (
            <img
              src={selectedPlayer.coverImage || "/placeholder.svg"}
              alt="Cover"
              className="w-full h-full object-cover opacity-30"
            />
          )}
          <div className="absolute bottom-0 left-0 w-full p-6 text-white">
            <div className="flex items-end gap-4">
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                <AvatarImage src={selectedPlayer.user?.profileImage || "/placeholder.svg"} />
                <AvatarFallback className="bg-kenya-green text-white text-2xl">
                  {selectedPlayer.firstName?.charAt(0)}
                  {selectedPlayer.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold">
                  {selectedPlayer.firstName} {selectedPlayer.lastName}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="bg-white/20">
                    {selectedPlayer.position}
                  </Badge>
                  {selectedPlayer.currentClub && (
                    <Badge variant="outline" className="bg-white/20 border-white/40">
                      {selectedPlayer.currentClub.name}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <User className="text-kenya-green" size={18} />
              <div>
                <p className="text-sm text-gray-500">Age</p>
                <p className="font-semibold">{playerAge} years</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="text-kenya-green" size={18} />
              <div>
                <p className="text-sm text-gray-500">Nationality</p>
                <p className="font-semibold">{selectedPlayer.nationality}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="text-kenya-green" size={18} />
              <div>
                <p className="text-sm text-gray-500">Contract Until</p>
                <p className="font-semibold">
                  {selectedPlayer.contractEndDate
                    ? new Date(selectedPlayer.contractEndDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                      })
                    : "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="text-kenya-green" size={18} />
              <div>
                <p className="text-sm text-gray-500">Market Value</p>
                <p className="font-semibold">${(selectedPlayer.marketValue / 1000).toFixed(0)}k</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="career">Career</TabsTrigger>
          <TabsTrigger value="market">Market Value</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Bio Card */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Player Bio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {selectedPlayer.bio ||
                    `${selectedPlayer.firstName} ${selectedPlayer.lastName} is a ${selectedPlayer.position} 
                    currently playing for ${selectedPlayer.currentClub?.name || "a club"} in Kenya.`}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Height</p>
                    <p className="font-semibold">{selectedPlayer.height ? `${selectedPlayer.height} cm` : "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Weight</p>
                    <p className="font-semibold">{selectedPlayer.weight ? `${selectedPlayer.weight} kg` : "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Preferred Foot</p>
                    <p className="font-semibold">{selectedPlayer.preferredFoot || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Jersey Number</p>
                    <p className="font-semibold">{selectedPlayer.jerseyNumber || "N/A"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills Card */}
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedPlayer.skills && selectedPlayer.skills.length > 0 ? (
                  selectedPlayer.skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm font-medium">{skill.rating}/100</span>
                      </div>
                      <Progress value={skill.rating} className="h-2" />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">No skills data available</div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Performance Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Recent match performances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="goals" stroke="#15803D" activeDot={{ r: 8 }} />
                    <Line yAxisId="left" type="monotone" dataKey="assists" stroke="#EF4444" />
                    <Line yAxisId="right" type="monotone" dataKey="rating" stroke="#000000" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Statistics Tab */}
        <TabsContent value="stats" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Season Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedPlayer.statistics && selectedPlayer.statistics.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Season</th>
                        <th className="text-center py-3 px-4">Appearances</th>
                        <th className="text-center py-3 px-4">Goals</th>
                        <th className="text-center py-3 px-4">Assists</th>
                        <th className="text-center py-3 px-4">Minutes</th>
                        <th className="text-center py-3 px-4">Yellow Cards</th>
                        <th className="text-center py-3 px-4">Red Cards</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPlayer.statistics.map((stat, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{stat.season}</td>
                          <td className="text-center py-3 px-4">{stat.appearances}</td>
                          <td className="text-center py-3 px-4">{stat.goals}</td>
                          <td className="text-center py-3 px-4">{stat.assists}</td>
                          <td className="text-center py-3 px-4">{stat.minutesPlayed}</td>
                          <td className="text-center py-3 px-4">{stat.yellowCards}</td>
                          <td className="text-center py-3 px-4">{stat.redCards}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">No statistics available for this player</div>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Goals & Assists</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="goals" fill="#15803D" name="Goals" />
                      <Bar dataKey="assists" fill="#EF4444" name="Assists" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Ratings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="rating" stroke="#000000" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Career Tab */}
        <TabsContent value="career" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Career History</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedPlayer.careerHistory && selectedPlayer.careerHistory.length > 0 ? (
                <div className="relative pl-8 border-l-2 border-kenya-green space-y-8 py-4">
                  {selectedPlayer.careerHistory.map((history, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-10 w-6 h-6 rounded-full bg-kenya-green flex items-center justify-center">
                        <Clock className="h-3 w-3 text-white" />
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold">{history.club?.name || "Unknown Club"}</h3>
                            <p className="text-sm text-gray-600">
                              {new Date(history.startDate).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                              })}{" "}
                              -
                              {history.endDate
                                ? new Date(history.endDate).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                  })
                                : " Present"}
                            </p>
                          </div>
                          {history.loanSpell && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                              Loan
                            </Badge>
                          )}
                        </div>
                        {history.transferFee && (
                          <p className="mt-2 text-sm">
                            <span className="font-medium">Transfer Fee:</span> ${history.transferFee.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">No career history available for this player</div>
              )}
            </CardContent>
          </Card>

          {/* Injuries History */}
          <Card>
            <CardHeader>
              <CardTitle>Injury History</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedPlayer.injuries && selectedPlayer.injuries.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Injury</th>
                        <th className="text-left py-3 px-4">Start Date</th>
                        <th className="text-left py-3 px-4">End Date</th>
                        <th className="text-left py-3 px-4">Duration</th>
                        <th className="text-left py-3 px-4">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPlayer.injuries.map((injury, index) => {
                        const startDate = new Date(injury.startDate)
                        const endDate = injury.endDate ? new Date(injury.endDate) : new Date()
                        const durationDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))

                        return (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium">{injury.injury}</td>
                            <td className="py-3 px-4">
                              {startDate.toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </td>
                            <td className="py-3 px-4">
                              {injury.endDate
                                ? endDate.toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })
                                : "Ongoing"}
                            </td>
                            <td className="py-3 px-4">{durationDays} days</td>
                            <td className="py-3 px-4">{injury.description || "-"}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">No injury history available for this player</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Market Value Tab */}
        <TabsContent value="market" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Market Value Progression</CardTitle>
              <CardDescription>Historical market value over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={marketValueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Market Value"]} />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#15803D" activeDot={{ r: 8 }} name="Market Value" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Contract Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Current Club</span>
                    <span className="font-semibold">{selectedPlayer.currentClub?.name || "N/A"}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Contract Start</span>
                    <span className="font-semibold">
                      {selectedPlayer.contractStartDate
                        ? new Date(selectedPlayer.contractStartDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                          })
                        : "N/A"}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Contract End</span>
                    <span className="font-semibold">
                      {selectedPlayer.contractEndDate
                        ? new Date(selectedPlayer.contractEndDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                          })
                        : "N/A"}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Market Value</span>
                    <span className="font-semibold text-kenya-green">
                      ${selectedPlayer.marketValue?.toLocaleString() || "N/A"}
                    </span>
                  </div>
                </div>

                {/* CTA for scouts/agents */}
                {user && (user.role === "scout" || user.role === "agent" || user.role === "clubManager") && (
                  <div className="mt-8">
                    <Button className="w-full">Initiate Transfer Inquiry</Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Valuation Factors</CardTitle>
                <CardDescription>Elements affecting player's market value</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Age Factor</span>
                      <span className="text-sm font-medium">
                        {playerAge < 23 ? "Positive" : playerAge > 30 ? "Negative" : "Neutral"}
                      </span>
                    </div>
                    <Progress value={playerAge < 23 ? 80 : playerAge > 30 ? 40 : 60} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Performance</span>
                      <span className="text-sm font-medium">Strong</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Contract Length</span>
                      <span className="text-sm font-medium">
                        {selectedPlayer.contractEndDate
                          ? `${Math.ceil((new Date(selectedPlayer.contractEndDate) - new Date()) / (1000 * 60 * 60 * 24 * 30))} months`
                          : "N/A"}
                      </span>
                    </div>
                    <Progress
                      value={
                        selectedPlayer.contractEndDate
                          ? Math.min(
                              100,
                              Math.ceil(
                                ((new Date(selectedPlayer.contractEndDate) - new Date()) / (1000 * 60 * 60 * 24 * 30)) *
                                  2,
                              ),
                            )
                          : 50
                      }
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Position Value</span>
                      <span className="text-sm font-medium">
                        {["Striker", "Attacking Midfielder"].includes(selectedPlayer.position)
                          ? "High"
                          : ["Goalkeeper"].includes(selectedPlayer.position)
                            ? "Moderate"
                            : "Standard"}
                      </span>
                    </div>
                    <Progress
                      value={
                        ["Striker", "Attacking Midfielder"].includes(selectedPlayer.position)
                          ? 85
                          : ["Goalkeeper"].includes(selectedPlayer.position)
                            ? 65
                            : 75
                      }
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default PlayerProfile
