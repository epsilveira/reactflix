import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';

function CadastroCategoria() {
  const [categorias, setCategorias] = useState([]);
  
  const initialValues = {
    name: '',
    desc: '',
    color: '#000'
  }
  
  const [values, setValues] = useState(initialValues);
  
  function setValue(key, value) {
    setValues({
      ...values,
      [key]: value, // name: 'value' , desc: 'value' ....
    })
  }
  
  function handleChange(infoEvent) {              
    setValue(
      infoEvent.target.getAttribute('name'), 
      infoEvent.target.value);
  }
  /* o handle que não funcionou
  function handleChange(infoEvent) { 
    const { getAttribute, value } = infoEvent.target;
    setValue(
      getAttribute('name'), 
      value
    );
  }
   */


  return (
    <PageDefault>
      <h1>Cadastro de Categoria: {values.name}</h1>

      <form onSubmit={function handleSubmit(infoEvent){
        infoEvent.preventDefault();        
        setCategorias([
          ...categorias,
          values
        ]);

        setValues(initialValues);
      }}>

        <FormField
          label="Nome da Categoria: " 
          type="text"
          value={values.name}
          name="name"
          onChange={handleChange} 
        />

        <FormField 
          label="Descrição: " 
          type="text" 
          value={values.desc}
          name="desc"
          onChange={handleChange} 
        />

        <FormField
          label="Cor: " 
          type="color" 
          value={values.color}
          name="color"
          onChange={handleChange} 
        /> 

        {/*<div>
          <label>
            Nome da Categoria:
            <input
              type="text"              
              value={values.name}
              name="name"
              onChange={handleChange} 
            />
          </label>  

          <label>
            Descrição:
            <textarea
              type="text"              
              value={values.desc}
              name="desc"
              onChange={handleChange}  
            />
          </label>   

          <label>
            Cor:
            <input
              type="color"
              value={values.color}
              name="color"
              onChange={handleChange} 
            />
          </label> 
        </div>*/}


        <button>
          Cadastrar
        </button>
      </form>

      <ul>
        {categorias.map((categoria, indice) => {
          return (
            <li key={`${categoria}${indice}`}>
              {categoria.name}
            </li>
          )
        })}
      </ul>

      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  )
}

export default CadastroCategoria;