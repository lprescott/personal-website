import './App.scss'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { darkTheme, lightTheme } from './common/styles/themes'
import Content from './Content'
import CssBaseline from '@material-ui/core/CssBaseline'
import React, { useState } from 'react'
import SideDrawer from './SideDrawer/SideDrawer'
import { useCycle, AnimatePresence, motion } from 'framer-motion'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import routes from './nav/routes'

function App() {
	const [darkMode, setDarkMode] = useState(false)
	const currentTheme = darkMode ? darkTheme : lightTheme

	const theme = createMuiTheme(currentTheme)

	const [drawer, openDrawer] = useCycle({ width: '5em' }, { width: '12em' })
	const [content, moveContent] = useCycle({ x: '5em' }, { x: '12em' })

	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<SideDrawer
					drawer={drawer}
					openDrawer={() => {
						openDrawer()
						moveContent()
					}}
				/>
				<Content content={content} moveContent={moveContent}>
					<AnimatePresence>
						<Switch>
							{routes.map((route) => {
								const CurrentComponent = route.component

								return (
									<Route
										key={route.label + '-route'}
										exact
										path={route.path}
									>
										<motion.div
											exit={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											initial={{ opacity: 0 }}
										>
											<CurrentComponent
												setDarkMode={setDarkMode}
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
		</BrowserRouter>
	)
}

export default App
