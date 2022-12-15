<template>
  <div class="container-fluid">
    <table v-if="filteredData.length" class="container-fluid">
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
      gridKeys: ['company', 'position', 'status', 'jobID', 'location', 'time'],
      gridData: [],
      sortKey: '',
      sortOrders: {},
      applicationSelectedToEdit: null,
    };
  },
  created() {
    this.fetch();
  },
  computed: {
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
    async fetch() {
      try {
        // const res = await axios.get('http://localhost:3000/items');
        const res = {};
        console.log(res);
        this.gridData = [
          {
            company: 'Amazon',
            position: 'Software Developement Engineer',
            status: 'Applied',
            jobID: '89624',
            location: 'Bposton, MA',
            time: '2022-01-12',
            _cellProps: { id: { scope: 'row' } },
          },
          {
            company: 'Meta',
            position: 'Software Developement Engineer',
            status: 'Assessment',
            jobID: '89624',
            location: 'Bposton, MA',
            time: '2022-01-12',
            _cellProps: { id: { scope: 'row' } },
          },
          {
            company: 'Google',
            position: 'Software Developement Engineer',
            status: 'Interview',
            jobID: '89624',
            location: 'Bposton, MA',
            time: '2022-01-12',
            _cellProps: { id: { scope: 'row' } },
          },
        ];
      } catch (error) {
        console.log(error);
      }
      this.sortOrders = this.gridKeys.reduce((o, key) => ((o[key] = 1), o), {});
    },
    sortBy(key) {
      this.sortKey = key;
      this.sortOrders[key] *= -1;
    },
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    editApplicationData(application) {
      console.log(application);
      this.applicationSelectedToEdit = application;
    },
  },
};
</script>

<style lang="scss" scoped>
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
