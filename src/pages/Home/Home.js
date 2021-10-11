import React from 'react'
import PageInner from '../../PageInner'
import PropTypes from 'prop-types'

const Home = (props) => {
	return (
		<PageInner onMobileDevice={props.onMobileDevice}>
			<span>Home</span>
		</PageInner>
	)
}

Home.propTypes = {
	onMobileDevice: PropTypes.bool.isRequired
}

export default Home
