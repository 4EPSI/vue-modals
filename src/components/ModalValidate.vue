<template>
  <modal
    title="Modal with form" 
    @close="$emit('close')">
    <template v-slot:body>
      <form @submit.prevent="">
        <label>Name:</label>
        <input required type="text">
        <label>Email:</label>
        <input required type="email">
        <button class="btn btnPrimary">Submit!</button>
      </form>
    </template>
  </modal>
</template>

<script>
  import modal from '@/components/UI/Modal.vue'
  export default {
    components: {
      modal
    }
  }
</script>