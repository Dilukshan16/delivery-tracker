from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Literal
import random
import string
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ShipmentCreate(BaseModel):
    carrier: Literal["fedex", "dhl"]
    destination: str

class Shipment(ShipmentCreate):
    id: int
    tracking_number: str
    status: str = "pending"

shipments = []
#Endpoints

@app.post("/shipments", response_model=Shipment)
async def create_shipment(shipment: ShipmentCreate):
    new_id = len(shipments) + 1
    new_shipment = Shipment(
        id=new_id,
        tracking_number=''.join(random.choices(string.ascii_uppercase + string.digits, k=10)),
        **shipment.dict(),
        status="pending"
    )
    shipments.append(new_shipment)
    return new_shipment

@app.get("/shipments", response_model=List[Shipment])
async def get_shipments():
    return shipments[-10:]  # Return last 10 shipments

@app.put("/shipments/{id}/status", response_model=Shipment)
async def update_status(id: int):
    shipment = next((s for s in shipments if s.id == id), None)
    if not shipment:
        raise HTTPException(status_code=404, detail="Shipment not found")
    
    status_options = ["in_transit", "delivered", "failed"]
    probabilities = {"fedex": 0.8, "dhl": 0.7}
    
    if random.random() < probabilities[shipment.carrier]:
        shipment.status = "delivered"
    else:
        shipment.status = random.choice([s for s in status_options if s != "delivered"])
    
    return shipment

@app.get("/metrics")
async def get_metrics():
    total = len(shipments)
    delivered = len([s for s in shipments if s.status == "delivered"])
    return {
        "total": total,
        "delivered": delivered,
        "success_rate": delivered / total if total > 0 else 0
    }