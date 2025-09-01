export interface IntaSendPaymentRequest {
  amount: number
  currency: string
  email: string
  phone_number?: string
  card_details?: {
    number: string
    expiry_month: string
    expiry_year: string
    cvc: string
  }
  api_ref?: string
  redirect_url?: string
  method?: "M-PESA" | "CARD" | "BANK"
}

export interface IntaSendPaymentResponse {
  invoice: {
    invoice_id: string
    state: string
    provider: string
    charges: number
    net_amount: number
    currency: string
    value: number
    account: string
    api_ref: string
    host: string
    failed_reason: string | null
    failed_code: string | null
    created_at: string
    updated_at: string
  }
  meta: {
    id: string
    customer: {
      customer_id: string
      phone_number: string
      email: string
      first_name: string
      last_name: string
      country: string
    }
  }
}

export class IntaSendClient {
  private baseUrl = "https://sandbox.intasend.com/api/v1"
  private publishableKey: string

  constructor(publishableKey: string) {
    this.publishableKey = publishableKey
  }

  async initiatePayment(paymentData: IntaSendPaymentRequest): Promise<IntaSendPaymentResponse> {
    try {
      const endpoint =
        paymentData.method === "CARD" ? `${this.baseUrl}/payment/card-payment/` : `${this.baseUrl}/payment/collection/`

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-IntaSend-Public-Key-Test": this.publishableKey,
        },
        body: JSON.stringify({
          ...paymentData,
          method: paymentData.method || "M-PESA",
        }),
      })

      if (!response.ok) {
        throw new Error(`Payment initiation failed: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("IntaSend payment error:", error)
      throw error
    }
  }

  async checkPaymentStatus(invoiceId: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/payment/status/${invoiceId}/`, {
        headers: {
          "X-IntaSend-Public-Key-Test": this.publishableKey,
        },
      })

      if (!response.ok) {
        throw new Error(`Status check failed: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("IntaSend status check error:", error)
      throw error
    }
  }

  async getSupportedMethods(country = "KE"): Promise<string[]> {
    const methods: Record<string, string[]> = {
      KE: ["M-PESA", "CARD", "BANK"],
      UG: ["MTN", "AIRTEL", "CARD"],
      TZ: ["TIGO", "VODACOM", "CARD"],
      INTERNATIONAL: ["CARD"],
    }
    return methods[country] || methods["INTERNATIONAL"]
  }
}

export const intaSendClient = new IntaSendClient(
  process.env.NEXT_PUBLIC_INTASEND_PUBLISHABLE_KEY || "ISPubKey_test_39c6a0b7-7921-4abd-b5c5-c936f75e346a",
)
