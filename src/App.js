import React, { useState, useEffect } from "react";
import { FaGithub, FaHeart } from 'react-icons/fa'


import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Novo repositório ${Date.now()}`,
      owner: "http://github.com/fernandogatto",
      techs: "['Node.js', ''React.js'']",
      likes: 0
    })

    const repository = response.data

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    try {
      const response = await api.delete(`/repositories/${id}`)

      setRepositories(repositories.filter(repository => repository.id !== id))
    } catch(err) {
      alert('Error on delete repository')
    }
  }

  return (
    <div className="container">
      <h1>Desafio Conceitos de ReactJS</h1>

      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id} className="card">
            <div className="card-item">
              <div className="card-content">
                <FaGithub className="github"/>
                <div class="card-description">
                  <p>{repository.title}</p>
                  <p>
                    <FaHeart color="#ff002b" />
                    {repository.likes}
                  </p>
                </div>
              </div>
              <button onClick={() => handleRemoveRepository(repository.id)} className="remove">
              Remover
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository} className="add">Adicionar</button>
    </div>
  );
}

export default App;
