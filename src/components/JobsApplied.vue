<template>
  <div class="container-fluid">
    <CTable
      caption="List of Jobs Applied"
      :columns="columns"
      :items="items"
      :tableHeadProps="{ color: 'dark' }"
      striped
      bordered
    ></CTable>
  </div>
</template>

<script>
import { CTable } from '@coreui/vue';
import axios from 'axios';

export default {
  data: () => ({
    columns: [
      {
        key: 'company',
        label: 'Company',
        _props: { scope: 'col' },
      },
      {
        key: 'position',
        label: 'Position',
        _props: { scope: 'col' },
      },
      {
        key: 'status',
        label: 'Status',
        _props: { scope: 'col' },
      },
      {
        key: 'jobID',
        label: 'JobID',
        _props: { scope: 'col' },
      },
      {
        key: 'location',
        label: 'Location',
        _props: { scope: 'col' },
      },
      {
        key: 'time',
        label: 'Time',
        _props: { scope: 'col' },
      },
    ],
    items: [],
  }),
  components: {
    CTable,
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      try {
        // const res = await axios.get('http://localhost:3000/items');
        const res = {};
        console.log(res);
        this.items = [
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
            status: 'Applied',
            jobID: '89624',
            location: 'Bposton, MA',
            time: '2022-01-12',
            _cellProps: { id: { scope: 'row' } },
          },
          {
            company: 'Google',
            position: 'Software Developement Engineer',
            status: 'Applied',
            jobID: '89624',
            location: 'Bposton, MA',
            time: '2022-01-12',
            _cellProps: { id: { scope: 'row' } },
          },
        ];
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
