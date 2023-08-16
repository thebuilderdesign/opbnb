import { ButtonPrimary } from 'components/Button'
import React from 'react'

import styled from 'styled-components'

export function PoolListPagination({
  currentPage,
  pageCount,
  setPage,
}: {
  currentPage: number
  pageCount: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}) {
  const pageButtons = Array.from({ length: pageCount }).map((a, i) => i)
  return (
    <PaginationContainer>
      <PageButtons>
        <ButtonPrimary onClick={() => setPage((a) => a - 1)} disabled={currentPage === 0}>
          {'<-'}
        </ButtonPrimary>
        {pageButtons.map((page) => {
          return (
            <ButtonPrimary key={page} onClick={() => setPage(page)} disabled={currentPage === page}>
              {page}
            </ButtonPrimary>
          )
        })}
        <ButtonPrimary onClick={() => setPage((a) => a + 1)} disabled={currentPage === pageCount}>
          {'->'}
        </ButtonPrimary>
      </PageButtons>
    </PaginationContainer>
  )
}
const PageButtons = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 16px;
`
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: 32px;
`
