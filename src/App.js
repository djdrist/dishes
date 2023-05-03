import { Container } from '@mui/material';
import DishForm from './components/DishForm';

const App = () => {
	const handleSubmit = (values) => {
		console.log(values);
	};

	return (
		<Container>
			<DishForm
				onSubmit={handleSubmit}
				initialValues={{ preparation_time: '00:00:00' }}
			/>
		</Container>
	);
};

export default App;
