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
	DRAWER_TRANSITION_LENGTH,
	NICE_BLUE
} from '../common/constants'
import { motion } from 'framer-motion'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import { styled } from '@mui/material/styles'

const useStyles = makeStyles({
	root: {
		color: 'white'
	}
})

const SideTabs = styled(Tabs)(() => ({
	transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
	height: '100%',
	backgroundColor: 'rgb(28, 28, 28)',
	borderBottomRightRadius: '1em',
	borderTopRightRadius: '1em',
	boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
	'&:hover': {
		boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
	}
}))

const SideTab = styled(Tab)(() => ({
	'&.Mui-selected': {
		color: NICE_BLUE
	},
	color: 'grey',
	display: 'flex',
	flexDirection: 'row',
	padding: 'unset',
	justifyContent: 'start'
}))

const SideDrawer = (props) => {
	const isOpen = props.drawer.width === DRAWER_WIDTH_OPEN

	const classes = useStyles()

	const getSideDrawerHeight = () => {
		const tabCount = routes.length
		return tabCount * TAB_HEIGHT + CHEVRON_HEIGHT + DRAWER_PADDING
	}

	// Chevron animation
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
			<SideTabs
				value={findRouteIndex(props.location.pathname)}
				aria-label="Vertical Routable Tabs"
				orientation="vertical"
				className={classes.root}
				TabIndicatorProps={{
					style: {
						width: '.3em',
						backgroundColor: NICE_BLUE,
						left: '0'
					}
				}}
			>
				{routes.map((route) => (
					<SideTab
						key={route.label + '-route'}
						to={{
							pathname: route.to,
							state: { prevPath: props.location.pathname }
						}}
						component={Link}
						icon={
							<div style={{ minWidth: '6em' }}>
								<route.icon fontSize="large" />
							</div>
						}
						label={
							<span
								style={{
									minWidth: `calc(${DRAWER_WIDTH_OPEN} - ${DRAWER_WIDTH_CLOSED} + .3em)`,
									textAlign: 'left'
								}}
							>
								{route.label}
							</span>
						}
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
			</SideTabs>
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
