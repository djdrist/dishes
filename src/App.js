import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Snackbar, IconButton, Alert } from '@mui/material';
import { reset, SubmissionError } from 'redux-form';
import CloseIcon from '@mui/icons-material/Close';
import DishForm from './components/DishForm';

const App = () => {
	const [loader, setLoader] = useState(false);
	const [showMessage, setShowMessage] = useState(false);
	const [message, setMessage] = useState({});
	const dispatch = useDispatch();

	const handleSubmit = async (values) => {
		const newDish = {
			name: values.name,
			type: values.type,
			preparation_time: values.preparation_time,
		};
		if (values.type === 'pizza') {
			newDish.no_of_slices = values.no_of_slices;
			newDish.diameter = values.diameter;
		} else if (values.type === 'soup') {
			newDish.spiciness_scale = values.spiciness_scale;
		} else if (values.type === 'sandwich') {
			newDish.slices_of_bread = values.slices_of_bread;
		}
		setLoader(true);
		const response = await fetch('https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newDish),
		});
		setLoader(false);
		const data = await response.json();
		if (response.status === 200) {
			setMessage({ text: `Dish added successfully with ID ${data.id}`, severity: 'success' });
			setShowMessage(true);
			dispatch(reset('DishForm'));
		} else {
			setMessage({ text: 'Error adding dish', severity: 'error' });
			setShowMessage(true);
			throw new SubmissionError(data);
		}
	};

	return (
		<Container>
			<Snackbar
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				open={showMessage}
				autoHideDuration={6000}
				onClose={() => setShowMessage(false)}
				action={
					<IconButton
						size='small'
						aria-label='close'
						color='inherit'
						onClick={() => setShowMessage(false)}>
						<CloseIcon fontSize='small' />
					</IconButton>
				}>
				<Alert
					onClose={() => setShowMessage(false)}
					severity={message.severity}
					sx={{ width: '100%' }}>
					{message.text}
				</Alert>
			</Snackbar>
			<DishForm
				onSubmit={handleSubmit}
				initialValues={{ preparation_time: '00:00:00' }}
				loader={loader}
			/>
		</Container>
	);
};

export default App;
