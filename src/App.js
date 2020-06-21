import './App.scss'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { darkTheme, lightTheme } from './common/styles/themes'
import Content from './Content'
import CssBaseline from '@material-ui/core/CssBaseline'
import React, { useState } from 'react'
import SideDrawer from './SideDrawer/SideDrawer'
import { useCycle, AnimatePresence, motion } from 'framer-motion'
import { Switch, Route, useLocation } from 'react-router-dom'
import routes from './nav/routes'
import { findRouteIndex } from './common/helper'

function App() {
	const [darkMode, setDarkMode] = useState(false)
	const currentTheme = darkMode ? darkTheme : lightTheme

	const theme = createMuiTheme(currentTheme)

	const [drawer, openDrawer] = useCycle({ width: '5em' }, { width: '12em' })
	const [content, moveContent] = useCycle({ x: '5em' }, { x: '12em' })

	const location = useLocation()

	// console.log(location.state?.prevPath)
	const previousIndex = findRouteIndex(location.state?.prevPath)
	const currentIndex = findRouteIndex(location.pathname)

	// console.log(`Previous: ${previousIndex}`)
	// console.log(`Current: ${currentIndex}`)
	// console.log(previousIndex > currentIndex ? '-100vh' : '100vh')

	const pageTransition = {
		in: {
			opacity: 1,
			y: 0
		},
		out: {
			opacity: 0,
			y: previousIndex < currentIndex ? '-100vh' : '100vh'
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

export default App
