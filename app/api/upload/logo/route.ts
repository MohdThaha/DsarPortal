import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get("file") as File

  if (!file) {
    return NextResponse.json({ error: "Logo missing" }, { status: 400 })
  }

  const path = `logos/${crypto.randomUUID()}-${file.name}`

  const { error } = await supabase.storage
    .from("company-logos")
    .upload(path, file)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const { data } = supabase.storage
    .from("company-logos")
    .getPublicUrl(path)

  return NextResponse.json({ url: data.publicUrl })
}
