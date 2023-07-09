<template>
  <div class="container">
    <UtilsBaseCardTab
      @tab-selected="handleOnSelectTab($event)"
      :amount="payable"
    >
      <div class="card border-0 shadow">
        <div class="d-flex align-items-center justify-content-between p-3">
          <div class="d-flex align-items-center">
            <div class="p-2 border-1 pointer" data-toggle="dropdown">
              <b-icon-funnel-fill class="text-primary"></b-icon-funnel-fill>
              <span class="text-blue mx-2">Filter</span>
            </div>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <div class="dropdown-header text-light fs-12">Sort By:</div>
              <a
                class="dropdown-item text-blue fs-14 pointer"
                @click.prevent="resetSort"
                >Default</a
              >
              <a
                class="dropdown-item text-blue fs-14 pointer"
                @click.prevent="sortByFirstName"
                >First Name</a
              >
              <a
                class="dropdown-item text-blue fs-14 pointer"
                @click.prevent="sortByLastName"
                >Last Name</a
              >
              <a
                class="dropdown-item text-blue pointer fs-14"
                @click.prevent="sortByEmail"
                >Email</a
              >
            </div>
            <div class="search-input">
              <input
                type="search"
                v-model="search"
                class="form-control search bg-primary mx-3 border-0"
                placeholder="Search Users by Name or Email"
              />
              <b-icon-search
                class="fs-20 search-icon text-primary"
              ></b-icon-search>
            </div>
          </div>
          <button class="btn-primary text-uppercase" @click.prevent="pay">
            Pay Dues
          </button>
        </div>
        <template v-for="(tab, index) in ['All', 'Paid', 'Unpaid', 'Overdue']">
          <UtilsCardTab :key="index" :title="tab">
            <b-table
              hover
              responsive
              selectable
              show-empty
              :selected.sync="selectedRow"
              :selected-variant="'primary'"
              :fields="fields"
              :items="data"
              class="custom-table"
              table-class="custom-table"
              @row-selected="onRowSelected"
            >
              <!-- select-mode="single" -->
              <template #head(checkbox)="data">
                <b-form-checkbox
                  style="padding-left: 10px"
                  ref="tableCheckbox"
                  v-model="selectAll"
                  @change="toggleSelectAll"
                >
                </b-form-checkbox>
              </template>
              <template #cell(checkbox)="rowData">
                <b-form-checkbox
                  style="padding-left: 10px"
                  ref="form-checkbox"
                  v-model="rowData.rowSelected"
                  @change="toggleRowSelection(rowData)"
                >
                </b-form-checkbox>
              </template>
              <template #cell(expand)="data">
                <b-icon-arrow-down-circle
                  class="text-primary"
                  @click="data.toggleDetails"
                >
                </b-icon-arrow-down-circle>
              </template>
              <template #row-details="data">
                <b-table
                  hover
                  show-empty
                  class="user-table"
                  :fields="fields2"
                  :items="data.item.details"
                >
                  <template #head(date)="data">
                    <div style="padding-left: 7rem">date</div>
                  </template>
                  <template #cell(date)="data">
                    <div style="padding-left: 7rem">{{ data.item.date }}</div>
                  </template>
                  <!-- <template #cell(user_activity)="data">
                <div>{{ data.item.details.user_activity }}</div>
              </template>
              <template #cell(details)="data">
                <div>{{ data.item.details.details }}</div>
              </template> -->
                </b-table>
              </template>
              <template #head(three_dots)="data">
                <b-icon-three-dots-vertical> </b-icon-three-dots-vertical>
              </template>
              <template #cell(three_dots)="data">
                <b-icon-three-dots-vertical> </b-icon-three-dots-vertical>
              </template>
              <template #cell(action)="data">
                <div class="text-capitalize fs-12 text-light">view more</div>
              </template>
              <template #cell(name)="data">
                <div class="text-capitalize fs-14 text-blue font-weight-medium">
                  {{ data.value }}
                </div>
                <div class="fs-14 text-light">{{ data.item.email }}</div>
              </template>
              <template #cell(amount)="data">
                <div class="text-right" style="width: 3.5rem">
                  <div
                    class="text-capitalize fs-14 text-blue font-weight-medium"
                  >
                    ${{ data.value }}
                  </div>
                  <div class="fs-14 text-light">USD</div>
                </div>
              </template>
              <template #cell(user_status)="data">
                <div style="width: 14rem">
                  <div
                    class="text-capitalize p-1 d-flex align-items-center justify-content-center"
                    :class="[data.value === 'active' ? 'active' : 'inactive']"
                  >
                    <b-icon-circle-fill class="fs-6"></b-icon-circle-fill>
                    <span class="fs-12 mx-1">{{ data.value }}</span>
                  </div>
                  <div class="fs-12 text-light font-weight-medium my-1">
                    Last login: {{ data.item.last_login }}
                  </div>
                </div>
              </template>
              <template #cell(payment_status)="data">
                <div
                  class="text-capitalize p-1 d-flex align-items-center justify-content-center"
                  :class="[
                    data.value === 'paid'
                      ? 'badge'
                      : data.value === 'unpaid'
                      ? 'unpaid'
                      : 'overdue',
                  ]"
                >
                  <b-icon-circle-fill class="fs-6"></b-icon-circle-fill>
                  <span class="fs-12 mx-1">{{ data.value }}</span>
                </div>
                <div class="fs-12 text-blue font-weight-medium my-1">
                  {{
                    data.value === "paid"
                      ? "Paid on "
                      : data.value === "unpaid"
                      ? "Dues on "
                      : "Dued on "
                  }}{{ data.item.payment_date }}
                </div>
              </template>
            </b-table>
          </UtilsCardTab>
        </template>
      </div>
    </UtilsBaseCardTab>
  </div>
</template>

<script>
import UtilsBaseCardTab from "../components/Utils/BaseCardTab.vue";
import UtilsCardTab from "../components/Utils/CardTab.vue";
import { mapGetters, mapActions } from "vuex";
import jsonData from "../assets/data.json";
export default {
  components: {
    UtilsBaseCardTab,
    UtilsCardTab,
  },
  data() {
    return {
      search: "",
      data: [],
      selectedTab: "",
      selected: [],
      selectAll: false,
      selectedRow: null,
      fields: [
        {
          key: "checkbox",
        },
        {
          key: "expand",
          label: "",
        },
        {
          key: "name",
        },
        {
          key: "user_status",
        },
        {
          key: "payment_status",
        },
        {
          key: "amount",
        },
        { key: "action", label: "", sortable: false },
        { key: "three_dots", label: "", sortable: false },
      ],
      fields2: [{ key: "Date" }, { key: "user_activity" }, { key: "details" }],
    };
  },
  computed: {
    ...mapGetters(["getData"]),
    paid() {
      return this.getData.filter((el) => el.payment_status === "paid");
    },
    unpaid() {
      return this.getData.filter((el) => el.payment_status === "unpaid");
    },
    overdue() {
      return this.getData.filter((el) => el.payment_status === "overdue");
    },
    payable() {
      const due = this.getData.filter((el) => el.payment_status !== "paid");
      const payableSum = due.reduce((acc, el) => acc + Number(el.amount), 0);
      return Number(payableSum.toFixed(2));
    },
  },
  watch: {
    search(val) {
      if (val === "") {
        this.data =
          this.selectedTab === "Paid"
            ? this.paid
            : this.selectedTab === "Unpaid"
            ? this.unpaid
            : this.selectedTab === "Overdue"
            ? this.overdue
            : this.getData;
      } else {
        const filteredResult = this.data.filter(
          (el) =>
            el.name.toLowerCase().includes(val) ||
            el.email.toLowerCase().includes(val)
        );
        this.data = filteredResult;
      }
    },
  },
  mounted() {
    this.setTableData();
    this.data = this.getData;
  },
  methods: {
    ...mapActions(["setTableData"]),
    onRowSelected(item) {
      this.selected = item;
      console.log(item);
    },
    resetSort() {
      this.data =
        this.selectedTab === "Paid"
          ? this.paid
          : this.selectedTab === "Unpaid"
          ? this.unpaid
          : this.selectedTab === "Overdue"
          ? this.overdue
          : this.getData;
    },
    sortByFirstName() {
      const sortedData = [...this.data];
      sortedData.sort((a, b) => {
        const [aFirstName, aLastName] = a.name.split(" ");
        const [bFirstName, bLastName] = b.name.split(" ");

        if (aFirstName === bFirstName) {
          return aLastName.localeCompare(bLastName);
        } else {
          return aFirstName.localeCompare(bFirstName);
        }
      });
      this.data = sortedData;
    },
    sortByLastName() {
      const sortedData = [...this.data];
      sortedData.sort((a, b) => {
        const [aFirstName, aLastName] = a.name.split(" ");
        const [bFirstName, bLastName] = b.name.split(" ");

        if (aLastName === bLastName) {
          return aFirstName.localeCompare(bFirstName);
        } else {
          return aLastName.localeCompare(bLastName);
        }
      });
      this.data = sortedData;
    },
    sortByEmail() {
      const sortedData = [...this.data];
      sortedData.sort((a, b) => {
        const emailA = a.email.toLowerCase();
        const emailB = b.email.toLowerCase();
        return emailA.localeCompare(emailB);
      });
      this.data = sortedData;
    },
    toggleSelectAll() {
      this.data.forEach((item) => {
        item.rowSelected = this.selectAll;
      });
    },
    toggleRowSelection(rowData) {
      this.selectedRow = rowData.rowSelected ? rowData.item : null;
    },
    pay() {
      if (this.selected) {
        this.selected.forEach((el) => {
          el.payment_status = "paid";
        });
      }
    },
    handleOnSelectTab(e) {
      this.selectedTab = e;
      if (e === "All") {
        this.data = this.getData;
      }
      if (e === "Paid") {
        this.data = this.paid;
      }
      if (e === "Unpaid") {
        this.data = this.unpaid;
      }
      if (e === "Overdue") {
        this.data = this.overdue;
      }
    },
  },
};
</script>
<style scoped>
.search {
  height: 40px;
  width: 392px;
}
.search::placeholder {
  font-size: 12px;
}
.badge {
  border-radius: 10px;
  width: 50px;
  background: #cdffcd;
  color: #007f00;
}
.overdue {
  border-radius: 10px;
  width: 71px;
  background: #ffe0e0;
  color: #d30000;
}
.unpaid {
  border-radius: 10px;
  width: 62px;
  background: #ffeccc;
  color: #965e00;
}
.active {
  border-radius: 10px;
  width: 60px;
  background: #e6e6f2;
  color: #4a4aff;
}
.inactive {
  border-radius: 10px;
  width: 65px;
  background: #f2f0f9;
  color: #6e6893;
}
.search-input {
  position: relative;
}
.search-input input {
  padding-left: calc(20px + 10px + 0.4rem);
}
.search-icon {
  position: absolute;
  top: 50%;
  left: 25px;
  transform: translateY(-50%) !important;
}
.dropdown-item:hover {
  background: #f2f0f9 !important;
}
</style>
