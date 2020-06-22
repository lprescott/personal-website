import { Frame } from 'framer'
import PropTypes from 'prop-types'
import React from 'react'
import {
	DRAWER_TRANSITION_LENGTH,
	DRAWER_WIDTH_CLOSED
} from './common/constants'

const Content = (props) => {
	console.log(props.content)
	return (
		<Frame
			initial={{
				x: DRAWER_WIDTH_CLOSED,
				width: `calc(100vw - ${DRAWER_WIDTH_CLOSED})`
			}}
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
