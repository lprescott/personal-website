import { blue, grey } from '@material-ui/core/colors/blue'

const common = {
	palette: {
		primary: blue,
		secondary: grey
	},
	overrides: {
		MuiTabs: {
			root: {
				transition: 'max-width 0.25s ease-in',
				height: '100%',
				backgroundColor: 'rgb(28, 28, 28)',
				color: 'white'
			}
		},
		MuiTab: {
			root: {
				padding: 'unset',
				'&$selected': {
					backgroundColor: 'rgb(68, 68, 68)'
				}
			},
			wrapper: {
				flexDirection: 'row',
				justifyContent: 'unset'
			}
		}
	}
}

export const lightTheme = {
	...common,
	palette: {
		type: 'light'
	}
}

export const darkTheme = {
	...common,
	palette: {
		type: 'dark'
	}
}
