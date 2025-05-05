"use client"

import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { ArrowLeft, MapPin, Star, Mail, Phone, MessageSquare, Calendar, Award, Users } from "lucide-react"
import { fetchScoutById, connectWithScout } from "../store/slices/scoutSlice"

// Import ShadCN components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
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

function ScoutProfile() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { scout, isLoading, error, connectionStatus } = useSelector((state) => state.scouts)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchScoutById(id))
  }, [dispatch, id])

  const handleConnect = () => {
    dispatch(connectWithScout(id))
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
          <Button asChild variant="outline">
            <Link to="/scout-network">Back to Scout Network</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (!scout) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <p className="mb-4">Scout not found</p>
          <Button asChild variant="outline">
            <Link to="/scout-network">Back to Scout Network</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back button */}
      <div className="mb-6">
        <Button variant="ghost" asChild className="flex items-center gap-2">
          <Link to="/scout-network">
            <ArrowLeft size={16} />
            <span>Back to Scout Network</span>
          </Link>
        </Button>
      </div>

      {/* Scout Header */}
      <motion.div
        className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="h-48 bg-gradient-to-r from-kenya-green to-kenya-green/70 relative">
          <div className="absolute bottom-0 left-0 w-full p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div className="flex items-end gap-4">
                <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                  <AvatarImage src={scout.profileImage || "/placeholder.svg"} />
                  <AvatarFallback className="bg-kenya-green text-white text-2xl">
                    {scout.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold">{scout.name}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="bg-white/20">
                      {scout.scoutProfile?.specialization || "Scout"}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{scout.scoutProfile?.rating || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {user && user._id !== scout._id && (
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="bg-white/20 border-white/40 text-white hover:bg-white/30">
                        <MessageSquare className="mr-2 h-4 w-4" /> Message
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
                            <AvatarFallback>{scout.name?.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{scout.name}</p>
                            <p className="text-sm text-gray-500">{scout.scoutProfile?.specialization}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <Mail size={16} className="text-gray-500" />
                            <span className="text-sm">{scout.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone size={16} className="text-gray-500" />
                            <span className="text-sm">{scout.scoutProfile?.phone || "N/A"}</span>
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

                  <Button onClick={handleConnect} disabled={connectionStatus === "sent"}>
                    <Users className="mr-2 h-4 w-4" />
                    {connectionStatus === "sent" ? "Request Sent" : "Connect"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="text-kenya-green" size={18} />
              <div>
                <p className="text-sm text-gray-500">Region</p>
                <p className="font-semibold">{scout.scoutProfile?.region || "N/A"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="text-kenya-green" size={18} />
              <div>
                <p className="text-sm text-gray-500">Experience</p>
                <p className="font-semibold">{scout.scoutProfile?.experience || "N/A"} years</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Award className="text-kenya-green" size={18} />
              <div>
                <p className="text-sm text-gray-500">Discovered Players</p>
                <p className="font-semibold">{scout.scoutProfile?.discoveredPlayers?.length || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Scout Bio */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              {scout.scoutProfile?.bio ||
                `${scout.name} is a professional scout with ${scout.scoutProfile?.experience || "several"} years of experience in identifying football talent across Kenya.`}
            </p>

            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-4">Specializations</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-gray-50">
                  {scout.scoutProfile?.specialization || "Talent Scouting"}
                </Badge>
                {scout.scoutProfile?.specialization === "Youth Talent" && (
                  <Badge variant="outline" className="bg-gray-50">
                    Youth Development
                  </Badge>
                )}
                {scout.scoutProfile?.specialization === "Goalkeepers" && (
                  <Badge variant="outline" className="bg-gray-50">
                    Goalkeeper Training
                  </Badge>
                )}
                <Badge variant="outline" className="bg-gray-50">
                  Player Assessment
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Discovered Players</span>
                <span className="text-sm font-medium">{scout.scoutProfile?.discoveredPlayers?.length || 0}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-kenya-green rounded-full"
                  style={{ width: `${Math.min(100, (scout.scoutProfile?.discoveredPlayers?.length || 0) * 4)}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Successful Transfers</span>
                <span className="text-sm font-medium">{scout.scoutProfile?.successfulTransfers?.length || 0}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-kenya-green rounded-full"
                  style={{ width: `${Math.min(100, (scout.scoutProfile?.successfulTransfers?.length || 0) * 8)}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Rating</span>
                <span className="text-sm font-medium">{scout.scoutProfile?.rating || 0}/5</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-kenya-green rounded-full"
                  style={{ width: `${((scout.scoutProfile?.rating || 0) / 5) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Experience</span>
                <span className="text-sm font-medium">{scout.scoutProfile?.experience || 0} years</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-kenya-green rounded-full"
                  style={{ width: `${Math.min(100, (scout.scoutProfile?.experience || 0) * 10)}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Discovered Players */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Discovered Players</CardTitle>
          <CardDescription>Players discovered and developed by this scout</CardDescription>
        </CardHeader>
        <CardContent>
          {scout.scoutProfile?.discoveredPlayers && scout.scoutProfile.discoveredPlayers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scout.scoutProfile.discoveredPlayers.map((player) => (
                <div key={player._id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Avatar>
                    <AvatarImage src={player.coverImage || "/placeholder.svg"} />
                    <AvatarFallback>
                      {player.firstName?.charAt(0)}
                      {player.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">
                      {player.firstName} {player.lastName}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">{player.position}</p>
                      <Badge variant="outline" className="text-xs">
                        {player.currentClub?.name || "Free Agent"}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">No discovered players available</div>
          )}
        </CardContent>
      </Card>

      {/* Reviews */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
          <CardDescription>What others say about this scout</CardDescription>
        </CardHeader>
        <CardContent>
          {scout.scoutProfile?.reviews && scout.scoutProfile.reviews.length > 0 ? (
            <div className="space-y-6">
              {scout.scoutProfile.reviews.map((review, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{review.user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{review.user?.name || "Anonymous"}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="ml-auto flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">No reviews available</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ScoutProfile
