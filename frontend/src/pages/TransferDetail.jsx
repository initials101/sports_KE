"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowLeftRight, CheckCircle2, Clock, XCircle, AlertCircle, MessageSquare } from "lucide-react"
import {
  fetchTransferById,
  submitNegotiation,
  updateTransferStatus,
  acceptNegotiation,
} from "../store/slices/transferSlice"

// Import ShadCN components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Separator } from "../components/ui/separator"
import { Textarea } from "../components/ui/textarea"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

function TransferDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { transfer, isLoading, error } = useSelector((state) => state.transfers)
  const { user } = useSelector((state) => state.auth)

  const [proposedPrice, setProposedPrice] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    dispatch(fetchTransferById(id))
  }, [dispatch, id])

  const handleSubmitNegotiation = () => {
    if (!proposedPrice) return

    dispatch(
      submitNegotiation({
        id,
        negotiationData: {
          proposedPrice: Number(proposedPrice),
          message,
        },
      }),
    )

    setProposedPrice("")
    setMessage("")
  }

  const handleUpdateStatus = (status) => {
    dispatch(updateTransferStatus({ id, status }))
  }

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
          <Button asChild variant="outline">
            <Link to="/transfers">Back to Transfers</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (!transfer) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <p className="mb-4">Transfer not found</p>
          <Button asChild variant="outline">
            <Link to="/transfers">Back to Transfers</Link>
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
          <Link to="/transfers">
            <ArrowLeft size={16} />
            <span>Back to Transfers</span>
          </Link>
        </Button>
      </div>

      {/* Transfer Header */}
      <motion.div
        className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="h-32 bg-gradient-to-r from-kenya-green to-kenya-green/70 relative">
          <div className="absolute bottom-0 left-0 w-full p-6 text-white">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Transfer Details</h1>
              {getStatusBadge(transfer.status)}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={transfer.player?.coverImage || "/placeholder.svg"} />
                <AvatarFallback className="bg-kenya-green text-white text-xl">
                  {transfer.player?.firstName?.charAt(0)}
                  {transfer.player?.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">
                  {transfer.player?.firstName} {transfer.player?.lastName}
                </h2>
                <p className="text-gray-600">{transfer.player?.position}</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">From</p>
                <div className="flex flex-col items-center">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={transfer.fromClub?.logo || "/placeholder.svg"} />
                    <AvatarFallback>{transfer.fromClub?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="text-sm mt-1">{transfer.fromClub?.name}</p>
                </div>
              </div>

              <ArrowLeftRight className="text-gray-400" />

              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">To</p>
                <div className="flex flex-col items-center">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={transfer.toClub?.logo || "/placeholder.svg"} />
                    <AvatarFallback>{transfer.toClub?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="text-sm mt-1">{transfer.toClub?.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Transfer Details */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Transfer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-y-4">
              <div>
                <p className="text-sm text-gray-500">Transfer Type</p>
                <p className="font-semibold capitalize">{transfer.transferType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <div className="flex items-center gap-2">
                  {getStatusIcon(transfer.status)}
                  <span className="capitalize">{transfer.status}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Asking Price</p>
                <p className="font-semibold">${transfer.askingPrice?.toLocaleString()}</p>
              </div>
              {transfer.finalPrice && (
                <div>
                  <p className="text-sm text-gray-500">Final Price</p>
                  <p className="font-semibold">${transfer.finalPrice?.toLocaleString()}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500">Initiated On</p>
                <p className="font-semibold">
                  {new Date(transfer.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              {transfer.completedAt && (
                <div>
                  <p className="text-sm text-gray-500">Completed On</p>
                  <p className="font-semibold">
                    {new Date(transfer.completedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              )}
            </div>

            {/* Actions for club managers */}
            {user &&
              (user.role === "clubManager" || user.role === "admin") &&
              transfer.status !== "completed" &&
              transfer.status !== "rejected" && (
                <div className="mt-8 flex flex-wrap gap-4">
                  {transfer.status === "agreed" && (
                    <Button onClick={() => handleUpdateStatus("completed")}>
                      <CheckCircle2 className="mr-2 h-4 w-4" /> Complete Transfer
                    </Button>
                  )}
                  <Button variant="outline" onClick={() => handleUpdateStatus("rejected")}>
                    <XCircle className="mr-2 h-4 w-4" /> Reject Transfer
                  </Button>
                </div>
              )}
          </CardContent>
        </Card>

        {/* Player Market Value */}
        <Card>
          <CardHeader>
            <CardTitle>Player Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Current Market Value</p>
                <p className="text-2xl font-bold text-kenya-green">
                  ${transfer.player?.marketValue?.toLocaleString() || "N/A"}
                </p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-gray-500">Age</p>
                <p className="font-semibold">{transfer.player?.age || "N/A"} years</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-gray-500">Contract Until</p>
                <p className="font-semibold">
                  {transfer.player?.contractEndDate
                    ? new Date(transfer.player.contractEndDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                      })
                    : "N/A"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Negotiations */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Negotiations</CardTitle>
          <CardDescription>Track the negotiation history for this transfer</CardDescription>
        </CardHeader>
        <CardContent>
          {transfer.negotiations && transfer.negotiations.length > 0 ? (
            <div className="space-y-6">
              {transfer.negotiations.map((negotiation, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{negotiation.proposedBy?.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{negotiation.proposedBy?.name || "User"}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(negotiation.proposedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                    {negotiation.accepted ? (
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                        Accepted
                      </Badge>
                    ) : (
                      user &&
                      (user.role === "clubManager" || user.role === "admin") &&
                      transfer.status === "negotiating" && (
                        <Button
                          size="sm"
                          onClick={() =>
                            dispatch(acceptNegotiation({ transferId: transfer._id, negotiationId: negotiation._id }))
                          }
                        >
                          Accept Offer
                        </Button>
                      )
                    )}
                  </div>
                  <div className="bg-white p-3 rounded-md mb-2">
                    <p className="text-sm font-medium">Proposed Price:</p>
                    <p className="text-lg font-bold text-kenya-green">${negotiation.proposedPrice.toLocaleString()}</p>
                  </div>
                  {negotiation.message && (
                    <div className="bg-white p-3 rounded-md">
                      <p className="text-sm">{negotiation.message}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">No negotiations have been made yet</div>
          )}

          {/* Submit new negotiation */}
          {user &&
            (user.role === "clubManager" || user.role === "agent" || user.role === "admin") &&
            (transfer.status === "initiated" || transfer.status === "negotiating") && (
              <div className="mt-8 border-t pt-6">
                <h3 className="font-medium mb-4">Submit a new offer</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="proposedPrice">Proposed Price ($)</Label>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        id="proposedPrice"
                        type="number"
                        className="pl-8"
                        value={proposedPrice}
                        onChange={(e) => setProposedPrice(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message">Message (Optional)</Label>
                    <Textarea
                      id="message"
                      className="mt-1"
                      placeholder="Add details about your offer..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button onClick={handleSubmitNegotiation} disabled={!proposedPrice}>
                    <MessageSquare className="mr-2 h-4 w-4" /> Submit Offer
                  </Button>
                </div>
              </div>
            )}
        </CardContent>
      </Card>
    </div>
  )
}

export default TransferDetail
