import React, {Component} from 'react';
import axios from 'axios';

class Threads extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }
  componentWillMount() {
    console.log('======= ini mau dipasang');
    let url = 'http://localhost:3000/users/';
    //asynchrnous
    axios
      .get(url)
      .then(dataUsers => {
          console.log(dataUsers.data)
          this.setState({
              users: dataUsers.data
          })
      })
      .catch(err => {
        console.log('get data error!!');
      });
  }

  render() {
    console.log('===== data sedang atau rendering');
    return (
      <div className="container">
        {this.state.users.map((user, idx) => {
          return (
            <div className="notification" key={idx}>
                <div>name: {user.name}</div>
               <div>email: {user.email}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Threads;
