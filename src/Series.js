import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Series = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('/api/series').then(res => {
           setData(res.data.data)
        })
    }, [])

    const deleteSeries = id => {
        console.log(id)
        axios
            .delete('/api/series/' + id)
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
                    <Link to={'/series/' + record.id} className='btn btn-info'>Info</Link>
                    <button className='btn btn-danger' onClick={() => deleteSeries(record.id)}>Remover</button>
                </td>
            </tr>
        )
    }

    if (data.length === 0) {
        return (
            <div className='container'>
                <h1>Séries</h1>
                <div className='alert alert-warning' role='alert'>
                    Você não possui séries cadastradas!
                </div>
                <Link to='/series/nova' className='btn btn-info'>Nova série</Link>
            </div>
        )
    }

    return (
        <div className='container'>

            <h1>Séries</h1>

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

            <Link to='/series/nova' className='btn btn-info'>Nova série</Link>

        </div>
    )
}

export default Series