import { getUser } from "@/lib/auth";
import { getUserQueries } from "@/lib/queryActions";
import { redirect } from "next/navigation";

export default async function DashboardPage({ params }) {
    const user = await getUser();
    if (!user) { redirect('/login') }
    const queries = await getUserQueries(user?.id);
    console.log(queries)
    if (!queries || queries.length === 0) {
        redirect('/dashboard/new')
    }

    redirect('/dashboard/data/' + queries[0].id)
}