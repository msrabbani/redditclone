import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './scss/app.scss'
import Header from './components/Header'
import Threads from './components/Threads'

class Index extends Component {
    render() {
        return (
            <div>
                <Header/>
                    <div className="container">
                        <Threads />
                    </div>
            </div>
        )
    }
}

let App = document.getElementById("app")

ReactDOM.render(<Index />, App)
