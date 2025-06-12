import Footer from "@/components/Footer/Footer";
import MenuFour from "@/components/Header/MenuFour";

import { BlogType } from "@/type/BlogType";
import { blogListData } from "@/api/blogApis/getBlog";
import BlogItem from "@/components/Blog/BlogItem";

export default function page() {
  return (
    <>
      <div id="header" className="relative w-full">
        <MenuFour props="bg-transparent" />
      </div>
      <OurBlog />
      <Footer />
    </>
  );
}

const OurBlog = async () => {
  const fetchBlogs: BlogType[] = await blogListData(); // Server-side fetching

  return (
    <div className="news-block md:pt-20 pt-10">
      <div className="container">
        <h1 className="text-center text-3xl font-bold pb-8">Our Latest Blog Posts & Updates</h1>
        {fetchBlogs.length === 0 ? (
          <div className="text-center text-gray-500 text-lg py-10">
            No blogs present
          </div>
        ) : (
          <div className="list-blog grid md:grid-cols-3 gap-[30px] md:mt-10 mt-6">
            {fetchBlogs?.map((blog: BlogType, index: number) => (
              <BlogItem key={index} data={blog} type="style-one" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
