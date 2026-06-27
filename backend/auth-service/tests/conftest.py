import pytest
import os

from fastapi.testclient import TestClient

os.environ['TESTING'] = "1"

from app.main import app
from app.db.database import Base, get_db

from tests.test_database import (
    engine,
    override_get_db
)


app.dependency_overrides[get_db] = override_get_db


@pytest.fixture(scope="function")
def client():
    Base.metadata.create_all(bind=engine)

    with TestClient(app) as c:
        yield c

    Base.metadata.drop_all(bind=engine)