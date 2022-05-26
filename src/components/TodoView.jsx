import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import dayjs from 'dayjs';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

const TodoView = ({
	todo,
	toggleTodo = () => {},
	type,
	handleDateChange = () => {},
}) => {
	const {
		id,
		task = '',
		completed,
		createdOn = 'DD-MM-YYYY',
		deadline = 'DD-MM-YYYY',
	} = todo;
	const [open, setOpen] = React.useState(false);
	const [expiry, setExpiry] = React.useState(deadline);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
	const handleChange = (e) => {
		handleDateChange(id, e);
		setExpiry(e);
		handleClose();
	};

	const checkExpiry = () => {
		const date1 = dayjs(deadline);
		if (date1?.diff(dayjs().format(), 'hour') < 0) {
			return 'elapsed';
		} else if (date1?.diff(dayjs().format(), 'hour') === 0) {
			return 'expiring';
		}
	};
	const ModalCustom = () => (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<Box sx={style}>
				<Typography id='modal-modal-title' variant='h6' component='h2'>
					Add task deadline
				</Typography>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<DatePicker
						label='Date'
						value={expiry}
						onChange={(e) => handleChange(e)}
						renderInput={(params) => <TextField {...params} />}
					/>
				</LocalizationProvider>
			</Box>
		</Modal>
	);
	return (
		<Paper elevation={3} className={`${checkExpiry()} tasklist__card`} key={id}>
			<Typography
				variant='subtitle2'
				gutterBottom
				component='div'
				className='task__title'
			>
				{task}
				<Checkbox
					{...label}
					className='checkbox__tasklist'
					checked={completed}
					onChange={(_) => toggleTodo(id, type)}
				/>
			</Typography>
			<span className='task_date'>
				<Typography variant='caption' display='block' gutterBottom>
					<div>Created on</div>
					<div>{dayjs(createdOn).format('DD-MM-YYYY')}</div>
				</Typography>
				<Typography variant='caption' display='block' gutterBottom>
					<div style={{ textAlign: 'center' }}>Expiry by</div>
					<span className='calendar__wrapper'>
						<IconButton
							color='primary'
							aria-label='calendar'
							onClick={handleOpen}
							disabled={completed}
						>
							<CalendarIcon />
						</IconButton>

						<div>{dayjs(deadline).format('DD-MM-YYYY')}</div>
					</span>
				</Typography>
				<ModalCustom />
			</span>
		</Paper>
	);
};

export default TodoView;
