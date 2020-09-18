import React, {Component, useState, useEffect} from 'react';
import parse from 'html-react-parser';
import './App.css';
const axios = require('axios');

// function Chat() {
//   const [message, setMessage] = useState('');
//   const [messages, addMessage] = useState([]); 

//   useEffect(() => {
//     axios.post('http://127.0.0.1:5002/getMessage', {
//       message: "hi"
//     })
//     .then (res => {
//       console.log(res.data.text);
//       messages.push({
//         message: res.data.text,
//         from: 'chatbot'
//       })
//     })
//     .catch(err => {
//       console.log(err);
//     });
//   }, []);

//   function postMessage() {
//     if(message === '') {
//       alert('Message should not be empty');
//     } else {
//       messages.push(
//         {
//           message: message,
//           from: 'user'
//         }
//       );
//       setMessage('');
//       console.log('fetching...');
//       axios.post('http://127.0.0.1:5002/getMessage', {
//       message: message
//       })
//       .then (res => {
//         console.log(res.data.text);
//         messages.push({
//           message: res.data.text,
//           from: 'chatbot'
//         });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//     }
//   }

//   function showData() {
//     console.log(messages);
//   }

//   return (
//     <div className="chat">
//       <div className="main">
//         <div className="messages">
//           {messages.map((message, index) => {
//             return (
              // <div key={index} className={message.from === 'user' ? 'from-user': 'from-chatbox'}>
              //   {message.from === 'user' ? 
              //     <p className={message.from === 'user' ? 'user-msg': 'chatbot-msg'}>{message.message}</p> :
              //     parse(message.message)
              //   }
//               </div>
//             );
//           })}
//         </div>
//         <div className="send">
//           <input type="text" value={message} placeholder="Type your message here" onChange={(e) => setMessage(e.target.value)} />
//           <button onClick={postMessage}><i className="material-icons">send</i></button>
//         </div>
//       </div>
//       <button style={{position: "fixed", top: "0", left: "0"}} onClick={showData}>Get Data</button>
//     </div>
//   );
// }

class Chatbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: ''
    }
    this.addMessage = this.addMessage.bind(this);
    this.postMessage = this.postMessage.bind(this);
  }

  addMessage(event) {
    this.setState({
      message: event.target.value
    });
  }

  postMessage() {
    if(this.state.message === '') {
      alert('Message should not be empty');
    } else {
      this.setState({
        messages: [
          ...this.state.messages,
          {
            message: this.state.message,
            from: 'user'
          }
        ],
        message: ''
      });
      console.log('fetching...');
      axios.post('http://127.0.0.1:5002/getMessage', {
      message: this.state.message
      })
      .then (res => {
        console.log(res.data.text);
        this.setState({
          messages: [
            ...this.state.messages, 
            {
              message: res.data.text,
              from: 'chatbox'
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  render() {
    return (
      <div className="chat">
        <div className="main">
          <div className="messages">
            {this.state.messages.map((message, index) => {
              return (
                message.from === 'user' ? 
                <div key={index} className="from-user">
                    <p className={message.from === 'user' ? 'user-msg': 'chatbot-msg'}>{message.message}</p> 
                </div>:
                <div key={index} className="from-chatbox" dangerouslySetInnerHTML={{ __html: message.message }}></div>
              );
            })}
          </div>
          <div className="send">
            <input type="text" value={this.state.value} placeholder="Type your message here" onChange={this.addMessage} />
            <button onClick={this.postMessage}><i className="material-icons">send</i></button>
          </div>
        </div>
      </div>
    );
  }

}

export default Chatbox;