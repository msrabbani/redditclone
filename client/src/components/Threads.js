import React, {Component} from 'react';
import axios from 'axios';

class Threads extends Component {
  constructor() {
    super();
    this.state = {
      threads: [],
    };
  }

  componentWillMount() {
    console.log('======= ini mau dipasang');
    let url = 'http://localhost:3000/threads/';
    //asynchrnous
    axios
      .get(url)
      .then(dataThreads => {
        console.log(dataThreads.data);
        this.setState({
          threads: dataThreads.data,
        });
      })
      .catch(err => {
        console.log('get data error!!');
      });
  }

  render() {
    const {threads} = this.state;
    console.log('===== data sedang atau rendering');
    return (
      <div className="container is-fluid">
        {threads.map((thread, idx) => {
          return (
            <div className="card" key={idx}>
              <header className="card-header">
                <p className="card-header-title">
                    {thread.title}
                </p>
                <a
                  href="#"
                  className="card-header-icon"
                  aria-label="more options">
                  <span className="icon">
                    <i className="fas fa-angle-down" aria-hidden="true" />
                  </span>
                </a>
              </header>
              <div className="card-content">
                <div className="content">
                  {thread.threadContent}
                  <br/>
                  <a href="#">#css</a>
                  {' '}
                 <p> {thread.createdAt} </p> 
                </div>
              </div>
              <footer className="card-footer">
                <a href="#" className="card-footer-item">Save</a>
                <a href="#" className="card-footer-item">Edit</a>
                <a href="#" className="card-footer-item">Delete</a>
              </footer>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Threads;
