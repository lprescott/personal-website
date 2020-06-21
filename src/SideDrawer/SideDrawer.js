import './SideDrawer.scss'
import { makeStyles } from '@material-ui/core/styles'
import { Tabs, Tab, IconButton } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { Frame } from 'framer'
import { useCycle } from 'framer-motion'
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded'
import { Link } from 'react-router-dom'
import routes from '../nav/routes'

const useStyles = makeStyles({
	root: {
		color: 'white'
	}
})

const SideDrawer = (props) => {
	const [flip, cycle] = useCycle({ scaleX: 1, x: 10 }, { scaleX: -1, x: 100 })

	const [value, setValue] = React.useState(0)
	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const classes = useStyles()

	const getSideDrawerHeight = () => {
		const tabHeight = 4.5
		const chevronHeight = 3
		const tabCount = routes.length
		const offset = 10

		return tabCount * tabHeight + chevronHeight + offset
	}

	console.log(getSideDrawerHeight())

	return (
		<Frame
			animate={props.drawer}
			height={`${getSideDrawerHeight()}em`}
			top={`calc(50vh - ${getSideDrawerHeight() / 2}em)`}
			width={null}
			style={{
				borderBottomRightRadius: '1em',
				borderTopRightRadius: '1em',
				overflow: 'hidden'
			}}
		>
			<Tabs
				value={value}
				onChange={handleChange}
				aria-label="Vertical Routable Tabs"
				orientation="vertical"
				className={classes.root}
			>
				{routes.map((route) => (
					<Tab
						key={route.label + '-route'}
						to={route.to}
						component={Link}
						icon={<route.icon fontSize="large" />}
						label={route.label}
					/>
				))}

				<Frame
					animate={flip}
					onTap={() => {
						cycle()
						props.openDrawer()
					}}
					size={50}
					background={null}
					bottom={5}
					transition={{ duration: 0.1 }}
				>
					<IconButton>
						<ArrowForwardIosRoundedIcon classes={classes} />
					</IconButton>
				</Frame>
			</Tabs>
		</Frame>
	)
}

SideDrawer.propTypes = {
	openDrawer: PropTypes.func.isRequired,
	drawer: PropTypes.object.isRequired
}

export default SideDrawer
