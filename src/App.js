import './App.scss'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { darkTheme, lightTheme } from './common/styles/themes'
import Content from './Content'
import CssBaseline from '@material-ui/core/CssBaseline'
import React, { useState } from 'react'
import SideDrawer from './SideDrawer/SideDrawer'
import { useCycle } from 'framer-motion'

function App() {
	const [darkMode, setDarkMode] = useState(false)
	const currentTheme = darkMode ? darkTheme : lightTheme

	const theme = createMuiTheme(currentTheme)

	const [drawer, openDrawer] = useCycle({ width: '5em' }, { width: '12em' })
	const [content, moveContent] = useCycle({ x: '5em' }, { x: '12em' })

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<SideDrawer
				drawer={drawer}
				openDrawer={() => {
					openDrawer()
					moveContent()
				}}
			/>
			<Content
				darkMode={darkMode}
				setDarkMode={setDarkMode}
				content={content}
				moveContent={moveContent}
			/>
		</ThemeProvider>
	)
}

export default App
