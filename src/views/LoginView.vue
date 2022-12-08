<template>
  <div class="container">
<form @submit.stop.prevent="login">
  <label for="email"><b>Email</b>
    <input type="text" v-model="email" name="email" id="email" placeholder="Enter email" required/>
  </label>
  <label for="password"><b>Password</b>
    <input type="password" v-model="password" name="password" id="password" placeholder="Enter Password" required/>
  </label>
  <div class="error" v-show="error" >{{error}}</div>
  <button type="submit" class="registerbtn">Login</button>
<div class="container register">
  <p>No account? <a href="/register">Create one</a>.</p>
</div>
</form>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { auth, signInWithEmailAndPassword } from '../store/helpers/firebase_auth';

export default defineComponent({
  name: 'loginView',
  setup() {
    const email = ref('');
    const password = ref('');
    const error = ref(null);

    const store = useStore();
    const router = useRouter();
    async function login() {
      try {
        const response = await signInWithEmailAndPassword(auth, email.value, password.value);
        store.dispatch('populateUser', response);
        router.push('/');
      } catch (err: any) {
        error.value = err.message;
      }
    }
    return {
      login, email, password, error,
    };
  },
});
</script>

<style scoped>
body {
  font-family: Arial, Helvetica, sans-serif;
  background-color: black;
}

* {
  box-sizing: border-box;
}

/* Add padding to containers */
.container {
  padding: 16px;
  background-color: white;
}

label{
  display: block;
}

/* Full-width input fields */
input[type=text], input[type=password], select {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: block;
  border: none;
  background: #f1f1f1;
}

input[type=text]:focus, input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}

/* Overwrite default styles of hr */
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* Set a style for the submit button */
.registerbtn {
  background-color: #04AA6D;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.registerbtn:hover {
  opacity: 1;
}

/* Add a blue text color to links */
a {
  color: dodgerblue;
}

/* Set a grey background color and center the text of the "sign in" section */
.register {
  background-color: #f1f1f1;
  text-align: center;
}

.error {
  color: crimson;
}
</style>
