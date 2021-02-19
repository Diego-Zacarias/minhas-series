import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Generos = () => {

  const [data, setData] = useState([])

  useEffect(() => {
    axios
      .get('/api/genres')
      .then(res => {
        console.log(res.data.data)
        setData(res.data.data)
      })
  }, [])

  const deleteGenero = id => {
    console.log(id)
    axios
      .delete('/api/genres/' + id)
      .then(() => {
        setData(data.filter(item => item.id !== id))
      })
  }

  const renderizaLinha = record => {
    return (
      <tr key={record.id}>
        <th scope='row'>{record.id}</th>
        <td>{record.name}</td>
        <td>
          <Link to={'/generos/' + record.id} className='btn btn-info'>Editar</Link>
          <button className='btn btn-danger' onClick={() => deleteGenero(record.id)}>Remover</button>
        </td>
      </tr>
    )
  }

  if (data.length === 0) {
    return (
      <div className='container'>
        <h1>Gêneros</h1>
        <Link to='/generos/novo' className='btn btn-info'>Novo gênero</Link>
        <div className='alert alert-warning' role='alert'>
          Você não possui gêneros cadastrados!
        </div>
      </div>
    )
  }

  return (
    <div className='container'>

      <h1>Gêneros</h1>

      <table className='table table-dark'>
        <thead>
          <tr>
            <th scope='col'>Id</th>
            <th scope='col'>Nome</th>
            <th scope='col'>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map(renderizaLinha)}
        </tbody>
      </table>

      <Link to='/generos/novo' className='btn btn-info'>Novo gênero</Link>

    </div>
  )
}

export default Generos