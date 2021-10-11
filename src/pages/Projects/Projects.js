import React from 'react'
import PageInner from '../../PageInner'
import PropTypes from 'prop-types'

const Projects = (props) => {
	return <PageInner onMobileDevice={props.onMobileDevice}>Projects</PageInner>
}

Projects.propTypes = {
	onMobileDevice: PropTypes.bool.isRequired
}

export default Projects
