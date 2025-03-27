'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { z } from 'zod'

const shipmentSchema = z.object({
  carrier: z.enum(["fedex", "dhl"]),
  destination: z.string().min(1, "Destination is required")
})

interface ShipmentFormProps {
  onSuccess: () => void
}

export function ShipmentForm({ onSuccess }: ShipmentFormProps) {
  const [carrier, setCarrier] = useState('')
  const [destination, setDestination] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const validated = shipmentSchema.parse({
        carrier: carrier.toLowerCase(),
        destination
      })

      const response = await fetch('http://localhost:8000/shipments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated),
      })

      if (!response.ok) {
        const errorData = await response.json()
        const errorMessage = errorData.detail || 'Failed to create shipment'
        throw new Error(Array.isArray(errorMessage) 
          ? errorMessage.map(e => e.msg).join(', ')
          : errorMessage)
      }

      toast.success('Shipment created successfully')
      setCarrier('')
      setDestination('')
      onSuccess()
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors.map(e => e.message).join(', '))
      } else {
        toast.error(error.message || 'An unexpected error occurred')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select 
        onValueChange={setCarrier} 
        value={carrier}
        disabled={isSubmitting}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select carrier" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="fedex">FedEx</SelectItem>
          <SelectItem value="dhl">DHL</SelectItem>
        </SelectContent>
      </Select>
      
      <Input
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        disabled={isSubmitting}
      />
      
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Shipment'}
      </Button>
    </form>
  )
}