<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
    <div class="container">
      <form @submit.stop.prevent="register">
        <label for="name"><b>Name</b>
          <input type="text" v-model="name" name="name" id="name" placeholder="Enter name" :disabled="isDisabled" required/>
        </label>
        <label for="email"><b>Email</b>
          <input type="text" v-model="email" name="email" id="email" placeholder="Enter email" :disabled="isDisabled" required/>
        </label>
        <label for="password"><b>Password</b>
          <input type="password" v-model="password" name="password" id="password" placeholder="Enter Password" :disabled="isDisabled" required/>
        </label>
        <label for="university"><b>University</b>
            <select v-model="univId" :disabled="isDisabled">
              <option disabled value="">Please select one</option>
              <option v-for="univ in univList " :key ="univ.id" :value="univ.id">
                {{univ.name}}
              </option>
            </select>
        </label>
        <div class="error" v-for="error in errors" :key="error" >{{error}}</div>
        <button type="submit" class="registerbtn" :disabled="isDisabled">{{btnTxt}}
          <i :class="{'fa-spin fa fa-refresh': isDisabled}"></i>
        </button>
        <div class="login">
          <p>Already have an account? <a href="/login">Sign in</a>.</p>
        </div>
      </form>
    </div>
 </template>

<script lang="ts">
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import store from '../store';
import { auth, signInWithCustomToken } from '../store/helpers/firebase_auth';
import { urls } from '../config.json';

// eslint-disable-next-line no-shadow
enum ButtonText {
    'SignUp' = 'Sign up',
    'SigningUp' ='Signing up'
}

/**
 * Register component for the register form
 * This is displayed on the /register route
 */
export default {
  name: 'RegisterComponent',
  setup() {
    const name = ref(''); // name is linked with name field
    const email = ref(''); // email is linked with email field
    const univId = ref(''); // univId is linked to the university selection field
    const password = ref(''); // password is linked with password field
    const errors = ref([] as string[]); // errors value - used to display the error if the user login is not successful
    const univList = ref([] as {id: string, name:string, emailDomains: string[]}[]); // list of all universities(fecthes from the backend)
    const isDisabled = ref(false); // variable - used to disable the login button once clicked
    const btnTxt = ref(ButtonText.SignUp); // used to update the button text

    const router = useRouter();

    /**
     * function to validating signup values
     */
    function validateForm() {
      const errorMessage: string[] = [];

      if (!name.value || name.value.length < 4 || name.value.length > 50) {
        errorMessage.push('Please enter name with 4-50 characters');
      }

      if (!univId.value) {
        errorMessage.push('Please select the university');
      }

      if (!email.value) {
        errorMessage.push('Please enter an email');
      }

      const univData = univList.value.find((x) => x.id === univId.value);
      if (univData && email.value && !univData.emailDomains.find((x) => email.value.endsWith(x))) {
        errorMessage.push('Email domain is not registered by the university');
      }

      if (!password.value || password.value.length < 8 || password.value.length > 50) {
        errorMessage.push('Please enter password with 8-50 characters');
      }
      return errorMessage;
    }

    /**
     * this is function called when user submits the register button
     * If field values are proper, we will send POST request to /api/user/register endpoint
     * If the repsonse is success, we will be recieving the custom token. With the custom token,
     * we will sign with firebase IDP auth method(signInWithCustomToken)
     * After successful signing in, we will store the user sessionToken in the local storage and vuex store by calling the createSession method.
     * If register endpoint repsonse fails, we updated the error value and displays it.
     */
    async function register() {
      isDisabled.value = true;
      btnTxt.value = ButtonText.SigningUp;
      errors.value = validateForm();
      if (errors.value.length) {
        isDisabled.value = false;
        btnTxt.value = ButtonText.SignUp;
        return;
      }
      try {
        const resp = await axios.post(`${urls.record.domain}${urls.record.register_user_path}`, {
          email: email.value, password: password.value, univId: univId.value, name: name.value,
        });
        const { sessionToken } = resp.data;
        const response = await signInWithCustomToken(auth, sessionToken);
        console.info(response);
        await store.dispatch('createSession', response);
        errors.value = [];
        router.push('/');
      } catch (err: any) {
        btnTxt.value = ButtonText.SignUp;
        errors.value.push(err.response.data.message);
        isDisabled.value = false;
      }
    }

    /**
     * Keeping async requests in the watchEffect,
     * Updating the corresponding response in the form
     *
     * Calling an university - GET /api/university endpionts to list all the universities in the register form
     */
    watchEffect(async () => {
      try {
        const resp = await axios.get(`${urls.record.domain}${urls.record.university_path}`);
        console.log(resp);
        univList.value = resp.data;
      } catch (err: any) {
        univList.value = [];
      }
    });

    return {
      register, name, email, univId, password, errors, univList, isDisabled, btnTxt,
    };
  },

};
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
  padding: 10px;
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
.login {
  text-align: center;
}

.error {
  color: crimson;
  font-size: 12px;
}
</style>
