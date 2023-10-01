import { Repository } from '../types/Repository'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import styles from './Repositories.module.css'

export const Repositories = (repositories:Repository[]) => {

	const [repositoriesArray, setRepositoriesArray] = useState<Repository[]>([]);

	useEffect(() => {
    const storedRepositories = localStorage.getItem('repositories');

    if (storedRepositories) {
      const parsedRepositories = JSON.parse(storedRepositories);
      setRepositoriesArray(parsedRepositories);
    }
  }, []);

	const sortedRepositories = [...repositoriesArray].sort(
    (a, b) => b.stargazers_count - a.stargazers_count
  );

	return (
		<div>
      <h2>Repositórios do Usuário</h2>
			<Link to='/' className={styles.backButton}>Voltar</Link>
      <ul className={styles.listContainer}>
        {sortedRepositories.map((repo) => (
          <li key={repo.full_name} className={styles.listItem}>
            <h3 className={styles.repoTitle}>{repo.full_name}</h3>
            <p>
              <strong>Descrição:</strong> {repo.description || 'Nenhuma descrição disponível.'}
            </p>
            <p>
              <strong>Linguagem:</strong> {repo.language || 'Nenhuma linguagem especificada.'}
            </p>
            <p>
              <strong>Stars:</strong> {repo.stargazers_count}
            </p>
          </li>
        ))}
      </ul>
    </div>
	)
}