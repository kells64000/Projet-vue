<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
           role="dialog">
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            Nouvelle intervention
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
            <button type="button"  @click="addInter(item)">
              Valider
            </button>
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
      }
    }
  },
  name: 'modal',
  methods: {
    close () {
      this.$emit('close')
    },
    ...mapActions(['addInter'])
  },
  computed: {
    items () {
      return this.$store.state.items
    }
    /*    export default: {
      name: 'Modal',
      components: {
        Modal
      },
      data() {
        return {
          isModalVisible: false
        }
      },
      methods: {
        showModal() {
          this.isModalVisible = true;
        },
        closeModal() {
          this.isModalVisible = false;

}
}, */
  }
}
</script>

<style scoped>

</style>
