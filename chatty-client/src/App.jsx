//Import all important components used
import React, {Component} from 'react';
import ChatBar from "./chatBar.jsx";
import NavBar from "./navBar.jsx";
import MessageList from "./messageList.jsx";

/*Main App Class that is rendered on index.jsx
--------------------------------------------------------------
*/

class App extends Component {

/*Constructor that builds the state
-------------------------------------
*/
  constructor () {
    super();//Need to have this for class

    //State template if you will
    this.state = {
      loading: true,//when app starts there is a delay before user can see anything
      currentUser: {name: ""},
      messageData: [],
      usersOnline: 0,
      color: ""
    };

    //Binding section for the 2 methods I send down the rabbit hole to be used in the chatBar
    this.SendMessage = this.SendMessage.bind(this);
    this.SendNotification = this.SendNotification.bind(this);
  }
  /*
  This section Runs when the DOM is loaded and ready to go
  --------------------------------------------------------
  */
  componentDidMount () {
    //sets up web socket
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = function(event) {
      console.log("Connected to WebSocket Server");
    };

    //This sets up listner that performs task depending on what message it gets back from the server
    this.socket.onmessage = (message) => {
      const newMessage = JSON.parse(message.data);
      switch (newMessage.type) {
        //if message is to update number of users online
        case 'numUsers' :
          this.setState({usersOnline: newMessage.users});
          break;
        //Server sending message to set a color for the user
        case 'colorAssignment' :
          this.setState({color: newMessage.color});
          break;
        //If server sends a message, notification, or picture back
        case 'postMessage' :
        case 'postNotification' :
        case 'postPicture' :
          let newMessageData = this.state.messageData;
          newMessageData.push(newMessage);
          this.setState((previousState) => ({messageData: newMessageData}));
          break;
        //will console log and do nothing if something goes wrong
        default :
          console.log('Should not be here');
          break;
        }
      };

    //Sets a timer upon dom load to set loading to false so that the page fully loads
    setTimeout( () => {
      this.setState({loading:false});
    }, 2000);

  }
/*
Methods used in the class
------------------------------
*/
  SendMessage (text, user) {
    let newMessage = {
      type: "incomingMessage",
      content: text,
      username: user,
      color: this.state.color
    };
    //Checks last 3 digits of text. If it has png or gif or jpg it will change the type
    let url = newMessage.content.slice(newMessage.content.length-3);
    if (url === 'png' || url === 'gif' || url === 'jpg') {
      newMessage.type = 'incomingPicture';
    }
    this.socket.send(JSON.stringify(newMessage));
  }

  SendNotification (newUser) {
    let newNotification = {
      type: 'incomingNotification',
      content: newUser,
      username: this.state.currentUser.name
    };
    this.setState({currentUser: {name: newUser}});
    this.socket.send(JSON.stringify(newNotification));
  }

//What get renders to index.jsx
  render() {
    return (
      <div>
        <NavBar usersOnline={this.state.usersOnline}/>
        {this.state.loading ? <h1>Loading........</h1> : <MessageList messageData={this.state.messageData}/>}
        <ChatBar currentUser={this.state.currentUser} SendMessage={this.SendMessage} SendNotification={this.SendNotification}/>
      </div>
    );
  }
}
export default App;

