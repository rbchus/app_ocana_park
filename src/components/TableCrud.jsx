import React, { useState } from 'react';

const TableCrud = () => {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({ name: '', age: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem({ ...currentItem, [name]: value });
  };

  const addItem = () => {
    setItems([...items, { ...currentItem, id: Date.now() }]);
    setCurrentItem({ name: '', age: '' });
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div>
      <h2>CRUD Básico</h2>
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={currentItem.name}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="age"
        placeholder="Edad"
        value={currentItem.age}
        onChange={handleInputChange}
      />
      <button onClick={addItem}>Agregar</button>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>
                <button onClick={() => deleteItem(item.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableCrud;
