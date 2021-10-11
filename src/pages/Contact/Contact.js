import React from 'react'
import PageInner from '../../PageInner'
import PropTypes from 'prop-types'

const Contact = (props) => {
	return <PageInner onMobileDevice={props.onMobileDevice}>Contact</PageInner>
}

Contact.propTypes = {
	onMobileDevice: PropTypes.bool.isRequired
}

export default Contact
