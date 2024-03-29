import './App.scss'
import {
	createTheme,
	ThemeProvider,
	StyledEngineProvider
} from '@mui/material/styles'
import { darkTheme, lightTheme } from './common/styles/themes'
import { DRAWER_WIDTH_CLOSED, DRAWER_WIDTH_OPEN } from './common/constants'
import { findRouteIndex } from './common/helper'
import { Switch, Route, useLocation, withRouter } from 'react-router-dom'
import { useCycle, AnimatePresence, motion } from 'framer-motion'
import Content from './Content'
import CssBaseline from '@mui/material/CssBaseline'
import React, { useEffect, useState } from 'react'
import routes from './nav/routes'
import Drawer from './Drawer/Drawer'
import { useMediaQuery } from '@mui/material'

const App = () => {
	const location = useLocation()
	const previousIndex = findRouteIndex(location.state?.prevPath)
	const currentIndex = findRouteIndex(location.pathname)

	const [mobileDevice, setMobileDevice] = useState(false)

	const onMobileDeviceHook = !useMediaQuery('(min-width:480px)')

	useEffect(() => {
		setMobileDevice(onMobileDeviceHook)
	}, [onMobileDeviceHook])

	// Theme
	const [darkMode, setDarkMode] = useState(false)
	const currentTheme = darkMode ? darkTheme : lightTheme
	const theme = createTheme(currentTheme)

	// Drawer animation
	const [drawer, openDrawer] = useCycle(
		{ width: DRAWER_WIDTH_CLOSED },
		{ width: DRAWER_WIDTH_OPEN }
	)

	// Page slide animation
	const [slideTransition, setSlideTransition] = React.useState(false)

	const inObj = mobileDevice ? { x: 0 } : { y: 0 }

	const outObj = (nextIndex) =>
		mobileDevice
			? {
					x: currentIndex < nextIndex ? '-100vw' : '100vw'
			  }
			: {
					y: currentIndex < nextIndex ? '-100vh' : '100vh'
			  }

	const initialObj = mobileDevice
		? {
				x: !slideTransition
					? 0
					: previousIndex > currentIndex
					? '-100vw'
					: '100vw'
		  }
		: {
				y: !slideTransition
					? 0
					: previousIndex > currentIndex
					? '-100vh'
					: '100vh'
		  }

	const pageTransition = {
		in: inObj,
		out: () => {
			/* 
				This is tricky, so a note here:  
				We use window.location.pathname to find the "next" index, as 
				to calculate whether or not the slide out animation should
				be upwards or downwards.
			*/
			const nextIndex = findRouteIndex(window.location.pathname)

			return outObj(nextIndex)
		},
		initial: initialObj
	}

	// Welcome message
	let msg = '%c Hi 👋! Welcome to my site!'
	let styles = [
		'font-size: 12px',
		'font-family: monospace',
		'background: white',
		'display: inline-block',
		'color: black',
		'padding: 8px 19px',
		'border: 1px dashed;'
	].join(';')

	useEffect(() => {
		console.log(msg, styles)
	}, [])

	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Drawer
					mobileDevice={mobileDevice}
					drawer={drawer}
					location={location}
					setSlideTransition={setSlideTransition}
					darkMode={darkMode}
					setDarkMode={setDarkMode}
					openDrawer={openDrawer}
				/>
				<Content>
					<AnimatePresence exitBeforeEnter>
						<Switch location={location} key={location.pathname}>
							{routes.map((route) => {
								const CurrentComponent = route.component

								return (
									<Route
										key={route.label + '-route'}
										exact
										path={route.path}
									>
										<motion.div
											exit="out"
											animate="in"
											initial="initial"
											variants={pageTransition}
											style={{ height: '100vh' }}
											transition={{ type: 'tween' }}
										>
											<CurrentComponent
												setDarkMode={setDarkMode}
												location={location}
												onMobileDevice={mobileDevice}
											/>
										</motion.div>
									</Route>
								)
							})}

							<Route>
								<a href="/home">Oh no!</a>
							</Route>
						</Switch>
					</AnimatePresence>
				</Content>
			</ThemeProvider>
		</StyledEngineProvider>
	)
}

export default withRouter(App)
