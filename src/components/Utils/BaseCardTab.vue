<template>
  <div class="fs-14">
    <div class="custom-card-tabs my-3">
      <ul id="pills-tab" class="nav" role="tablist">
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          class="nav-item"
          role="presentation"
          @click="selectTab(index)"
        >
          <a
            :class="[index === selectedIndex ? 'active' : '']"
            class="nav-link text-capitalize pointer"
            data-toggle="pill"
            role="tab"
            aria-controls="pills-attendance"
            aria-selected="true"
            >{{ tab.title }}</a
          >
        </li>
        <div class="payable text-light font-weight-medium">
          Total payable amount: <span class="font-weight-bold fs-18">${{ amount }}</span> <span class="fs-18">USD</span>
      </div>
      </ul>
    </div>

    <div id="pills-tabContent" class="tab-content card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    amount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      selectedTab: 0,
      tabs: [],
    }
  },
  mounted() {
    this.tabs = this.$children
    const urlTab = this.checkUrlForTab()
    this.selectTab(urlTab)
  },
  methods: {
    selectTab(tabIndex) {
      this.selectedIndex = tabIndex
      // loop over all the tabs
      this.tabs.forEach((control, index) => {
        control.active = index === tabIndex
        if (index === tabIndex) {
          // debugger
          this.$emit('tab-selected',control.title);
        }
      })
      // console.log(this.tabs)
    },
    checkUrlForTab() {
      if (this.$route.query.tab) {
        return Number(this.$route.query.tab)
      }
      return 0
    },
  },
}
</script>

<style scoped>
.nav-link:hover {
  color: #25213B !important;
  border-bottom: 2px solid #25213B !important;
}
.nav {
  position: relative
}
.payable {
  position: absolute;
  right: 0;
  top: 10px;
}
</style>
