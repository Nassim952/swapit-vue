<template>
  <!-- <chat-window
    :current-user-id="currentUserId"
    :rooms="rooms"
    :messages="messages"
  /> -->
  <div class="container-chat">
    <div class="container-chat-box">
      <div class="row no-gutters">
          <div class="col-md-4 border-right list-panel">
            <div class="search-box">
                <div class="input-wrapper">
                  <input placeholder="Search here" type="text" v-model="search">
                </div>
            </div>
            <div class="friend-drawer friend-drawer--onhover" v-for="channel in filtredRooms" :key="'channel_'+ channel.id" @click="updateChannel(channel)">
                <div class="text">
                  <h6><a>{{getChannelName(channel)}}</a></h6>
                  <span class="text-muted" v-if="channel.lastMessage !=[]">{{channel.lastMessage.author.username + ': ' + channel.lastMessage.content}}</span>
                </div>
                <span class="time text-muted small" v-if="channel.lastMessage">{{timeConverter(channel.lastMessage.createdDate)}}</span>
                <span class="time text-muted small" v-if="channel.hasNotification">noti</span>
            </div>
            <hr>
          </div>
          <div class="col-md-8">
            <div class="settings-tray">
                <div class="">
                  <div class="text" v-if="Object.keys(currentChannel).length == 0">
                       <span>Chat</span>
                  </div>
                  <div v-else>
                      <span>{{getChannelName(currentChannel)}}</span>
                  </div>
                </div>
            </div>
            <div class="chat-panel" >
                <div class="row no-gutters" v-for="(message,key) in currentChannel.messages" :key="currentChannel.id + message.id+message.createdDate+key">
                  <div class="col-md-3" :class="{ 'offset-md-9': message.author.id == currentUser.id}">
                      <div :class="{ 'chat-bubble--left': message.author.id != currentUser.id, 'chat-bubble--right' : message.author.id == currentUser.id}" class="chat-bubble">
                        {{message.content}}
                        <small class="text-muted">
                          {{message.author.content}}
                        </small>
                        <small class="text-muted">
                           {{timeConverter(message.createdDate)}}
                        </small>
                      </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                      <div class="chat-box-tray">
                        <input type="text" placeholder="Message" v-model="message.content" v-on:keyup.enter="submit()">
                        <button class="btn-send"><img src="../../assets/icones/envoyer.png" height="33" width="33" @click="submit()" /></button>
                      </div>
                  </div>
                </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
    // import SideBar from "../Filter/SideBar.vue";
    import {User} from "../../lib/Services/User";
    import {Channel} from "../../lib/Services/Channel";
    import Pusher from 'pusher-js';
    //  import formatDateMixin from '../mixins/formatDateMixin.js';

export default {
  components: {
  },
  props: {
    channelId: {
      type: String,
      required: false,
      default: null,
    },
  },
  data: () => ({
      provider: new Channel(),
      pusher: null,
      search: '',
      rooms: [],
      messages: [],
      message: {
        content: "",
        channel: "",
        author: "",
      },
      lastMessage: null,
      currentChannel: {},
      currentUser: null
    }),
  created() {
   
    if(this.$props.channelId) {
      this.getChannel(this.$props.channelId);
    }
    this.init();
     if(this.$props.channel?.id) {
      this.updateChannel(this.$props.channel);
    }
  },
  methods: {
    async refreshChannels() {
      var provider = new User()
          provider.getChannels(this.currentUser.id).then((response) => {
            this.rooms = response.map((channel) => {
              channel.pusher = this.pusher;
              channel.room = channel.pusher.subscribe('channel_' + channel.id);
              channel.room.bind('message', (message) => {
                channel.lastMessage = message;
                if(this.currentChannel.id != channel.id) {
                  channel.hasNotification = true;
                }
                else {
                  this.currentChannel.messages.push(message);
                  channel.hasNotification = false;
                } 
              });
                return channel;
            });              
      }).catch(function(error) {
        console.log(error);
      });
    },

    async submit() {
      if(this.currentChannel?.id && this.message.content && this.canSendMessage() ) {
        this.provider.postMessage(this.message).then((response) => {
          if (response) {
            this.lastMessage = response;
            this.message.content = "";
          }
        }).catch(function(error) {
          console.log(error);
        });
      }
    },

    initPusher() {
      if(this.pusher == null) {
          this.pusher = new Pusher(process.env.VUE_APP_PUSHER_KEY, {
            cluster: 'eu',
            forceTLS: true
          });
        }
    },
    refreshMessages() {
      this.initPusher();
      // if(this.currentChannel?.id) {
      //   this.currentChannel.room = this.pusher.subscribe('channel_' + this.currentChannel.id);
      //   this.currentChannel.room.bind('message', (message) => {
      //     this.currentChannel.messages.push(message);
      //   });
      // }
    },
    updateChannel(channel) {
      this.provider.getChannel(channel.id).then((response) => {
        this.currentChannel = response;
        this.message.channel = '/channels/'+channel.id;
        this.refreshMessages();
      }).then(() => {
       channel.hasNotification = false;
      }).catch(function(error) {
        console.log(error);
      });
    },
    getChannelName(channel) {
      // console.log(this.currentUser)
      return channel.name.replace(this.currentUser.username,'');
    },
    canSendMessage() {
      if(this.message.content) {
          if(!this.lastMessage) {
            return true;
          }
          else if(new Date (this.lastMessage.createdDate) < new Date().getTime() - 8000 || this.lastMessage?.content != this.message.content) {
            return true;
          }
       }
      return false;
    },
    async init(){
            var provider = new User()
       provider.auth.me().then((user) => {
        if(user) 
        {
          this.currentUser = user;
          this.message.author='/users/'+user.id;
          this.refreshChannels();
          this.refreshMessages();
        }  
      }).catch(function(error) {
        console.log(error);
      });
    },
    async getChannel(channelId) {
      this.provider.getChannel(channelId).then((response) => {
        if (response) {
          this.channel = response;
          this.updateChannel(this.channel);
        }
      }).catch(function(error) {
        console.log(error);
      });
    },
    timeConverter(UNIX_timestamp){
      UNIX_timestamp = Date.parse(UNIX_timestamp);
      var a = new Date(UNIX_timestamp);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var today = new Date();
      var time = new Date(date) < new Date(today.getDate()) ? date + ' ' + month + ' ' + hour + ':' + min : hour + ':' + min  ;
      return time;
    },
  },
  computed: {
    filtredRooms() {
      if(this.search) {
        return this.rooms.filter((room) => {
          return  this.getChannelName(room).toLowerCase().includes(this.search.toLowerCase());
        });
      }
      return this.rooms;
    },
  }
};
</script>


<style scoped>

body {
	 background-color: #3498db;
	 -webkit-font-smoothing: antialiased;
	 -moz-osx-font-smoothing: grayscale;
	 text-rendering: optimizeLegibility;
}
.container-chat{
  padding: 60px;
  background-color: #f0f0f0;
  margin: 0;
}
 .container-chat-box {
	 margin: 60px auto;
	 padding: 0;
	 border-radius: 7px;
}
 .profile-image {
	 width: 50px;
	 height: 50px;
	 border-radius: 40px;
}
 .settings-tray {
	 background: #FF5D19;
	 padding: 10px 15px;
	 border-radius: 20px;
   color: #fff;
}
 .settings-tray .no-gutters {
	 padding: 0;
}
 .settings-tray--right {
	 float: right;
}
 .settings-tray--right i {
	 margin-top: 10px;
	 font-size: 25px;
	 color: grey;
	 margin-left: 14px;
	 transition: 0.3s;
}
 .settings-tray--right i:hover {
	 color: #29657C;
	 cursor: pointer;
}
 .search-box {
	 padding: 10px 13px;
}
 .search-box .input-wrapper {
	 background: #fff;
	 border-radius: 40px;
}
 .search-box .input-wrapper i {
	 color: grey;
	 margin-left: 7px;
	 vertical-align: middle;
}
 input {
	 border: none;
	 border-radius: 30px;
	 width: 80%;
}
 input::placeholder {
	 color: #e3e3e3;
	 font-weight: 300;
	 margin-left: 20px;
}
 input:focus {
	 outline: none;
}
 .friend-drawer {
	 padding: 10px 15px;
	 display: flex;
	 vertical-align: baseline;
	 background: #fff;
	 transition: 0.3s ease;
}
 .friend-drawer--grey {
	 background: #eee;
}
 .friend-drawer .text {
	 margin-left: 12px;
	 width: 70%;
}
 .friend-drawer .text h6 {
	 margin-top: 6px;
	 margin-bottom: 0;
}
 .friend-drawer .text p {
	 margin: 0;
}
 .friend-drawer .time {
	 color: grey;
}
 .friend-drawer--onhover:hover {
	 background: #29657C;
	 cursor: pointer;
   border-radius: 20px;
}
 .friend-drawer--onhover:hover p, .friend-drawer--onhover:hover h6, .friend-drawer--onhover:hover .time {
	  color: #fff !important;
}
 hr {
	 margin: 5px auto;
	 width: 60%;
}
 .chat-bubble {
	 padding: 10px 14px;
	 background: #eee;
	 margin: 10px 30px;
	 border-radius: 9px;
	 position: relative;
	 animation: fadeIn 1s ease-in;
}
 .chat-bubble:after {
	 content: " ";
	 position: absolute;
	 top: 50%;
	 width: 0;
	 height: 0;
	 border: 20px solid transparent;
	 border-bottom: 0;
	 margin-top: -10px;
}
 .chat-bubble--left:after {
	 left: 0;
	 border-right-color: #eee;
	 border-left: 0;
	 margin-left: -20px;
}
 .chat-bubble--right:after {
	 right: 0;
	 border-left-color: #29657C;
	 border-right: 0;
	 margin-right: -20px;
}
 @keyframes fadeIn {
	 0% {
		 opacity: 0;
	}
	 100% {
		 opacity: 1;
	}
}
 .offset-md-9 .chat-bubble {
	 background: #29657C;
	 color: #fff;
}
 .chat-box-tray {
	 display: flex;
	 align-items: baseline;
	 padding: 10px 15px;
	 align-items: center;
	 margin-top: 19px;
	 bottom: 0;
   border-radius: 0 0 20px 20px;
   background-color: #FF5D19;
}
 .chat-box-tray input {
	 margin: 0 10px;
	 padding: 6px 10px;
}
 .chat-box-tray i {
	 color: grey;
	 font-size: 30px;
	 vertical-align: middle;
}
 .chat-box-tray i:last-of-type {
	 margin-left: 25px;
}
.list-panel{
  background-color: white;
  border-radius: 20px;
}
.chat-panel{
  background-color: white;
  border-radius: 20px;
  margin-top: 10px;
}
.btn-send{
  background: none;
  border: none;
}
</style>