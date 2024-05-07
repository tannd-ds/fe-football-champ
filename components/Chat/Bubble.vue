<template>
    <div>
        {{cookie_usr_info.user_name}}
        <!-- <ul>
            <li v-for="msg in messeges" :key="msg">
                <span> {{ msg.username }}: </span>
                <span> {{ msg.messege }} </span>
            </li>
        </ul> -->
        <input type="text" v-model="messege" />
        <button @click="sendMessage">Send</button>
    </div>
</template>
<script setup>
import { database,sref,set } from '../../plugins/firebase?t=null';
function sendMessage() {
    console.log(messege.value);
    if (messege.value) {    
        const newMessege = {
            username: cookie_usr_info.user_name,
            messege: messege.value,
        };
        set(sref(database, 'messeges/' + cookie_usr_info.id+'/' + Date.now()), newMessege);
        messege.value = '';
    }
};


const { value: cookie_usr_info } = useCookie('usr_info');
const messege = ref([]);
</script>