import React, { useState, useEffect } from "react";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

const BookForm = ({ onSubmit, currentBook }) => {
  const [form, setForm] = useState({ title: "", author: "", year: "" });
  const [yearError, setYearError] = useState("");

  useEffect(() => {
    if (currentBook) {
      setForm(currentBook);
      setYearError("");
    }
  }, [currentBook]);

  const validateYear = (year) => {
    if (!year) return "L'année est requise";
    const currentYear = new Date().getFullYear();
    if (year < 0) return "L'année ne peut pas être négative";
    if (year > currentYear) return "L'année ne peut pas être dans le futur";
    return "";
  };

  const handleYearChange = (e) => {
    const yearValue = e.value;
    const error = validateYear(yearValue);
    setYearError(error);
    setForm({ ...form, year: yearValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateYear(form.year);
    if (error) {
      setYearError(error);
      return;
    }
    onSubmit(form);
    if (!currentBook) {
      setForm({ title: "", author: "", year: "" });
      setYearError("");
    }
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
              required
              placeholder="Entrez le nom de l'auteur"
            />
          </div>

          <div className="field">
            <label htmlFor="year">Année de publication</label>
            <InputNumber
              id="year"
              value={form.year}
              onChange={handleYearChange}
              required
              placeholder="Entrez l'année de publication"
              useGrouping={false}
              mode="decimal"
              minFractionDigits={0}
              maxFractionDigits={0}
            />
            {yearError && (
              <small className="p-error block">{yearError}</small>
            )}
          </div>

          <Button 
            type="submit" 
            label={currentBook ? "Modifier" : "Ajouter"}
            icon="pi pi-check"
            className="p-button-lg"
            disabled={!!yearError}
          />
        </div>
      </form>
    </Card>
  );
};

export default BookForm;
