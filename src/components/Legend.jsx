import React from 'react';
import Typography from '@mui/material/Typography';

const lengendArr = [
	{
		key: 1,
		label: 'Active',
		color: 'green',
	},
	{
		key: 2,
		label: 'Needs Attention',
		color: 'orange',
	},
	{
		key: 3,
		label: 'Elapsed',
		color: 'red',
	},
];
const Legend = () => {
	return (
		<span className='legend'>
			{lengendArr.map(({ key, label, color }) => (
				<Typography
					variant='caption'
					display='block'
					gutterBottom
					className='legend__flex'
					key={key}
				>
					<div
						style={{
							border: `1px solid ${color}`,
							width: '10px',
							height: '10px',
							backgroundColor: color,
							marginInline: '.25rem',
						}}
					/>
					{label}
				</Typography>
			))}
		</span>
	);
};

export default Legend;
