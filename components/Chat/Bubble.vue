<template >
    <div>
        {{cookie_usr_info.user_name}}
        <ul :key="messages.length">
            <li v-for="msg in messages" :key="msg">
                {{msg.username}}: {{msg.message}}
            </li>
        </ul>
        <input type="text" v-model="message" />
        <button @click="sendMessage">Send</button>
    </div>
</template>
<script setup>
import { database, sref, set,userMess } from '../../plugins/firebase?t=null';

const messages = ref(userMess);

/// thêm thông tin
const { value: cookie_usr_info } = useCookie('usr_info');
const message = ref('');
function sendMessage() {
    console.log(message.value);
    if (message.value) {    
        const newMessage = {
            username: cookie_usr_info.user_name,
            message: message.value,
        };
        set(sref(database, 'messages/' + cookie_usr_info.id+'/' + Date.now()), newMessage);
        message.value = '';
        messages.value = userMess;
        console.log(userMess);

    }
};
</script>
