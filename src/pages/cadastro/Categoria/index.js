import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';

function CadastroCategoria() {
  const [categorias, setCategorias] = useState([]);

  const initialValues = {
    name: '',
    desc: '',
    color: '',
  };

  const { values, handleChange, clearForm } = useForm(initialValues);

  useEffect(() => {
    const URL_CATEGORIAS = window.location.hostname.includes('localhost')
      ? 'http://localhost:8080/categorias'
      : 'https://palaflix.herokuapp.com/categorias';
    fetch(URL_CATEGORIAS)
      .then(async (serverAnswer) => {
        const answer = await serverAnswer.json();
        setCategorias([
          ...answer,
        ]);
      });

  // setTimeout(() => {
  //  setCategorias([
  //    ...categorias,
  //    {
  //      id: 1,
  //      name: 'Eduardo Silveira',
  //      desc: 'Pregações de Eduardo Silveira',
  //      color: '#6bd1ff',
  //    },
  //    {
  //      id: 2,
  //      name: 'Top Pregações',
  //      desc: 'Pregações que mudaram a vida, por Teologueiros',
  //      color: '#00C86F',
  //    },
  //  ]);
  // }, 3 * 1000);
  }, [
  ]);
  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {values.name}
      </h1>

      <form onSubmit={function handleSubmit(infoEvent) {
        infoEvent.preventDefault();
        setCategorias([
          ...categorias,
          values,
        ]);

        clearForm();
      }}
      >

        <FormField
          label="Nome da Categoria"
          type="text"
          value={values.name}
          name="name"
          onChange={handleChange}
        />

        <FormField
          label="Descrição"
          type="textarea"
          value={values.desc}
          name="desc"
          onChange={handleChange}
        />

        <FormField
          label="Cor"
          type="color"
          value={values.color}
          name="color"
          onChange={handleChange}
        />

        <Button>
          Cadastrar
        </Button>
      </form>

      {categorias.length === 0 && (
      <div>
        Carregando categorias...
      </div>
      )}

      <ul>
        {categorias.map((categoria) => (
          <li key={`${categoria.titulo}`}>
            {categoria.titulo}
          </li>
        ))}
      </ul>

      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
