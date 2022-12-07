<template>
  <div class="container-fluid">
    <!-- Need to add toggle for this titile also check how to handle prefix search-->
    <h4 v-show="false">Showing Results for:</h4>
    <h3 v-show="false">
      {{ this.filterKey.company }}
    </h3>
    <table v-if="filteredData.length">
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
          <td :key="key" v-for="key in gridColumns">
            {{ entry[key] }}
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No matches found.</p>
  </div>
</template>

<script>
export default {
  name: "CompanyWiseData",
  setup() {},
  props: {
    filterKey: Object,
  },
  data() {
    return {
      gridColumns: [],
      gridData: [],
      sortKey: "",
      sortOrders: {},
    };
  },
  created() {
    //   TODO Need to fetch this data from API
    this.gridColumns = [
      "Company",
      "Applied",
      "Assessment",
      "Interview",
      "Accepted",
      "Rejected",
    ];
    this.gridData = [
      {
        Company: "Amazon",
        Applied: "100",
        Assessment: "40",
        Interview: "20",
        Accepted: "5",
        Rejected: "25",
      },
      {
        Company: "Meta",
        Applied: "10",
        Assessment: "40",
        Interview: "20",
        Accepted: "5",
        Rejected: "25",
      },
      {
        Company: "Google",
        Applied: "100",
        Assessment: "40",
        Interview: "20",
        Accepted: "5",
        Rejected: "25",
      },
      {
        Company: "Netflix",
        Applied: "100",
        Assessment: "40",
        Interview: "20",
        Accepted: "5",
        Rejected: "25",
      },
      {
        Company: "Salesforce",
        Applied: "100",
        Assessment: "40",
        Interview: "20",
        Accepted: "5",
        Rejected: "25",
      },
      {
        Company: "Snowflake",
        Applied: "100",
        Assessment: "40",
        Interview: "20",
        Accepted: "5",
        Rejected: "25",
      },
      {
        Company: "HRT",
        Applied: "100",
        Assessment: "40",
        Interview: "20",
        Accepted: "5",
        Rejected: "25",
      },
      {
        Company: "TuSimple",
        Applied: "100",
        Assessment: "40",
        Interview: "20",
        Accepted: "5",
        Rejected: "25",
      },
    ];
    this.sortOrders = this.gridColumns.reduce(
      (o, key) => ((o[key] = 1), o),
      {}
    );
  },
  computed: {
    filteredData() {
      const sortKey = this.sortKey;
      const filterKey =
        this.filterKey.company && this.filterKey.company.toLowerCase();
      const order = this.sortOrders[sortKey] || 1;
      let data = this.gridData;
      if (filterKey) {
        data = data.filter((row) => {
          return Object.keys(row).some((key) => {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
          });
        });
      }
      if (sortKey) {
        data = data.slice().sort((a, b) => {
          a = a[sortKey];
          b = b[sortKey];
          return (a === b ? 0 : a > b ? 1 : -1) * order;
        });
      }
      return data;
    },
  },
  methods: {
    sortBy(key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
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
</style>