"use client"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { motion } from "framer-motion"
import { ArrowLeftRight, Filter, Search, CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react"
import { Link } from "react-router-dom"

// Import ShadCN components
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"

function Transfers() {
  const { user } = useSelector((state) => state.auth)
  const [transfers, setTransfers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for transfers
  const mockTransfers = [
    {
      id: "1",
      player: {
        id: "101",
        name: "Michael Olunga",
        position: "Striker",
        image:
          "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      fromClub: {
        id: "201",
        name: "Gor Mahia",
        logo: "https://images.pexels.com/photos/3621085/pexels-photo-3621085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      toClub: {
        id: "202",
        name: "AFC Leopards",
        logo: "https://images.pexels.com/photos/3621099/pexels-photo-3621099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      askingPrice: 350000,
      finalPrice: null,
      status: "negotiating",
      transferType: "permanent",
      createdAt: "2023-12-15T10:30:00Z",
    },
    {
      id: "2",
      player: {
        id: "102",
        name: "Victor Wanyama",
        position: "Midfielder",
        image:
          "https://images.pexels.com/photos/3621121/pexels-photo-3621121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      fromClub: {
        id: "203",
        name: "Tusker FC",
        logo: "https://images.pexels.com/photos/3621085/pexels-photo-3621085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      toClub: {
        id: "201",
        name: "Gor Mahia",
        logo: "https://images.pexels.com/photos/3621085/pexels-photo-3621085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      askingPrice: 280000,
      finalPrice: 250000,
      status: "completed",
      transferType: "permanent",
      createdAt: "2023-11-05T14:20:00Z",
    },
    {
      id: "3",
      player: {
        id: "103",
        name: "Jesse Were",
        position: "Forward",
        image:
          "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      fromClub: {
        id: "202",
        name: "AFC Leopards",
        logo: "https://images.pexels.com/photos/3621099/pexels-photo-3621099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      toClub: {
        id: "204",
        name: "Sofapaka",
        logo: "https://images.pexels.com/photos/3621085/pexels-photo-3621085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      askingPrice: 180000,
      finalPrice: null,
      status: "initiated",
      transferType: "loan",
      createdAt: "2023-12-20T09:15:00Z",
    },
    {
      id: "4",
      player: {
        id: "104",
        name: "Eric Johanna",
        position: "Midfielder",
        image:
          "https://images.pexels.com/photos/3621121/pexels-photo-3621121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      fromClub: {
        id: "205",
        name: "Mathare United",
        logo: "https://images.pexels.com/photos/3621085/pexels-photo-3621085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      toClub: {
        id: "203",
        name: "Tusker FC",
        logo: "https://images.pexels.com/photos/3621085/pexels-photo-3621085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      askingPrice: 220000,
      finalPrice: null,
      status: "rejected",
      transferType: "permanent",
      createdAt: "2023-11-28T16:45:00Z",
    },
  ]

  useEffect(() => {
    // Simulate API call to fetch transfers
    const fetchTransfers = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/transfers');
        // const data = await response.json();

        // Using mock data for now
        setTimeout(() => {
          setTransfers(mockTransfers)
          setIsLoading(false)
        }, 1000)
      } catch (err) {
        setError("Failed to fetch transfers")
        setIsLoading(false)
      }
    }

    fetchTransfers()
  }, [])

  // Filter transfers based on status and search query
  const filteredTransfers = transfers.filter((transfer) => {
    const matchesFilter = filter === "all" || transfer.status === filter
    const matchesSearch =
      searchQuery === "" ||
      transfer.player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transfer.fromClub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transfer.toClub.name.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesFilter && matchesSearch
  })

  // Get status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case "initiated":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
            Initiated
          </Badge>
        )
      case "negotiating":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
            Negotiating
          </Badge>
        )
      case "agreed":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
            Agreed
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            Completed
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "initiated":
        return <Clock className="h-5 w-5 text-blue-600" />
      case "negotiating":
        return <ArrowLeftRight className="h-5 w-5 text-amber-600" />
      case "agreed":
        return <AlertCircle className="h-5 w-5 text-purple-600" />
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <AlertCircle className="h-5 w-5" />
    }
  }

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
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Transfers Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-3xl font-bold text-kenya-black">Transfer Market</h1>
          <p className="text-gray-600">Browse and manage player transfers</p>
        </motion.div>

        {/* Only show for club managers, agents, and admins */}
        {user && (user.role === "clubManager" || user.role === "agent" || user.role === "admin") && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Initiate Transfer</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Initiate New Transfer</DialogTitle>
                  <DialogDescription>Start a new player transfer process. Fill in the details below.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="player" className="text-right">
                      Player
                    </Label>
                    <div className="col-span-3">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select player" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="player1">Michael Olunga</SelectItem>
                          <SelectItem value="player2">Victor Wanyama</SelectItem>
                          <SelectItem value="player3">Jesse Were</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="fromClub" className="text-right">
                      From Club
                    </Label>
                    <div className="col-span-3">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select club" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="club1">Gor Mahia</SelectItem>
                          <SelectItem value="club2">AFC Leopards</SelectItem>
                          <SelectItem value="club3">Tusker FC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="toClub" className="text-right">
                      To Club
                    </Label>
                    <div className="col-span-3">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select club" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="club1">Gor Mahia</SelectItem>
                          <SelectItem value="club2">AFC Leopards</SelectItem>
                          <SelectItem value="club3">Tusker FC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="transferType" className="text-right">
                      Type
                    </Label>
                    <div className="col-span-3">
                      <Select defaultValue="permanent">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="permanent">Permanent</SelectItem>
                          <SelectItem value="loan">Loan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="askingPrice" className="text-right">
                      Asking Price
                    </Label>
                    <div className="col-span-3">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <Input id="askingPrice" type="number" className="pl-8" placeholder="0" />
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Submit Transfer Request</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </motion.div>
        )}
      </div>

      {/* Search and Filter */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search transfers..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transfers</SelectItem>
                <SelectItem value="initiated">Initiated</SelectItem>
                <SelectItem value="negotiating">Negotiating</SelectItem>
                <SelectItem value="agreed">Agreed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Transfers List */}
      <Tabs defaultValue="grid" className="w-full">
        <div className="flex justify-end mb-6">
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="grid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTransfers.length > 0 ? (
              filteredTransfers.map((transfer) => (
                <motion.div
                  key={transfer.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={transfer.player.image || "/placeholder.svg"} />
                          <AvatarFallback>{transfer.player.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-bold">{transfer.player.name}</h3>
                          <p className="text-sm text-gray-500">{transfer.player.position}</p>
                        </div>
                      </div>
                      {getStatusBadge(transfer.status)}
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">From</p>
                        <div className="flex flex-col items-center">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={transfer.fromClub.logo || "/placeholder.svg"} />
                            <AvatarFallback>{transfer.fromClub.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <p className="text-sm mt-1">{transfer.fromClub.name}</p>
                        </div>
                      </div>

                      <ArrowLeftRight className="text-gray-400" />

                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">To</p>
                        <div className="flex flex-col items-center">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={transfer.toClub.logo || "/placeholder.svg"} />
                            <AvatarFallback>{transfer.toClub.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <p className="text-sm mt-1">{transfer.toClub.name}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Asking Price</p>
                        <p className="font-semibold">${transfer.askingPrice.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Type</p>
                        <p className="font-semibold capitalize">{transfer.transferType}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500">
                        {new Date(transfer.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <Button variant="outline" asChild>
                        <Link to={`/transfers/${transfer.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No transfers found matching your criteria</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left py-3 px-4">Player</th>
                      <th className="text-left py-3 px-4">From</th>
                      <th className="text-left py-3 px-4">To</th>
                      <th className="text-left py-3 px-4">Type</th>
                      <th className="text-left py-3 px-4">Asking Price</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransfers.length > 0 ? (
                      filteredTransfers.map((transfer) => (
                        <tr key={transfer.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={transfer.player.image || "/placeholder.svg"} />
                                <AvatarFallback>{transfer.player.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{transfer.player.name}</p>
                                <p className="text-xs text-gray-500">{transfer.player.position}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">{transfer.fromClub.name}</td>
                          <td className="py-3 px-4">{transfer.toClub.name}</td>
                          <td className="py-3 px-4 capitalize">{transfer.transferType}</td>
                          <td className="py-3 px-4">${transfer.askingPrice.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(transfer.status)}
                              <span className="capitalize">{transfer.status}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            {new Date(transfer.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/transfers/${transfer.id}`}>View</Link>
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-gray-500">
                          No transfers found matching your criteria
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Transfers
