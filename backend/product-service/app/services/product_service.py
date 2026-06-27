from sqlalchemy.orm import Session

from app.db.models import Product
from app.schemas.product import ProductCreate


def get_products(db: Session):
    return db.query(Product).all()


def get_product(db: Session, product_id: int):
    return (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )


def create_product(db: Session, product_data: ProductCreate):
    new_product = Product(**product_data.model_dump())

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product


def update_product(db: Session, product_id: int, product_data: ProductCreate):
    product = get_product(db, product_id)

    if not product:
        return None

    for key, value in product_data.model_dump().items():
        setattr(product, key, value)

    db.commit()
    db.refresh(product)

    return product


def delete_product(db: Session, product_id: int):
    product = get_product(db, product_id)

    if not product:
        return False

    db.delete(product)
    db.commit()

    return True