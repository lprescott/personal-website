import './App.scss'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { darkTheme, lightTheme } from './common/styles/themes'
import Content from './Content'
import CssBaseline from '@material-ui/core/CssBaseline'
import React, { useState } from 'react'
import SideDrawer from './SideDrawer/SideDrawer'
import { useCycle, AnimatePresence, motion } from 'framer-motion'
import { Switch, Route, useLocation, withRouter } from 'react-router-dom'
import routes from './nav/routes'
import { findRouteIndex } from './common/helper'
import { DRAWER_WIDTH_CLOSED, DRAWER_WIDTH_OPEN } from './common/constants'

const App = () => {
	const [darkMode, setDarkMode] = useState(false)
	const currentTheme = darkMode ? darkTheme : lightTheme

	const theme = createMuiTheme(currentTheme)

	const [drawer, openDrawer] = useCycle(
		{ width: DRAWER_WIDTH_CLOSED },
		{ width: DRAWER_WIDTH_OPEN }
	)
	const [content, moveContent] = useCycle(
		{ x: DRAWER_WIDTH_CLOSED },
		{ x: DRAWER_WIDTH_OPEN }
	)

	const location = useLocation()

	const previousIndex = findRouteIndex(location.state?.prevPath)
	const currentIndex = findRouteIndex(location.pathname)

	const pageTransition = {
		in: {
			opacity: 1,
			y: 0
		},
		out: () => {
			/* 
				This is tricky, so a note here:  
				We use window.location.pathname to find the "next" index, as 
				to calculate whether or not the slide out animation should
				be upwards or downwards.
			*/
			const nextIndex = findRouteIndex(window.location.pathname)

			return {
				opacity: 0,
				y: currentIndex < nextIndex ? '-100vh' : '100vh'
			}
		},
		initial: {
			opacity: 0,
			y: previousIndex > currentIndex ? '-100vh' : '100vh'
		}
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<SideDrawer
				drawer={drawer}
				location={location}
				openDrawer={() => {
					openDrawer()
					moveContent()
				}}
			/>
			<Content content={content} moveContent={moveContent}>
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
									>
										<CurrentComponent
											setDarkMode={setDarkMode}
											location={location}
										/>
									</motion.div>
								</Route>
							)
						})}

						<Route>Oh no!</Route>
					</Switch>
				</AnimatePresence>
			</Content>
		</ThemeProvider>
	)
}

export default withRouter(App)
