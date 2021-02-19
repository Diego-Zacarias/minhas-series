import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'

const InfoSerie = ({ match }) => {

  const [form, setForm] = useState({
      name: ''
  })
  const [success, setSuccess] = useState(false)
  const [mode, setMode] = useState('INFO')
  const [data, setData] = useState({})
  const [genres, setGenres] = useState([])
  const [genreId, setGenreId] = useState('')


  useEffect(() => {
    axios
      .get('/api/series/' + match.params.id)
      .then(res => {
        setData(res.data)
        setForm(res.data)
      })
  }, [match.params.id])

  useEffect(() => {
    axios
      .get('/api/genres')
      .then(res => {
        setGenres(res.data.data)
        const encontrado = genres.find(value => data.genre === value.name)
        if(encontrado){
          setGenreId(encontrado.id)
        }
      })
  }, [data])

  const onChangeGenre = evt => {
    setForm({
        ...form,
        genre_id: parseInt(evt.target.value)
    })
    setGenreId(evt.target.value)
  }

  const onChange = field => evt => {
    setForm({
      ...form,
      [field]: evt.target.value
    })
  }

  const seleciona = value => {
        setForm({
            ...form,
            status: value
    })
  }

  const save = () => {
    axios
      .put('/api/series/' + match.params.id, form)
      .then(setSuccess(true))
  }

  if (success) {
    return <Redirect to='/series' />
  }

  const mmasterHeader = {
    height: '50vh',
    minHeight: '500px',
    backgroundImage: `url('${data.background}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }

  return (
    <div>
      <header style={mmasterHeader}>
        <div className='h-100' style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className='h-100 container'>
            <div className='row h-100 align-items-center'>
              <div className='col-3'>
                <img alt={data.name} className='img-fluid img-thumbnail' src={data.poster} />
              </div>
              <div className='col-8'>
                <h1 className='font-weight-light text-white'>{form.name}</h1>
                <div className='lead text-white'>
                  { data.status === 'ASSISTIDO' && <Badge color='success'>Assistido</Badge> } 
                  { data.status === 'PARA_ASSISTIR' && <Badge color='warning'>Para assistir</Badge> }
                  <p><strong>Gênero: </strong>{form.genre}</p>
                  <p><strong>Comentários: </strong>{form.comments}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <br />
      <div className='container'>
        <button className='btn btn-primary' onClick={() => setMode('EDIT')}>Editar</button>
      </div>
      {  
        mode === 'EDIT' &&
        <div className='container'>
          <h1>Editar Série</h1>
          <button className='btn btn-primary' onClick={() => setMode('INFO')}>Cancelar edição</button>

          <form>

            <div className='form-group'>
              <label htmlFor='name'>Nome</label>
              <input type='text' value={form.name} onChange={onChange('name')} className='form-control' id='name' aria-describedby='Nome da série' placeholder='Nome da série' />
            </div>

            <div className='form-group'>
              <label htmlFor='name'>Comentários</label>
              <input type='text' value={form.comments} onChange={onChange('comments')} className='form-control' id='name' aria-describedby='Nome da série' placeholder='Nome da série' />
            </div>

            <div className='form-group'>
              <label htmlFor='name'>Gênero</label>
              <select className='form-control' onChange={ onChangeGenre } value={ genreId }  >
                {genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
              </select>
            </div>
            
            <div>
              <p>Status</p>
            </div>
            
            <div ClassName='form-check'>
              <input ClassName='form-check-input' type='radio' name='status' id='assistido' value='ASSISTIDO' checked={form.status === 'ASSISTIDO'} onChange={() => seleciona('ASSISTIDO')} />
              <label ClassName='form-check-label' for='flexRadioDefault1'>
                Assistido
              </label>
            </div>
            <div ClassName='form-check'>
              <input ClassName='form-check-input' type='radio' name='status' id='paraAssistir' value='PARA_ASSISTIR' checked={form.status === 'PARA_ASSISTIR'} onChange={() => seleciona('PARA_ASSISTIR')} />
              <label ClassName='form-check-label' for='flexRadioDefault2'>
                Para assistir
              </label>
            </div>
            
            <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
            <br />
            <br />
          </form>
        </div>
      }
    </div>
  )
}

export default InfoSerie