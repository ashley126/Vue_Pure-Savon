<template>
  <div>
    <div class="series">
      <ul>
        <li v-for="(item,key) in serieslist" :key="key" :class="{'active':item===currentChoice}" @click.prevent="changeChoice(item)">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Series',
  props: ['serieslist', 'currentChoice'],
  methods: {
    changeChoice (choice) {
      this.$emit('getSeries', choice)
    }
  }
}
</script>
