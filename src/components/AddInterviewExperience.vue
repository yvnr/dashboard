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
      <label for="experience">Experience
      <textarea type="text" v-model="note" name="experience" id="experience" placeholder="Add Experience"></textarea>
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
  name: 'AddInterviewExperience',
  components: {
    CButton,
  },
  data() {
    return {
      company: '',
      position: '',
      location: '',
      note: '',
    };
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();

      if (this.validationForEmptyValues()) {
        return;
      }

      const experience = {
        company: this.company,
        position: this.position,
        location: this.location,
        note: this.note,
      };
      console.log(experience);
      try {
        // const res = await axios.post('http://localhost:3000/items', application);
        const res = {};
        console.log(res);
        // this.items = [res.data, ...this.items];
      } catch (error) {
        console.log(error);
      }
      this.company = '';
      this.position = '';
      this.location = '';
      this.note = '';
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
      if (!this.location) {
        alert('Please enter the location');
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
