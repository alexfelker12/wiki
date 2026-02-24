import { db } from "@/lib/db"


type FindRomHackBySlugReturn = Awaited<ReturnType<typeof findRomHackBySlug>>

const findRomHackBySlug = async ({ slug }: { slug: string }) => {
  return await db.romHack.findUnique({
    where: { slug },
    cacheStrategy: {
      ttl: 31536000, // 1 year
      swr: 31536000, // 1 year
    },
  })
}

export {
  findRomHackBySlug, type FindRomHackBySlugReturn
}

