import { Frame } from 'framer'
import PropTypes from 'prop-types'
import React from 'react'

const Content = (props) => {
	return (
		<Frame
			height="100vh"
			width={`calc(100vw - ${props.content.x})`}
			animate={props.content}
		>
			{props.children}
		</Frame>
	)
}

Content.propTypes = {
	content: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired
}

export default Content
