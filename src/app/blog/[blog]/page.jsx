import Footer from "@/components/Footer/Footer";
import MenuFour from "@/components/Header/MenuFour";
import BlogDyanamicPage from "../../../components/Blog/BlogContent";
import { blogListDataByPkSk } from "@/api/blogApis/getBlog";
export default async function page({ params }) {
    const slug = (await params).blog;
    const decodedString = decodeURIComponent(slug);
    const param = new URLSearchParams(decodedString);
    const id = param.get("id");
    const id2 = param.get("id2");
  
    const fetcher = await blogListDataByPkSk(id, id2);
    const blog = fetcher?.data?.[0];
  
    if (!blog) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl text-gray-500">Blog not found.</p>
        </div>
      );
    }
  
    return (
      <>
        <div id="header" className="relative w-full">
          <MenuFour props="bg-transparent" />
        </div>
        <BlogDyanamicPage data={blog} />
        <Footer />
      </>
    );
  }
  