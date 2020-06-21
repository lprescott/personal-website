import routes from '../nav/routes'

export const findRouteIndex = (path) => {
	return routes.findIndex(
		(route) => route.path === path || route.path.includes(path)
	)
}
