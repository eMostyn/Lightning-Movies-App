import { UpcomingMovies } from '../pages/UpcomingMovies'
import { MovieInfo } from '../pages/MovieInfo'

export default {
  root: '$',
  routes: [
    {
      path: '$',
      component: UpcomingMovies,
    },
    {
      path: 'home',
      component: UpcomingMovies,
    },
    {
      path: 'movieinfo/:number',
      component: MovieInfo,
    },
  ],
}
