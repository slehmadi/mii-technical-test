from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.order import OrderCreate, OrderResponse
from app.services.order_service import create_order, get_orders, get_order

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)


@router.post(
    "/",
    response_model=OrderResponse,
    status_code=status.HTTP_201_CREATED
)
def create_new_order(order_data: OrderCreate, db: Session = Depends(get_db)):

    return create_order(db, order_data)


@router.get(
    "/user/{user_id}",
    response_model=list[OrderResponse]
)
def list_orders(user_id: int, db: Session = Depends(get_db)):
    
    return get_orders(db, user_id)


@router.get(
    "/{order_id}",
    response_model=OrderResponse
)
def order_detail(order_id: int, db: Session = Depends(get_db)):
    order = get_order(db, order_id)

    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )

    return order