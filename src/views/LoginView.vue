<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
  <div class="container">
    <form @submit.stop.prevent="login">
      <label for="email"><b>Email</b>
        <input type="text" v-model="email" name="email" id="email" placeholder="Enter email" :disabled="isDisabled" required/>
      </label>
      <label for="password"><b>Password</b>
        <input type="password" v-model="password" name="password" id="password" placeholder="Enter Password" :disabled="isDisabled" required/>
      </label>
      <button type="submit" class="loginbtn" :disabled="isDisabled">{{btnTxt}}
        <i :class="{'fa-spin fa fa-refresh' : isDisabled}"></i>
      </button>
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
import store from '../store';
import { auth, signInWithEmailAndPassword } from '../store/helpers/firebase_auth';

// eslint-disable-next-line no-shadow
enum ButtonText {
    'Login' = 'Login',
    'LoggingIn' ='Logging in'
}

/**
 * Login component for the login form
 * This is displayed on the /login route
 */
export default defineComponent({
  name: 'loginView',
  setup() {
    const email = ref(''); // email is linked with email field
    const password = ref(''); // password is linked with password field
    const errors = ref([] as string[]); // errors value - used to display the error if the user login is not successful
    const isDisabled = ref(false); //  variable - used to disable the login button once clicked
    const btnTxt = ref(ButtonText.Login); // used to update the button text

    const router = useRouter();

    /**
     * function to validating login form values
     */
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

    /**
     * this is function called when user submits the login button
     * If field values are proper, we will signIn with firebase IDP auth method(signInWithEmailAndPassword)
     * If login is successful, we will store the user sessionToken in the local storage and vuex store by calling the createSession method.
     * If login fails, we updated the error value and displays it.
     */
    async function login() {
      isDisabled.value = true;
      btnTxt.value = ButtonText.LoggingIn;
      errors.value = validateForm();
      if (errors.value.length) {
        isDisabled.value = false;
        btnTxt.value = ButtonText.Login;
        return;
      }
      try {
        const response = await signInWithEmailAndPassword(auth, email.value, password.value);
        await store.dispatch('createSession', response);
        router.push('/');
      } catch (err: any) {
        btnTxt.value = ButtonText.Login;
        errors.value.push('Invalid credentials. Please try again');
        isDisabled.value = false;
      }
    }
    return {
      login, email, password, errors, isDisabled, btnTxt,
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

.loginbtn :disabled{
  background-color: #b9c1be;
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
