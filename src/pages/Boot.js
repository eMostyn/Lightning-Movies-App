import { Lightning, Utils, Router } from '@lightningjs/sdk'

export class Boot extends Lightning.Component {
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
          text: 'Hello world!',
          fontSize: 64,
        },
      },
      Logo: {
        x: 960,
        y: 540,
        mount: 0.5,
        src: Utils.asset('images/logo.png'),
      },
      Label: {
        x: 960,
        y: 1000,
        mount: 0.5,
        text: {
          text: '[ press enter to continue ]',
        },
      },
    }
  }

  _handleEnter() {
    Router.navigate('home')
  }
}
