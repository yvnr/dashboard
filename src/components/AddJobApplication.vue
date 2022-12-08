<template lang="">
 <div class="container-fluid">
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
      <input type="text" v-model="status" name="status" id="status" placeholder="Add Status"/>
      </label>
    </div>
    <input type="submit" value="Add Application" class="submit" />
  </form>
 </div>
</template>

<script>
export default {
  name: 'AddJobApplication',
  data() {
    return {
      company: '',
      position: '',
      duration: '',
      jobID: '',
      location: '',
      status: 'Applied',
    };
  },
  methods: {
    onSubmit(e) {
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
      // TODO: need to post this data

      this.company = '';
      this.position = '';
      this.duration = '';
      this.jobID = '';
      this.location = '';
      this.status = 'Applied';
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
        alert("Please enter your application's current status");
        return true;
      }
      return false;
    },
  },
};
</script>

<style scoped >
.submit {
  padding: 3px 7px;
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
