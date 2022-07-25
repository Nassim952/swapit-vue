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
                  <input placeholder="Search here" type="text">
                </div>
            </div>
            <div class="friend-drawer friend-drawer--onhover">
                <div class="text">
                  <h6>Robo Cop</h6>
                  <p class="text-muted">Hey, you're arrested!</p>
                </div>
                <span class="time text-muted small">13:21</span>
            </div>
            <hr>
          </div>
          <div class="col-md-8">
            <div class="settings-tray">
                <div class="">
                  <div class="text">
                      <span>Robo Cop</span>
                  </div>
                </div>
            </div>
            <div class="chat-panel">
                <div class="row no-gutters">
                  <div class="col-md-3">
                      <div class="chat-bubble chat-bubble--left">
                        Hello dude!
                      </div>
                  </div>
                </div>
                <div class="row no-gutters">
                  <div class="col-md-3 offset-md-9">
                      <div class="chat-bubble chat-bubble--right">
                        Hello dude!
                      </div>
                  </div>
                </div>
                <div class="row no-gutters">
                  <div class="col-md-3 offset-md-9">
                      <div class="chat-bubble chat-bubble--right">
                        Hello dude!
                      </div>
                  </div>
                </div>
                <div class="row no-gutters">
                  <div class="col-md-3">
                      <div class="chat-bubble chat-bubble--left">
                        Hello dude!
                      </div>
                  </div>
                </div>
                <div class="row no-gutters">
                  <div class="col-md-3">
                      <div class="chat-bubble chat-bubble--left">
                        Hello dude!
                      </div>
                  </div>
                </div>
                <div class="row no-gutters">
                  <div class="col-md-3">
                      <div class="chat-bubble chat-bubble--left">
                        Hello dude!
                      </div>
                  </div>
                </div>
                <div class="row no-gutters">
                  <div class="col-md-3 offset-md-9">
                      <div class="chat-bubble chat-bubble--right">
                        Hello dude!
                      </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                      <div class="chat-box-tray">
                        <input type="text" placeholder="Message">
                        <button class="btn-send"><img src="../../assets/icones/envoyer.png" height="33" width="33"/></button>
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
import ChatWindow from "vue-advanced-chat";
import "vue-advanced-chat/dist/vue-advanced-chat.css";

export default {
  components: {
    ChatWindow,
  },
  data() {
    return {
      rooms: [],
      messages: [],
      currentUserId: 1234,
    };
  },
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