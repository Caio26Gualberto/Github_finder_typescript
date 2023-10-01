import { UserProps } from '../types/user'
import {MdLocationPin} from 'react-icons/md'
import {Link, useNavigate} from 'react-router-dom'
import { Repository } from '../types/Repository';
import styles from './User.module.css'
import React from 'react';


interface User {
  user: UserProps;
  repositories: Repository[] | null;
}


const User: React.FC<User> = ({user, repositories}) => {

const handleViewRepositories = () => {
	localStorage.setItem('repositories', JSON.stringify(repositories));
  window.location.href = `/repos/${user.login}`;
}

	return (
		<div className={styles.user}>
			<img src={user.avatar_url} alt={user.login} />
			<h2>{user.login}</h2>
			{location && <p className={styles.location}><MdLocationPin/><span>{user.location}</span></p>}
			<div className={styles.stats}>
				<div>
					<p>Seguidores:</p>
					<p className={styles.number}>{user.followers}</p>
				</div>
				<div>
					<p>Seguindo:</p>
					<p className={styles.number}>{user.following}</p>
				</div>
			</div>
			<Link to='#' onClick={handleViewRepositories}>Ver melhores projetos</Link>
		</div>
	)
}


export default User