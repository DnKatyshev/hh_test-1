import React from 'react';
import TablePagination from '@mui/material/TablePagination';

export function MainPagination({ count, page, onPageChange }) {
  const handlePageChange = (event, newPage) => {
    onPageChange(newPage); // Передаем только `newPage` во внешний обработчик
  };

  return (
    <TablePagination
      component="div"
      sx={{bgcolor: '#1C1C1C', color: '#fff'}}
      count={count} // Общее количество записей
      page={page} // Текущая страница
      onPageChange={handlePageChange} // Обработчик смены страницы
      rowsPerPage={25} // Количество записей на странице
      rowsPerPageOptions={[]} // Убираем выбор количества строк
    />
  );
}
