<template>
  <div class="container-fluid">
    <table v-if="filteredData.length" class="container-fluid">
      <caption style="caption-side:bottom text-align:left">
        List of Jobs Applied
      </caption>
      <thead>
        <tr>
          <th
            :key="key"
            v-for="key in gridKeys"
            @click="sortBy(key)"
            :class="{ active: sortKey == key }"
          >
            {{ capitalize(key) }}
            <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
            </span>
          </th>
          <th class="icon-column">Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="entry" v-for="entry in filteredData">
          <td :key="key" v-for="key in gridKeys">
            {{ entry[key] }}
          </td>
          <td
            class="icon-column"
            @click="editApplicationData(entry)"
            @keypress="editApplicationData(entry)"
          >
            <span class="material-symbols-outlined">edit</span>
          </td>
        </tr>
      </tbody>
    </table>
    <h3 v-else>You Haven't add your applications yet.</h3>
    <div class="error" v-for="error in errors" :key="error">{{ error }}</div>
  </div>
  <CModal
    alignment="center"
    :visible="applicationSelectedToEdit != null"
    @close="
      () => {
        applicationSelectedToEdit = null;
      }
    "
  >
    <CModalHeader>
      <CModalTitle> Edit Application Data: </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <AddJobApplication
        :application="applicationSelectedToEdit"
        :update="true"
      ></AddJobApplication>
    </CModalBody>
    <CModalFooter>
      <CButton
        color="primary  "
        @click="
          () => {
            applicationSelectedToEdit = null;
          }
        "
      >
        Close
      </CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import axios from 'axios';
import {
  CModal,
  CButton,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/vue';
import moment from 'moment';
import { urls } from '../config.json';
import store from '../store';
import AddJobApplication from './AddJobApplication.vue';

export default {
  name: 'JobsApplied',
  components: {
    CModal,
    CButton,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    AddJobApplication,
  },
  data() {
    return {
      /**
       * Table column headers.
       */
      gridKeys: ['company', 'position', 'status', 'jobId', 'location', 'time'],
      /**
       * Table rows.
       */
      gridData: [],
      /**
       * Column on which the table is currently sorted.
       */
      sortKey: '',
      /**
       * Sorted order of the data in the table.
       */
      sortOrders: {},
      /**
       * row data being updated by the user.
       */
      applicationSelectedToEdit: null,
      /**
       * error messages.
       */
      errors: [],
    };
  },
  created() {
    this.fetch();
    this.computeSortedOrder();
  },
  computed: {
    /**
     * Gets called when the user click on the sort arrow.
     * @return sorted table data
     */
    filteredData() {
      const { sortKey } = this;
      const order = this.sortOrders[sortKey] || 1;
      let data = this.gridData;
      if (sortKey) {
        data = data.slice().sort((a, b) => {
          const x = a[sortKey];
          const y = b[sortKey];
          const t1 = x > y ? 1 : -1;
          return (x === y ? 0 : t1) * order;
        });
      }
      return data;
    },
  },
  methods: {
    /**
     * Gets called when the component is created.
     * Makes an API call to fetch the data.
     */
    async fetch() {
      try {
        const res = await axios.get(
          urls.tracker.domain + urls.tracker.application_path,
          {
            params: { startId: 1, numberOfRecords: 2000 },
            headers: {
              'x-uid': store.state.uid,
              'x-univ-id': store.state.univId,
              Authorization: `idToken ${store.state.sessionToken}`,
            },
          },
        );
        console.log(res.data.jobApplications);
        this.gridData = this.formatDateEntries(res.data.jobApplications);
        console.log(this.gridData);
      } catch (error) {
        console.log(error);
        this.errors.push(error.response.data.errorMessage);
      }
    },
    /**
     * Format the date in given applications list.
     * @param {Array} jobApplications list of applications
     * @return list of applications
     */
    formatDateEntries(jobApplications) {
      jobApplications.forEach((curr) => {
        curr.time = moment(curr.time).format('YYYY-MM-DD');
      });
      return jobApplications;
    },
    /**
     * Gets called when the component is created.
     * Computes ascending order of each column.
     */
    computeSortedOrder() {
      this.sortOrders = this.gridKeys.reduce((o, key) => ((o[key] = 1), o), {});
    },
    /**
     * Sort the table data based on given column name.
     * @param {String} key column name on which the table is sorted
     */
    sortBy(key) {
      this.sortKey = key;
      this.sortOrders[key] *= -1;
    },
    /**
     * Capitalizes the given string.
     * @param {String} str string to be capitalized
     * @return capitilazied string
     */
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    /**
     * Store the data of application selected by user to update.
     * @param {Object} application application selected by user
     */
    editApplicationData(application) {
      console.log(application);
      this.applicationSelectedToEdit = application;
    },
  },
};
</script>

<style lang="scss" scoped>
.error {
  color: crimson;
  font-size: 24px;
  padding-bottom: 1px;
}
table {
  border: 2px solid #50ad72;
  border-radius: 3px;
  background-color: #f1f5f9;
  border-collapse: separate;
  left: 0;
  right: 0;
}

th {
  background-color: #50ad72;
  color: #f1f5f9;
  cursor: pointer;
  user-select: none;
}

td {
  background-color: #e7e8e9;
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #f1f5f9;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #f1f5f9;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #f1f5f9;
}

.icon-column {
  width: 0.5rem;
  min-width: 1rem;
  padding: 10px 2rem;
  &:hover {
    cursor: pointer;
  }
}
</style>
