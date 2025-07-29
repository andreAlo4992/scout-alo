import { useState } from 'react';
import axios from 'axios';

export default function DataForm() {
  const [form, setForm] = useState({ nome: '', valore: '', categoria: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/dati', form);
    alert('Dato inserito!');
    setForm({ nome: '', valore: '', categoria: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Nome" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} />
      <input type="number" placeholder="Valore" value={form.valore} onChange={e => setForm({ ...form, valore: e.target.value })} />
      <input placeholder="Categoria" value={form.categoria} onChange={e => setForm({ ...form, categoria: e.target.value })} />
      <button type="submit">Invia</button>
    </form>
  );
}
