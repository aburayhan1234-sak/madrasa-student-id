import { getStore } from "@netlify/blobs";
import { timingSafeEqual } from "node:crypto";

const STORE = getStore("madrasa-student-public-records");
const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store, max-age=0" }
});
function sameSecret(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const aa = Buffer.from(a), bb = Buffer.from(b);
  return aa.length === bb.length && timingSafeEqual(aa, bb);
}
export default async (request) => {
  const url = new URL(request.url);
  if (request.method === "GET") {
    const publicId = url.searchParams.get("id") || "";
    if (!/^[a-f0-9]{32}$/i.test(publicId)) return json({ error: "Invalid student ID" }, 400);
    try {
      const record = await STORE.get(`student:${publicId}`, { type: "json", consistency: "strong" });
      if (!record) return json({ error: "Student not found" }, 404);
      return json({
        schoolName: record.schoolName || "", name: record.name || "", father: record.father || "",
        photo: record.photo || "", idNumber: record.idNumber || "", roll: record.roll || "",
        department: record.department || "", year: record.year || ""
      });
    } catch (error) { console.error("Student read failed:", error); return json({ error: "Unable to read student data" }, 500); }
  }
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
  const expectedToken = process.env.STUDENT_ADMIN_TOKEN || "";
  const suppliedToken = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!expectedToken) return json({ error: "STUDENT_ADMIN_TOKEN is not configured in Netlify" }, 503);
  if (!sameSecret(suppliedToken, expectedToken)) return json({ error: "Unauthorized" }, 401);
  try {
    const raw = await request.text();
    if (Buffer.byteLength(raw, "utf8") > 2500000) return json({ error: "Student record is too large" }, 413);
    const body = JSON.parse(raw), publicId = String(body.publicId || "");
    if (!/^[a-f0-9]{32}$/i.test(publicId)) return json({ error: "Invalid public ID" }, 400);
    const photo = typeof body.photo === "string" ? body.photo : "";
    if (photo && (!/^data:image\/(jpeg|png|webp);base64,/i.test(photo) || photo.length > 2000000)) return json({ error: "Invalid photo" }, 400);
    const record = {
      schoolName: String(body.schoolName || "").slice(0,160), name: String(body.name || "").slice(0,160),
      father: String(body.father || "").slice(0,160), photo, idNumber: String(body.idNumber || "").slice(0,100),
      roll: String(body.roll || "").slice(0,80), department: String(body.department || "").slice(0,120),
      year: String(body.year || "").slice(0,80)
    };
    if (!record.name || !record.roll) return json({ error: "Student name and roll are required" }, 400);
    await STORE.setJSON(`student:${publicId}`, record);
    return json({ success: true });
  } catch (error) { console.error("Student save failed:", error); return json({ error: "Unable to save student data" }, 500); }
};
