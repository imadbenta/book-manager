import React, { useState } from "react";
import { createBook, updateBook, deleteBook } from "./services/bookService";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

// Les imports CSS seront ajoutés après l'installation des dépendances

function App() {
  const [currentBook, setCurrentBook] = useState(null);
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'list', ou 'form'
  const toast = useRef(null);

  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail, life: 3000 });
  };

  const handleSubmit = async (bookData) => {
    try {
      if (currentBook) {
        await updateBook(currentBook._id, bookData);
        showToast('success', 'Succès', 'Livre modifié avec succès');
      } else {
        await createBook(bookData);
        showToast('success', 'Succès', 'Livre ajouté avec succès');
      }
      setCurrentBook(null);
      setCurrentPage('list'); // Retour à la liste après l'ajout
    } catch (error) {
      showToast('error', 'Erreur', 'Une erreur est survenue');
      console.error("Erreur lors de l'ajout/modification du livre:", error);
    }
  };

  const handleDelete = async (bookId) => {
    try {
      await deleteBook(bookId);
      showToast('success', 'Succès', 'Livre supprimé avec succès');
      setCurrentPage('list');
    } catch (error) {
      showToast('error', 'Erreur', 'Une erreur est survenue lors de la suppression');
      console.error("Erreur lors de la suppression du livre:", error);
    }
  };

  const handleEdit = (book) => {
    setCurrentBook(book);
    setCurrentPage('form');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="home-page">
            <Card title="Gestion de Bibliothèque" className="home-card">
              <div className="button-container">
                <Button 
                  label="Liste des Livres" 
                  icon="pi pi-list" 
                  className="p-button-lg" 
                  onClick={() => setCurrentPage('list')}
                />
                <Button 
                  label="Ajouter un Livre" 
                  icon="pi pi-plus" 
                  className="p-button-lg" 
                  onClick={() => setCurrentPage('form')}
                />
              </div>
            </Card>
          </div>
        );
      case 'list':
        return <BookList onEdit={handleEdit} onDelete={handleDelete} />;
      case 'form':
        return <BookForm onSubmit={handleSubmit} currentBook={currentBook} />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <Toast ref={toast} />
      {currentPage !== 'home' && (
        <Button 
          icon="pi pi-home" 
          label="Retour à l'accueil"
          className="p-button-secondary back-button" 
          onClick={() => setCurrentPage('home')}
        />
      )}
      {renderPage()}
    </div>
  );
}

export default App;
