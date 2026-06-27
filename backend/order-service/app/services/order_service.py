from sqlalchemy.orm import Session

from app.db.models import Order, OrderItem


def create_order(db: Session, order_data):
    total = sum(item.quantity * item.price for item in order_data.items)

    order = Order(user_id=order_data.user_id, total_price=total)

    db.add(order)
    db.commit()
    db.refresh(order)

    for item in order_data.items:
        order_item = OrderItem(
            order_id=order.id,
            product_id=item.product_id,
            product_name=item.product_name,
            quantity=item.quantity,
            price=item.price
        )

        db.add(order_item)

    db.commit()
    db.refresh(order)

    return order


def get_orders(db: Session, user_id: int):

    return (
        db.query(Order)
        .filter(Order.user_id == user_id)
        .all()
    )


def get_order(db: Session, order_id: int):
    
    return (
        db.query(Order)
        .filter(Order.id == order_id)
        .first()
    )