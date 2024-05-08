import { db } from "@/server/db";
import { journal } from "@/server/db/schema";

export async function GET(req: Request) {
    try {
        db.select().from(journal);
        return new Response(JSON.stringify({ ok: true }));
    } catch (e) {
        return new Response(JSON.stringify({ ok: false }));
    }
}