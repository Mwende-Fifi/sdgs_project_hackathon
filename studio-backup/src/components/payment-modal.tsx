"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, CreditCard, Smartphone, CheckCircle, AlertCircle } from "lucide-react"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  type: "donation" | "premium"
}

export function PaymentModal({ isOpen, onClose, type }: PaymentModalProps) {
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "success" | "error">("idle")

  const predefinedAmounts = type === "donation" ? ["500", "1000", "2000", "5000"] : ["1500", "3000"]

  const handlePayment = async () => {
    if (!amount || !email || !paymentMethod) return

    setIsProcessing(true)
    setPaymentStatus("idle")

    try {
      // Simulate IntaSend payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setPaymentStatus("success")
    } catch (error) {
      setPaymentStatus("error")
    } finally {
      setIsProcessing(false)
    }
  }

  const resetModal = () => {
    setAmount("")
    setPaymentMethod("")
    setEmail("")
    setPhone("")
    setPaymentStatus("idle")
    setIsProcessing(false)
    onClose()
  }

  if (paymentStatus === "success") {
    return (
      <Dialog open={isOpen} onOpenChange={resetModal}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Payment Successful!</h3>
            <p className="text-muted-foreground mb-4">
              {type === "donation"
                ? "Thank you for supporting healthcare access in Kenya!"
                : "Welcome to Premium! You now have access to advanced features."}
            </p>
            <Button onClick={resetModal}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (paymentStatus === "error") {
    return (
      <Dialog open={isOpen} onOpenChange={resetModal}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-6">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Payment Failed</h3>
            <p className="text-muted-foreground mb-4">There was an issue processing your payment. Please try again.</p>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" onClick={() => setPaymentStatus("idle")}>
                Try Again
              </Button>
              <Button onClick={resetModal}>Close</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {type === "donation" ? (
              <>
                <Heart className="h-5 w-5 text-red-500" />
                Support Healthcare Access
              </>
            ) : (
              <>
                <CreditCard className="h-5 w-5 text-primary" />
                Upgrade to Premium
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {type === "donation"
              ? "Help us maintain and improve this platform to serve more communities across Kenya."
              : "Get access to advanced features including detailed analytics, priority support, and premium resources."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {type === "premium" && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Premium Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Advanced search and filtering</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Real-time availability updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Priority customer support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Appointment booking integration</span>
                </div>
              </CardContent>
            </Card>
          )}

          <div>
            <Label htmlFor="amount">Amount (KES)</Label>
            <div className="space-y-3">
              <div className="flex gap-2 flex-wrap">
                {predefinedAmounts.map((preAmount) => (
                  <Button
                    key={preAmount}
                    variant={amount === preAmount ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAmount(preAmount)}
                  >
                    KES {preAmount}
                  </Button>
                ))}
              </div>
              <Input
                id="amount"
                placeholder="Enter custom amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="payment-method">Payment Method</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mpesa">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    M-Pesa
                  </div>
                </SelectItem>
                <SelectItem value="card">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Credit/Debit Card
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="254712345678" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>

          {paymentMethod === "mpesa" && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Smartphone className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">M-Pesa Payment</h4>
                  <p className="text-sm text-blue-700">
                    You will receive an STK push notification on your phone to complete the payment.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              onClick={handlePayment}
              disabled={!amount || !email || !paymentMethod || isProcessing}
              className="flex-1"
            >
              {isProcessing ? "Processing..." : `Pay KES ${amount || "0"}`}
            </Button>
          </div>

          <div className="text-xs text-muted-foreground text-center">
            Payments are processed securely through IntaSend. Your information is protected.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
