<template>
  <div class="container">
    <form @submit.stop.prevent="login">
      <label for="email"><b>Email</b>
        <input type="text" v-model="email" name="email" id="email" placeholder="Enter email" :disabled="isDisabled" required/>
      </label>
      <label for="password"><b>Password</b>
        <input type="password" v-model="password" name="password" id="password" placeholder="Enter Password" :disabled="isDisabled" required/>
      </label>
      <button type="submit" class="loginbtn">Login</button>
      <div class="error" v-for="error in errors" :key="error" >{{error}}</div>
      <div class="register">
        <div>No account? <a href="/register">Create one</a></div>
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
    const errors = ref([] as string[]);
    const isDisabled = ref(false);

    const store = useStore();
    const router = useRouter();

    function validateForm() {
      const errorMessage: string[] = [];
      if (!email.value || !email.value.includes('@')) {
        errorMessage.push('Email is invalid');
      }

      if (!password.value || password.value.length < 8 || password.value.length > 50) {
        errorMessage.push('Please enter password with 8-50 characters');
      }
      return errorMessage;
    }
    async function login() {
      isDisabled.value = true;
      errors.value = validateForm();
      if (errors.value.length) {
        isDisabled.value = false;
        return;
      }
      try {
        const response = await signInWithEmailAndPassword(auth, email.value, password.value);
        await store.dispatch('createSession', response);
        router.push('/');
      } catch (err: any) {
        errors.value.push('Invalid credentials. Please try again');
        isDisabled.value = false;
      }
    }
    return {
      login, email, password, errors, isDisabled,
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
  padding: 30px;
  background-color: white;
  width: 400px;
  display: flex;
  flex-direction: column;
  position: absolute;
  padding: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

form{
  display: flex;
  flex-direction: column;
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
.loginbtn {
  background-color: #04AA6D;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  opacity: 0.9;
}

.loginbtn:hover {
  opacity: 1;
}

/* Add a blue text color to links */
a {
  color: dodgerblue;
}

/* Set a grey background color and center the text of the "sign in" section */
.register {
  text-align: center;
}

.error {
  color: crimson;
  font-size: 12px;
}
</style>
