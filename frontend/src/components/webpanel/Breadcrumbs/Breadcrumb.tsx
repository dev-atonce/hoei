import Link from "next/link";
interface BreadcrumbProps {
  pageName: string;
  prevPage: { pageName: string | null; url: string | null };
}
const Breadcrumb = ({ pageName, prevPage }: BreadcrumbProps) => {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          {prevPage?.pageName && prevPage?.url ? (
            <li>
              <Link className="font-medium" href={prevPage?.url}>
                {prevPage?.pageName} /
              </Link>
            </li>
          ) : (
            <li>
              <span className="font-medium">{prevPage?.pageName} /</span>
            </li>
          )}

          <li className="font-medium text-primary">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
