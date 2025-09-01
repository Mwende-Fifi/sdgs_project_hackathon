"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Phone,
  Clock,
  Heart,
  Brain,
  Stethoscope,
  Star,
  Navigation,
  Globe,
  DollarSign,
  Users,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react"

interface HealthResource {
  id: number
  name: string
  type: string
  address: string
  phone: string
  hours: string
  services: string[]
  cost: string
  coordinates: { lat: number; lng: number }
  rating: number
  waitTime: string
  languages: string[]
  description: string
}

interface ResourceDetailModalProps {
  resource: HealthResource | null
  isOpen: boolean
  onClose: () => void
}

const serviceIcons = {
  clinic: Stethoscope,
  hospital: Stethoscope,
  "mental-health": Brain,
  program: Heart,
  pharmacy: Heart,
}

const serviceColors = {
  clinic: "#10b981", // emerald-500
  hospital: "#10b981", // emerald-500
  "mental-health": "#8b5cf6", // violet-500
  program: "#f59e0b", // amber-500
  pharmacy: "#f59e0b", // amber-500
}

// Mock additional details that would come from a database
const getAdditionalDetails = (resource: HealthResource) => ({
  website: `https://${resource.name.toLowerCase().replace(/\s+/g, "")}.org`,
  email: `info@${resource.name.toLowerCase().replace(/\s+/g, "")}.org`,
  accessibility: ["Wheelchair accessible", "Accessible parking", "Sign language interpreter available"],
  insuranceAccepted:
    resource.cost === "Free" ? ["No insurance required"] : ["Medicaid", "Medicare", "Sliding scale available"],
  specialNotes: [
    "Bring valid ID and proof of income",
    "Walk-ins welcome during specified hours",
    "Appointments recommended for faster service",
  ],
  reviews: [
    { rating: 5, comment: "Excellent staff and very helpful services.", author: "Anonymous" },
    { rating: 4, comment: "Great location and friendly environment.", author: "Community Member" },
    { rating: 5, comment: "Life-changing support and resources.", author: "Grateful Patient" },
  ],
})

export function ResourceDetailModal({ resource, isOpen, onClose }: ResourceDetailModalProps) {
  if (!resource) return null

  const IconComponent = serviceIcons[resource.type as keyof typeof serviceIcons] || Heart
  const color = serviceColors[resource.type as keyof typeof serviceColors] || "#10b981"
  const additionalDetails = getAdditionalDetails(resource)

  const handleGetDirections = () => {
    const encodedAddress = encodeURIComponent(resource.address)
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, "_blank")
  }

  const handleCall = () => {
    window.open(`tel:${resource.phone}`, "_self")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg" style={{ backgroundColor: color }}>
              <IconComponent className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold">{resource.name}</DialogTitle>
              <div className="flex items-center gap-2 mt-1 capitalize">
                <Badge variant="secondary">{resource.type.replace("-", " ")}</Badge>
                <Badge variant="outline">{resource.cost}</Badge>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{resource.rating}</span>
                <span className="text-muted-foreground">• {resource.waitTime}</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  About This Resource
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{resource.description}</p>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Services Offered
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {resource.services.map((service, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Accessibility & Insurance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Accessibility</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {additionalDetails.accessibility.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Insurance & Payment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {additionalDetails.insuranceAccepted.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-3 w-3 text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Important Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Important Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {additionalDetails.specialNotes.map((note, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <AlertCircle className="h-3 w-3 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Community Reviews
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {additionalDetails.reviews.map((review, index) => (
                  <div key={index} className="border-l-2 border-muted pl-4">
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-2">- {review.author}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Quick Actions */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <Button onClick={handleGetDirections} className="w-full" size="lg">
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
                <Button onClick={handleCall} variant="outline" className="w-full bg-transparent" size="lg">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">{resource.address}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{resource.phone}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Hours</p>
                    <p className="text-sm text-muted-foreground">{resource.hours}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Globe className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Languages</p>
                    <p className="text-sm text-muted-foreground">{resource.languages.join(", ")}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Globe className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Website</p>
                    <a
                      href={additionalDetails.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      Visit Website
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Wait Time</span>
                  <Badge variant="outline">{resource.waitTime}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Cost</span>
                  <Badge variant="secondary">{resource.cost}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{resource.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
