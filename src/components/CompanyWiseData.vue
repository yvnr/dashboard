<template>
  <div class="container-fluid">
    <!-- Need to add toggle for this titile also check how to handle prefix search-->
    <h4 v-show="false">Showing Results for:</h4>
    <h3 v-show="false">
      {{ this.filterKey.company }}
    </h3>
    <table v-if="filteredData.length" class="container-fluid">
      <thead>
        <tr>
          <th
            :key="key"
            v-for="key in gridKeys"
            @click="sortBy(key)"
            :class="{ active: sortKey == key }"
          >
            {{ capitalize(gridColumns[key]) }}
            <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr :key="entry" v-for="entry in filteredData">
          <td
            class="hovertext"
            data-hover="Click Here, to view position wise logistics"
            @click="displayRoleWiseData(entry['company'])"
            @keypress="displayRoleWiseData(entry['company'])"
          >
            <u>{{ entry["company"] }}</u>
          </td>
          <td :key="key" v-for="key in gridKeys.slice(1)">
            {{ entry[key] }}
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No matches found.</p>
    <div class="error" v-for="error in errors" :key="error">{{ error }}</div>
  </div>
  <CModal
    alignment="center"
    size="xl"
    :visible="currentSelectedCompanyForRoleWiseData != null"
    @close="
      () => {
        currentSelectedCompanyForRoleWiseData = null;
      }
    "
  >
    <CModalHeader>
      <CModalTitle> Role Wise Data for: </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <h1>{{ this.currentSelectedCompanyForRoleWiseData }}</h1>
      <RoleWiseData
        :company="currentSelectedCompanyForRoleWiseData"
      ></RoleWiseData>
    </CModalBody>
    <CModalFooter>
      <CButton
        color="primary  "
        @click="
          () => {
            currentSelectedCompanyForRoleWiseData = null;
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
import RoleWiseData from './RoleWiseData.vue';
import { urls } from '../config.json';
import store from '../store';

export default {
  name: 'CompanyWiseData',
  components: {
    CModal,
    CButton,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    RoleWiseData,
  },
  props: {
    /**
     * copmany name entered by user to filter data.
     */
    filterKey: Object,
  },
  data() {
    return {
      /**
       * Metric Keys.
       */
      gridKeys: [
        'company',
        'appliedCount',
        'assessmentCount',
        'interviewCount',
        'selectedCount',
        'rejectCount',
      ],
      /**
       * Table column headers.
       */
      gridColumns: {
        company: 'Company',
        appliedCount: 'Applied',
        assessmentCount: 'Assessment',
        interviewCount: 'Interview',
        selectedCount: 'Selected',
        rejectCount: 'Rejected',
      },
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
       * company name selected by the user for role wise data.
       */
      currentSelectedCompanyForRoleWiseData: null,
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
      const filterKey = this.filterKey.company && this.filterKey.company.toLowerCase();
      const order = this.sortOrders[sortKey] || 1;
      let data = this.gridData;
      if (filterKey) {
        data = data.filter((row) => Object.keys(row).some(
          (key) => String(row[key]).toLowerCase().indexOf(filterKey) > -1,
        ));
      }
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
        const endDate = moment();
        const startDate = moment().subtract(1, 'years');
        const res = await axios.get(
          urls.analytics.domain + urls.analytics.company_path,
          {
            params: {
              start: startDate.format('YYYY-MM-DD'),
              end: endDate.format('YYYY-MM-DD'),
            },
            headers: {
              'x-uid': store.state.uid,
              'x-univ-id': store.state.univId,
              Authorization: `idToken ${store.state.sessionToken}`,
            },
          },
        );
        console.log(res.data);
        this.gridData = res.data.companySpecificData;
        console.log(this.gridData);
      } catch (error) {
        console.log(error);
        this.errors.push(error.response.data.errorMessage);
      }
    },
    /**
     * Gets called when the component is created.
     * Computes ascending order of each column.
     */
    computeSortedOrder() {
      this.sortOrders = this.gridKeys.reduce((o, key) => ((o[key] = 1), o), {});
    },
    /**
     * Gets called when user selects a company to check role wise data.
     * @param company name of company selected
     */
    displayRoleWiseData(company) {
      console.log(company);
      this.currentSelectedCompanyForRoleWiseData = company;
    },
    /**
     * Sort the table data based on given column name.
     * @param key column name on which the table is sorted
     */
    sortBy(key) {
      this.sortKey = key;
      this.sortOrders[key] *= -1;
    },
    /**
     * Capitalizes the given string.
     * @param str string to be capitalized
     * @return capitilazied string
     */
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
};
</script>

<style scoped>
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

.hovertext {
  position: relative;
}

.hovertext:before {
  content: attr(data-hover);
  visibility: hidden;
  opacity: 0;
  width: max-content;
  background-color: var(--light-grey);
  color: var(--dark-alt);
  text-align: center;
  border-radius: 5px;
  padding: 5px 0;
  /* transition: opacity 1s ease-in-out; */

  position: absolute;
  z-index: 1;
  left: 75%;
  top: 15%;
}

.hovertext:hover:before {
  opacity: 1;
  visibility: visible;
}
</style>
