import React from "react";
import BlogItem from "../Blog/BlogItem";
import { BlogType } from "@/type/BlogType";

interface Props {
  data: Array<BlogType>;
  start: number;
  limit: number;
}
const OurBlog: React.FC<Props> = ({ data, start, limit }) => {
<<<<<<< HEAD
  return (
    <>
      <div className="news-block md:pt-20 pt-10">
        <div className="container">
          <div className="heading3 text-center text-secondary">Our Blog</div>
          <div className="list-blog grid md:grid-cols-3 gap-[30px] md:mt-10 mt-6">
            {data.slice(start, limit).map((prd, index) => (
              <BlogItem key={index} data={prd} type="style-one" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
=======
    return (
        <>
            <div className="news-block md:pt-20 pt-10">
                <div className="container">
                    <div className="heading3 text-center text-secondary2">Our Blog</div>
                    <div className="list-blog grid md:grid-cols-3 gap-[30px] md:mt-10 mt-6">
                        {data.slice(start, limit).map((prd, index) => (
                            <BlogItem key={index} data={prd} type='style-one' />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
>>>>>>> 1a460d804c57f714cdf37f1bb048b31008d31ed8

export default OurBlog;
