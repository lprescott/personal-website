import { Frame } from 'framer'
import PropTypes from 'prop-types'
import React from 'react'
import { DRAWER_TRANSITION_LENGTH } from './common/constants'

const Content = (props) => {
	return (
		<Frame
			height="100vh"
			width={`calc(100vw - ${props.content.x})`}
			animate={props.content}
			background={null}
			transition={{ duration: DRAWER_TRANSITION_LENGTH }}
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
