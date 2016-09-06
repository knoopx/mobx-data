import {observable} from 'mobx'

export default class ObservableList {
  @observable items = []

  has(item) {
    return this.items.indexOf(item) >= 0
  }

  add(item) {
    this.items.push(item)
  }

  remove(item) {
    this.items.splice(this.items.indexOf(item), 1)
  }
}
