import { useEffect, useState, useRef } from "react";
import { tokens } from "../styles/tokens";
import adminApi from "../api/adminApi";
import { AdminTable, Pagination } from "../components/AdminTable";
import { useToast } from "../components/AdminToast";
import { Upload, Database, Search } from "lucide-react";

export default function Registry() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [importResult, setImportResult] = useState(null);
  const fileRef = useRef(null);
  const { addToast } = useToast();

  const load = (p = page, s = search) => {
    setLoading(true);
    adminApi.get("/admin/registry", { params: { page: p, page_size: 20, search: s || undefined } })
      .then((r) => setData(r.data))
      .catch(() => addToast("Failed to load registry", "error"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".csv")) {
      addToast("Please select a .csv file", "error");
      return;
    }

    setUploading(true);
    setImportResult(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await adminApi.post("/admin/registry/import", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImportResult(res.data);
      addToast(`Import complete: ${res.data.imported} new, ${res.data.updated} updated`, "success");
      load(1, search);
    } catch (err) {
      addToast(err.response?.data?.detail || "Import failed", "error");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const columns = [
    { key: "register_number", label: "REG NO", render: (r) => <span style={{ fontFamily: tokens.fontMono, fontSize: 12 }}>{r.register_number}</span> },
    { key: "full_name", label: "NAME" },
    { key: "official_email", label: "EMAIL" },
    { key: "university", label: "UNIVERSITY" },
    { key: "college", label: "COLLEGE" },
    { key: "department", label: "DEPT" },
  ];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <Database size={24} style={{ color: tokens.primary }} />
        <h1 style={{ fontFamily: tokens.fontDisplay, fontSize: 28, fontWeight: 800, color: tokens.textPrimary, margin: 0 }}>
          Student Registry
        </h1>
      </div>

      {/* Upload Section */}
      <div style={{
        background: tokens.surface,
        border: `1px solid ${tokens.border}`,
        borderRadius: tokens.radius.lg,
        padding: 20,
        marginBottom: 20,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: tokens.textPrimary, fontFamily: tokens.fontBody, marginBottom: 4 }}>
              Import CSV
            </div>
            <div style={{ fontSize: 12, color: tokens.textMuted, fontFamily: tokens.fontBody }}>
              Columns: name, register_no, email, university, college, department
            </div>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept=".csv"
            onChange={handleUpload}
            style={{ display: "none" }}
            id="registry-csv-upload"
          />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "8px 20px",
              background: uploading ? tokens.border : tokens.primary,
              border: "none",
              borderRadius: tokens.radius.md,
              color: uploading ? tokens.textDisabled : "#fff",
              cursor: uploading ? "not-allowed" : "pointer",
              fontSize: 13, fontFamily: tokens.fontBody,
            }}
          >
            <Upload size={14} />
            {uploading ? "Uploading…" : "Upload CSV"}
          </button>
        </div>

        {/* Import result summary */}
        {importResult && (
          <div style={{
            marginTop: 16, padding: 12,
            background: tokens.bgElevated,
            border: `1px solid ${tokens.border}`,
            borderRadius: tokens.radius.md,
            fontSize: 12, fontFamily: tokens.fontMono, color: tokens.textSecondary,
          }}>
            <span style={{ color: tokens.primary }}>✓ Imported: {importResult.imported}</span>
            {" | "}
            <span style={{ color: tokens.warning }}>↻ Updated: {importResult.updated}</span>
            {" | "}
            <span style={{ color: tokens.textMuted }}>⊘ Skipped: {importResult.skipped}</span>
            {importResult.errors?.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <div style={{ color: tokens.danger, marginBottom: 4 }}>Errors:</div>
                {importResult.errors.slice(0, 10).map((err, i) => (
                  <div key={i} style={{ color: tokens.textMuted, marginLeft: 8 }}>
                    Row {err.row}: {err.reason}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Search */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <div style={{ flex: 1, position: "relative" }}>
          <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: tokens.textMuted }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (setPage(1), load(1, search))}
            placeholder="Search by register no, name, email, or department…"
            style={{
              width: "100%", padding: "8px 14px 8px 34px",
              background: tokens.surface,
              border: `1px solid ${tokens.border}`,
              borderRadius: tokens.radius.md,
              color: tokens.textPrimary,
              fontSize: 13, outline: "none",
              fontFamily: tokens.fontBody,
              boxSizing: "border-box",
            }}
          />
        </div>
        <button
          onClick={() => { setPage(1); load(1, search); }}
          style={{
            padding: "8px 16px",
            background: tokens.primary,
            border: "none",
            borderRadius: tokens.radius.md,
            color: "#fff",
            cursor: "pointer",
            fontSize: 13,
            fontFamily: tokens.fontBody,
          }}
        >
          Search
        </button>
      </div>

      {/* Table */}
      <div style={{ background: tokens.surface, border: `1px solid ${tokens.border}`, borderRadius: tokens.radius.lg, overflow: "hidden" }}>
        <AdminTable columns={columns} rows={data?.items || []} loading={loading} />
      </div>

      {data && <Pagination page={page} totalPages={data.total_pages} onChange={(p) => { setPage(p); load(p, search); }} />}

      {/* Total count */}
      {data && (
        <div style={{ textAlign: "center", marginTop: 8, fontSize: 11, color: tokens.textMuted, fontFamily: tokens.fontMono }}>
          {data.total} record{data.total !== 1 ? "s" : ""} in registry
        </div>
      )}
    </div>
  );
}
