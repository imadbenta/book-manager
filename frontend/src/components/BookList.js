// src/components/BookList.js
import React, { useEffect, useState } from "react";
import { getBooks } from "../services/bookService";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

const BookList = ({ onEdit, onDelete }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = React.useRef(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching books...');
      const res = await getBooks();
      console.log('Books received:', res.data);
      setBooks(res.data || []);
    } catch (err) {
      console.error("Erreur lors du chargement des livres :", err);
      setError(err.message);
      toast.current.show({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Impossible de charger les livres',
        life: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const confirmDelete = (book) => {
    confirmDialog({
      message: 'Êtes-vous sûr de vouloir supprimer ce livre ?',
      header: 'Confirmation de suppression',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      accept: async () => {
        try {
          await onDelete(book._id);
          toast.current.show({
            severity: 'success',
            summary: 'Succès',
            detail: 'Livre supprimé avec succès',
            life: 3000
          });
          fetchBooks();
        } catch (err) {
          toast.current.show({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Erreur lors de la suppression',
            life: 3000
          });
        }
      }
    });
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="action-buttons">
        <Button 
          icon="pi pi-pencil" 
          className="p-button-rounded p-button-success mr-2" 
          onClick={() => onEdit(rowData)}
        />
        <Button 
          icon="pi pi-trash" 
          className="p-button-rounded p-button-danger" 
          onClick={() => confirmDelete(rowData)}
        />
      </div>
    );
  };

  return (
    <Card title="Liste des Livres" className="book-list">
      <Toast ref={toast} />
      <ConfirmDialog />
      {error && (
        <div className="p-message p-message-error">
          {error}
        </div>
      )}
      <DataTable 
        value={books} 
        loading={loading}
        paginator 
        rows={10} 
        rowsPerPageOptions={[5, 10, 25]} 
        emptyMessage="Aucun livre trouvé"
        className="p-datatable-striped"
      >
        <Column field="title" header="Titre" sortable />
        <Column field="author" header="Auteur" sortable />
        <Column field="year" header="Année de publication" sortable />
        <Column body={actionBodyTemplate} header="Actions" style={{ width: '10rem' }} />
      </DataTable>
    </Card>
  );
};

export default BookList;
