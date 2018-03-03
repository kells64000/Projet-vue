<template>
  <div>
    <h2>{{msg}}</h2>
    <tr>
      <div><span style="font-weight: bold">What are you looking for?</span>
        <input v-model="rechercher" placeholder="Searching ..." type="text">
      </div>

    </tr>
    <div>
      <table class="table">
        <thead>
        <th v-for="column in columns" :title="column.label" :key="column.field" @click="sort(column.field)">
          {{ column.label }}
        </th>
        </thead>
        <tbody>
        <tr v-for="(row, index) in sortedRows" :key="index">
          <td v-for="col in row" :key="col">
            {{ col}}
          </td>
        </tr>
        </tbody>
      </table>
      <p>
        <button @click="prev">Previous page</button>
        <button @click="next">Next page</button>
      </p>

    </div>
  </div>

</template>

<script>
var list = [
  {
    ticket: 1,
    date: '24-11-2017',
    demandeur: 'Tom',
    objet: 'objet',
    detail: 'detail operation to try new things et to say bla bla bla bla'
  },
  {ticket: 2, date: '24-11-2017', demandeur: 'Jean', objet: 'objet', detail: 'detail operation'},
  {ticket: 3, date: '24-11-2017', demandeur: 'Marie', objet: 'objet', detail: 'detail operation'},
  {ticket: 4, date: '24-11-2017', demandeur: 'Chris', objet: 'objet', detail: 'detail operation'},
  {ticket: 5, date: '24-11-2017', demandeur: 'Jean', objet: 'objet', detail: 'detail operation'},
  {ticket: 6, date: '24-11-2017', demandeur: 'Marie', objet: 'objet', detail: 'detail operation'},
  {ticket: 7, date: '24-11-2017', demandeur: 'Tom', objet: 'objet', detail: 'detail operation'},
  {ticket: 8, date: '24-11-2017', demandeur: 'Chris', objet: 'objet', detail: 'detail operation'},
  {ticket: 9, date: '24-11-2017', demandeur: 'Chris', objet: 'objet', detail: 'detail operation'},
  {ticket: 10, date: '24-11-2017', demandeur: 'Tom', objet: 'objet', detail: 'detail operation'}
]
var headers = [
  {
    label: 'Ticket',
    field: 'ticket',
    filterable: true,
    type: 'number'
  },
  {
    label: 'Date',
    field: 'date',
    type: 'date',
    inputFormat: 'DDMMYYYY',
    filterable: true
  },
  {
    label: 'Demandeur',
    field: 'demandeur',
    filterable: true
  },
  {
    label: 'Objet',
    field: 'objet',
    filterable: true
  },
  {
    label: 'Detail',
    field: 'detail',
    filterable: true
  }
]

export default {
  name: 'Ticket',
  data () {
    return {
      msg: 'Ticketing App',
      columns: headers,
      rows: list,
      currentSort: list.ticket,
      currentSortWay: 'asc',
      page: 1,
      pageSize: 5
    }
  },
  methods: {
    sort: function (s) {
      if (s === this.currentSort) {
        this.currentSortWay = this.currentSortWay === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = s
    },
    next: function () {
      if (this.page * this.pageSize < this.rows.length) this.page++
    },
    prev: function () {
      if (this.page > 1) this.page--
    }
  },
  computed: {
    sortedRows: function () {
      return this.rows.sort((a, b) => {
        let way = 1
        if (this.currentSortWay === 'desc') way = -1
        if (a[this.currentSort] < b[this.currentSort]) {
          return -1 * way
        }
        if (a[this.currentSort] > b[this.currentSort]) {
          return 1 * way
        }
        return 0
      }).filter((row, index) => {
        let first = (this.page - 1) * this.pageSize
        let end = this.page * this.pageSize
        if (index >= first && index < end) return true
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
