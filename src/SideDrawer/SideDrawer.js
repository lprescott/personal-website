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
import { findRouteIndex } from '../common/helper'
import {
	TAB_HEIGHT,
	CHEVRON_HEIGHT,
	DRAWER_PADDING,
	DRAWER_WIDTH_CLOSED,
	DRAWER_TRANSITION_LENGTH
} from '../common/constants'

const useStyles = makeStyles({
	root: {
		color: 'white'
	}
})

const SideDrawer = (props) => {
	const [flip, cycle] = useCycle({ scaleX: 1, x: 10 }, { scaleX: -1, x: 135 })
	const classes = useStyles()

	const getSideDrawerHeight = () => {
		const tabCount = routes.length
		return tabCount * TAB_HEIGHT + CHEVRON_HEIGHT + DRAWER_PADDING
	}

	return (
		<Frame
			animate={props.drawer}
			height={`${getSideDrawerHeight()}em`}
			top={`calc(50vh - ${getSideDrawerHeight() / 2}em)`}
			transition={{ duration: DRAWER_TRANSITION_LENGTH }}
			width={null}
			background={null}
			style={{
				borderBottomRightRadius: '1em',
				borderTopRightRadius: '1em',
				overflow: 'hidden'
			}}
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
					transition={{ duration: DRAWER_TRANSITION_LENGTH }}
				>
					<IconButton
						aria-label={
							props.drawer.width === DRAWER_WIDTH_CLOSED
								? 'Open Drawer'
								: 'Close Drawer'
						}
					>
						<ArrowForwardIosRoundedIcon classes={classes} />
					</IconButton>
				</Frame>
			</Tabs>
		</Frame>
	)
}

SideDrawer.propTypes = {
	openDrawer: PropTypes.func.isRequired,
	drawer: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired
}

export default SideDrawer
