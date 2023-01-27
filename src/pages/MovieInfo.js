import { Lightning, Router, Utils } from "@lightningjs/sdk";
import { getMovie, getSimilarMovies } from "../lib/api";
import { formatDate } from "../lib/utils";
import { IndividualMovieBox } from "../Widgets/IndividualMovieBox";
import { Grid } from "@lightningjs/ui";
export class MovieInfo extends Lightning.Component {
  static _template() {
    return {
      Background: {
        w: 1920,
        h: 1080,
        color: 0xff7a7d7c,
        src: this.movieInfo?.backdrop_path,
      },
      Title: {
        x: 960,
        y: 100,
        mount: 0.5,
        text: {
          text: this.movieInfo?.title,
          fontSize: 64,
        },
      },
      NavContainer: {
        y: 20,
        x: 1550,
        w: 250,
        flex: {
          directon: "row",
          justifyContent: "space-evenly",
        },
        Arrow: {
          h: 25,
          w: 50,
          x: 150,
          color: 0xffffffff,
          src: Utils.asset("images/chevron.png"),
        },
        text: {
          text: "Return to carousel",
          fontSize: 25,
          color: 0xffffffff,
        },
      },

      Container: {
        w: 1800,
        h: 400,
        x: 60,
        y: 100,
        flex: {
          direction: "row",
          justifyContent: "space-evenly",
          alignContent: "center",
          alignItems: "center",
        },

        Overview: {
          w: 1000,

          text: {
            text: this.movieInfo?.overview,
            wordWrap: true,
            wordWrapWidth: 1000,
            maxLines: 5,
          },
        },
        ReleaseDate: {
          text: {
            text: this.movieInfo?.release_date,
          },
        },
      },
      SimilarMovies: {
        w: 1920,
        h: 500,
        y: 450,
        alpha: 1,
        Title: {
          x: 960,
          y: 0,
          mount: 0.5,
          text: {
            text: "Similar Movies:",
            fontSize: 64,
          },
        },
        MoviesGrid: {
          alpha: 1,
          w: 900,
          x: 360,
          y: 100,
          type: Grid,
          itemType: IndividualMovieBox,
          columns: 3,
          spacing: 150,
          mountY: 0.5,
          alignItems: "center",
        },
      },
    };
  }

  pageTransition() {
    return "up";
  }

  _handleUp() {
    Router.navigate("home");
  }

  set params(data) {
    this.populateInfo(data);
  }

  async populateInfo(data) {
    this.movieInfo = await getMovie(data.number);
    this.tag("Title").text = this.movieInfo.title;
    this.tag(
      "Background"
    ).src = `https://image.tmdb.org/t/p/original/${this.movieInfo.backdrop_path}`;

    this.tag("ReleaseDate").text = `Released: ${formatDate(
      this.movieInfo.release_date
    )}`;

    this.tag("Overview").text = this.movieInfo.overview;
    this.populateSimilar();
  }

  async populateSimilar() {
    this.similarMovies = await getSimilarMovies(this.movieInfo.id, 3);
    this.tag("MoviesGrid").clear();
    this.tag("MoviesGrid").add(
      this.similarMovies.map((movie) => {
        const imageUrl = `https://image.tmdb.org/t/p/w780/${movie.poster_path}`;
        return {
          h: 420,
          w: 300,
          imageUrl: imageUrl,
        };
      })
    );

    this.similarMoviesAnimation = this.tag("SimilarMovies").animation({
      duration: 1,
      actions: [
        {
          p: "alpha",
          v: {
            0: 0,
            1.25: 1,
          },
        },
      ],
    });
    this.infoAlphaAnimation = this.tag("Container").animation({
      duration: 1,
      actions: [
        {
          p: "alpha",
          v: {
            0: 0,
            1.25: 1,
          },
        },
      ],
    });
    this.similarMoviesAnimation.play();
    this.infoAlphaAnimation.play();
  }

  _getFocused() {
    return this.tag("MoviesGrid");
  }
  _handleEnter() {
    const movieId = this.similarMovies[this.tag("MoviesGrid").index].id;
    Router.navigate(`movieinfo/${movieId}`);
  }
}
