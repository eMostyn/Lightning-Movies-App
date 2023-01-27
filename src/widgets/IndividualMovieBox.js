import { Lightning, Router, Utils } from '@lightningjs/sdk'
export class IndividualMovieBox extends Lightning.Component {
  static _template() {
    return {
      Container: {
        h: 420,
        w: 300,

        Image: {
          h: 420,
          w: 300,
          x: 150,
          y: 210,
          mount: 0.5,
          src: this.bindProp('imageUrl'),
        },
      },
    }
  }

  _focus() {
    this.patch({
      Container: {
        Image: {
          smooth: {
            h: 560,
            w: 400,
          },
        },
      },
    })
  }

  _unfocus() {
    this.patch({
      Container: {
        Image: {
          h: 420,
          w: 300,
        },
      },
    })
  }
}
