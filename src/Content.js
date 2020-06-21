import React from 'react'
import { Frame } from 'framer'
import PropTypes from 'prop-types'

const Content = (props) => {
	return (
		<div>
			<Frame
				height="100vh"
				width={`calc(100vw - ${props.content.x})`}
				animate={props.content}
			>
				Test
			</Frame>
		</div>
	)
}

Content.propTypes = {
	content: PropTypes.object.isRequired
}

export default Content
