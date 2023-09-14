import { getServerSession } from "next-auth/next"
import { options } from "../../../../../app/bucket/options"
import { NextRequest, NextResponse } from "next/server"
import { readCollectionItems } from "../../s3/util"
import { CollectionItemData } from "../../../../../app/bucket/src/types"

export async function GET(req: NextRequest) {
  const collectionName = req.nextUrl.searchParams.get("collectionName")
  const token = req.nextUrl.searchParams.get("token") || undefined

  const session = await getServerSession(options)
  console.log("process.env.USE_SANDBOX" + process.env.USE_SANDBOX)

  if (process.env.USE_SANDBOX === "true") {
    console.log("collections/read", { session })
  }

  if (!collectionName) {
    return NextResponse.json({ error: "Collection name is required as a query parameter" }, { status: 400 })
  }

  try {
    const items: CollectionItemData[] = await readCollectionItems(collectionName, token)
    return NextResponse.json({ items }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: `Failed to retrieve items for collection ${collectionName}: ${String(error)}` }, { status: 500 })
  }
}
