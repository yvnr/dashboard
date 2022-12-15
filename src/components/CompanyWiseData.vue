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
            v-for="key in gridColumns"
            @click="sortBy(key)"
            :class="{ active: sortKey == key }"
          >
            {{ capitalize(key) }}
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
            @click="displayRoleWiseData(entry['Company'])"
            @keypress="displayRoleWiseData(entry['Company'])"
          >
            <u>{{ entry["Company"] }}</u>
          </td>
          <td :key="key" v-for="key in gridColumns.slice(1)">
            {{ entry[key] }}
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No matches found.</p>
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
      <CModalTitle>
        Role Wise Data for:
      </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <h1>{{ this.currentSelectedCompanyForRoleWiseData }}</h1>
      <RoleWiseData :company="currentSelectedCompanyForRoleWiseData"></RoleWiseData>
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
import {
  CModal,
  CButton,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/vue';
import RoleWiseData from './RoleWiseData.vue';

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
    filterKey: Object,
  },
  data() {
    return {
      gridColumns: [
        'Company',
        'Applied',
        'Assessment',
        'Interview',
        'Accepted',
        'Rejected',
      ],
      gridData: [],
      sortKey: '',
      sortOrders: {},
      currentSelectedCompanyForRoleWiseData: null,
    };
  },
  created() {
    //   TODO Need to fetch this data from API
    this.gridData = [
      {
        Company: 'Amazon',
        Applied: '100',
        Assessment: '40',
        Interview: '20',
        Accepted: '5',
        Rejected: '25',
      },
      {
        Company: 'Meta',
        Applied: '10',
        Assessment: '40',
        Interview: '20',
        Accepted: '5',
        Rejected: '25',
      },
      {
        Company: 'Google',
        Applied: '100',
        Assessment: '40',
        Interview: '20',
        Accepted: '5',
        Rejected: '25',
      },
      {
        Company: 'Netflix',
        Applied: '100',
        Assessment: '40',
        Interview: '20',
        Accepted: '5',
        Rejected: '25',
      },
      {
        Company: 'Salesforce',
        Applied: '100',
        Assessment: '40',
        Interview: '20',
        Accepted: '5',
        Rejected: '25',
      },
      {
        Company: 'Snowflake',
        Applied: '100',
        Assessment: '40',
        Interview: '20',
        Accepted: '5',
        Rejected: '25',
      },
      {
        Company: 'HRT',
        Applied: '100',
        Assessment: '40',
        Interview: '20',
        Accepted: '5',
        Rejected: '25',
      },
      {
        Company: 'TuSimple',
        Applied: '100',
        Assessment: '40',
        Interview: '20',
        Accepted: '5',
        Rejected: '25',
      },
    ];
    this.sortOrders = this.gridColumns.reduce(
      (o, key) => ((o[key] = 1), o),
      {},
    );
  },
  computed: {
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
    displayRoleWiseData(company) {
      console.log(company);
      this.currentSelectedCompanyForRoleWiseData = company;
    },
    sortBy(key) {
      this.sortKey = key;
      this.sortOrders[key] *= -1;
    },
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
};
</script>

<style scoped>
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
