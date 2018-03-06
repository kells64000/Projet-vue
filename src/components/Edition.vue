<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
           role="dialog">
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            Edition
            <button type="button" class="btn-close" @click="close">
              x
            </button>
          </slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <div>
              <label>Demandeur:
                <input type="text" v-model="item.demandeur"/>
              </label>
              <label>Resumé:
                <p>
                <input type="text" v-model="item.objet"/>
                </p>
              </label>
              <label>Description:
                <input type="text" v-model="item.detail"/>
              </label>
              <label>Affectation:
                <input type="text" v-model="item.tech"/>
              </label>
            </div>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
          </slot>
        </footer>
      </div>
    </div>
  </transition>

</template>

<script>
import { mapActions } from 'vuex'

let etat = 'open'
let date = new Date()

export default {
  props: ['details'],
  data () {
    return {
      item: {
        ticket: '',
        etat: etat,
        tech: '',
        date: date,
        demandeur: '',
        objet: '',
        detail: ''
      },
      row: ''
    }
  },
  watch: {
    details () {
      this.item = this.details
      console.log(this.details)
    }
  },
  methods: {
    ...mapActions(['editInter']),
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

</style>
