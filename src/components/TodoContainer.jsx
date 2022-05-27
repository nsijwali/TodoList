import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddIcon from '@mui/icons-material/AddTask';
import TodoView from './TodoView';
import Legend from './Legend';

const TodoContainer = () => {
	const [uncompletedTask, setUncompletedTask] = useState([
		{
			id: 1,
			task: 'task is going to expire',
			completed: false,
			createdOn: dayjs().format(),
			deadline: dayjs().format(),
		},
	]);
	const [completedTask, setCompletedTask] = useState([]);
	const [task, setTask] = useState('');

	const NoData = () => (
		<Typography variant='overline' display='block' align='center' gutterBottom>
			There is nothing here
		</Typography>
	);

	const sortObj = (objs) =>
		objs.sort((a, b) =>
			a.createdOn < b.createdOn ? 1 : b.createdOn < a.createdOn ? -1 : 0,
		);

	const toggleTodo = (id, type) => {
		if (type === 'incomplete') {
			const temp = [...uncompletedTask];
			let state;
			temp.forEach((el, index) => {
				if (el.id === id) {
					temp.splice(index, 1);
					state = { ...el };
					state.completed = true;
				}
			});
			setCompletedTask(sortObj([state, ...completedTask]));
			setUncompletedTask(temp);
		} else {
			const temp = [...completedTask];
			let state;
			temp.forEach((el, index) => {
				if (el.id === id) {
					temp.splice(index, 1);
					state = { ...el };
					state.completed = false;
				}
			});
			setCompletedTask(temp);
			setUncompletedTask(sortObj([state, ...uncompletedTask]));
		}
	};

	const handleDateChange = (id, date) => {
		const temp = [...uncompletedTask];
		temp.forEach((el, index) => {
			if (el.id === id) {
				temp[index].deadline = dayjs(date).format();
			}
		});
		setUncompletedTask(temp);
	};

	const handleTaskChange = (e) => {
		setTask(e.target.value);
	};

	// add a new task
	const addTask = () => {
		if (task.length > 0) {
			const temp = {
				id: uncompletedTask.length + 1,
				task,
				completed: false,
				createdOn: dayjs().format(),
				deadline: dayjs().format(),
			};
			setUncompletedTask([temp, ...uncompletedTask]);
			setTask('');
		}
	};

	//move the task down by one level
	const moveDown = (id) => {
		const temp = [...uncompletedTask];
		let atIndex;
		let ele;
		temp.forEach((el, index) => {
			if (el.id === id) {
				atIndex = index;
				ele = el;
			}
		});
		temp.splice(atIndex, 1);
		temp.splice(atIndex + 1, 0, ele);
		setUncompletedTask(temp);
	};

	//move the task up by one level
	const moveUp = (id) => {
		const temp = [...uncompletedTask];
		let atIndex;
		let ele;
		temp.forEach((el, index) => {
			if (el.id === id) {
				atIndex = index;
				ele = el;
			}
		});
		if (atIndex === 0) return true;
		temp.splice(atIndex, 1);
		temp.splice(atIndex - 1, 0, ele);
		setUncompletedTask(temp);
	};
	return (
		<>
			<Container maxWidth='sm'>
				<CssBaseline />
				<Typography variant='h4' gutterBottom align='center' component='div'>
					My Todo List
				</Typography>

				<Paper
					component='form'
					sx={{
						p: '2px 4px',
						display: 'flex',
						alignItems: 'center',
						width: '100%',
					}}
				>
					<IconButton sx={{ p: '10px' }} aria-label='listAlt'>
						<ListAltIcon />
					</IconButton>
					<InputBase
						sx={{ ml: 1, flex: 1 }}
						placeholder='Add a task'
						inputProps={{ 'aria-label': 'add a task' }}
						value={task}
						type='text'
						onKeyDown={(e) => e.keyCode === 13 && e.preventDefault()}
						onChange={handleTaskChange}
					/>
					<Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
					<IconButton
						color='primary'
						sx={{ p: '10px' }}
						aria-label='add'
						onClick={addTask}
					>
						<AddIcon />
					</IconButton>
				</Paper>
				<Legend />
				<Grid
					container
					rowSpacing={1}
					columnSpacing={{ xs: 1, sm: 2, md: 3 }}
					mt={2}
				>
					<Grid item xs={6}>
						<Typography
							variant='h6'
							gutterBottom
							align='center'
							component='div'
						>
							Completed Task
						</Typography>
						{completedTask.length === 0 ? (
							<NoData />
						) : (
							completedTask.map((task) => (
								<React.Fragment key={task.id}>
									<TodoView
										todo={task}
										toggleTodo={toggleTodo}
										type='completed'
									/>
								</React.Fragment>
							))
						)}
					</Grid>
					<Grid item xs={6}>
						<Typography
							variant='h6'
							gutterBottom
							align='center'
							component='div'
						>
							Incomplete Task
						</Typography>
						{uncompletedTask.length === 0 ? (
							<NoData />
						) : (
							uncompletedTask.map((task) => (
								<React.Fragment key={task.id}>
									<TodoView
										todo={task}
										toggleTodo={toggleTodo}
										type='incomplete'
										handleDateChange={handleDateChange}
										moveUp={moveUp}
										moveDown={moveDown}
									/>
								</React.Fragment>
							))
						)}
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export default TodoContainer;
