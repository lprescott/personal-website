import { IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded'
import PropTypes from 'prop-types'
import React from 'react'
import { motion } from 'framer-motion'

const useStyles = makeStyles({
	root: {
		color: 'white'
	}
})

const OpenDrawer = (props) => {
	const classes = useStyles(props)

	return (
		<IconButton
			onClick={() => {
				props.setOpen(!props.open)
			}}
		>
			<ArrowForwardIosRoundedIcon classes={classes} />
		</IconButton>
	)
}

OpenDrawer.propTypes = {
	setOpen: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired
}

export default OpenDrawer
