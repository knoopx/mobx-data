import ObservableList from './observable-list'

export default class ObservableSet extends ObservableList {
  add(item) {
    if (!this.has(item)) {
      this.items.push(item)
    }
  }
}
