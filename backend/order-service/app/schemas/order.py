from pydantic import BaseModel
from datetime import datetime


class OrderItemCreate(BaseModel):
    product_id: int
    product_name: str
    quantity: int
    price: float


class OrderCreate(BaseModel):
    user_id: int
    items: list[OrderItemCreate]


class OrderItemResponse(OrderItemCreate):
    id: int

    class Config:
        from_attributes = True


class OrderResponse(BaseModel):
    id: int
    user_id: int
    status: str
    total_price: float
    created_at: datetime
    items: list[OrderItemResponse]

    class Config:
        from_attributes = True