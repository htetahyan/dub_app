import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '~/components/ui/pagination'
import {toast} from "sonner";


const PaginationProjects = ({ page, setPage ,totalProjects}: any) => {
    const totalPages = Math.ceil(totalProjects / 6)
    const prevPage = () => {
        if (page > 1) {
          setPage(page - 1);
        }
        else {
            toast.warning('This is the first page')
        }
    }
    const nextPage = () => {
        if (page < totalPages) {
          setPage(page + 1);
        }else {
            toast.warning('This is the last page')
        }

    }
  return (
    <Pagination >
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious href="#" onClick={prevPage} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">{page}</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationEllipsis />
      </PaginationItem>
      <PaginationItem >
        <PaginationNext href="#" onClick={nextPage} />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
  )
}

export default PaginationProjects
