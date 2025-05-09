import { Shield, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react"
import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-kenya-green" />
              <span className="text-xl font-bold bg-gradient-to-r from-kenya-green to-kenya-red bg-clip-text text-transparent">
                Futaa_KE
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Connecting players, clubs, and scouts across Kenya to build a stronger football ecosystem.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-kenya-green">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-kenya-green">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-kenya-green">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-kenya-green">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/players" className="text-gray-600 hover:text-kenya-green">
                  Players
                </Link>
              </li>
              <li>
                <Link to="/teams" className="text-gray-600 hover:text-kenya-green">
                  Teams
                </Link>
              </li>
              <li>
                <Link to="/transfers" className="text-gray-600 hover:text-kenya-green">
                  Transfers
                </Link>
              </li>
              <li>
                <Link to="/scout-network" className="text-gray-600 hover:text-kenya-green">
                  Scout Network
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-kenya-green">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-kenya-green">
                  News
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-kenya-green">
                  Events
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-kenya-green">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-kenya-green">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <MapPin size={18} className="text-kenya-green mt-0.5" />
                <span className="text-gray-600">Nairobi, Kenya</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={18} className="text-kenya-green" />
                <span className="text-gray-600">+254 712 345 678</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={18} className="text-kenya-green" />
                <span className="text-gray-600">info@kenyafootball.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Kenya Football Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
