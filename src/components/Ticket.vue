<template>
  <div class="app">
    <div class="container-fluid">

      <div class="row">
        <div class="col-lg-12">
        <h2>{{msg}}</h2>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-2"></div>
        <div class="col-lg-3">
          <div class="button-user">
            <button type="button" class="btn btn-add" @click="showModal">
              <i class="fa fa-plus-square fa-2x"></i>
            </button>
            <modal v-show="isModalVisible" @close="closeModal" />

            <input v-model="rechercher" placeholder="Search ..." type="text">
          </div>
        </div>
        <div class="col-lg-7"></div>
      </div>

      <div class="row">
        <div class="col-lg-2"></div>
        <div class="col-lg-8">
          <!-- XL -->
          <div class="table-responsive-xl">
                <table class="table table-bordered">
                  <thead>
                    <th v-for="column in columns" :title="column.label" :key="column.field" @click="sort(column.field)">
                      {{ column.label }}
                      <!--<i class="fa fa-sort-up"></i>-->
                      <!--<i class="fa fa-sort-down"></i>-->
                   </th>
                  </thead>
                  <tbody>
                <tr v-for="(row, index) in sortedRows" :key="index">
                    <td v-for="col in row" :key="col">
                     {{ col}}
                      <i v-if="col == ''" class="fas fa-edit" ></i>
                      <i v-if="col == ''" class="fas fa-trash"></i>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
        </div>
        <div class="col-lg-2"></div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <p>
          <button @click="prev">Previous page</button>
          <button @click="next">Next page</button>
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-side-effects-in-computed-properties */

// import modal from './Modal.vue'

var list = [
  {
    ticket: 1,
    date: '24-11-2017',
    demandeur: 'Tom',
    objet: 'objet-1',
    detail: 'detail operation',
    crud: ''
  },
  {ticket: 2, date: '24-11-2017', demandeur: 'Jean', objet: 'objet-2', detail: 'detail operation', crud: ''},
  {ticket: 3, date: '25-11-2017', demandeur: 'Marie', objet: 'objet-3', detail: 'detail operation', crud: ''},
  {ticket: 4, date: '26-11-2017', demandeur: 'Chris', objet: 'objet-4', detail: 'detail operation', crud: ''},
  {ticket: 5, date: '27-11-2017', demandeur: 'Jean', objet: 'objet-5', detail: 'detail operation', crud: ''},
  {ticket: 6, date: '28-11-2017', demandeur: 'Marie', objet: 'objet-6', detail: 'detail operation', crud: ''},
  {ticket: 7, date: '29-11-2017', demandeur: 'Tom', objet: 'objet-7', detail: 'detail operation', crud: ''},
  {ticket: 8, date: '30-11-2017', demandeur: 'Chris', objet: 'objet-8', detail: 'detail operation', crud: ''},
  {ticket: 9, date: '1-12-2017', demandeur: 'Chris', objet: 'objet-9', detail: 'detail operation', crud: ''},
  {ticket: 10, date: '2-12-2017', demandeur: 'Tom', objet: 'objet-10', detail: 'detail operation', crud: ''}
]
var headers = [
  {
    label: 'Ticket',
    field: 'ticket',
    type: 'number',
    filterable: true
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
  },
  {
    label: 'CRUD',
    field: 'crud'
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
<style scoped></style>
