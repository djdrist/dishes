import { useSelector } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Box, Button, Typography } from '@mui/material';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Rating from '@mui/material/Rating';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const validate = (values) => {
	console.log(values);
	const errors = {};
	const requiredFields = ['name', 'type'];
	if (values.type === 'pizza') {
		requiredFields.push('no_of_slices', 'diameter');
	} else if (values.type === 'soup') {
		requiredFields.push('spiciness_scale');
	} else if (values.type === 'sandwich') {
		requiredFields.push('slices_of_bread');
	}
	if (+values.preparation_time.replace(/:/g, '') === 0) errors.preparation_time = 'Required';
	requiredFields.forEach((field) => {
		if (!values[field]) {
			errors[field] = 'Required';
		}
	});
	return errors;
};

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
	<TextField
		hintText={label}
		floatingLabelText={label}
		errorText={touched && error}
		{...input}
		{...custom}
	/>
);

const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
	<SelectField
		floatingLabelText={label}
		errorText={touched && error}
		{...input}
		onChange={(event, index, value) => input.onChange(value)}
		children={children}
		{...custom}
	/>
);

const renderRatingField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
	<>
		<Rating
			{...input}
			name={input.name + '-rating'}
			onChange={(event, value) => {
				input.onChange(value);
			}}
			{...custom}
			errorText={touched && error}
		/>
		{touched && error && (
			<Typography
				variant='subtitle2'
				color='error'>
				{error}
			</Typography>
		)}
	</>
);

const DishForm = (props) => {
	const dishTypes = ['pizza', 'soup', 'sandwich'];
	const { handleSubmit, pristine, reset, submitting } = props;
	const type = useSelector((state) => formValueSelector('DishForm')(state, 'type'));

	const extraFieldsForDish = () => {
		switch (type) {
			case 'pizza':
				return (
					<>
						<div>
							<Field
								name='no_of_slices'
								component={renderTextField}
								label='# of slices'
								type='number'
								min={1}
							/>
						</div>
						<div>
							<Field
								name='diameter'
								component={renderTextField}
								label='diameter'
								type='number'
								min={0.1}
								step={0.1}
							/>
						</div>
					</>
				);
			case 'soup':
				return (
					<Box
						marginY={3}
						textAlign='center'>
						<Typography
							variant='subtitle1'
							margin={1}>
							Spiciness scale
						</Typography>
						<Field
							name='spiciness_scale'
							component={renderRatingField}
							label='spiciness scale'
							max={10}
							emptyIcon={<LocalFireDepartmentIcon />}
							icon={<LocalFireDepartmentIcon />}
						/>
					</Box>
				);
			case 'sandwich':
				return (
					<Field
						name='slices_of_bread'
						component={renderTextField}
						label='number of slices of bread required'
						type='number'
						min={1}
					/>
				);
			default:
				break;
		}
	};
	return (
		<MuiThemeProvider>
			<Box
				mt={5}
				display='flex'
				justifyContent='center'>
				<form onSubmit={handleSubmit}>
					<Typography
						variant='h5'
						textAlign='center'>
						Enter Your dish
					</Typography>
					<div>
						<Field
							padding={5}
							name='name'
							component={renderTextField}
							label='dish name'
						/>
					</div>
					<div>
						<Field
							name='preparation_time'
							component={renderTextField}
							label='preparation time'
							type='time'
							step={1}
						/>
					</div>
					<div>
						<Field
							name='type'
							component={renderSelectField}
							label='dish type'>
							{dishTypes.map((type) => (
								<MenuItem
									key={type}
									value={type}
									primaryText={
										<Box
											display='flex'
											justifyContent='space-between'
											margin={2}>
											<Typography>{type.toUpperCase()}</Typography>
											{type === 'pizza' && <LocalPizzaIcon />}
											{type === 'soup' && <SoupKitchenIcon />}
											{type === 'sandwich' && <BreakfastDiningIcon />}
										</Box>
									}
								/>
							))}
						</Field>
					</div>
					<div>{extraFieldsForDish()}</div>
					<Box
						display='flex'
						justifyContent='space-around'
						mt={5}>
						<Button
							type='submit'
							variant='contained'>
							Submit
						</Button>
						<Button
							type='button'
							variant='contained'
							disabled={pristine || submitting}
							onClick={reset}>
							Clear Values
						</Button>
					</Box>
				</form>
			</Box>
		</MuiThemeProvider>
	);
};

export default reduxForm({
	form: 'DishForm',
	validate,
})(DishForm);
