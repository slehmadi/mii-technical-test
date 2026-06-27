def test_create_order(client):
    response = client.post(
        "/orders/",
        json={
            "user_id": 1,
            "items": [
                {
                    "product_id": 1,
                    "product_name": "Laptop",
                    "quantity": 2,
                    "price": 10000000
                }
            ]
        }
    )

    assert response.status_code == 201

    data = response.json()

    assert data["user_id"] == 1
    assert data["total_price"] == 20000000

def test_get_orders(client):
    create_order_response = client.post(
        "/orders/",
        json={
            "user_id": 1,
            "items": [
                {
                    "product_id": 1,
                    "product_name": "Laptop",
                    "quantity": 1,
                    "price": 10000000
                }
            ]
        }
    )

    create_data = create_order_response.json()
    response = client.get(f"/orders/user/{create_data['user_id']}")

    assert response.status_code == 200

    data = response.json()

    assert len(data) == 1

def test_get_order_detail(client):
    create_response = client.post(
        "/orders/",
        json={
            "user_id": 1,
            "items": [
                {
                    "product_id": 1,
                    "product_name": "Laptop",
                    "quantity": 1,
                    "price": 10000000
                }
            ]
        }
    )

    order_id = create_response.json()["id"]
    response = client.get(f"/orders/{order_id}")

    assert response.status_code == 200

    assert response.json()["id"] == order_id

def test_order_not_found(client):
    response = client.get("/orders/9999")

    assert response.status_code == 404
    assert response.json() == {"detail": "Order not found"}