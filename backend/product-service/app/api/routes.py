from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.database import get_db

from app.schemas.product import (
    ProductCreate,
    ProductResponse
)

from app.services.product_service import (
    get_products,
    get_product,
    create_product,
    update_product,
    delete_product
)

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


@router.get(
    "/",
    response_model=list[ProductResponse]
)
def list_products(db: Session = Depends(get_db)):
    return get_products(db)


@router.get(
    "/{product_id}",
    response_model=ProductResponse
)
def detail_product(product_id: int, db: Session = Depends(get_db)):
    product = get_product(db, product_id)

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )

    return product


@router.post(
    "/",
    response_model=ProductResponse,
    status_code=status.HTTP_201_CREATED
)
def create_new_product(product_data: ProductCreate, db: Session = Depends(get_db)):
    return create_product(db, product_data)


@router.put(
    "/{product_id}",
    response_model=ProductResponse
)
def edit_product(
    product_id: int,
    product_data: ProductCreate,
    db: Session = Depends(get_db)
):
    product = update_product(
        db,
        product_id,
        product_data
    )

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )

    return product


@router.delete(
    "/{product_id}"
)
def remove_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    success = delete_product(
        db,
        product_id
    )

    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )

    return {"message": "Product deleted"}