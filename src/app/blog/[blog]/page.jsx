import { blogListDataByPkSk } from "@/api/blogApis/getBlog";

export default async function page({ params }) {
    const slug = (await params).blog;
    const decodedString = decodeURIComponent(slug);
    const param = new URLSearchParams(decodedString);
    const id = param.get("id");
    const id2 = param.get("id2");

    const fetcher = await blogListDataByPkSk(id, id2);

    if (!fetcher || !fetcher.data || fetcher?.data?.length === 0) {
        return <div>No blog data found.</div>;
    }

    return (
        <>
            <div id="header" className="relative w-full">
                <MenuFour props="bg-transparent" />
            </div>
            <BlogDyanamicPage data={fetcher?.data[0]} />
            <Footer />
        </>
    );
}