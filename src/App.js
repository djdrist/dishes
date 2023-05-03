import { Container } from '@mui/material';
import DishForm from './components/DishForm';

const App = () => {
	const handleSubmit = (values) => {
		console.log(values);
	};

	return (
		<Container>
			<DishForm onSubmit={handleSubmit} />
		</Container>
	);
};

export default App;
