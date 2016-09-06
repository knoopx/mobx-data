import {ObservableMap} from 'mobx'
import {filter} from 'lodash/fp'

export default class ObservableColletion extends ObservableMap {
  identityKey = "id"

  filter(query) {
    return filter(query)(this.values())
  }

  find(id) {
    return this.get(id)
  }

  findAll(query) {
    return this.filter(query)
  }

  build(props) {
    return new this.modelClass(props)
  }

  insert(props) {
    const obj = this.find(props[this.identityKey])
    if (obj) {
      throw new Error("alredy exists")
    }
    this.set(props[this.identityKey], props)
    return this.find(props[this.identityKey])
  }

  upsert(id, props) {
    this.set(props[this.identityKey], props)
    return props
  }

  updateAll(where, props) {
    return this.filter(query).map((obj) => this.update(obj.id, props))
  }

  update(id, newProps) {
    const prevProps = this.get(id)
    if (prevProps) {
      const props = {...prevProps, ...newProps}
      this.set(id, props)
      return props
    }
  }

  remove(id){
    const prevProps = this.get(id)
    if (prevProps) {
      this.delete(id)
      return prevProps
    }
  }

  removeAll(query) {
    return this.where(query).map((obj) => this.remove(obj.id))
  }
}
