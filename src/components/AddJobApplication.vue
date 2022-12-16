<template lang="">
 <div class="container-fluid">
      <h3>Application Form:</h3>
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
      <label for="jobId">Job ID
      <input type="text" v-model="jobId" name="jobId" id="jobId" placeholder="Add Job ID"/>
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
      <label for="time">Date
      <input type="text" v-model="time" name="time" id="time" placeholder="YYYY-MM-DD"/>
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
  name: 'AddJobApplication',
  components: {
    CButton,
  },
  props: {
    /**
     * Default values of application form fields.
     */
    application: {
      default() {
        return {
          company: '',
          position: '',
          jobId: '',
          location: '',
          status: '',
          time: '',
          id: null,
        };
      },
      type: Object,
    },
    /**
     * Stores whether Update/Add form.
     */
    update: {
      type: Boolean,
      default: false,
    },
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
       * jobID of role.
       */
      jobId: '',
      /**
       * company location.
       */
      location: '',
      /**
       * application status.
       */
      status: '',
      /**
       * application last edited time.
       */
      time: '',
      /**
       * error messages.
       */
      errors: [],
    };
  },
  created() {
    if (this.update) {
      this.company = this.application.company;
      this.position = this.application.position;
      this.jobId = this.application.jobId;
      this.location = this.application.location;
      this.status = this.application.status;
      this.time = this.application.time;
    }
  },
  methods: {
    /**
     * Gets called when user adds application.
     * makes a POST/PUT API call to persit applicaiton data
     */
    async onSubmit(e) {
      e.preventDefault();

      if (this.validationForEmptyValues()) {
        return;
      }

      const application = {
        company: this.company,
        position: this.position,
        jobId: this.jobId,
        location: this.location,
        status: this.status,
        time: this.time,
      };
      console.log(application);
      try {
        if (this.update) {
          const res = await axios.put(
            `${urls.tracker.domain}${urls.tracker.path}/${this.application.id}`,
            application,
            {
              headers: {
                'x-uid': store.state.uid,
                'x-univ-id': store.state.univId,
                Authorization: `idToken ${store.state.sessionToken}`,
              },
            },
          );
          console.log(res);
          alert(
            'Your Update Has Been Recorded\nIf you do not choose to make furthre changes to this application\nPlease close the form.',
          );
        } else {
          const res = await axios.post(
            urls.tracker.domain + urls.tracker.path,
            application,
            {
              headers: {
                'x-uid': store.state.uid,
                'x-univ-id': store.state.univId,
                Authorization: `idToken ${store.state.sessionToken}`,
              },
            },
          );
          console.log(res);
          alert(
            'Your Application Has Been Added\nIf you do not choose to add more applications\nPlease close the form.',
          );
          this.company = '';
          this.position = '';
          this.jobId = '';
          this.location = '';
          this.status = '';
          this.time = '';
        }
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
      if (!this.jobId) {
        alert('Please enter Job ID');
        return true;
      }
      if (!this.location) {
        alert('Please enter the location');
        return true;
      }
      if (!this.status) {
        alert("Please select your application's current status");
        return true;
      }
      if (!this.time) {
        alert('Please current date');
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
