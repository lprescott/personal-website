import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded'
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import PersonIcon from '@mui/icons-material/Person'
import ChatIcon from '@mui/icons-material/Chat'
import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import Projects from '../pages/Projects/Projects'
import Resume from '../pages/Resume/Resume'
import Contact from '../pages/Contact/Contact'

const routes = [
	{
		label: 'home',
		path: ['/', '/home'],
		to: '/home',
		icon: HomeRoundedIcon,
		component: Home
	},
	{
		label: 'about',
		path: '/about',
		to: '/about',
		icon: PersonIcon,
		component: About
	},
	{
		label: 'projects',
		path: '/projects',
		to: '/projects',
		icon: AccountTreeRoundedIcon,
		component: Projects
	},
	{
		label: 'resume',
		path: '/resume',
		to: '/resume',
		icon: DescriptionRoundedIcon,
		component: Resume
	},
	{
		label: 'contact',
		path: '/contact',
		to: '/contact',
		icon: ChatIcon,
		component: Contact
	}
]

export default routes
