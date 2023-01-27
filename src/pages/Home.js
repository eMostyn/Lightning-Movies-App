import { Lightning, Utils, Router } from '@lightningjs/sdk'

export class Home extends Lightning.Component {
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
          text: 'Home page',
          fontSize: 64,
        },
      },
      NavIndicator: {
        x: 1800,
        y: 540,
        mount: 0.5,
        flex: {},

        Label: {
          text: {
            text: 'About',
          },
        },
        Arrow: {
          h: 50,
          w: 50,
          src: Utils.asset('images/up-chevron.png'),
          rotation: Math.PI * 0.5,
        },
      },
    }
  }
  pageTransition() {
    return 'right'
  }

  _handleRight() {
    Router.navigate('about', { message: 'hello there!' })
  }

  _handleLeft() {
    Router.focusWidget('Menu')
  }
}
