import React from 'react'
import PropTypes from 'prop-types'

const PageWrapper = (props) => {
	return <div className="PageWrapper">{props.children}</div>
}

PageWrapper.propTypes = {
	children: PropTypes.node.isRequired
}

export default PageWrapper
