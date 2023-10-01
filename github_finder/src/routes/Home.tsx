import Search from '../components/Search'
import {useState, useEffect} from 'react'
import { UserProps } from '../types/user'
import { Repository } from '../types/Repository'
import User from '../components/User'
import Error from '../components/Error'

export const Home = () => {

	const [user, setUser] = useState<UserProps | null>(null)
	const [repositories, setRepositories] = useState<Repository[]>([]);
	const [error, setError] = useState(false)

	const loadUser = async(userName: string) => {
		setError(false)
		setUser(null)

		const res = await fetch(`https://api.github.com/users/${userName}`)
		const data = await res.json()
		

		if(res.status === 404) {
			setError(true)
			return
		}

		const {avatar_url, login, location, followers, following} = data

		const userData: UserProps = {
			avatar_url,
			login,
			location,
			followers,
			following
		}

		const repos = await fetch(`https://api.github.com/users/${userName}/repos`)
		const dataRepository = await repos.json();
		const repositoriesData = dataRepository.map((repo: Repository) => {
  	const { stargazers_count, language, full_name, description } = repo;
  			return {
    				stargazers_count,
    				language,
    				full_name,
    				description,
  				};
		});

		setUser(userData);
		setRepositories(repositoriesData);
	}

	return (
		<div>
			<Search loadUser={loadUser}/>
			{user && <User user={user} repositories={repositories}/>}
			{error && <Error/>}
		</div>
	)
}
