<template>
  <div class="container-fluid">
    <form @submit="onSubmit" class="add-form">
      <CContainer fluid>
        <CRow class="justify-content-start form-control">
          <CCol xs="6" md="6">
            <label for="company"
              ><b>Company: </b>
              <input
                type="text"
                v-model="company"
                name="company"
                id="company"
                placeholder="Search for Company"
              />
            </label>
          </CCol>
          <CCol xs="2" md="1">
            <input
              type="submit"
              value="Search"
              style="bottom: 0, position: absolute;"
            />
          </CCol>
        </CRow>
      </CContainer>
    </form>
  </div>
</template>

<script>
import { CContainer, CRow, CCol } from '@coreui/vue';

export default {
  name: 'FilterForCompany',
  components: { CContainer, CRow, CCol },
  data() {
    return {
      /**
       * copmany name entered by user to filter data.
       */
      company: '',
    };
  },
  methods: {
    /**
     * Gets called when user enters a company name.
     * triggers event to filter the table data
     * @param {Event} e onSubmit event
     */
    onSubmit(e) {
      e.preventDefault();
      // Removed validation to search for all entries
      // if (this.validationForEmptyValues()) {
      //   return;
      // }
      const searchCriteria = {
        company: this.company,
      };
      this.$emit('filtered-on-company', searchCriteria);
    },
    // /**
    //  * validates form fields for empty values.
    //  * @return true if all form fields are valid else false
    //  */
    // validationForEmptyValues() {
    //   if (!this.company) {
    //     alert('Please enter the company you want to search for');
    //     return true;
    //   }
    //   return false;
    // },
  },
};
</script>

<style scoped >
.add-form {
  margin-bottom: 40px;
}
.form-control label {
  display: block;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
</style>
