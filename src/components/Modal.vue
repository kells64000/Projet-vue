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
                <input type="text" v-model="demandeur"/>
              </label>
              <label>Resumé:
                <input type="text" v-model="objet"/>
              </label>
              <label>Description:
                <input type="text" v-model="detail"/>
              </label>
              <label>Affectation:
                <input type="text" v-model="tech"/>
              </label>
            </div>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <button type="button"  @click="close">
              Valider
            </button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>

</template>

<script>
export default {
  name: 'modal',
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

</style>
