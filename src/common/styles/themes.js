import { grey, blue } from '@mui/material/colors'

const common = {
	palette: {
		primary: blue,
		secondary: grey
	},
	components: {}
}

export const lightTheme = {
	...common,
	palette: {
		mode: 'light'
	}
}

export const darkTheme = {
	...common,
	palette: {
		mode: 'dark'
	}
}
