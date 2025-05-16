import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const MyEditor = () => {
  const [value, setValue] = useState('');

  const handleSave = () => {
    // Aquí puedes enviar 'value' a tu backend o guardarlo
    console.log(value); // contiene HTML
  };

  return (
    <div>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
      <button onClick={handleSave}>Guardar</button>
    </div>
  );
}

export default MyEditor;