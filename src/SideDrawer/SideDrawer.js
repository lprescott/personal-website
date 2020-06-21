import './SideDrawer.scss'
import { makeStyles } from '@material-ui/core/styles'
import { Tabs, Tab, IconButton } from '@material-ui/core'
import AccountTreeRoundedIcon from '@material-ui/icons/AccountTreeRounded'
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import PersonIcon from '@material-ui/icons/Person'
import PropTypes from 'prop-types'
import React from 'react'
import { Frame } from 'framer'
import { useCycle } from 'framer-motion'
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded'

const useStyles = makeStyles({
	root: {
		color: 'white'
	}
})

const SideDrawer = (props) => {
	const [flip, cycle] = useCycle({ scaleX: 1, x: 10 }, { scaleX: -1, x: 100 })

	const [value, setValue] = React.useState(0)
	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const classes = useStyles()

	return (
		<Frame animate={props.drawer} height="100vh" width={null}>
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

				<Frame
					animate={flip}
					onTap={() => {
						cycle()
						props.openDrawer()
					}}
					size={50}
					background={null}
					bottom={5}
					transition={{ duration: 0.1 }}
				>
					<IconButton>
						<ArrowForwardIosRoundedIcon classes={classes} />
					</IconButton>
				</Frame>
			</Tabs>
		</Frame>
	)
}

SideDrawer.propTypes = {
	openDrawer: PropTypes.func.isRequired,
	drawer: PropTypes.object.isRequired
}

export default SideDrawer
