import { React } from "react";
import Pagination from 'react-bootstrap/Pagination'

const TrayListPagination = ({
  currentPage,
  postsPerPage,
  totalPosts,
  paginate
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <Pagination>
      <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1}/>
      <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}/>
      {pageNumbers.map((number) => (
        <Pagination.Item
          key={number}
          active={currentPage === number}
          onClick={() => paginate(number)}
        >
          {number}
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(totalPosts / postsPerPage)}/>
      <Pagination.Last onClick={() => paginate(Math.ceil(totalPosts / postsPerPage))} disabled={currentPage === Math.ceil(totalPosts / postsPerPage)}/>
    </Pagination>
  );
};

export default TrayListPagination;
