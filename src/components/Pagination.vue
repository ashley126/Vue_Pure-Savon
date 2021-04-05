<template>
  <div class="d-flex justify-content-center align-items-center">
    <ul class="pages">
      <li class="page" :class="{'disabled':!pages.has_pre}">
        <a class="pageNum" href="#"  @click.prevent="changepage(pages.current_page-1)">
          <span aria-hidden="true">&#60;</span>
        </a>
      </li>
      <li class="page" v-for="page in pages.total_pages" :key="page" :class="{'active':pages.current_page===page}">
        <a class="pageNum" href="#" @click.prevent="changepage(page)">{{ page }}</a>
      </li>
      <li class="page" :class="{'disabled':!pages.has_next}">
        <a class="pageNum" href="#"  @click.prevent="changepage(pages.current_page+1)">
          <span aria-hidden="true">&#62;</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pages'],
  methods: {
    changepage (page) {
      this.$emit('switchpage', page)
    }
  }
}
</script>
