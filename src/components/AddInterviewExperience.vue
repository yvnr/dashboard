<template lang="">
 <div class="container-fluid">
      <h3>Interview Experience Form:</h3>
     <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <label for="company">Company
      <input type="text" v-model="company" name="company" id="company" placeholder="Add Company" />
      </label>
    </div>
    <div class="form-control">
      <label for="position">Position
      <input type="text" v-model="position" name="position" id="position" placeholder="Add Position"/>
      </label>
    </div>
    <div class="form-control">
      <label for="location">Location
      <input type="text" v-model="location" name="location" id="location" placeholder="Add Location"/>
      </label>
    </div>
    <div class="form-control">
      <label for="status">Status
      <select v-model="status" name="status" id="status">
        <option disabled value="">Please select your applications current status</option>
        <option>APPLIED</option>
        <option>ASSESSMENT</option>
        <option>INTERVIEW</option>
        <option>SELECTED</option>
        <option>REJECTED</option>
      </select>
      </label>
    </div>
    <div class="form-control">
      <label for="experience">Experience
      <textarea type="text" v-model="note" name="experience" id="experience" placeholder="Add Experience"></textarea>
      </label>
    </div>
    <div class="error" v-for="error in errors" :key="error" >{{error}}</div>
    <CButton type="submit" class="button">Submit</CButton>
  </form>
 </div>
</template>

<script>
import axios from 'axios';
import { CButton } from '@coreui/vue';
import { urls } from '../config.json';
import store from '../store';

export default {
  name: 'AddInterviewExperience',
  components: {
    CButton,
  },
  data() {
    return {
      /**
       * company name.
       */
      company: '',
      /**
       * position applied for.
       */
      position: '',
      /**
       * company location.
       */
      location: '',
      /**
       * application status.
       */
      status: '',
      /**
       * user note.
       */
      note: '',
      /**
       * error messages.
       */
      errors: [],
    };
  },
  methods: {
    /**
     * Gets called when user submits their experience.
     * makes a POST/PUT API call to persit experience data
     * @param {Event} e onSubmit event
     */
    async onSubmit(e) {
      e.preventDefault();

      if (this.validationForEmptyValues()) {
        return;
      }

      const experience = {
        company: this.company,
        role: this.position,
        location: this.location,
        summary: this.note,
        status: this.status,
      };
      console.log(experience);
      try {
        const res = await axios.post(
          `${urls.record.domain}${urls.record.path}`,
          experience,
          {
            headers: {
              'x-uid': store.state.uid,
              'x-univ-id': store.state.univId,
              Authorization: `idToken ${store.state.sessionToken}`,
            },
          },
        );
        console.log(res.data);
        alert('Your Experience Has Been Recorded');
        this.company = '';
        this.position = '';
        this.location = '';
        this.note = '';
        this.status = '';
        store.dispatch('updateToggle');
        // this.items = [res.data, ...this.items];
      } catch (error) {
        console.log(error);
        this.errors.push(error.response.data.errorMessage);
      }
    },
    /**
     * validates form fields for empty values.
     * @return true if all form fields are valid else false
     */
    validationForEmptyValues() {
      if (!this.company) {
        alert('Please enter the company you applied for');
        return true;
      }
      if (!this.position) {
        alert('Please enter position you applied for');
        return true;
      }
      if (!this.location) {
        alert('Please enter the location');
        return true;
      }
      if (!this.status) {
        alert('Please enter the status');
        return true;
      }
      if (!this.note) {
        alert('Please add your interview experience');
        return true;
      }
      return false;
    },
  },
};
</script>

<style scoped >
.error {
  color: crimson;
  font-size: 24px;
  padding-bottom: 1px;
}

.button {
  background-color: var(--light-grey);
  border-style: groove;
}

.add-form {
  margin-bottom: 40px;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
.form-control textarea {
  width: 100%;
  height: 200px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
.form-control select {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-control-check label {
  flex: 1;
}
.form-control-check input {
  flex: 2;
  height: 20px;
}
</style>
