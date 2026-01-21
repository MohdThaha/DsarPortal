export const runtime = "nodejs"

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { v4 as uuid } from "uuid"

export async function POST(req: Request) {
  try {
    // 🚨 Guard: Supabase not configured
    if (
      !process.env.SUPABASE_URL ||
      !process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      return NextResponse.json(
        {
          error:
            "Logo upload is disabled. Supabase environment variables are not configured.",
        },
        { status: 503 }
      )
    }

    // ✅ Create Supabase client ONLY at runtime
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const formData = await req.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      )
    }

    // Basic validation
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed" },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const fileExt = file.name.split(".").pop()
    const fileName = `${uuid()}.${fileExt}`

    const { error } = await supabase.storage
      .from("company-logos")
      .upload(`logos/${fileName}`, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (error) {
      console.error("Supabase upload error:", error)
      return NextResponse.json(
        { error: "Failed to upload logo" },
        { status: 500 }
      )
    }

    const { data } = supabase.storage
      .from("company-logos")
      .getPublicUrl(`logos/${fileName}`)

    return NextResponse.json({
      success: true,
      url: data.publicUrl,
    })
  } catch (err) {
    console.error("Upload error:", err)

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
