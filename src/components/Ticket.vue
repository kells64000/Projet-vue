<template>
  <div>
    <h2>{{msg}}</h2>
    <tr>
      <div>
        <button type="button" class="btn" @click="showModal">
          Ajouter
        </button>
        <modal v-show="isModalVisible" @close="hideModal"/>
      </div>
      <div>
        <div id="leftsearch">
          <label>Filter by :</label>
            <select v-model="colonne">
              <option value ="demandeur" @click="showFilter = true">Demandeur</option>
              <option value ="objet" @click="showFilter = true">Objet</option>
              <option value ="detail" @click="showFilter = true">Detail</option>
              <option value ="date" @click="showFilter = true">Date</option>
              <option value ="tech" @click="showFilter = true">Tech</option>
              <option value ="etat" @click="showFilter = true">Etat</option>
              <option value ="" @click="showFilter = false"></option>
            </select>
          </div>
        <div id="rightsearch">
          <label style="font-weight: bold" v-show=showFilter>What are you looking for?</label>
          <input v-model="rechercher" placeholder="Searching ..." type="text" v-show=showFilter>
        </div>
      </div>
    </tr>
    <div>
      <table class="table">
        <thead>
        <th v-for="column in columns"
            :title="column.label"
            :key="column.field"
            @click="sort(column.field)"
            @dblclick="delInter(item)">
          {{ column.label }}
          <button  v-if="column.field == 'supprimer'" @click="delInter(isChecked)">Supprimer</button>
        </th>
        </thead>
        <tbody>
        <tr v-for="(row, index) in sortedRows"
            :key="index"
            :class="{active: (index == rowActive && rowActive !== '' ? isActive = true : isActive = false )}">
          <td>
            <span><input type="checkbox" v-model="isChecked" :value="row.ticket"/>
            </span>
          </td>
          <td v-for="(cell, index2) in row"
              :key="index2"
              @click="setActive(row, index)">
            <span v-if="index2 !== 'detail' || index == rowActive && rowActive !== ''" v-show="showDetail==false">
            {{ cell }}
            </span>
            <span v-else v-show="showDetail==true">
            {{ cell }}
            </span>
          </td>
          <td>
            <span><button type="button" class="btn" @click="showEdit(row)">Editer</button>
              <edition v-show="isEditVisible" :details="ed" @close="hideEdit"/>
            </span>
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
import modal from './Modal'
import edition from './Edition'

import { mapActions } from 'vuex'

var list = [
  {ticket: 1, etat: 'open', tech: 'Phil', date: '24-11-2017', demandeur: 'Jean', objet: 'résumé', detail: 'detail operation'},
  {ticket: 2, etat: 'open', tech: 'Paul', date: '24-11-2017', demandeur: 'Tom', objet: 'objet', detail: 'detail operation to try new things et to say bla bla bla bla'},
  {ticket: 3, etat: 'open', tech: 'Omer', date: '24-11-2017', demandeur: 'Marie', objet: 'résumé', detail: 'detail operation'},
  {ticket: 4, etat: 'open', tech: 'Bart', date: '24-11-2017', demandeur: 'Chris', objet: 'résumé', detail: 'detail operation'},
  {ticket: 5, etat: 'open', tech: 'Maggie', date: '24-11-2017', demandeur: 'Jean', objet: 'résumé', detail: 'detail operation'},
  {ticket: 6, etat: 'open', tech: 'Casimir', date: '24-11-2017', demandeur: 'Marie', objet: 'résumé', detail: 'detail operation'},
  {ticket: 7, etat: 'open', tech: 'Casimir', date: '24-11-2017', demandeur: 'Tom', objet: 'résumé', detail: 'detail operation'},
  {ticket: 8, etat: 'open', tech: '--', date: '24-11-2017', demandeur: 'Chris', objet: 'résumé', detail: 'detail operation'},
  {ticket: 9, etat: 'open', tech: '--', date: '24-11-2017', demandeur: 'Chris', objet: 'résumé', detail: 'detail operation'},
  {ticket: 10, etat: 'open', tech: '--', date: '24-11-2017', demandeur: 'Tom', objet: 'résumé', detail: 'detail operation'}
]
var headers = [
  {
    label: '',
    field: 'supprimer'
  },
  {
    label: 'Ticket',
    field: 'ticket',
    type: 'number'
  },
  {
    label: 'Etat',
    field: 'etat',
    type: 'checkbox'
  },
  {
    label: 'Affecté',
    field: 'tech'
  },
  {
    label: 'Date',
    field: 'date',
    type: 'date',
    inputFormat: 'DDMMYYYY'
  },
  {
    label: 'Demandeur',
    field: 'demandeur'
  },
  {
    label: 'Objet',
    field: 'objet'
  },
  {
    label: 'Detail',
    field: 'detail',
    showDetail: false
  },
  {
    label: 'Edition',
    field: 'edition'
  }
]

export default {
  components: {
    modal,
    edition
  },
  data () {
    return {
      msg: 'Ticketing App',
      columns: headers,
      rows: list,
      currentSort: list.ticket,
      currentSortWay: 'asc',
      page: 1,
      pageSize: 5,
      rechercher: '',
      colonne: '',
      showFilter: false,
      showDetail: false,
      isActive: false,
      rowActive: '',
      isModalVisible: false,
      isEditVisible: false,
      isChecked: [],
      ed: ''

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
      this.rowActive = ''
    },
    prev: function () {
      if (this.page > 1) this.page--
      this.rowActive = ''
    },
    setActive: function (row, index) {
      this.rowActive = index
      if (row && this.rowActive !== '') { this.isActive = !this.isActive }
      /* console.log(JSON.stringify(this.rowActive)) */
    },
    showModal: function () {
      this.isModalVisible = true
    },
    hideModal: function () {
      this.isModalVisible = false
    },
    showEdit: function (e) {
      this.isEditVisible = true
      this.ed = e
    },
    hideEdit: function () {
      this.isEditVisible = false
    },
    ...mapActions(['delInter'])
  },

  computed: {
    sortedRows: function () {
      var self = this
      return self.filteredRows.sort((a, b) => {
        let way = 1
        if (this.currentSortWay === 'desc') way = -1
        if (a[this.currentSort] < b[this.currentSort]) {
          return -1 * way
        }
        if (a[this.currentSort] > b[this.currentSort]) {
          return 1 * way
        }
        return 0
      })
        .filter((row, index) => {
          // first of the page
          let first = (this.page - 1) * this.pageSize
          // last of the page
          let end = this.page * this.pageSize
          // show if true
          if (index >= first && index < end) return true
        })
    },
    filteredRows: function () {
      let rows = this.$store.state.items
      if (this.rechercher) {
        rows = rows.filter((a) => {
          switch (this.colonne) {
            case 'etat':
              return a.etat.indexOf(this.rechercher) !== -1
            case 'date':
              return a.date.indexOf(this.rechercher) !== -1
            case 'tech':
              return a.tech.indexOf(this.rechercher) !== -1
            case 'demandeur':
              return a.demandeur.indexOf(this.rechercher) !== -1
            case 'objet':
              return a.objet.indexOf(this.rechercher) !== -1
            case 'detail':
              return a.detail.indexOf(this.rechercher) !== -1
          }
        })
      }
      return rows
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
