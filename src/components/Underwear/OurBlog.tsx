import BlogItem from "../Blog/BlogItem";
import { BlogType } from "@/type/BlogType";
import { blogListData } from "@/api/blogApis/getBlog";

const OurBlog = async () => {
  const fetchBlogs = await blogListData(); // Server-side fetching
  return (
    <div className="news-block md:pt-20 pt-10">
      <div className="container">
        <div className="heading3 text-center text-secondary">Our Blog</div>
        <div className="list-blog grid md:grid-cols-3 gap-[30px] md:mt-10 mt-6">
          {fetchBlogs.map((blog: BlogType, index: number) => (
            <BlogItem key={index} data={blog} type="style-one" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurBlog;
