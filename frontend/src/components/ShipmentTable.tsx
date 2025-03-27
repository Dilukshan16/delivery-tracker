'use client'

import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface ShipmentTableProps {
  shipments: Array<{
    id: number
    tracking_number: string
    carrier: string
    status: string
    destination: string
  }>
}

export function ShipmentTable({ shipments }: ShipmentTableProps) {
  const statusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'default'
      case 'failed': return 'destructive'
      default: return 'secondary'
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tracking #</TableHead>
          <TableHead>Carrier</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Destination</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {shipments.length > 0 ? (
          shipments.map((shipment) => (
            <TableRow key={shipment.id}>
              <TableCell className="font-medium">{shipment.tracking_number}</TableCell>
              <TableCell>{shipment.carrier.toUpperCase()}</TableCell>
              <TableCell>
                <Badge variant={statusVariant(shipment.status)}>
                  {shipment.status.replace('_', ' ').toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell>{shipment.destination}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center h-24">
              No shipments found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}