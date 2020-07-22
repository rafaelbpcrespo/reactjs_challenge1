import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post(
      'repositories',
      {
        title: `Repositório ${Date.now()}`,
        url: 'http://github.com/repo',
        techs: ['Tech repo']
      }
    );

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if (response.status === 204) {
      const otherRepositories = repositories.filter(
        repository => repository.id !== id
      );
      setRepositories(otherRepositories);
    }
  }

  // Why this code does not pass the tests?
  // async function handleRemoveRepository(id) {
  //   const response = await api.delete(`repositories/${id}`);

  //   if (response.status === 204) {
  //     api.get('repositories').then(response => {
  //       setRepositories(response.data);
  //     });
  //   }
  // }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => {
          return(
            <li key={ repository.id }>
              { repository.title }
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
