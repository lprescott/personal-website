import './SideDrawer.scss'
import { makeStyles } from '@material-ui/core/styles'
import { Tabs, Tab } from '@material-ui/core'
import AccountTreeRoundedIcon from '@material-ui/icons/AccountTreeRounded'
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import OpenDrawer from './OpenDrawer'
import PersonIcon from '@material-ui/icons/Person'
import PropTypes from 'prop-types'
import React from 'react'

const useStyles = makeStyles({
	root: {
		maxWidth: (props) => (props.open ? '12em' : '5em')
	}
})

const SideDrawer = (props) => {
	const [value, setValue] = React.useState(0)
	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const classes = useStyles(props)

	return (
		<Tabs
			value={value}
			onChange={handleChange}
			aria-label="Vertical Routable Tabs"
			orientation="vertical"
			className={classes.root}
		>
			<Tab icon={<HomeRoundedIcon fontSize="large" />} label="home" />
			<Tab icon={<PersonIcon fontSize="large" />} label="about" />
			<Tab
				icon={<AccountTreeRoundedIcon fontSize="large" />}
				label="projects"
			/>
			<Tab
				icon={<DescriptionRoundedIcon fontSize="large" />}
				label="resume"
			/>
			<Tab icon={<PersonIcon fontSize="large" />} label="contact" />

			<OpenDrawer open={props.open} setOpen={props.setOpen} />
		</Tabs>
	)
}

SideDrawer.propTypes = {
	setOpen: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired
}

export default SideDrawer
