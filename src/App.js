import React, { useState } from 'react'
import './App.scss'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import {
	orange,
	lightBlue,
	deepPurple,
	deepOrange
} from '@material-ui/core/colors'
import CssBaseline from '@material-ui/core/CssBaseline'

function App() {
	const [open, setOpen] = useState(true)
	const [darkState, setDarkState] = useState(false)
	const palletType = darkState ? 'dark' : 'light'
	const mainPrimaryColor = darkState ? orange[500] : lightBlue[500]
	const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500]

	const theme = createMuiTheme({
		palette: {
			type: palletType,
			primary: {
				main: mainPrimaryColor
			},
			secondary: {
				main: mainSecondaryColor
			}
		}
	})

	return (
		<ThemeProvider theme={theme} className="App">
			<CssBaseline />
			Hello World
		</ThemeProvider>
	)
}

export default App
