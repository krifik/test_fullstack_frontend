<template>
  <div class="overflow-y">
    <ModalAlertSuccess v-if="isModalAlertOpen"
                       :isModalAlertOpen="isModalAlertOpen" />
    <ModalEdit v-if="isModalEditOpen"
               :isModalEditOpen="isModalEditOpen"
               @close="isModalEditOpen = false" />
    <table class="md:w-full w-full lg:w-full h-10 table-fixed overflow-y-scroll">
      <thead>
        <tr>
          <th
              class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
            #</th>
          <th
              class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
            Avatar</th>
          <th
              class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
            Name</th>
          <th
              class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
            Gender</th>
          <th
              class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
            Date Of Birth</th>
          <th
              class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
            Actions</th>
        </tr>
      </thead>

      <tbody v-if="students"
             class="bg-white">
        <tr v-for="student, index in students.data"
            :key="student.id">

          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            <div class="text-sm leading-5 text-gray-500">{{ students.page > 1 ? index + 1 +
                (students.limit * students.page - students.limit) : index + 1
            }}</div>
          </td>

          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            <div class="flex items-center">
              <div class="flex-shrink-0 w-10 h-10">
                <img class="w-10 h-10 rounded-full"
                     :src="`${student.avatar_url}`"
                     alt="Avatar">
              </div>

              <div class="ml-4">
                <div class="text-sm font-medium leading-5 text-gray-900">
                </div>
              </div>
            </div>
          </td>

          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            <div class="text-sm leading-5 text-gray-500">{{ student.name }}</div>
          </td>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            <span class="inline-flex px-2 text-xl font-semibold leading-5 rounded-full"
                  :class="[student.gender === 'M' ? 'text-green-800 bg-green-100' : 'text-pink-800 bg-pink-100']">{{
                      student.gender
                  }}</span>
          </td>

          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            <div class="text-sm leading-5 text-gray-500">{{ dayjs(student.date_of_birth).format('D MMMM YYYY') }}</div>
          </td>
          <td class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
            <div class="flex space-x-2">
              <button>
                <svg @click="deleteById(student.id)"
                     xmlns="http://www.w3.org/2000/svg"
                     class="w-6 h-6 text-red-400"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <button @click="openModalEdit(student.id)">
                <svg xmlns="http://www.w3.org/2000/svg"
                     class="w-6 h-6 text-blue-400"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup>
import { onMounted, reactive, computed, ref, onUpdated, watchEffect } from "vue"
import { useStudentStore } from "../stores/student"
import dayjs from "dayjs"
import { useRouter } from "vue-router";
import ModalAlertSuccess from "./ModalAlertSuccess.vue";
import ModalEdit from "./ModalEdit.vue"
// const props = defineProps({
//   students: {}
// })
const emit = defineEmits(["regetStudents"])
// watchEffect(() => {
//   props.students
// })
const studentStore = useStudentStore()
const students = computed(() => studentStore.GET_STUDENTS)
const isModalAlertOpen = ref(false)
const isModalEditOpen = ref(false)
const router = useRouter()
const deleteById = (id) => {
  studentStore.deleteStudentById(id).then((res) => {
    emit("regetStudents")
    isModalAlertOpen.value = true
    setTimeout(() => {
      isModalAlertOpen.value = false
    }, 5000)
  })
}
const openModalEdit = (id) => {
  studentStore.getStudentById(id).then((res) => {
    isModalEditOpen.value = true

  })
}
</script>

<style lang="scss" scoped>

</style>