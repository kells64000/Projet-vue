<template>
  <div>
    <h2>{{msg}}</h2>
    <div>
      <table>
        <thead>
        <tr>
          <td id="example-1" v-for="column in columns">
              {{ column.field }}
          </td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in rows">
          <td id="example-2" v-for="col in row">
            {{ col}}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
export default {
  demandeur: 'Ticketing',

  data () {
    return {
      msg: 'Ticketing App',
      columns: [
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
      ],
      rows: [
        {ticket: 1, date: '24-11-2017', demandeur: 'Tom', objet: 'objet', detail: 'detail operation'},
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

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
