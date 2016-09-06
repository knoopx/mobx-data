import Server from './server'
import Axios from 'axios'
import {ObservableCollection} from '../src'

Server.listen(8080)

class RemoteCollection extends ObservableCollection {
  constructor(endpoint){
    super()
    this.endpoint = endpoint
  }

  async find(id){
    Axios.get(`${this.endpoint}/${id}`).then(res => this.insert(res.data))
    super.find(id)
  }

  async insert(props) {
    Axios.post(`${this.endpoint}`).then(res => this.insert(res.data))
    super.insert(props)
  }
}

const resourceCollection = new RemoteCollection("http://localhost:8080/messages")

resourceCollection.observe(console.log)
resourceCollection.insert({id: 1, name: "Hello World"})
resourceCollection.find(1).then(console.log)
