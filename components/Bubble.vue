<template>
    <Chat
      :onSend="handleSendEvent"
      :chat="data"
      :onclick="getMessages"
      :bgColorHeader="darkTheme && '#1e1e1e'"
      :bgColorChat="darkTheme && '#2C2D2E'"
      :bgColorInput="darkTheme && '#1e1e1e'"
      :bgColorIcon="darkTheme && '#9B51E0'"
      :bgColorMessageChatbot="darkTheme && '#1e1e1e'"
      :bgColorMessagePerson="darkTheme && '#9B51E0'"
      :bgColorMessageTimestamp="darkTheme && '#1e1e1e'"
      :textColorInput="darkTheme && '#fff'"
      :textColorHeader="darkTheme && '#fff'"
      :textColorMessageChatbot="darkTheme && '#fff'"
      :textColorMessageTimestamp="darkTheme && '#fff'"
    />
  </template>
<script setup>
import { database, sref, set,userMess } from '../plugins/firebase?t=null';
import { ref } from 'vue';
import { Chat } from '@chat-ui/vue3';
const { value: cookie_usr_info } = useCookie('usr_info');
const data = ref([]);
const darkTheme = ref(true);

function getMessages() {
    data.value = userMess;
}
function handleSendEvent(input) {
  if (input == '') return;
  const messagePerson = {
    username: cookie_usr_info.user_name,
    type: 'person',
    timestamp: formatAMPM(new Date()),
    message: input,
  };
     set(sref(database, 'messages/' + cookie_usr_info.id+'/' + Date.now()), messagePerson);
     getMessages();
}

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

</script>
