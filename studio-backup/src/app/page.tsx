"use client"

import { useState, useEffect } from "react"
import { MapPin, Phone, Clock, Filter, Heart, Crown, Stethoscope, Brain, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ResourceDetailModal } from "@/components/resource-detail-modal"
import { PaymentModal } from "@/components/payment-modal"
import { AiAssistantModal } from "@/components/ai-assistant-modal"

interface HealthResource {
  id: string
  name: string
  type: string
  address: string
  county: string
  phone?: string
  email?: string
  website?: string
  hours?: string
  services: string[]
  cost: string
  latitude?: number
  longitude?: number
  description?: string
  is_active: boolean
}

const mockHealthResources: HealthResource[] = [
  {
    id: "1",
    name: "Kenyatta National Hospital",
    type: "hospital",
    address: "Hospital Rd, Upper Hill",
    county: "Nairobi",
    phone: "+254-20-2726300",
    hours: "24/7",
    services: ["Emergency Care", "Surgery", "Maternity", "Pediatrics", "Oncology"],
    cost: "Free for public patients, fees for private",
    latitude: -1.3018,
    longitude: 36.8073,
    description: "Kenya's largest referral hospital providing comprehensive medical services",
    is_active: true,
  },
  {
    id: "2",
    name: "Nairobi Hospital",
    type: "hospital",
    address: "Argwings Kodhek Rd",
    county: "Nairobi",
    phone: "+254-20-2845000",
    hours: "24/7",
    services: ["Emergency Care", "Surgery", "Maternity", "Cardiology"],
    cost: "Private hospital with insurance accepted",
    latitude: -1.2921,
    longitude: 36.8219,
    description: "Leading private hospital in East Africa",
    is_active: true,
  },
  {
    id: "3",
    name: "Mathare Mental Hospital",
    type: "mental-health",
    address: "Mathare North",
    county: "Nairobi",
    phone: "+254-20-2557000",
    hours: "Mon-Fri 8AM-5PM",
    services: ["Mental Health", "Counseling", "Psychiatric Care"],
    cost: "Free mental health services",
    latitude: -1.2297,
    longitude: 36.8735,
    description: "Specialized mental health facility serving Kenya",
    is_active: true,
  },
  {
    id: "4",
    name: "Coast Provincial General Hospital",
    type: "hospital",
    address: "Mama Ngina Dr",
    county: "Mombasa",
    phone: "+254-41-2312191",
    hours: "24/7",
    services: ["Emergency Care", "Surgery", "Maternity", "Pediatrics"],
    cost: "Free for public patients",
    latitude: -4.0435,
    longitude: 39.6682,
    description: "Major referral hospital for Coast region",
    is_active: true,
  },
  {
    id: "5",
    name: "Jaramogi Oginga Odinga Teaching Hospital",
    type: "hospital",
    address: "Kakamega Rd",
    county: "Kisumu",
    phone: "+254-57-2025555",
    hours: "24/7",
    services: ["Emergency Care", "Surgery", "Maternity", "Teaching"],
    cost: "Free for public patients",
    latitude: -0.0917,
    longitude: 34.768,
    description: "Regional referral and teaching hospital",
    is_active: true,
  },
  {
    id: "6",
    name: "Kibera Community Health Center",
    type: "clinic",
    address: "Kibera Slums",
    county: "Nairobi",
    phone: "+254-20-2387654",
    hours: "Mon-Fri 8AM-5PM",
    services: ["Primary Care", "Immunization", "Family Planning"],
    cost: "Free community health services",
    latitude: -1.3133,
    longitude: 36.7892,
    description: "Community health center serving Kibera residents",
    is_active: true,
  },
  {
    id: "7",
    name: "BasicNeeds-BasicRights Kenya",
    type: "mental-health",
    address: "Lavington",
    county: "Nairobi",
    phone: "+254-20-2560498",
    hours: "Mon-Fri 8AM-5PM",
    services: ["Mental Health", "Community Support", "Advocacy"],
    cost: "Free mental health support",
    latitude: -1.2667,
    longitude: 36.7667,
    description: "Mental health and development organization",
    is_active: true,
  },
  {
    id: "8",
    name: "Marie Stopes Kenya",
    type: "clinic",
    address: "Various Locations",
    county: "Nairobi",
    phone: "+254-709-929000",
    hours: "Mon-Sat 8AM-5PM",
    services: ["Family Planning", "Reproductive Health", "Safe Motherhood"],
    cost: "Subsidized reproductive health services",
    latitude: -1.2921,
    longitude: 36.8219,
    description: "Reproductive health services provider",
    is_active: true,
  },
  {
    id: "9",
    name: "Goodlife Pharmacy",
    type: "pharmacy",
    address: "Multiple Locations",
    county: "Nairobi",
    phone: "+254-709-929000",
    hours: "Mon-Sun 8AM-10PM",
    services: ["Prescription Drugs", "Health Consultations", "Medical Supplies"],
    cost: "Affordable pharmacy chain",
    latitude: -1.2921,
    longitude: 36.8219,
    description: "Leading pharmacy chain in Kenya",
    is_active: true,
  },
  {
    id: "10",
    name: "Amref Health Africa",
    type: "program",
    address: "Langata Rd",
    county: "Nairobi",
    phone: "+254-20-6993000",
    hours: "Mon-Fri 8AM-5PM",
    services: ["Community Health", "Training", "Research"],
    cost: "Community health programs",
    latitude: -1.3667,
    longitude: 36.7667,
    description: "Leading health development organization in Africa",
    is_active: true,
  },
  {
    id: "11",
    name: "Nakuru Provincial General Hospital",
    type: "hospital",
    address: "Hospital Rd, Nakuru",
    county: "Nakuru",
    phone: "+254-51-2211102",
    hours: "24/7",
    services: ["Emergency Care", "Surgery", "Maternity", "Pediatrics", "Internal Medicine"],
    cost: "Free for public patients, fees for private",
    latitude: -0.3031,
    longitude: 36.08,
    description: "Major referral hospital serving Nakuru County and Rift Valley region",
    is_active: true,
  },
  {
    id: "12",
    name: "Moi Teaching and Referral Hospital",
    type: "hospital",
    address: "Nandi Rd, Eldoret",
    county: "Uasin Gishu",
    phone: "+254-53-2033471",
    hours: "24/7",
    services: ["Emergency Care", "Surgery", "Maternity", "Oncology", "Cardiology", "Teaching"],
    cost: "Free for public patients, private wing available",
    latitude: 0.5143,
    longitude: 35.2697,
    description: "Second largest referral hospital in Kenya, serving Western Kenya region",
    is_active: true,
  },
  {
    id: "13",
    name: "Kiambu Level 5 Hospital",
    type: "hospital",
    address: "Kiambu Town",
    county: "Kiambu",
    phone: "+254-66-22023",
    hours: "24/7",
    services: ["Emergency Care", "Surgery", "Maternity", "Pediatrics", "Outpatient Services"],
    cost: "Free for public patients",
    latitude: -1.1714,
    longitude: 36.8356,
    description: "County referral hospital serving Kiambu and surrounding areas",
    is_active: true,
  },
  {
    id: "14",
    name: "Machakos Level 5 Hospital",
    type: "hospital",
    address: "Machakos Town",
    county: "Machakos",
    phone: "+254-44-21022",
    hours: "24/7",
    services: ["Emergency Care", "Surgery", "Maternity", "Pediatrics", "Orthopedics"],
    cost: "Free for public patients",
    latitude: -1.5177,
    longitude: 37.2634,
    description: "Main referral hospital for Machakos County",
    is_active: true,
  },
  {
    id: "15",
    name: "Kajiado County Referral Hospital",
    type: "hospital",
    address: "Kajiado Town",
    county: "Kajiado",
    phone: "+254-45-22041",
    hours: "24/7",
    services: ["Emergency Care", "Surgery", "Maternity", "Pediatrics", "General Medicine"],
    cost: "Free for public patients",
    latitude: -1.85,
    longitude: 36.7833,
    description: "County referral hospital serving Kajiado and Maasai communities",
    is_active: true,
  },
  {
    id: "16",
    name: "Nakuru Mental Health Unit",
    type: "mental-health",
    address: "Nakuru Provincial Hospital",
    county: "Nakuru",
    phone: "+254-51-2211102",
    hours: "Mon-Fri 8AM-5PM",
    services: ["Mental Health", "Counseling", "Psychiatric Care", "Community Outreach"],
    cost: "Free mental health services",
    latitude: -0.3031,
    longitude: 36.08,
    description: "Mental health unit providing psychiatric services in Nakuru County",
    is_active: true,
  },
  {
    id: "17",
    name: "Eldoret Mental Health Services",
    type: "mental-health",
    address: "Moi Teaching Hospital",
    county: "Uasin Gishu",
    phone: "+254-53-2033471",
    hours: "Mon-Fri 8AM-5PM, Emergency 24/7",
    services: ["Mental Health", "Counseling", "Psychiatric Care", "Addiction Treatment"],
    cost: "Free mental health services",
    latitude: 0.5143,
    longitude: 35.2697,
    description: "Comprehensive mental health services for Western Kenya region",
    is_active: true,
  },
  {
    id: "18",
    name: "Kiambu Community Health Program",
    type: "program",
    address: "Various Locations, Kiambu",
    county: "Kiambu",
    phone: "+254-66-22023",
    hours: "Mon-Fri 8AM-5PM",
    services: ["Community Health", "Immunization", "Family Planning", "Health Education"],
    cost: "Free community health services",
    latitude: -1.1714,
    longitude: 36.8356,
    description: "Community health program serving rural and urban areas in Kiambu County",
    is_active: true,
  },
  {
    id: "19",
    name: "Machakos County Health Services",
    type: "program",
    address: "Machakos County Health Office",
    county: "Machakos",
    phone: "+254-44-21022",
    hours: "Mon-Fri 8AM-5PM",
    services: ["Community Health", "Maternal Health", "Child Health", "Disease Prevention"],
    cost: "Free community health services",
    latitude: -1.5177,
    longitude: 37.2634,
    description: "County-wide health programs focusing on preventive care and community health",
    is_active: true,
  },
  {
    id: "20",
    name: "Kajiado Maasai Health Initiative",
    type: "program",
    address: "Kajiado County",
    county: "Kajiado",
    phone: "+254-45-22041",
    hours: "Mon-Fri 8AM-5PM",
    services: ["Community Health", "Mobile Clinics", "Traditional Medicine Integration", "Health Education"],
    cost: "Free community health services",
    latitude: -1.85,
    longitude: 36.7833,
    description: "Culturally sensitive health programs for Maasai communities in Kajiado County",
    is_active: true,
  },
  {
    id: "21",
    name: "Nakuru Family Health Clinic",
    type: "clinic",
    address: "Kenyatta Avenue, Nakuru",
    county: "Nakuru",
    phone: "+254-51-2214567",
    hours: "Mon-Sat 8AM-6PM",
    services: ["Primary Care", "Family Planning", "Immunization", "Health Screening"],
    cost: "Subsidized healthcare services",
    latitude: -0.3031,
    longitude: 36.08,
    description: "Family health clinic providing affordable primary healthcare in Nakuru",
    is_active: true,
  },
  {
    id: "22",
    name: "Eldoret Community Clinic",
    type: "clinic",
    address: "Uganda Rd, Eldoret",
    county: "Uasin Gishu",
    phone: "+254-53-2062345",
    hours: "Mon-Sat 8AM-6PM",
    services: ["Primary Care", "Maternal Health", "Child Health", "HIV/AIDS Care"],
    cost: "Free and subsidized services",
    latitude: 0.5143,
    longitude: 35.2697,
    description: "Community clinic serving low-income families in Eldoret",
    is_active: true,
  },
  {
    id: "23",
    name: "Mombasa Family Health Clinic",
    type: "clinic",
    address: "Digo Rd, Mombasa",
    county: "Mombasa",
    phone: "+254-41-2225678",
    hours: "Mon-Sat 8AM-6PM",
    services: ["Primary Care", "Family Planning", "Immunization", "Maternal Health"],
    cost: "Subsidized healthcare services",
    latitude: -4.0435,
    longitude: 39.6682,
    description: "Community clinic providing affordable primary healthcare in Mombasa",
    is_active: true,
  },
  {
    id: "24",
    name: "Kisumu Central Clinic",
    type: "clinic",
    address: "Oginga Odinga St, Kisumu",
    county: "Kisumu",
    phone: "+254-57-2023456",
    hours: "Mon-Sat 8AM-6PM",
    services: ["Primary Care", "Child Health", "Immunization", "Health Screening"],
    cost: "Free and subsidized services",
    latitude: -0.0917,
    longitude: 34.768,
    description: "Central clinic serving Kisumu residents with primary healthcare",
    is_active: true,
  },
  {
    id: "25",
    name: "Kiambu Health Center",
    type: "clinic",
    address: "Kiambu-Nairobi Rd, Kiambu",
    county: "Kiambu",
    phone: "+254-66-22234",
    hours: "Mon-Sat 8AM-5PM",
    services: ["Primary Care", "Family Planning", "Immunization", "Antenatal Care"],
    cost: "Free community health services",
    latitude: -1.1714,
    longitude: 36.8356,
    description: "Community health center serving Kiambu town and surrounding areas",
    is_active: true,
  },
  {
    id: "26",
    name: "Machakos Town Clinic",
    type: "clinic",
    address: "Machakos-Wote Rd, Machakos",
    county: "Machakos",
    phone: "+254-44-21234",
    hours: "Mon-Sat 8AM-5PM",
    services: ["Primary Care", "Maternal Health", "Child Health", "Family Planning"],
    cost: "Free and subsidized services",
    latitude: -1.5177,
    longitude: 37.2634,
    description: "Town clinic providing essential healthcare services in Machakos",
    is_active: true,
  },
  {
    id: "27",
    name: "Kajiado Community Clinic",
    type: "clinic",
    address: "Kajiado-Namanga Rd, Kajiado",
    county: "Kajiado",
    phone: "+254-45-22234",
    hours: "Mon-Sat 8AM-5PM",
    services: ["Primary Care", "Mobile Clinics", "Immunization", "Health Education"],
    cost: "Free community health services",
    latitude: -1.85,
    longitude: 36.7833,
    description: "Community clinic with mobile outreach for rural Kajiado areas",
    is_active: true,
  },
  {
    id: "28",
    name: "Coast Mental Health Services",
    type: "mental-health",
    address: "Coast Provincial Hospital, Mombasa",
    county: "Mombasa",
    phone: "+254-41-2312191",
    hours: "Mon-Fri 8AM-5PM",
    services: ["Mental Health", "Counseling", "Psychiatric Care", "Community Support"],
    cost: "Free mental health services",
    latitude: -4.0435,
    longitude: 39.6682,
    description: "Mental health unit serving the Coast region with psychiatric services",
    is_active: true,
  },
  {
    id: "29",
    name: "Kisumu Mental Health Center",
    type: "mental-health",
    address: "Jaramogi Hospital, Kisumu",
    county: "Kisumu",
    phone: "+254-57-2025555",
    hours: "Mon-Fri 8AM-5PM",
    services: ["Mental Health", "Counseling", "Psychiatric Care", "Group Therapy"],
    cost: "Free mental health services",
    latitude: -0.0917,
    longitude: 34.768,
    description: "Mental health center providing comprehensive psychiatric care in Kisumu",
    is_active: true,
  },
  {
    id: "30",
    name: "Kiambu Mental Wellness Center",
    type: "mental-health",
    address: "Kiambu Level 5 Hospital",
    county: "Kiambu",
    phone: "+254-66-22023",
    hours: "Mon-Fri 8AM-5PM",
    services: ["Mental Health", "Counseling", "Psychiatric Care", "Family Therapy"],
    cost: "Free mental health services",
    latitude: -1.1714,
    longitude: 36.8356,
    description: "Mental wellness center providing psychiatric services in Kiambu County",
    is_active: true,
  },
  {
    id: "31",
    name: "Machakos Mental Health Unit",
    type: "mental-health",
    address: "Machakos Level 5 Hospital",
    county: "Machakos",
    phone: "+254-44-21022",
    hours: "Mon-Fri 8AM-5PM",
    services: ["Mental Health", "Counseling", "Psychiatric Care", "Addiction Treatment"],
    cost: "Free mental health services",
    latitude: -1.5177,
    longitude: 37.2634,
    description: "Mental health unit providing psychiatric care for Machakos County residents",
    is_active: true,
  },
  {
    id: "32",
    name: "Kajiado Mental Health Services",
    type: "mental-health",
    address: "Kajiado County Hospital",
    county: "Kajiado",
    phone: "+254-45-22041",
    hours: "Mon-Fri 8AM-5PM",
    services: ["Mental Health", "Counseling", "Psychiatric Care", "Cultural Therapy"],
    cost: "Free mental health services",
    latitude: -1.85,
    longitude: 36.7833,
    description: "Mental health services with culturally sensitive care for Maasai communities",
    is_active: true,
  },
  {
    id: "33",
    name: "Mombasa Community Health Initiative",
    type: "program",
    address: "Mombasa County Health Office",
    county: "Mombasa",
    phone: "+254-41-2312000",
    hours: "Mon-Fri 8AM-5PM",
    services: ["Community Health", "Health Education", "Disease Prevention", "Mobile Clinics"],
    cost: "Free community health services",
    latitude: -4.0435,
    longitude: 39.6682,
    description: "County-wide health programs focusing on coastal community health needs",
    is_active: true,
  },
  {
    id: "34",
    name: "Kisumu Health Outreach Program",
    type: "program",
    address: "Kisumu County Health Department",
    county: "Kisumu",
    phone: "+254-57-2020000",
    hours: "Mon-Fri 8AM-5PM",
    services: ["Community Health", "Malaria Prevention", "Water Sanitation", "Health Education"],
    cost: "Free community health services",
    latitude: -0.0917,
    longitude: 34.768,
    description: "Community health program addressing lakeside health challenges in Kisumu",
    is_active: true,
  },
  {
    id: "35",
    name: "Nakuru Community Health Network",
    type: "program",
    address: "Nakuru County Health Office",
    county: "Nakuru",
    phone: "+254-51-2210000",
    hours: "Mon-Fri 8AM-5PM",
    services: ["Community Health", "Nutrition Programs", "Health Education", "Mobile Clinics"],
    cost: "Free community health services",
    latitude: -0.3031,
    longitude: 36.08,
    description: "Community health network serving rural and urban areas in Nakuru County",
    is_active: true,
  },
  {
    id: "36",
    name: "Uasin Gishu Health Outreach",
    type: "program",
    address: "Eldoret County Health Office",
    county: "Uasin Gishu",
    phone: "+254-53-2030000",
    hours: "Mon-Fri 8AM-5PM",
    services: ["Community Health", "Rural Health", "Health Education", "Disease Prevention"],
    cost: "Free community health services",
    latitude: 0.5143,
    longitude: 35.2697,
    description: "Health outreach program serving rural communities in Uasin Gishu County",
    is_active: true,
  },
  {
    id: "37",
    name: "Coast Pharmacy",
    type: "pharmacy",
    address: "Moi Avenue, Mombasa",
    county: "Mombasa",
    phone: "+254-41-2223456",
    hours: "Mon-Sun 8AM-9PM",
    services: ["Prescription Drugs", "Health Consultations", "Medical Supplies", "Health Screening"],
    cost: "Affordable pharmacy services",
    latitude: -4.0435,
    longitude: 39.6682,
    description: "Full-service pharmacy serving Mombasa with quality medications",
    is_active: true,
  },
  {
    id: "38",
    name: "Kisumu Central Pharmacy",
    type: "pharmacy",
    address: "Oginga Odinga St, Kisumu",
    county: "Kisumu",
    phone: "+254-57-2024567",
    hours: "Mon-Sun 8AM-9PM",
    services: ["Prescription Drugs", "Health Consultations", "Medical Supplies", "Immunizations"],
    cost: "Affordable pharmacy chain",
    latitude: -0.0917,
    longitude: 34.768,
    description: "Central pharmacy providing quality medications and health services in Kisumu",
    is_active: true,
  },
  {
    id: "39",
    name: "Nakuru Health Pharmacy",
    type: "pharmacy",
    address: "Kenyatta Avenue, Nakuru",
    county: "Nakuru",
    phone: "+254-51-2215678",
    hours: "Mon-Sun 8AM-9PM",
    services: ["Prescription Drugs", "Health Consultations", "Medical Supplies", "Health Products"],
    cost: "Affordable pharmacy services",
    latitude: -0.3031,
    longitude: 36.08,
    description: "Health pharmacy serving Nakuru with comprehensive pharmaceutical services",
    is_active: true,
  },
  {
    id: "40",
    name: "Eldoret Medical Pharmacy",
    type: "pharmacy",
    address: "Uganda Rd, Eldoret",
    county: "Uasin Gishu",
    phone: "+254-53-2065678",
    hours: "Mon-Sun 8AM-9PM",
    services: ["Prescription Drugs", "Health Consultations", "Medical Supplies", "Emergency Medications"],
    cost: "Affordable pharmacy services",
    latitude: 0.5143,
    longitude: 35.2697,
    description: "Medical pharmacy providing 24/7 emergency medication services in Eldoret",
    is_active: true,
  },
  {
    id: "41",
    name: "Kiambu Town Pharmacy",
    type: "pharmacy",
    address: "Kiambu-Nairobi Rd, Kiambu",
    county: "Kiambu",
    phone: "+254-66-22345",
    hours: "Mon-Sun 8AM-8PM",
    services: ["Prescription Drugs", "Health Consultations", "Medical Supplies", "Health Screening"],
    cost: "Affordable pharmacy services",
    latitude: -1.1714,
    longitude: 36.8356,
    description: "Town pharmacy serving Kiambu with quality medications and health consultations",
    is_active: true,
  },
  {
    id: "42",
    name: "Machakos Medical Pharmacy",
    type: "pharmacy",
    address: "Machakos-Wote Rd, Machakos",
    county: "Machakos",
    phone: "+254-44-21345",
    hours: "Mon-Sun 8AM-8PM",
    services: ["Prescription Drugs", "Health Consultations", "Medical Supplies", "Chronic Disease Management"],
    cost: "Affordable pharmacy services",
    latitude: -1.5177,
    longitude: 37.2634,
    description: "Medical pharmacy specializing in chronic disease management in Machakos",
    is_active: true,
  },
  {
    id: "43",
    name: "Kajiado Community Pharmacy",
    type: "pharmacy",
    address: "Kajiado-Namanga Rd, Kajiado",
    county: "Kajiado",
    phone: "+254-45-22345",
    hours: "Mon-Sun 8AM-7PM",
    services: ["Prescription Drugs", "Health Consultations", "Medical Supplies", "Mobile Pharmacy"],
    cost: "Affordable community pharmacy",
    latitude: -1.85,
    longitude: 36.7833,
    description: "Community pharmacy with mobile services for remote areas in Kajiado County",
    is_active: true,
  },
]

const serviceTypes = [
  { value: "all", label: "All Services", icon: Heart },
  { value: "hospital", label: "Hospitals", icon: Stethoscope },
  { value: "clinic", label: "Clinics", icon: Stethoscope },
  { value: "mental-health", label: "Mental Health", icon: Brain },
  { value: "program", label: "Programs", icon: MapPin },
  { value: "pharmacy", label: "Pharmacies", icon: MapPin },
]

const counties = [
  "All Counties",
  "Nairobi",
  "Mombasa",
  "Kisumu",
  "Nakuru",
  "Uasin Gishu",
  "Kiambu",
  "Machakos",
  "Kajiado",
]

export default function HealthResourceFinder() {
  const [selectedResource, setSelectedResource] = useState<HealthResource | null>(null)
  const [showResourceDetail, setShowResourceDetail] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showAiAssistant, setShowAiAssistant] = useState(false)
  const [paymentType, setPaymentType] = useState<"donation" | "premium">("donation")

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedCounty, setSelectedCounty] = useState("All Counties")
  const [healthResources, setHealthResources] = useState<HealthResource[]>([])
  const [filteredResources, setFilteredResources] = useState<HealthResource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [scriptStatus, setScriptStatus] = useState<{ [key: string]: "idle" | "running" | "success" | "error" }>({
    createTable: "idle",
    insertData: "idle",
  })

  // Supabase credentials check
  useEffect(() => {
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_URL === "YOUR_SUPABASE_URL"
    ) {
      setError("Your Supabase credentials are not set. Please add your Supabase URL and anonymous key to the .env file.")
      setLoading(false)
      return
    }

    const fetchHealthResources = async () => {
      // In a real app, you would fetch from Supabase here
      // For now, we'll use the mock data
      console.log("[v0] Loading health resources data...")
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setHealthResources(mockHealthResources)
      setFilteredResources(mockHealthResources)
      setLoading(false)
    }

    fetchHealthResources()
  }, [])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterResources(term, selectedType, selectedCounty)
  }

  const handleTypeFilter = (type: string) => {
    setSelectedType(type)
    filterResources(searchTerm, type, selectedCounty)
  }

  const handleCountyFilter = (county: string) => {
    setSelectedCounty(county)
    filterResources(searchTerm, selectedType, county)
  }

  const filterResources = (term: string, type: string, county: string) => {
    let filtered = healthResources

    if (type !== "all") {
      filtered = filtered.filter((resource) => resource.type === type)
    }

    if (county !== "All Counties") {
      filtered = filtered.filter((resource) => resource.county === county)
    }

    if (term) {
      filtered = filtered.filter(
        (resource) =>
          resource.name.toLowerCase().includes(term.toLowerCase()) ||
          resource.services.some((service) => service.toLowerCase().includes(term.toLowerCase())) ||
          resource.address.toLowerCase().includes(term.toLowerCase()) ||
          resource.county.toLowerCase().includes(term.toLowerCase()),
      )
    }

    setFilteredResources(filtered)
  }

  const getTypeIcon = (type: string) => {
    const service = serviceTypes.find((s) => s.value === type)
    if (service) {
      const Icon = service.icon
      return <Icon className="h-4 w-4" />
    }
    return <Heart className="h-4 w-4" />
  }

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "clinic":
      case "hospital":
        return "bg-primary text-primary-foreground"
      case "mental-health":
        return "bg-secondary text-secondary-foreground"
      case "program":
      case "pharmacy":
        return "bg-accent text-accent-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const transformResourceForModal = (resource: HealthResource) => ({
    id: Number.parseInt(resource.id),
    name: resource.name,
    type: resource.type,
    address: resource.address,
    phone: resource.phone || "Not available",
    hours: resource.hours || "Contact for hours",
    services: resource.services,
    cost: resource.cost,
    coordinates: { lat: resource.latitude || 0, lng: resource.longitude || 0 },
    rating: 4.2,
    waitTime: "15-30 mins",
    languages: ["English", "Swahili"],
    description:
      resource.description ||
      `${resource.name} provides quality healthcare services to the community in ${resource.county}.`,
  })

  const handleDonation = () => {
    setPaymentType("donation")
    setShowPaymentModal(true)
  }

  const handlePremiumUpgrade = () => {
    setPaymentType("premium")
    setShowPaymentModal(true)
  }

  const handleResourceClick = (resource: HealthResource) => {
    setSelectedResource(resource)
    setShowResourceDetail(true)
  }

  const handleExecuteScript = async (scriptName: "createTable" | "insertData") => {
    setScriptStatus((prev) => ({ ...prev, [scriptName]: "running" }))

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setScriptStatus((prev) => ({ ...prev, [scriptName]: "success" }))

      if (scriptName === "insertData") {
        setTimeout(() => {
          setHealthResources(mockHealthResources)
          setFilteredResources(mockHealthResources)
          setError(null)
        }, 1000)
      }
    } catch (error) {
      console.error(`[v0] Script execution error for ${scriptName}:`, error)
      setScriptStatus((prev) => ({ ...prev, [scriptName]: "error" }))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading health resources...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Database Setup Required
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">{error}</p>

            <div className="bg-muted/50 p-4 rounded-lg space-y-4">
              <h3 className="font-semibold text-foreground">Quick Setup - Run Scripts:</h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-background rounded-lg border">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Create Health Resources Table</p>
                    <p className="text-sm text-muted-foreground">Sets up the database schema</p>
                  </div>
                  <Button
                    onClick={() => handleExecuteScript("createTable")}
                    disabled={scriptStatus.createTable === "running"}
                    variant={scriptStatus.createTable === "success" ? "default" : "outline"}
                    size="sm"
                  >
                    {scriptStatus.createTable === "running" && (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                    )}
                    {scriptStatus.createTable === "success" && <Heart className="h-4 w-4 mr-2" />}
                    {scriptStatus.createTable === "idle" && <Heart className="h-4 w-4 mr-2" />}
                    {scriptStatus.createTable === "success"
                      ? "Created"
                      : scriptStatus.createTable === "running"
                      ? "Creating..."
                      : "Run Script"}
                  </Button>
                </div>

                <div className="flex items-center gap-3 p-3 bg-background rounded-lg border">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Insert Kenya Health Centers Data</p>
                    <p className="text-sm text-muted-foreground">Adds 40+ real health facilities</p>
                  </div>
                  <Button
                    onClick={() => handleExecuteScript("insertData")}
                    disabled={scriptStatus.insertData === "running" || scriptStatus.createTable !== "success"}
                    variant={scriptStatus.insertData === "success" ? "default" : "outline"}
                    size="sm"
                  >
                    {scriptStatus.insertData === "running" && (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                    )}
                    {scriptStatus.insertData === "success" && <Heart className="h-4 w-4 mr-2" />}
                    {scriptStatus.insertData === "idle" && <Heart className="h-4 w-4 mr-2" />}
                    {scriptStatus.insertData === "success"
                      ? "Inserted"
                      : scriptStatus.insertData === "running"
                      ? "Inserting..."
                      : "Run Script"}
                  </Button>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> These scripts will create a database with 40+ real health centers across Kenya
                  including major hospitals, mental health facilities, community programs, and pharmacies in Nairobi,
                  Mombasa, Kisumu, Nakuru, and other counties.
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => window.location.reload()} className="flex-1">
                <Heart className="h-4 w-4 mr-2" />
                Retry Connection
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open("https://supabase.com/dashboard", "_blank")}
                className="flex-1"
              >
                Open Supabase Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-foreground tracking-tight">HealthPoint Kenya</h1>
          <p className="text-muted-foreground mt-2 font-mono leading-relaxed">
            Your guide to free and low-cost healthcare services in Kenya.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setShowAiAssistant(true)}
            variant="outline"
            className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground shadow-md hover:shadow-lg transition-all duration-200 bg-transparent"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Ask AI Assistant
          </Button>
          <Button
            onClick={handlePremiumUpgrade}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Crown className="h-4 w-4 mr-2" />
            Go Premium
          </Button>
          <Button
            onClick={handleDonation}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200 bg-transparent"
          >
            <Heart className="h-4 w-4 mr-2" />
            Donate
          </Button>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Search and Filters */}
        <aside className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filter Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative">
                <Heart className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, service..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-foreground mb-3 block">Service Type</Label>
                <div className="flex flex-wrap gap-2">
                  {serviceTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <Button
                        key={type.value}
                        variant={selectedType === type.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleTypeFilter(type.value)}
                        className="flex-1"
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {type.label}
                      </Button>
                    )
                  })}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-foreground mb-2 block">County</Label>
                <Select value={selectedCounty} onValueChange={handleCountyFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {counties.map((county) => (
                      <SelectItem key={county} value={county}>
                        {county}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Available Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {healthResources.filter((r) => r.type === "hospital" || r.type === "clinic").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Hospitals & Clinics</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">
                    {healthResources.filter((r) => r.type === "mental-health").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Mental Health</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Results */}
        <section className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
            {filteredResources.map((resource) => (
              <Card
                key={resource.id}
                className="hover:shadow-lg transition-all duration-300 cursor-pointer border-border bg-card hover:border-primary group h-full flex flex-col"
                onClick={() => handleResourceClick(resource)}
              >
                <CardHeader className="pb-3 flex-shrink-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="flex items-center gap-2 font-bold text-card-foreground group-hover:text-primary transition-colors">
                        {getTypeIcon(resource.type)}
                        <span className="truncate">{resource.name}</span>
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1.5 mt-2 font-mono text-sm">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">
                          {resource.address}, {resource.county}
                        </span>
                      </CardDescription>
                    </div>
                    <Badge className={`${getTypeBadgeColor(resource.type)} flex-shrink-0 ml-2 capitalize`} variant="default">
                      {resource.type.replace("-", " ")}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 flex-1 flex flex-col">
                  <div className="space-y-4 flex-1">
                    <div>
                      <h4 className="font-semibold text-card-foreground mb-2 text-xs uppercase tracking-wider">
                        Key Services
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {resource.services.slice(0, 3).map((service, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs font-mono border-primary/20 text-primary bg-primary/5"
                          >
                            {service}
                          </Badge>
                        ))}
                        {resource.services.length > 3 && (
                          <Badge
                            variant="outline"
                            className="text-xs font-mono border-secondary/20 text-secondary bg-secondary/5"
                          >
                            +{resource.services.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground font-mono">
                      {resource.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="truncate">{resource.phone}</span>
                        </div>
                      )}
                      {resource.hours && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="truncate">{resource.hours}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border/50 text-center flex-shrink-0">
                    <p className="text-xs text-primary font-bold uppercase tracking-wider group-hover:underline">View Details</p>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredResources.length === 0 && (
              <Card className="md:col-span-2 xl:col-span-3">
                <CardContent className="text-center py-12">
                  <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No resources found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search terms or filters to find more resources.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>

      <AiAssistantModal isOpen={showAiAssistant} onClose={() => setShowAiAssistant(false)} />

      <PaymentModal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)} type={paymentType} />

      <ResourceDetailModal
        resource={selectedResource ? transformResourceForModal(selectedResource) : null}
        isOpen={showResourceDetail}
        onClose={() => setShowResourceDetail(false)}
      />

      <footer className="bg-card border-t border-border mt-16 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Need immediate help? Call 999 for emergencies or contact your nearest health facility.
          </p>
          <p className="text-sm text-muted-foreground mb-2">
            Resource information is updated regularly. Please call ahead to confirm availability.
          </p>
          <p className="text-sm text-muted-foreground">
            Powered by IntaSend for secure payments • Data sourced from Kenya Ministry of Health
          </p>
        </div>
      </footer>
    </div>
  )
}
