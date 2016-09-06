class Model {
  @observable id

  constructor(attributes) {
    Object.assign(this, attributes)
  }
}
