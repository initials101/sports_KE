"use client"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { motion } from "framer-motion"
import { Search, Filter, MapPin, Star, Mail, Phone, MessageSquare } from "lucide-react"
import { Link } from "react-router-dom"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Textarea } from "../components/ui/textarea"
import { Label } from "../components/ui/label"

function ScoutNetwork() {
  const { user } = useSelector((state) => state.auth)
  const [scouts, setScouts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [regionFilter, setRegionFilter] = useState("all")

  // Mock data for scouts
  const mockScouts = [
    {
      id: "1",
      name: "John Kamau",
      email: "john.kamau@example.com",
      phone: "+254 712 345 678",
      profileImage:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      region: "Nairobi",
      specialization: "Youth Talent",
      experience: 8,
      rating: 4.8,
      bio: "Experienced scout with a keen eye for young talent. Specializes in identifying promising players from grassroots football.",
      discoveredPlayers: 24,
      successfulTransfers: 12,
    },
    {
      id: "2",
      name: "Sarah Wanjiku",
      email: "sarah.wanjiku@example.com",
      phone: "+254 723 456 789",
      profileImage:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      region: "Mombasa",
      specialization: "Goalkeepers",
      experience: 5,
      rating: 4.5,
      bio: "Former professional goalkeeper turned scout. Expert in identifying and developing goalkeeper talent across the coastal region.",
      discoveredPlayers: 15,
      successfulTransfers: 8,
    },
    {
      id: "3",
      name: "David Ochieng",
      email: "david.ochieng@example.com",
      phone: "+254 734 567 890",
      profileImage:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      region: "Kisumu",
      specialization: "Attacking Talent",
      experience: 10,
      rating: 4.9,
      bio: "Veteran scout with extensive networks across Western Kenya. Specializes in identifying creative attacking players with goal-scoring abilities.",
      discoveredPlayers: 32,
      successfulTransfers: 18,
    },
    {
      id: "4",
      name: "Grace Muthoni",
      email: "grace.muthoni@example.com",
      phone: "+254 745 678 901",
      profileImage:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      region: "Nakuru",
      specialization: "Defensive Talent",
      experience: 7,
      rating: 4.6,
      bio: "Focuses on identifying strong, tactically aware defenders. Has a network of contacts throughout the Rift Valley region.",
      discoveredPlayers: 19,
      successfulTransfers: 11,
    },
    {
      id: "5",
      name: "James Kiprop",
      email: "james.kiprop@example.com",
      phone: "+254 756 789 012",
      profileImage:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      region: "Eldoret",
      specialization: "Endurance Athletes",
      experience: 12,
      rating: 4.7,
      bio: "Specializes in identifying players with exceptional physical attributes and endurance. Works extensively with youth academies in the North Rift.",
      discoveredPlayers: 28,
      successfulTransfers: 15,
    },
  ]

  useEffect(() => {
    // Simulate API call to fetch scouts
    const fetchScouts = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/scouts');
        // const data = await response.json();

        // Using mock data for now
        setTimeout(() => {
          setScouts(mockScouts)
          setIsLoading(false)
        }, 1000)
      } catch (err) {
        setError("Failed to fetch scouts")
        setIsLoading(false)
      }
    }

    fetchScouts()
  }, [])

  // Filter scouts based on region and search query
  const filteredScouts = scouts.filter((scout) => {
    const matchesRegion = regionFilter === "all" || scout.region === regionFilter
    const matchesSearch =
      searchQuery === "" ||
      scout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scout.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scout.region.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesRegion && matchesSearch
  })

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
      {/* Scout Network Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-3xl font-bold text-kenya-black">Scout Network</h1>
          <p className="text-gray-600">Connect with professional scouts across Kenya</p>
        </motion.div>

        {/* Only show for players */}
        {user && user.role === "player" && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Button>Find a Scout</Button>
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
              placeholder="Search scouts by name, specialization, or region..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500" />
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="Nairobi">Nairobi</SelectItem>
                <SelectItem value="Mombasa">Mombasa</SelectItem>
                <SelectItem value="Kisumu">Kisumu</SelectItem>
                <SelectItem value="Nakuru">Nakuru</SelectItem>
                <SelectItem value="Eldoret">Eldoret</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Scouts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScouts.length > 0 ? (
          filteredScouts.map((scout) => (
            <motion.div
              key={scout.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={scout.profileImage || "/placeholder.svg"} />
                      <AvatarFallback>{scout.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold">{scout.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin size={14} />
                        <span>{scout.region}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{scout.rating}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <Badge variant="outline" className="bg-gray-50">
                    {scout.specialization}
                  </Badge>
                  <Badge variant="outline" className="bg-gray-50 ml-2">
                    {scout.experience} years exp.
                  </Badge>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{scout.bio}</p>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-gray-50 p-2 rounded-lg text-center">
                    <p className="text-xs text-gray-500">Discovered</p>
                    <p className="font-semibold">{scout.discoveredPlayers} players</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg text-center">
                    <p className="text-xs text-gray-500">Transfers</p>
                    <p className="font-semibold">{scout.successfulTransfers} successful</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <MessageSquare size={14} />
                        <span>Contact</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Contact {scout.name}</DialogTitle>
                        <DialogDescription>Send a message to connect with this scout.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                          <Avatar>
                            <AvatarImage src={scout.profileImage || "/placeholder.svg"} />
                            <AvatarFallback>{scout.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{scout.name}</p>
                            <p className="text-sm text-gray-500">{scout.specialization}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <Mail size={16} className="text-gray-500" />
                            <span className="text-sm">{scout.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone size={16} className="text-gray-500" />
                            <span className="text-sm">{scout.phone}</span>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="message">Your message</Label>
                          <Textarea id="message" placeholder="Write your message here..." className="mt-1" rows={5} />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Send Message</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/scouts/${scout.id}`}>View Profile</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No scouts found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ScoutNetwork
