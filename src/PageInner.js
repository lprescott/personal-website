import React from 'react'
import PropTypes from 'prop-types'

const PageInner = (props) => {
	return (
		<div
			className={`PageInner ${props.className || ''} ${
				props.onMobileDevice ? 'mobile-PageInner' : null
			}`}
		>
			{props.children}
		</div>
	)
}

PageInner.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	onMobileDevice: PropTypes.bool.isRequired
}

export default PageInner
