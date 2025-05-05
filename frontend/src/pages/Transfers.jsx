"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { ArrowLeftRight, Filter, Search, CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { fetchTransfers, createTransfer, resetTransferState } from "../store/slices/transferSlice"
import { fetchPlayers } from "../store/slices/playerSlice"
import { fetchClubs } from "../store/slices/clubSlice"

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
import { toast } from "../components/ui/use-toast"

function Transfers() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { transfers, isLoading, error, success, pagination } = useSelector((state) => state.transfers)
  const { players } = useSelector((state) => state.players)
  const { clubs } = useSelector((state) => state.clubs)

  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Form state for creating a transfer
  const [formData, setFormData] = useState({
    player: "",
    fromClub: "",
    toClub: "",
    transferType: "permanent",
    askingPrice: "",
  })

  useEffect(() => {
    dispatch(
      fetchTransfers({ page: currentPage, limit: 10, status: statusFilter !== "all" ? statusFilter : undefined }),
    )
  }, [dispatch, currentPage, statusFilter])

  useEffect(() => {
    if (user && (user.role === "clubManager" || user.role === "agent" || user.role === "admin")) {
      dispatch(fetchPlayers({ limit: 100 }))
      dispatch(fetchClubs({ limit: 100 }))
    }
  }, [dispatch, user])

  useEffect(() => {
    if (success) {
      toast({
        title: "Success",
        description: "Transfer request has been created successfully.",
        variant: "success",
      })
      setIsDialogOpen(false)
      setFormData({
        player: "",
        fromClub: "",
        toClub: "",
        transferType: "permanent",
        askingPrice: "",
      })
      dispatch(resetTransferState())
    }
  }, [success, dispatch])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.player || !formData.fromClub || !formData.toClub || !formData.askingPrice) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    dispatch(
      createTransfer({
        player: formData.player,
        fromClub: formData.fromClub,
        toClub: formData.toClub,
        transferType: formData.transferType,
        askingPrice: Number(formData.askingPrice),
      }),
    )
  }

  // Filter transfers based on search query
  const filteredTransfers = transfers.filter((transfer) => {
    const matchesSearch =
      searchQuery === "" ||
      transfer.player?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transfer.player?.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transfer.fromClub?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transfer.toClub?.name?.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesSearch
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

  if (isLoading && transfers.length === 0) {
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
          <Button onClick={() => dispatch(fetchTransfers())}>Try Again</Button>
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
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>Initiate Transfer</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Initiate New Transfer</DialogTitle>
                  <DialogDescription>Start a new player transfer process. Fill in the details below.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="player" className="text-right">
                        Player
                      </Label>
                      <div className="col-span-3">
                        <Select value={formData.player} onValueChange={(value) => handleSelectChange("player", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select player" />
                          </SelectTrigger>
                          <SelectContent>
                            {players && players.length > 0 ? (
                              players.map((player) => (
                                <SelectItem key={player._id} value={player._id}>
                                  {player.firstName} {player.lastName}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="loading" disabled>
                                Loading players...
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="fromClub" className="text-right">
                        From Club
                      </Label>
                      <div className="col-span-3">
                        <Select
                          value={formData.fromClub}
                          onValueChange={(value) => handleSelectChange("fromClub", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select club" />
                          </SelectTrigger>
                          <SelectContent>
                            {clubs && clubs.length > 0 ? (
                              clubs.map((club) => (
                                <SelectItem key={club._id} value={club._id}>
                                  {club.name}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="loading" disabled>
                                Loading clubs...
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="toClub" className="text-right">
                        To Club
                      </Label>
                      <div className="col-span-3">
                        <Select value={formData.toClub} onValueChange={(value) => handleSelectChange("toClub", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select club" />
                          </SelectTrigger>
                          <SelectContent>
                            {clubs && clubs.length > 0 ? (
                              clubs.map((club) => (
                                <SelectItem key={club._id} value={club._id}>
                                  {club.name}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="loading" disabled>
                                Loading clubs...
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="transferType" className="text-right">
                        Type
                      </Label>
                      <div className="col-span-3">
                        <Select
                          value={formData.transferType}
                          onValueChange={(value) => handleSelectChange("transferType", value)}
                        >
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
                          <Input
                            id="askingPrice"
                            name="askingPrice"
                            type="number"
                            className="pl-8"
                            placeholder="0"
                            value={formData.askingPrice}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Submitting..." : "Submit Transfer Request"}
                    </Button>
                  </DialogFooter>
                </form>
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
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
                  key={transfer._id}
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
                          <AvatarImage src={transfer.player?.coverImage || "/placeholder.svg"} />
                          <AvatarFallback>
                            {transfer.player?.firstName?.charAt(0)}
                            {transfer.player?.lastName?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-bold">
                            {transfer.player?.firstName} {transfer.player?.lastName}
                          </h3>
                          <p className="text-sm text-gray-500">{transfer.player?.position}</p>
                        </div>
                      </div>
                      {getStatusBadge(transfer.status)}
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">From</p>
                        <div className="flex flex-col items-center">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={transfer.fromClub?.logo || "/placeholder.svg"} />
                            <AvatarFallback>{transfer.fromClub?.name?.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <p className="text-sm mt-1">{transfer.fromClub?.name}</p>
                        </div>
                      </div>

                      <ArrowLeftRight className="text-gray-400" />

                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">To</p>
                        <div className="flex flex-col items-center">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={transfer.toClub?.logo || "/placeholder.svg"} />
                            <AvatarFallback>{transfer.toClub?.name?.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <p className="text-sm mt-1">{transfer.toClub?.name}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Asking Price</p>
                        <p className="font-semibold">${transfer.askingPrice?.toLocaleString()}</p>
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
                        <Link to={`/transfers/${transfer._id}`}>View Details</Link>
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
                        <tr key={transfer._id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={transfer.player?.coverImage || "/placeholder.svg"} />
                                <AvatarFallback>
                                  {transfer.player?.firstName?.charAt(0)}
                                  {transfer.player?.lastName?.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">
                                  {transfer.player?.firstName} {transfer.player?.lastName}
                                </p>
                                <p className="text-xs text-gray-500">{transfer.player?.position}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">{transfer.fromClub?.name}</td>
                          <td className="py-3 px-4">{transfer.toClub?.name}</td>
                          <td className="py-3 px-4 capitalize">{transfer.transferType}</td>
                          <td className="py-3 px-4">${transfer.askingPrice?.toLocaleString()}</td>
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
                              <Link to={`/transfers/${transfer._id}`}>View</Link>
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

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {[...Array(pagination.pages)].map((_, index) => (
              <Button
                key={index}
                variant={currentPage === index + 1 ? "default" : "outline"}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pagination.pages))}
              disabled={currentPage === pagination.pages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Transfers
