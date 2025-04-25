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
    // Ajouter une vérification pour la date
    if (form.year) {
      onSubmit(form);  // Envoyer les données avec la date
    } else {
      console.error("L'année de publication est manquante");
    }
    setForm({ title: "", author: "", year: null });  // Réinitialiser le formulaire
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
    onChange={(e) => setForm({ ...form, year: e.value })}  // Assurez-vous que la valeur est correcte ici
    placeholder="Entrez l'année de publication"
    useGrouping={false}
    min={1900}  // Vous pouvez ajouter une valeur minimale pour l'année
    max={new Date().getFullYear()}  // Et une valeur maximale (par exemple, l'année actuelle)
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
