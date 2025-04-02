
import React, { useMemo } from 'react';
import DataTable from 'react-data-table-component';
import useBlogs from '../../hooks/blog/useBlog';
import useBlogActions from '../../hooks/blog/useBlogActions';
import BlogActions from './BlogActions';
import styles from './blogAdmin.module.css';

const BlogTable = () => {
  const { blogs, deleteBlog } = useBlogs();
  const { handleView, handleEdit, handleDelete } = useBlogActions(deleteBlog);

  const columns = useMemo(() => [
    {
      name: 'Título',
      selector: row => row.titulo,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Descripción',
      cell: row => <div className={styles.descriptionCell}>{row.descripcion}</div>,
      wrap: true,
    },
    {
      name: 'Categoría',
      selector: row => row.categoria,
      sortable: true,
      width: '150px',
    },
    {
      name: 'Imagen',
      cell: row => (
        <img 
          src={row.imagen} 
          alt="Miniatura" 
          className={styles.imageThumbnail}
        />
      ),
      width: '120px',
    },
    {
      name: 'Acciones',
      cell: (row) => (
        <BlogActions
          blog={row}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ),
      width: '150px',
      ignoreRowClick: true,
    },
  ], [handleView, handleEdit, handleDelete]);

  return (
    <div className={styles.tableContainer}>
      <DataTable
        title="Gestión de Entradas"
        columns={columns}
        data={blogs}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 15]}
        highlightOnHover
        responsive
        noDataComponent={
          <div className={styles.noData}>
            No se encontraron entradas
          </div>
        }
        customStyles={{
          cells: {
            style: {
              fontSize: '0.9rem',
              padding: '1rem',
            },
          },
          headCells: {
            style: {
              backgroundColor: '#2c3e50',
              color: 'white',
              fontSize: '1rem',
            },
          },
        }}
      />
    </div>
  );
};

export default BlogTable;