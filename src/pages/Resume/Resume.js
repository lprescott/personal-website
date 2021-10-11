import React from 'react'
import PageInner from '../../PageInner'
import PropTypes from 'prop-types'

const Resume = (props) => {
	return <PageInner onMobileDevice={props.onMobileDevice}>Resume</PageInner>
}

Resume.propTypes = {
	onMobileDevice: PropTypes.bool.isRequired
}

export default Resume
