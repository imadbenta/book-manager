import React, { useState, useEffect } from "react";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

const BookForm = ({ onSubmit, currentBook }) => {
  const [form, setForm] = useState({ title: "", author: "", year: null });

  useEffect(() => {
    if (currentBook) setForm(currentBook);
  }, [currentBook]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ title: "", author: "", year: null });
  };

  return (
    <Card title={currentBook ? "Modifier le livre" : "Ajouter un livre"} className="book-form">
      <form onSubmit={handleSubmit}>
        <div className="p-fluid">
          <div className="field">
            <label htmlFor="title">Titre</label>
            <InputText
              id="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              placeholder="Entrez le titre du livre"
            />
          </div>

          <div className="field">
            <label htmlFor="author">Auteur</label>
            <InputText
              id="author"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              placeholder="Entrez le nom de l'auteur"
            />
          </div>

          <div className="field">
            <label htmlFor="year">Année</label>
            <InputNumber
              id="year"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.value })}
              placeholder="Entrez l'année de publication"
              useGrouping={false}
            />
          </div>

          <Button 
            type="submit" 
            label={currentBook ? "Modifier" : "Ajouter"}
            icon="pi pi-check"
            className="p-button-lg"
          />
        </div>
      </form>
    </Card>
  );
};

export default BookForm;
