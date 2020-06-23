import React from 'react'
import PropTypes from 'prop-types'

const PageInner = (props) => {
	return <div className="PageInner">{props.children}</div>
}

PageInner.propTypes = {
	children: PropTypes.node.isRequired
}

export default PageInner
