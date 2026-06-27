from pydantic import BaseModel

class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    image_url: str | None = None
    category: str | None = None

class ProductCreate(ProductBase):
    pass

class ProductUpdate(ProductBase):
    pass

class ProductResponse(ProductBase):
    id: int

    class Config:
        from_attributes = True