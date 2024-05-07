import { DateTabs } from "@/components";
// import { db } from "@/server/db";
// import { posts } from "@/server/db/schema";

export default async function HomePage() {
  // const data = await db.select().from(posts);
  // console.log(data);
  return (
    <main>
      <DateTabs />
    </main>
  );
}
