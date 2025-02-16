import Footer from "@/components/Footer/Footer";
import MenuFour from "@/components/Header/MenuFour";
import BlogDyanamicPage from "../../../components/Blog/BlogContent";
import { blogListDataByPkSk } from "@/api/blogApis/getBlog";

export default async function page({ params }) {
    const slug = (await params).blog

    const decodedString = decodeURIComponent(slug);

    const param = new URLSearchParams(decodedString);
    const id = param.get("id");
    const id2 = param.get("id2");

    const fetcher = await blogListDataByPkSk(id, id2);


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
