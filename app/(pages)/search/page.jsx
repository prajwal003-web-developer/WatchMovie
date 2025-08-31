import SearchClient from "./SearchClient";

export default async function SearchPage({ searchParams }) {
    const params = await searchParams; // ✅ Await it
    const query = params?.q || "";
    return <SearchClient query={query} />;
}
