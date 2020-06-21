import React from 'react'
import { Frame } from 'framer'
import { useCycle } from 'framer-motion'

const Content = () => {
	const [twist, cycle] = useCycle({ scaleX: 1 }, { scaleX: -1 })

	return (
		<div>
			<Frame animate={twist} onTap={() => cycle()}>
				Test
			</Frame>
		</div>
	)
}

export default Content
