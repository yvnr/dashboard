<template>
    <div class="container">
  <form @submit="register">
    <label for="name"><b>Name</b>
       <input type="text" v-model="name" name="name" id="name" placeholder="Enter name" required/>
    </label>
    <label for="email"><b>Email</b>
       <input type="text" v-model="email" name="email" id="email" placeholder="Enter email" required/>
    </label>
    <label for="password"><b>Password</b>
       <input type="password" v-model="password" name="password" id="password" placeholder="Enter Password" required/>
    </label>
    <label for="university"><b>University</b>
        <select v-model="univId">
          <option disabled value="">Please select one</option>
          <option v-for="univ in univList" :key ="univ.id" :value="univ.id">
            {{univ.name}}
          </option>
        </select>
    </label>
    <button type="submit" class="registerbtn">Register</button>
  <div class="container signin">
    <p>Already have an account? <a href="#">Sign in</a>.</p>
  </div>
</form>
</div>
 </template>

<script lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { auth, signInWithCustomToken } from '../store/helpers/firebase_auth';

export default {
  name: 'RegisterComponent',
  setup() {
    const name = ref(null);
    const email = ref(null);
    const univId = ref(null);
    const password = ref(null);
    const error = ref(null);
    const univList = ref([
      {
        id: 'p33MTIpiLZgW2tv9nkCt',
        name: 'UMass Amherst',
      },
    ]);

    const store = useStore();
    const router = useRouter();

    async function register() {
      try {
        const resp = await axios.post('http://localhost:8000/api/user/register', {
          email, password, univId, name,
        });
        const { sessionToken } = resp.data;
        const response = await signInWithCustomToken(auth, sessionToken);
        store.dispatch('populateUser', response);
        router.push('/');
      } catch (err: any) {
        error.value = err.message;
      }
    }

    return {
      register, name, email, univId, password, error, univList,
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
.signin {
  background-color: #f1f1f1;
  text-align: center;
}
</style>
