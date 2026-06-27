
def test_register_user(client):
    response = client.post(
        "/auth/register",
        json={
            "username": "pytest_user",
            "email": "pytest@email.com",
            "password": "password123"
        }
    )
    assert response.status_code == 201

    data = response.json()
    assert data["username"] == "pytest_user"
    assert data["email"] == "pytest@email.com"

def test_login_user(client):
    client.post(
        "/auth/register",
        json={
            "username": "pytest_user",
            "email": "pytest@email.com",
            "password": "password123"
        }
    )

    response = client.post(
        "/auth/login",
        json={
            "email": "pytest@email.com",
            "password": "password123"
        }
    )
    assert response.status_code == 200

    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_get_profile(client):
    client.post(
        "/auth/register",
        json={
            "username": "pytest_user",
            "email": "pytest@email.com",
            "password": "password123"
        }
    )

    login_response = client.post(
        "/auth/login",
        json={
            "email": "pytest@email.com",
            "password": "password123"
        }
    )

    data = login_response.json()
    access_token = data["access_token"]

    response = client.get(
        "/auth/profile",
        headers={
            "Authorization": f"Bearer {access_token}"
        }
    )
    assert response.status_code == 200

    profile_data = response.json()
    assert profile_data["username"] == "pytest_user"
    assert profile_data["email"] == "pytest@email.com"