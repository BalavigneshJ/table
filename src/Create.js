import React, { useState } from 'react';

export default function Create(props) {
  const initialState = {
    product_name: '',
    original_price: '',
    sale_price: '',
    product_type: '',
    description: '',
  };
  const [form, setForm] = useState(initialState);

  const handleChange = (ev, key) => {
    let newForm = { ...form };
    newForm[key] = ev.target.value;
    setForm(newForm);
  };

  const handleSubmit = () => {
    fetch('https://lobster-app-ddwng.ondigitalocean.app/product/add_new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        api_key: 'Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH',
      },
      body: JSON.stringify(form),
    })
      .then(() => {
        setForm(initialState);
        props.makeCall();
      })
      .catch(() => {
        setForm(initialState);
      });
  };

  return (
    <div>
      <h1>Create new data</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '40%',
          margin: 'auto',
          gap: '10px',
          border: '1px solid',padding:"10px"
        }}
      >
        <input
          onChange={(ev) => {
            handleChange(ev, 'product_name');
          }}
          placeholder="Product Name"
          value={form.product_name}
        ></input>
        <input
          onChange={(ev) => {
            handleChange(ev, 'original_price');
          }}
          placeholder="Original Price"
          value={form.original_price}
        ></input>
        <input
          onChange={(ev) => {
            handleChange(ev, 'sale_price');
          }}
          placeholder="Sale Price"
          value={form.sale_price}
        ></input>
        <input
          onChange={(ev) => {
            handleChange(ev, 'product_type');
          }}
          placeholder="Product Type"
          value={form.product_type}
        ></input>
        <input
          onChange={(ev) => {
            handleChange(ev, 'description');
          }}
          placeholder="Description"
          value={form.description}
        ></input>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}
