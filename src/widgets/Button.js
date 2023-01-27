import { Lightning } from '@lightningjs/sdk'
//Button altered from https://github.com/mlapps/com.metrological.app.TMDB
export default class Button extends Lightning.Component {
  static _template() {
    return {
      color: 0xff3d54eb,

      rtt: true,
      texture: Lightning.Tools.getRoundRect(300, 60, 30, 0, 0xff21d07a, true, 0xffffffff),
      transitions: {
        alpha: {
          duration: 0.3,
          timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)',
        },
        y: {
          duration: 0.3,
          timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)',
        },
      },
      Button: {
        x: 5,
        y: 5,
        texture: Lightning.Tools.getRoundRect(50, 50, 25, 0, 0xff21d07a, true, 0xff081c22),
        Ok: {
          mount: 0.5,
          x: 26,
          y: 28,
          text: { text: 'OK', fontFace: 'Regular', fontSize: 19 },
        },
      },
      Label: {
        mount: 0.5,
        x: 175,
        y: 33,
        text: {
          text: 'More Information',
          fontFace: 'Regular',
          fontSize: 24,
          textColor: 0xffffffff,
        },
      },
    }
  }
}
