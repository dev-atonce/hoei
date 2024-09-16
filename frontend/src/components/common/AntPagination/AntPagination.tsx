import React  from "react";
import { Pagination } from "antd";

interface AntPaginationProps {
    currentPage: any,
    setCurrentPage: any,
    total: number,
    pageSize: number,
}

const AntPagination = ({total, currentPage, setCurrentPage, pageSize}: AntPaginationProps) => {

    // Function to handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    
    return (
        <>
        <div className="flex justify-center items-center mt-10 mb-10">
            <Pagination 
                simple 
                current={currentPage}
                total={total}
                onChange={handlePageChange}
                showSizeChanger={false}
                pageSize={pageSize}
            />
        </div>
        </>
    );
};

export default AntPagination;
