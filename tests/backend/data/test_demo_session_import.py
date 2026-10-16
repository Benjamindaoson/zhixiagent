"""The published example archives must still load their server-side tables."""

import io
from pathlib import Path

from data_formulator.datalake.workspace import Workspace
from data_formulator.datalake.workspace_manager import WorkspaceManager


def test_stock_demo_import_keeps_table_metadata(tmp_path):
    archive = Path(__file__).resolve().parents[3] / "public" / "demos" / "demo_stock-prices.zip"
    workspace = Workspace("stock-demo", root_dir=tmp_path)

    workspace.import_session_zip(io.BytesIO(archive.read_bytes()))

    assert "history" in workspace.list_tables()
    assert workspace.get_table_metadata("history").row_count == 738
    assert workspace.read_data_as_df("history").shape[0] == 738


def test_stock_demo_import_through_workspace_manager_survives_reopen(tmp_path):
    archive = Path(__file__).resolve().parents[3] / "public" / "demos" / "demo_stock-prices.zip"
    manager = WorkspaceManager(tmp_path)
    workspace = manager.create_and_open_workspace("stock-demo", "local:test")

    workspace.import_session_zip(io.BytesIO(archive.read_bytes()))

    reopened = manager.open_workspace("stock-demo", "local:test")
    assert "history" in reopened.list_tables()
    assert reopened.read_data_as_df("history").shape[0] == 738
