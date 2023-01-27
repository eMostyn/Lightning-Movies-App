import { Lightning, Router, Utils } from '@lightningjs/sdk'
import { requestMovies, getMovies, getMovie, getCarouselMovie } from '../lib/api'
import { IndividualMovieBox } from '../widgets/IndividualMovieBox'
import { Grid } from '@lightningjs/ui'

import { Carousel } from '@lightningjs/ui'
import Button from '../widgets/Button'
export class UpcomingMovies extends Lightning.Component {
  static _template() {
    return {
      BaseColor: {
        w: 1920,
        h: 1080,
        rect: true,
        color: 0xff000000,
        alpha: 1,
      },
      Background: {
        w: 1920,
        h: 1080,
        color: 0xff7a7d7c,
        src: null,
        alpha: 1,
      },
      MovieInfo: {
        y: 100,
        x: 100,
        text: {
          text: 'Loading Movies...',
          fontSize: 96,
          wordWrap: true,
          wordWrapWidth: 1500,
          alpha: 1,
        },
      },
      Button: {
        type: Button,
        y: 1030,
        x: 960,
        mount: 0.5,
        alpha: 0,
      },
      MoviesCarousel: {
        w: 1920,
        h: 400,
        y: 500,
        type: Carousel,
        scroll: 0.5,
        direction: 'row',
        signals: { onIndexChanged: true },
      },
    }
  }

  async _init() {
    const movies = await requestMovies()
    this.tag('MoviesCarousel').add(
      movies.map((movie) => {
        const imageUrl = `https://image.tmdb.org/t/p/w780/${movie.poster_path}`
        return {
          h: 420,
          w: 300,
          fontSize: 16,
          name: movie.title,
          imageUrl: imageUrl,
          type: IndividualMovieBox,
          margin: 45,
        }
      }),
    )

    this.buttonAnimation = this.tag('Button').animation({
      duration: 1,
      actions: [
        {
          p: 'alpha',
          v: {
            0: 0,
            1.25: 1,
          },
        },
      ],
    })
    this.buttonAnimation.play()
  }

  _handleEnter() {
    const movieId = getCarouselMovie(this.tag('MoviesCarousel').index).id
    Router.navigate(`movieinfo/${movieId}`)
  }

  _getFocused() {
    return this.tag('MoviesCarousel')
  }
  pageTransition() {
    return 'down'
  }

  onIndexChanged() {
    const movieInfo = getCarouselMovie(this.tag('MoviesCarousel').index)
    this.tag('MovieInfo').text = movieInfo.title

    this.tag('Background').src = `https://image.tmdb.org/t/p/original/${movieInfo.backdrop_path}`

    this.backgroundAnimation = this.tag('Background').animation({
      duration: 1,
      actions: [
        {
          p: 'alpha',
          v: {
            0: 0,
            1.25: 1,
          },
        },
      ],
    })

    this.textAnimation = this.tag('MovieInfo').animation({
      duration: 1,
      actions: [
        {
          p: 'alpha',
          v: {
            0: 0,
            1.25: 1,
          },
        },
      ],
    })
    this.backgroundAnimation.play()
    this.textAnimation.play()
  }
}
