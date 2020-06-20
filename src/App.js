import React from 'react'
import './App.scss'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const lightTheme = createMuiTheme({
	overrides: {}
})

const darkTheme = createMuiTheme({
	overrides: {}
})

function App() {
	const [darkMode, setDarkMode] = React.useState(false)

	return (
		<ThemeProvider
			className="App"
			theme={darkMode ? darkTheme : lightTheme}
		>
			<header className="App-header">Header</header>
			<div className="App-body">Home</div>
		</ThemeProvider>
	)
}

export default App
