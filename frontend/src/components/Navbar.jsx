"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Shield, Menu, X, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useSelector } from "react-redux"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useSelector((state) => state.auth)

  return (
    <nav className="bg-kenya-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-kenya-green" />
            <span className="text-xl font-bold bg-gradient-to-r from-kenya-green to-kenya-red bg-clip-text text-transparent">
              Kenya Football
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/teams" className="nav-link">
              Teams
            </Link>
            <Link to="/players" className="nav-link">
              Players
            </Link>
            <Link to="/transfers" className="nav-link">
              Transfers
            </Link>
            <Link to="/scout-network" className="nav-link">
              Scout Network
            </Link>

            {user ? (
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
            ) : (
              <Link to="/login" className="btn btn-primary flex items-center space-x-2">
                <User size={18} />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 hover:text-kenya-green">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/teams"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Teams
              </Link>
              <Link
                to="/players"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Players
              </Link>
              <Link
                to="/transfers"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Transfers
              </Link>
              <Link
                to="/scout-network"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Scout Network
              </Link>
              {user ? (
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-kenya-green text-white mt-4"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
