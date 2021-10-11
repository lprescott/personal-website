import React from 'react'
import PageInner from '../../PageInner'
import PropTypes from 'prop-types'

const About = (props) => {
	return <PageInner onMobileDevice={props.onMobileDevice}>About</PageInner>
}

About.propTypes = {
	onMobileDevice: PropTypes.bool.isRequired
}

export default About
