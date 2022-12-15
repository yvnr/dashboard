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
      <label for="duration">Duration
      <input type="text" v-model="duration" name="duration" id="duration" placeholder="Add Duration"/>
      </label>
    </div>
    <div class="form-control">
      <label for="jobID">Job ID
      <input type="text" v-model="jobID" name="jobID" id="jobID" placeholder="Add Job ID"/>
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
        <option>Applied</option>
        <option>Assessment</option>
        <option>Interview</option>
        <option>Accepted</option>
        <option>Rejected</option>
      </select>
      </label>
    </div>
    <CButton type="submit" class="button">Submit</CButton>
  </form>
 </div>
</template>

<script>
import axios from 'axios';
import { CButton } from '@coreui/vue';

export default {
  name: 'AddJobApplication',
  components: {
    CButton,
  },
  props: {
    application: {
      default() {
        return {
          company: '',
          position: '',
          duration: '',
          jobID: '',
          location: '',
          status: '',
        };
      },
      type: Object,
    },
    update: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      company: '',
      position: '',
      duration: '',
      jobID: '',
      location: '',
      status: '',
    };
  },
  created() {
    this.company = this.application.company;
    this.position = this.application.position;
    this.duration = this.application.duration;
    this.jobID = this.application.jobID;
    this.location = this.application.location;
    this.status = this.application.status;
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();

      if (this.validationForEmptyValues()) {
        return;
      }

      const application = {
        company: this.company,
        position: this.position,
        duration: this.duration,
        jobID: this.jobID,
        location: this.location,
        status: this.status,
      };
      console.log(application);
      try {
        if (this.update) {
          // const res = await axios.post('http://localhost:3000/items', application);  //Update Call
        } else {
          // const res = await axios.post('http://localhost:3000/items', application);  //Post Call
        }
        const res = {};
        console.log(res);
        // this.items = [res.data, ...this.items];
      } catch (error) {
        console.log(error);
      }
      if (this.update) {
        alert(
          'Your Update Has Been Recorded\nIf do not choose to make furthre changes\nPlease close the form.',
        );
      } else {
        alert(
          'Your Application Has Been Added\nIf do not choose to add more applications\nPlease close the form.',
        );
        this.company = '';
        this.position = '';
        this.duration = '';
        this.jobID = '';
        this.location = '';
        this.status = '';
      }
    },
    validationForEmptyValues() {
      if (!this.company) {
        alert('Please enter the company you applied for');
        return true;
      }
      if (!this.position) {
        alert('Please enter position you applied for');
        return true;
      }
      if (!this.duration) {
        alert('Please enter duration you applied for');
        return true;
      }
      if (!this.jobID) {
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
      return false;
    },
  },
};
</script>

<style scoped >
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
