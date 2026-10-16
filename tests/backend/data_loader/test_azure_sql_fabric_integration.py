"""Contract checks for the Azure SQL and Fabric branch after the dev registry merge."""

import logging
import sys
from types import SimpleNamespace
from unittest.mock import Mock

import pyarrow as pa
import pytest

from data_formulator.data_loader import DATA_LOADERS
from data_formulator.data_loader.azure_sql_data_loader import AzureSQLDataLoader
from data_formulator.data_loader.fabric_lakehouse_data_loader import FabricLakehouseDataLoader

pytestmark = [pytest.mark.backend]


@pytest.mark.parametrize("key,loader", [
    ("azure_sql", AzureSQLDataLoader),
    ("fabric_lakehouse", FabricLakehouseDataLoader),
])
def test_connectors_registered_and_mark_secrets_sensitive(key, loader):
    assert DATA_LOADERS[key] is loader
    params = {item["name"]: item for item in loader.list_params()}
    assert params["client_secret"]["sensitive"] is True
    if key == "azure_sql":
        assert params["password"]["sensitive"] is True


@pytest.mark.parametrize("loader", [AzureSQLDataLoader, FabricLakehouseDataLoader])
def test_bounded_query_quotes_identifiers_and_orders_at_top_level(loader):
    instance = object.__new__(loader)
    instance._safe_select_list = Mock(return_value="*")
    instance._execute_query = Mock(return_value=pa.table({"value": [1]}))
    result = instance.fetch_data_as_arrow("sales.odd]table", size=20,
                                           sort_columns=["day]name"], sort_order="desc")
    assert result.num_rows == 1
    query = instance._execute_query.call_args.args[0]
    assert query == "SELECT TOP 20 * FROM [sales].[odd]]table] ORDER BY [day]]name] DESC"


@pytest.mark.parametrize("loader", [AzureSQLDataLoader, FabricLakehouseDataLoader])
@pytest.mark.parametrize("size", [0, -1, 1000001, "10", True])
def test_invalid_query_limit_is_rejected(loader, size):
    instance = object.__new__(loader)
    with pytest.raises(ValueError, match="size"):
        instance.fetch_data_as_arrow("sales.orders", size=size)


def test_sql_auth_connection_failure_does_not_log_password(monkeypatch, caplog):
    secret = "private-pass-123"
    def fail(*args, **kwargs):
        raise RuntimeError(f"connection URL contains {secret}")
    monkeypatch.setitem(sys.modules, "connectorx", SimpleNamespace(read_sql=fail))
    with caplog.at_level(logging.INFO), pytest.raises(ValueError, match="Failed to connect") as exc:
        AzureSQLDataLoader({"server": "example.database.windows.net", "database": "sales",
                            "user": "analyst", "password": secret})
    assert secret not in str(exc.value)
    assert secret not in caplog.text
