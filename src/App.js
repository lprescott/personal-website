import './App.scss'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { darkTheme, lightTheme } from './common/styles/themes'
import Content from './Content'
import CssBaseline from '@material-ui/core/CssBaseline'
import React, { useState } from 'react'
import SideDrawer from './SideDrawer/SideDrawer'

function App() {
	const [open, setOpen] = useState(false)
	const [darkMode, setDarkMode] = useState(false)
	const currentTheme = darkMode ? darkTheme : lightTheme

	const theme = createMuiTheme(currentTheme)

	console.log(theme)

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<SideDrawer open={open} setOpen={setOpen} />
			<Content darkMode={darkMode} setDarkMode={setDarkMode} />
		</ThemeProvider>
	)
}

export default App
