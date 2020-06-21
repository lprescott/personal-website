import AccountTreeRoundedIcon from '@material-ui/icons/AccountTreeRounded'
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import PersonIcon from '@material-ui/icons/Person'
import ChatIcon from '@material-ui/icons/Chat'
import Home from '../Home/Home'
import About from '../About/About'
import Projects from '../Projects/Projects'
import Resume from '../Resume/Resume'
import Contact from '../Contact/Contact'

const routes = [
	{
		ordinal: 1,
		label: 'home',
		path: ['/', '/home'],
		to: '/home',
		icon: HomeRoundedIcon,
		component: Home
	},
	{
		ordinal: 2,
		label: 'about',
		path: '/about',
		to: '/about',
		icon: PersonIcon,
		component: About
	},
	{
		ordinal: 3,
		label: 'projects',
		path: '/projects',
		to: '/projects',
		icon: AccountTreeRoundedIcon,
		component: Projects
	},
	{
		ordinal: 4,
		label: 'resume',
		path: '/resume',
		to: '/resume',
		icon: DescriptionRoundedIcon,
		component: Resume
	},
	{
		ordinal: 5,
		label: 'contact',
		path: '/contact',
		to: '/contact',
		icon: ChatIcon,
		component: Contact
	}
]

export default routes
