import { grey, blue } from '@mui/material/colors'

const common = {
	palette: {
		primary: blue,
		secondary: grey
	},
	overrides: {
		MuiTabs: {
			root: {
				transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
				height: '100%',
				backgroundColor: 'rgb(28, 28, 28)',
				color: 'white',
				borderBottomRightRadius: '1em',
				borderTopRightRadius: '1em',
				boxShadow:
					'0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
				'&:hover': {
					boxShadow:
						'0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
				}
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
		mode: 'light'
	}
}

export const darkTheme = {
	...common,
	palette: {
		mode: 'dark'
	}
}
