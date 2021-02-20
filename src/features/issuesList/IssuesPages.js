import React from "react";
import { useSelector } from "react-redux"

import Paginate from "react-paginate";

///
import style from "../issuesList/IssuesPages.module.css";
import "../issuesList/IssuesPages.css";
import classnames from "classnames";


///



const IssuesPages = ({ currentPage, pageCount, setPage }) => {

  const isDark = useSelector((state) => state.theme.isDark);
  return (
    <>
      <div className={!isDark ? classnames("issuesPagination", style.pagination) : classnames("issuesPaginationDark", style.paginationDark)}>
        <Paginate
          forcePage={currentPage - 1}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={(selectedItem) => {
            setPage(selectedItem.selected + 1);
          }}
          nextLabel="&rarr;"
          previousLabel="&larr;"
        />
      </div>
    </>
  );
};

export default IssuesPages;
