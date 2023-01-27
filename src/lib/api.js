let carouselMovies = []
const requestMovies = async () => {
  const data = await makeRequest('movie/upcoming')
  carouselMovies = data.results
  filterMovies()
  return carouselMovies
}
const getMovies = () => {
  return carouselMovies
}

const makeRequest = async (req) => {
  const url = `https://api.themoviedb.org/3/${req}?api_key=${process.env.APP_API_KEY}`
  const data = await fetch(url)
  return data.json()
}

const filterMovies = () => {
  carouselMovies = carouselMovies.filter((movie) => {
    return movie.backdrop_path && movie.poster_path
  })
}

const getMovie = async (id) => {
  const data = await makeRequest(`movie/${id}`)
  return data
}

const getCarouselMovie = (number) => {
  return carouselMovies[number]
}

const getSimilarMovies = async (movieId, number) => {
  const data = await makeRequest(`/movie/${movieId}/similar`)
  return data.results.slice(0, number)
}
export { requestMovies, getMovies, getMovie, getSimilarMovies, getCarouselMovie }
