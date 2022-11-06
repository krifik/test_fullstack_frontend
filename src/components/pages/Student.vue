<template>
  <ModalInsert v-if="isModalInsertOpen"
               :isModalInsertOpen="isModalInsertOpen"
               @close="isModalInsertOpen = false"
               @reget-student="reget" />
  <div class="container flex justify-center mx-auto ">
    <div class="flex flex-col my-8">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div class="flex justify-items-center items-center shadow-lg space-x-2">
          <div class="flex-1 space-x-2">
            <button @click="openModalInsert"
                    class="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6 mb-1 py-2">
              <font-awesome-icon icon="fa-solid fa-plus ml-2" /><span>Add</span>
            </button>
            <span class="">Show</span>
            <select v-model="form.limit"
                    @change="limitEntries($event)"
                    class="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6 mb-1 py-2">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            <span class="">Entries</span>
            <span class="">Sort by</span>
            <select name="sortType"
                    id="sortType"
                    @change="orderBy($event)"
                    v-model="form.sortType"
                    class="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6 mb-1 py-2">
              <option value="name">Name</option>
              <option value="dob">Date Of Birth</option>
            </select>
            <span>Order</span>
            <select v-model="form.sortOrder"
                    @change="orderBy($event)"
                    class="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6 mb-1 py-2">
              <option value="desc">{{ form.sortType === 'name' ? 'A-Z' : 'Latest' }}</option>
              <option value="asc">{{ form.sortType === 'name' ? 'Z-A' : 'Oldest' }}</option>
            </select>
          </div>
          <input type="text"
                 @keypress="searchBy()"
                 v-model="form.searchKey"
                 class="rounded-lg bg-blue-500 text-white py-1 px-2 placeholder-white"
                 placeholder="Search">
          <button @click="logout"
                  class="bg-red-500 text-white rounded-lg px-2 py-1 hover:bg-red-600">
            <font-awesome-icon icon="fa-solid fa-right-to-bracket" /> Logout
          </button>
        </div>

        <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
          <StudentList :students="students"
                       @reget-students="reget" />
        </div>
      </div>
      <div v-if="students"
           class="flex space-x-2 mx-10 px-4 justify-center items-center">
        <button v-for="page, index in students.total_pages"
                :key="page"
                class=" text-white px-3 mt-2 py-2 "
                :class="[students.page === page ? 'bg-blue-800 ' : 'bg-blue-500 hover:bg-blue-600']"
                :disabled="students.page === page"
                @click="handlePage(page)">{{ page
                }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watchEffect } from "vue";
import StudentList from "../StudentList.vue"
import { useStudentStore } from "../../stores/student";
import { useRouter } from "vue-router";
import ModalInsert from "../ModalInsert.vue"
const form = ref({
  sortType: "name",
  sortOrder: "desc",
  limit: 5,
  searchKey: ""
})
const students = ref(null)
const studentStore = useStudentStore()
const router = useRouter()
studentStore.getAllDataStudent().then((res) => {
  students.value = studentStore.$state.students
})
const logout = () => {
  localStorage.removeItem("token")
  router.push({ name: "login" })
}
const isModalInsertOpen = ref(false)
const openModalInsert = () => {
  isModalInsertOpen.value = true
}
const orderBy = (e) => {
  studentStore.getAllDataStudentWithSort(form.value).then((res) => {
    students.value = studentStore.$state.students
  })
}
const handlePage = (page) => {
  studentStore.getAllDataStudentWithPage(page, form.value.limit).then((res) => {
    students.value = studentStore.$state.students
  })
}
const limitEntries = () => {
  studentStore.getAllDataStudentWithLimit(form.value.limit).then((res) => {
    students.value = studentStore.$state.students
  })
}
const reget = () => {
  studentStore.getAllDataStudentWithPage(students.value.page, form.value.limit).then((res) => {
    students.value = studentStore.$state.students
  })
}

function debounce(func, timeout = 500) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
      options.value = [];
    }, timeout);
  };
}
const searchBy = debounce(() => {
  studentStore.searchData(form.value.searchKey).then((res) => {
    students.value = studentStore.$state.students
  })
})



</script>

<style lang="scss" scoped>

</style>