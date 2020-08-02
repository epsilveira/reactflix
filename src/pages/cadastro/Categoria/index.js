import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import categoriasRepository from '../../../repositories/categorias';

function CadastroCategoria() {
  const history = useHistory();
  const [categorias, setCategorias] = useState([]);

  const initialValues = {
    titulo: '',
    cor: '#000000',
    desc: '',
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
  //      cor: '#6bd1ff',
  //    },
  //    {
  //      id: 2,
  //      name: 'Top Pregações',
  //      desc: 'Pregações que mudaram a vida, por Teologueiros',
  //      cor: '#00C86F',
  //    },
  //  ]);
  // }, 3 * 1000);
  }, []);

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {values.titulo}
      </h1>

      <form onSubmit={function handleSubmit(infoEvent) {
        infoEvent.preventDefault();

        categoriasRepository.create({
          titulo: values.titulo,
          cor: values.cor,
          desc: values.desc,
        })
          .then(() => {
            history.push('/categoria');
          });

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
          value={values.titulo}
          name="titulo"
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
          value={values.cor}
          name="cor"
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
