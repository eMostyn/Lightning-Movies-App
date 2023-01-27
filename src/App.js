import { Router, Utils } from '@lightningjs/sdk'
import { default as routes } from './lib/routes'
import { getRequest } from './lib/api'
export default class App extends Router.App {
  static getFonts() {
    return [{ family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') }]
  }

  _setup() {
    Router.startRouter(routes, this)
  }

  static _template() {
    return {
      ...super._template(),
    }
  }

  async _init() {}
}
