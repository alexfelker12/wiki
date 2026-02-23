import { db } from "@/lib/db"


type FindRomHackBySlugReturn = Awaited<ReturnType<typeof findRomHackBySlug>>

const findRomHackBySlug = async ({ slug }: { slug: string }) => {
  return await db.romHack.findUnique({
    where: { slug }
  })
}

export {
  findRomHackBySlug, type FindRomHackBySlugReturn
}

