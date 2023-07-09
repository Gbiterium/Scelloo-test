<template>
  <div v-if="active" class="" role="" aria-labelledby="pills-class-board-tab">
    <slot>
      <h1>Hello Tabs</h1>
    </slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      active: false,
    }
  },
})
</script>

<style scoped></style>
