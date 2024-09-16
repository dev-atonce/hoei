"use client";
import { Row } from "antd";
import BlogCard from "./BlogCard";
import AntPagination from "@/components/common/AntPagination/AntPagination";
import { useEffect, useState } from "react";

interface BlogSectionProps {
  limit: number;
  typeBlog: string | string[];
  home: boolean;
}

const BlogSection = ({ limit, typeBlog, home }: BlogSectionProps) => {
  const [page, setPage] = useState(1);
  const [blogList, setBlogList] = useState([]);
  const [total, setTotal] = useState(0);

  async function blogFetch() {
    const res = await fetch(
      //   `https://at-once.info/api/blog/c/all?id=64&`
      `https://at-once.info/api/blog/c/speedmove?type=${typeBlog}&limit=${limit}&skip=${(page - 1) * limit}`
    );
    const data = await res.json();
    setBlogList(data.data);
    setTotal(data.total);
  }

  useEffect(() => {
    blogFetch();
  }, [page]);

  return (
    <>
      {!blogList?.length ? (
        <p className="text-center p-10">Coming Soon ...</p>
      ) : (
        <>
          <Row gutter={[16, 16]}>
            <BlogCard data={blogList} type={typeBlog}></BlogCard>
          </Row>
          {!home && (
            <AntPagination
              total={total}
              currentPage={page}
              setCurrentPage={setPage}
              pageSize={limit}
            />
          )}
        </>
      )}
    </>
  );
};

export default BlogSection;
