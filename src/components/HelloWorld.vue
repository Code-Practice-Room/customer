<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div>
    搜尋:
    <Input v-model="key" placeholder="搜尋姓名" style="width: 300px"></Input>
    每頁數量:
    <Select v-model="perpage" style="width: 200px">
      <Option v-for="item in pageTotal" :value="item" :key="item">{{
        item
      }}</Option>
    </Select>
    <Table border :columns="columns12" :data="filterData">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button
          type="primary"
          size="small"
          style="margin-right: 5px"
          @click="show(index)"
          >View</Button
        >
        <Button type="error" size="small" @click="remove(index)">Delete</Button>
      </template>
    </Table>
    <Page :total="pageTotal" :page-size="perpage" @on-change="pageChange" />
  </div>
</template>
<script>
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
export default {
  data() {
    return {
      key: null,
      pageTotal: 0, // 總頁數
      currentPage: 1, // 目前頁數
      perpage: 2, // 每頁數量
      columns12: [
        {
          title: "Name",
          slot: "name",
        },
        {
          title: "Age",
          key: "age",
        },
        {
          title: "Address",
          key: "address",
        },
        {
          title: "Action",
          slot: "action",
          width: 150,
          align: "center",
        },
      ],
      data6: [],
    };
  },
  computed: {
    filterData: {
      get() {
        return this.data6.filter((row, index) => {
          let start = (this.currentPage - 1) * this.perpage;
          let end = this.currentPage * this.perpage;
          if (index >= start && index < end) return true;
        });
      },
      set(val) {
        this.change();
        console.log(val);
      },
    },
  },
  methods: {
    change() {
      this.perpage = this.filterData.length;
    },
    show(index) {
      this.$Modal.info({
        title: "User Info",
        content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`,
      });
    },
    remove(index) {
      this.data6.splice(index, 1);
    },
    init() {
      let mock = new MockAdapter(axios);
      mock.onGet("/data").reply(200, {
        data: [
          {
            name: "John Brown",
            age: 18,
            address: "New York No. 1 Lake Park",
          },
          {
            name: "Jim Green",
            age: 24,
            address: "London No. 1 Lake Park",
          },
          {
            name: "Joe Black",
            age: 30,
            address: "Sydney No. 1 Lake Park",
          },
          {
            name: "Jon Snow",
            age: 26,
            address: "Ottawa No. 2 Lake Park",
          },
        ],
      });

      axios.get("/data").then((response) => {
        this.data6 = response.data.data;
        this.pageTotal = this.data6.length;
        // console.log(response.data.data);
      });
    },
    pageChange(page) {
      this.currentPage = page;
      // console.log(page);
    },
  },
  mounted() {
    this.init();
  },
};
</script>
