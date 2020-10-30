import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import '../App.css';

const axios = require('axios');


class Chatbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'guest',
      messages: [],
      message: ''
    }
    this.addMessage = this.addMessage.bind(this);
    this.postMessage = this.postMessage.bind(this);
  }

  componentDidMount() {
    if(this.props.user !== '' || this.props.user !== undefined){
      this.setState({
        user: this.props.user
      });
    }
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
      const messageToSend = this.state.message;
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
      console.log(messageToSend);
      console.log('fetching...');
      axios.post('http://127.0.0.1:5002//watson', {
        message: messageToSend,
        user: this.state.user
      })
      .then (res => {
        console.log(res);
        console.log(res.data.message);
        this.setState({
          messages: [
            ...this.state.messages, 
            {
              message: res.data.message,
              from: 'chatbox'
            }
          ]
        });
      });
    }
  }

  render() {
    return (
      <div className="chat">
        <Button
            variant="contained"
            color="secondary"
            startIcon={<CancelIcon />}
            onClick={this.props.close}
          >
            Close
        </Button>
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
          <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                <Grid xs={10}>
                    <TextField className="txt-msg" id="outlined-basic" label="Message" variant="outlined" value={this.state.message} placeholder="Type your message here" onChange={this.addMessage}/>
                </Grid>
                <Grid xs={2} className="centering">
                    <Fab color="primary" size="small" aria-label="send" onClick={this.postMessage}>
                        <SendIcon />
                    </Fab>
                </Grid>
              </Grid>
          </div>
        </div>
      </div>
    );
  }

}

export default Chatbox;