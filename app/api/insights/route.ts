import { insights } from "@/lib/cms";

// FUTURE: public JSON endpoint for the insights feed (also a place to add webhooks / admin writes).
export const dynamic = "force-static"; // remove when the data becomes dynamic
export async function GET() {
  return Response.json(await insights.list());
}
