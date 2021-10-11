import { Frame } from 'framer'
import PropTypes from 'prop-types'
import React from 'react'
import PageWrapper from './PageWrapper'
import { DRAWER_TRANSITION_LENGTH } from './common/constants'

const Content = (props) => {
	return (
		<Frame
			initial={{ width: '100vw' }}
			background={null}
			transition={{ duration: DRAWER_TRANSITION_LENGTH }}
		>
			<PageWrapper>{props.children}</PageWrapper>
		</Frame>
	)
}

Content.propTypes = {
	content: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired
}

export default Content
