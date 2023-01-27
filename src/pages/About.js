import { Lightning, Utils, Router } from '@lightningjs/sdk'

export class About extends Lightning.Component {
  static _template() {
    return {
      Background: {
        rect: true,
        w: 1920,
        h: 1080,
        color: 0xfff37153,
      },
      Title: {
        x: 960,
        y: 50,
        mount: 0.5,
        text: {
          text: 'About page',
          fontSize: 64,
        },
      },
      NavIndicator: {
        x: 120,
        y: 540,
        mount: 0.5,
        flex: {},

        Arrow: {
          h: 50,
          w: 50,
          src: Utils.asset('images/up-chevron.png'),
          rotation: Math.PI * -0.5,
        },
        Label: {
          text: {
            text: 'Home',
          },
        },
      },
    }
  }

  pageTransition() {
    return 'left'
  }

  _handleLeft() {
    Router.focusWidget('Menu')
  }

  set params(data) {
    this.message = data.message
  }
}
