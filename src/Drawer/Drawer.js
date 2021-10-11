import './Drawer.scss'
import { findRouteIndex } from '../common/helper'
import { Frame } from 'framer'
import { Link } from 'react-router-dom'
import makeStyles from '@mui/styles/makeStyles'
import { Tabs, Tab, IconButton } from '@mui/material'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded'
import PropTypes from 'prop-types'
import React from 'react'
import routes from '../nav/routes'
import {
	TAB_HEIGHT,
	CHEVRON_HEIGHT,
	DRAWER_WIDTH_OPEN,
	DRAWER_WIDTH_CLOSED,
	DRAWER_TRANSITION_LENGTH,
	NICE_BLUE
} from '../common/constants'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import { styled } from '@mui/material/styles'

const useStyles = makeStyles({
	root: {
		color: 'white'
	}
})

const Drawer = (props) => {
	const isOpen = props.drawer.width === DRAWER_WIDTH_OPEN

	const { mobileDevice } = props

	const classes = useStyles()

	const SideTabs = styled(Tabs)(() => ({
		transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
		height: '100%',
		backgroundColor: 'rgb(28, 28, 28)',
		borderBottomRightRadius: mobileDevice ? 0 : '1em',
		borderTopRightRadius: mobileDevice ? 0 : '1em',
		boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
		'&:hover': {
			boxShadow:
				'0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
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
		justifyContent: 'start',
		minWidth: DRAWER_WIDTH_CLOSED
	}))

	const getSideDrawerHeight = () => {
		const tabCount = routes.length
		// The 1 is from the padding above the chevron and dark mode
		return tabCount * TAB_HEIGHT + CHEVRON_HEIGHT + 1
	}

	return (
		<Frame
			id="side-drawer-frame"
			initial={
				!mobileDevice
					? { width: DRAWER_WIDTH_CLOSED }
					: { width: '100vw' }
			}
			animate={props.drawer}
			height={mobileDevice ? 50 : `${getSideDrawerHeight()}em`}
			top={
				mobileDevice ? 0 : `calc(50vh - ${getSideDrawerHeight() / 2}em)`
			}
			transition={{ duration: DRAWER_TRANSITION_LENGTH }}
			width={null}
			background={null}
			style={{ zIndex: 1 }}
		>
			<SideTabs
				id="side-drawer"
				value={findRouteIndex(props.location.pathname)}
				aria-label="Vertical Routable Tabs"
				orientation={mobileDevice ? 'horizontal' : 'vertical'}
				className={classes.root}
				variant={mobileDevice ? 'scrollable' : 'standard'}
				allowScrollButtonsMobile
				scrollButtons={mobileDevice}
				TabIndicatorProps={{
					sx: !mobileDevice
						? {
								width: '.3em',
								backgroundColor: NICE_BLUE,
								left: '0'
						  }
						: { backgroundColor: NICE_BLUE }
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
							<div style={{ minWidth: '6em', marginBottom: 0 }}>
								<route.icon fontSize="large" />
							</div>
						}
						label={!mobileDevice ? route.label : null}
						onClick={() => props.setSlideTransition(true)}
					/>
				))}
				{!mobileDevice ? (
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							minWidth: DRAWER_WIDTH_OPEN,
							marginTop: '1em'
						}}
					>
						{/* Expand/Retract Button */}
						<div>
							<IconButton
								aria-label={
									!isOpen ? 'Open Drawer' : 'Close Drawer'
								}
								TouchRippleProps={{
									style: {
										color: NICE_BLUE
									}
								}}
								size="large"
								onClick={() => props.openDrawer()}
							>
								{!isOpen ? (
									<ArrowForwardIosRoundedIcon
										classes={classes}
									/>
								) : (
									<ArrowBackIosRoundedIcon
										classes={classes}
									/>
								)}
							</IconButton>
						</div>

						{/* Dark Mode Button */}
						<div>
							<IconButton
								onClick={() =>
									props.setDarkMode(!props.darkMode)
								}
								size="large"
								TouchRippleProps={{
									style: {
										color: NICE_BLUE
									}
								}}
							>
								{props.darkMode ? (
									<Brightness4Icon />
								) : (
									<Brightness7Icon />
								)}
							</IconButton>
						</div>
					</div>
				) : null}
			</SideTabs>
		</Frame>
	)
}

Drawer.propTypes = {
	openDrawer: PropTypes.func.isRequired,
	drawer: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	setSlideTransition: PropTypes.func.isRequired,
	darkMode: PropTypes.bool.isRequired,
	setDarkMode: PropTypes.func.isRequired,
	mobileDevice: PropTypes.bool.isRequired
}

export default Drawer
