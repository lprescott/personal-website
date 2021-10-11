import './SideDrawer.scss'
import { findRouteIndex } from '../common/helper'
import { Frame } from 'framer'
import { Link } from 'react-router-dom'
import makeStyles from '@mui/styles/makeStyles'
import { Tabs, Tab, IconButton } from '@mui/material'
import { useCycle } from 'framer-motion'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import PropTypes from 'prop-types'
import React from 'react'
import routes from '../nav/routes'
import {
	TAB_HEIGHT,
	CHEVRON_HEIGHT,
	DRAWER_PADDING,
	DRAWER_WIDTH_OPEN,
	DRAWER_WIDTH_CLOSED,
	DRAWER_TRANSITION_LENGTH
} from '../common/constants'
import { motion } from 'framer-motion'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'

const useStyles = makeStyles({
	root: {
		color: 'white'
	}
})

const SideDrawer = (props) => {
	const isOpen = props.drawer.width === DRAWER_WIDTH_OPEN

	const classes = useStyles()

	const getSideDrawerHeight = () => {
		const tabCount = routes.length
		return tabCount * TAB_HEIGHT + CHEVRON_HEIGHT + DRAWER_PADDING
	}

	// Chevon animation
	const [flip, cycleFlip] = useCycle(
		{ scaleX: 1, x: 10, delay: 1 },
		{ scaleX: -1, x: 120, delay: 1 }
	)
	const [fade, cycleFade] = useCycle(
		{ x: 10, y: 442, opacity: 0 },
		{ x: 10, y: 442, opacity: 1 }
	)

	return (
		<Frame
			initial={{ width: DRAWER_WIDTH_CLOSED }}
			animate={props.drawer}
			height={`${getSideDrawerHeight()}em`}
			top={`calc(50vh - ${getSideDrawerHeight() / 2}em)`}
			transition={{ duration: DRAWER_TRANSITION_LENGTH }}
			width={null}
			background={null}
		>
			<Tabs
				value={findRouteIndex(props.location.pathname)}
				aria-label="Vertical Routable Tabs"
				orientation="vertical"
				className={classes.root}
				TabIndicatorProps={{
					style: {
						width: '.3em',
						backgroundColor: '#97E9EF',
						left: '0'
					}
				}}
			>
				{routes.map((route) => (
					<Tab
						key={route.label + '-route'}
						to={{
							pathname: route.to,
							state: { prevPath: props.location.pathname }
						}}
						component={Link}
						icon={<route.icon fontSize="large" />}
						label={route.label}
						onClick={() => props.setSlideTransition(true)}
					/>
				))}

				{/* Dark Mode Button */}
				<Frame
					initial={{ x: 10, y: 10, opacity: 0 }}
					animate={fade}
					background={null}
					size={50}
					transition={{ delay: isOpen ? 0 : 0.5 }}
				>
					<motion.div
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 1 }}
					>
						<IconButton
							onClick={() => props.setDarkMode(!props.darkMode)}
							size="large"
						>
							{props.darkMode ? (
								<Brightness4Icon />
							) : (
								<Brightness7Icon />
							)}
						</IconButton>
					</motion.div>
				</Frame>

				{/* Open Drawer Button */}
				<Frame
					initial={{ scaleX: 1, x: 10 }}
					animate={flip}
					onTap={() => {
						cycleFlip()
						cycleFade()
						props.openDrawer()
					}}
					size={50}
					background={null}
					bottom={5}
					transition={{
						duration: DRAWER_TRANSITION_LENGTH
					}}
				>
					<motion.div
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 1 }}
					>
						<IconButton
							aria-label={
								!isOpen ? 'Open Drawer' : 'Close Drawer'
							}
							size="large"
						>
							<ArrowForwardIosRoundedIcon classes={classes} />
						</IconButton>
					</motion.div>
				</Frame>
			</Tabs>
		</Frame>
	)
}

SideDrawer.propTypes = {
	openDrawer: PropTypes.func.isRequired,
	drawer: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	setSlideTransition: PropTypes.func.isRequired,
	darkMode: PropTypes.bool.isRequired,
	setDarkMode: PropTypes.func.isRequired
}

export default SideDrawer
