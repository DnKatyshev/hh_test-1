import React from 'react';
import TablePagination from '@mui/material/TablePagination';

export function AccountPagination({ count, page, onPageChange }) {
  const handlePageChange = (event, newPage) => {
    onPageChange(newPage); // Передаем только `newPage` во внешний обработчик
  };

  return (
    <TablePagination
      component="div"
      count={count} // Общее количество записей
      page={page} // Текущая страница
      onPageChange={handlePageChange} // Обработчик смены страницы
      rowsPerPage={5} // Количество записей на странице
      rowsPerPageOptions={[]} // Убираем выбор количества строк
    />
  );
}
