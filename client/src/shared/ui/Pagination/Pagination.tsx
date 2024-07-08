/** @jsxImportSource @emotion/react */
import React from "react";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import {
  SPaginationContainer,
  SPaginationButtons,
  SButton,
} from "./Pagination.styles";
import { getPaginationData } from "./Pagination.helpers";

interface IProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<IProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const paginationData = getPaginationData(currentPage, totalPages);

  return (
    <SPaginationContainer>
      {/** Render First Page button */}
      {totalPages > 0 && (
        <SButton
          aria-label="Previous page"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <MdOutlineArrowBackIos />
        </SButton>
      )}
      {/** Render other page buttons */}
      <SPaginationButtons>
        {paginationData.map((item) => (
          <SButton
            key={item.page}
            currentPage={currentPage}
            page={item.page}
            onClick={() => setCurrentPage(item.page)}
            aria-label={`Select page ${item.page}`}
            disabled={currentPage === item.page}
          >
            {item.isSpread ? "..." : item.page}
          </SButton>
        ))}
      </SPaginationButtons>
      {/** Render Last Page button */}
      {totalPages > 0 && (
        <SButton
          aria-label="Next page"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <MdOutlineArrowForwardIos />
        </SButton>
      )}
    </SPaginationContainer>
  );
};

export const MemoPagination = React.memo(Pagination);
