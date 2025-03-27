'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShipmentTable } from '@/components/ShipmentTable'
import { ShipmentForm } from '@/components/ShipmentForm'

interface Shipment {
  id: number
  carrier: string
  status: string
  destination: string
  tracking_number: string
}

export default function Home() {
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [metrics, setMetrics] = useState({ 
    total: 0, 
    delivered: 0, 
    success_rate: 0 
  })

  const refreshData = async () => {
    try {
      const [shipmentsRes, metricsRes] = await Promise.all([
        fetch('http://localhost:8000/shipments'),
        fetch('http://localhost:8000/metrics')
      ])
      
      const shipmentsData = await shipmentsRes.json()
      const metricsData = await metricsRes.json()
      
      setShipments(shipmentsData.reverse())
      setMetrics(metricsData)
    } catch (error) {
      console.error('Error refreshing data:', error)
    }
  }

  useEffect(() => {
    refreshData()
  }, [])

  return (
    <main className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Shipment Tracker</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Shipments</p>
            <p className="text-2xl font-bold">{metrics.total}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Delivered</p>
            <p className="text-2xl font-bold">{metrics.delivered}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Success Rate</p>
            <p className="text-2xl font-bold">
              {(metrics.success_rate * 100).toFixed(1)}%
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Create New Shipment</CardTitle>
        </CardHeader>
        <CardContent>
          <ShipmentForm onSuccess={refreshData} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Shipments</CardTitle>
        </CardHeader>
        <CardContent>
          <ShipmentTable shipments={shipments} />
        </CardContent>
      </Card>
    </main>
  )
}