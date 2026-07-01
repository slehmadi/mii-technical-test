from opentelemetry import trace

from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider

from opentelemetry.sdk.trace.export import (
    BatchSpanProcessor,
    ConsoleSpanExporter,
)

from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
from opentelemetry.instrumentation.requests import RequestsInstrumentor
from opentelemetry.instrumentation.sqlalchemy import SQLAlchemyInstrumentor


def setup_tracing(app, engine, service_name: str):

    resource = Resource.create({
        "service.name": service_name
    })

    provider = TracerProvider(resource=resource)

    processor = BatchSpanProcessor(
        ConsoleSpanExporter()
    )

    provider.add_span_processor(processor)

    trace.set_tracer_provider(provider)

    FastAPIInstrumentor.instrument_app(app)

    RequestsInstrumentor().instrument()

    SQLAlchemyInstrumentor().instrument(
        engine=engine
    )