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

// eslint-disable-next-line no-shadow
enum ButtonText {
    'SignUp' = 'Sign up',
    'SigningUp' ='Signing up'
}

export default {
  name: 'RegisterComponent',
  setup() {
    const name = ref('');
    const email = ref('');
    const univId = ref('');
    const password = ref('');
    const errors = ref([] as string[]);
    const univList = ref([] as {id: string, name:string, emailDomains: string[]}[]);
    const isDisabled = ref(false);
    const btnTxt = ref(ButtonText.SignUp);

    const router = useRouter();

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
        const resp = await axios.post('http://localhost:8000/api/user/register', {
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

    watchEffect(async () => {
      try {
        const resp = await axios.get('http://localhost:8000/api/university');
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
