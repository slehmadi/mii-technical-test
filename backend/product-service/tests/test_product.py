def test_create_product(client):
    response = client.post(
        "/products/",
        json={
            "name": "Laptop Gaming",
            "description": "RTX 5070",
            "price": 15000000,
            "image_url": "https://placehold.co/300x220",
            "category": "Laptop"
        }
    )

    assert response.status_code == 201

    data = response.json()

    assert data["name"] == "Laptop Gaming"
    assert data["price"] == 15000000

def test_get_products(client):
    client.post(
        "/products/",
        json={
            "name": "Laptop Gaming",
            "description": "RTX 5070",
            "price": 15000000,
            "image_url": "https://placehold.co/300x220",
            "category": "Laptop"
        }
    )

    response = client.get("/products/")

    assert response.status_code == 200

    data = response.json()

    assert len(data) == 1

def test_get_product_detail(client):
    create_response = client.post(
        "/products/",
        json={
            "name": "Laptop Gaming",
            "description": "RTX 5070",
            "price": 15000000,
            "image_url": "https://placehold.co/300x220",
            "category": "Laptop"
        }
    )

    product_id = create_response.json()["id"]

    response = client.get(f"/products/{product_id}")

    assert response.status_code == 200

    data = response.json()

    assert data["id"] == product_id

def test_delete_product(client):
    create_response = client.post(
        "/products/",
        json={
            "name": "Laptop Gaming",
            "description": "RTX 5070",
            "price": 15000000,
            "image_url": "https://placehold.co/300x220",
            "category": "Laptop"
        }
    )

    product_id = create_response.json()["id"]

    response = client.delete(
        f"/products/{product_id}"
    )

    assert response.status_code == 200

    assert response.json()["message"] == "Product deleted"



def test_product_not_found(client):
    response = client.get("/products/999")

    assert response.status_code == 404