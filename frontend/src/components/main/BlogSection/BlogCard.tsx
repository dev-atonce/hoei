import { Divider, Card, Col } from "antd";

import Image from "next/image";

interface BlogCardProps {
  data: any[];
  type: any;
}
function formatDate(dateTimeString: any) {
  // Create a new Date object from the input string
  const date = new Date(dateTimeString);

  // Extract the day, month, and year
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);

  // Format the date in dd.mm.yy format
  return `${day}.${month}.${year}`;
}

const BlogCard = ({ data, type }: BlogCardProps) => {
  return data?.map((item: any, key: any) => {
    return (
      <Col
        xs={24}
        sm={12}
        md={12}
        lg={type?.includes("recruitment") ? 6 : 8}
        key={key}
      >
        <a
          // @ts-ignore
          href={type.includes("project") ? `/project/${item?.id}` : item?.url}
        >
          <Card
            hoverable
            cover={
              <Image
                className="w-full aspect-[3/2] object-cover"
                alt="example"
                src={
                  type?.includes("project")
                    ? // @ts-ignore
                      `${process.env.NEXT_PUBLIC_BASE_URL}${item?.image}`
                    : item?.thumbnail
                }
                width={500}
                height={300}
                quality={80}
                loading="lazy"
              />
            }
          >
            <div
              className={`${type?.includes("recruitment") && "min-h-[60px]"}`}
            >
              {!type?.includes("recruitment") ||
                (!type?.includes("project") && (
                  <span className="text-slate-400 mb-2">
                    {formatDate(item?.publish)}
                  </span>
                ))}
              <h3
                className={`${!type?.includes("recruitment") ? "line-clamp-1" : "line-clamp-2"}  font-bold  text-slate-800 mb-2`}
              >
                {type?.includes("project")
                  ? item?.projectNameTH
                  : item?.titleTH}
              </h3>
              {/* <Divider className="mt-3 mb-2" /> */}
              {!type?.includes("recruitment") && (
                <p className="line-clamp-2 h-11 text-slate-600">
                  {item?.descriptionTH}
                </p>
              )}
            </div>
          </Card>
        </a>
      </Col>
    );
  });
};

export default BlogCard;
