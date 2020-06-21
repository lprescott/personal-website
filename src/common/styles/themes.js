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
				backgroundColor: 'rgba(28, 28, 28, 1)',
				color: 'white'
			}
		},
		MuiTab: {
			root: {
				padding: 'unset',
				'&$selected': {
					backgroundColor: '#4B4B4C'
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
