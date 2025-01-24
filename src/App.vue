<template>
  <div class="wrapper">
    <div class="wrapper-content">

      <section>
        <div class="container">
          <button @click="modalFirst = !modalFirst" class="btn btnPrimary">Show first modal</button>

          <modals 
            title="first modal"
            v-show="modalFirst"
            @close="modalFirst = false">
            <template v-slot:body>
              <p>text</p>
              <button @click="modalFirst = !modalFirst" class="btn btnPrimary">Well Done!</button>
            </template>
          </modals>

          <button @click="modalSecond.show = !modalSecond.show" class="btn btnPrimary">Show modal with form</button>
          <modals 
            title="Modal with form"
            v-show="modalSecond.show"
            @close="modalSecond.show = false">
            <template v-slot:body>
              <form @submit.prevent="submitSecondForm">
                <label>Name:</label>
                <input required type="text" v-model="modalSecond.name">
                <label>Email:</label>
                <input required type="email" v-model="modalSecond.email">
                <button class="btn btnPrimary">Submit!</button>
              </form>
            </template>
          </modals>

          <button @click="modalValidate = !modalValidate" class="btn btnPrimary">Show modal with form + validate</button>
          <modalValidate v-show="modalValidate" @close="modalValidate = false" />
        </div>
      </section>

    </div>
  </div>
</template>

<script>
import modals from '@/components/UI/Modal.vue'
import modalValidate from '@/components/ModalValidate.vue';
export default {
  components: {
    modals,
    modalValidate
  },
  data() {
    return {
      modalFirst: false,
      modalSecond: {
        show: false,
        name: '',
        email: ''
      },
      modalValidate: false
    }
  },
  methods: {
    submitSecondForm() {
      console.log({
        name: this.modalSecond.name,
        email: this.modalSecond.email
      })
      this.modalSecond.name = ''
      this.modalSecond.email = ''
      this.modalSecond.show = false
    }
  }
}
</script>

