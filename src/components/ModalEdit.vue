<template>
  <TransitionRoot appear
                  :show="isOpen"
                  as="template">
    <Dialog as="div"
            @close="$emit('close-modal')"
            class="relative z-10">
      <TransitionChild as="template"
                       enter="duration-300 ease-out"
                       enter-from="opacity-0"
                       enter-to="opacity-100"
                       leave="duration-200 ease-in"
                       leave-from="opacity-100"
                       leave-to="opacity-0">
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild as="template"
                           enter="duration-300 ease-out"
                           enter-from="opacity-0 scale-95"
                           enter-to="opacity-100 scale-100"
                           leave="duration-200 ease-in"
                           leave-from="opacity-100 scale-100"
                           leave-to="opacity-0 scale-95">
            <DialogPanel
                         class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3"
                           class="text-lg font-medium leading-6 text-gray-900">
                Edit Data Student
              </DialogTitle>
              <form @submit.prevent="updateStudentById(student.id)"
                    class="w-full max-w-sm mt-8">
                <div v-if="student"
                     class="md:flex md:items-center mb-6">
                  <div class="md:w-1/3">
                    <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-24"
                           for="inline-full-name">
                      Name
                    </label>
                  </div>
                  <div class="md:w-2/3">
                    <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                           id="inline-full-name"
                           type="text"
                           v-model="student.name">
                    <span> {{ validationError.name }} </span>
                  </div>
                </div>
                <div class="md:flex md:items-center mb-6">
                  <div class="md:w-1/3">
                    <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-24"
                           for="inline-password">
                      Gender
                    </label>
                  </div>
                  <div class="md:w-2/3 space-x-1">
                    <input class=" leading-tight"
                           v-model="student.gender"
                           value="M"
                           type="radio">
                    <span class="mr-2">M</span>
                    <input class=" leading-tight"
                           v-model="student.gender"
                           value="F"
                           type="radio">
                    <span>F</span>
                    <span> {{ validationError.gender }} </span>
                  </div>
                </div>
                <div class="md:flex md:items-center mb-6">
                  <div class="md:w-1/3">
                    <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-36"
                           for="inline-full-name">
                      DOB
                    </label>
                  </div>
                  <div class="md:w-2/3">
                    <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                           id="inline-full-name"
                           type="date"
                           v-model="parseDate">
                    <span> {{ validationError.date_of_birth }} </span>
                  </div>
                </div>
                <div class="md:flex md:items-center mb-6">
                  <div class="md:w-1/3">
                    <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-36"
                           for="inline-full-name">
                      Avatar
                    </label>
                  </div>
                  <div class="md:w-2/3">
                    <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                           id="inline-full-name"
                           type="file"
                           @change="uploadFile($event)">
                    <span class="text-red-500"> {{ validationError.avatar_url }} </span>
                  </div>
                  <img :src="`${student.avatar_url}`"
                       class="w-10"
                       alt=""
                       id="preview">
                </div>
                <div class="mt-4">
                  <button type="submit"
                          class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          :class="[isUpdate || validationError.date_of_birth === 'cannot be blank.' ? '':'         hover:bg-blue-200']"
                          :disabled="isUpdate || validationError.date_of_birth === 'cannot be blank.'">
                    Submit!
                  </button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { useStudentStore } from '../stores/student';
import dayjs from "dayjs"
import { useRouter } from 'vue-router';
const studentStore = useStudentStore()
const isOpen = ref(props.isModalEditOpen)
const props = defineProps({
  isModalEditOpen: Boolean,
  student_id: Number
})
const router = useRouter()
const emit = defineEmits(['close', 'close-modal'])
const student = ref(null)
const parseDate = ref(null)
onMounted(() => {
  student.value = studentStore.GET_STUDENT
  let date = new Date(student.value.date_of_birth)
  parseDate.value = dayjs(date).format("YYYY-MM-DD")
  student.value.date_of_birth = parseDate
})

const validationError = ref({
  name: "",
  gender: "",
  avatar_url: "",
  date_of_birth: ""
})
const file = ref(null)
const uploadFile = (e) => {
  let src = URL.createObjectURL(e.target.files[0])
  student.value.avatar_url = src
  file.value = e.target.files[0]
  let preview = document.getElementById("preview")
  preview.src = src
}
function IsEmptyOrWhiteSpace(str) {
  return (str.match(/^\s*$/) || []).length > 0;
}
watchEffect(() => {
  if (student.value) {
    if (IsEmptyOrWhiteSpace(student.value.date_of_birth.toString())) {
      validationError.value.date_of_birth = "cannot be blank."
    } else {
      validationError.value.date_of_birth = ""
    }
  }
})
const isUpdate = ref(false)
const updateStudentById = (student_id) => {
  isUpdate.value = true
  isOpen.value = false
  student.value.avatar_url = file.value
  studentStore.updateStudentById(student_id, student.value).then((res) => {
    emit("close-modal")
    isOpen.value = false
    studentStore.getAllDataStudent()
    router.push({ name: "student" })
    isUpdate.value = false
  }).catch((err) => {

    isUpdate.value = false
    if (err.response && err.response.data && err.response.data.code === 400) {
      let arr = err.response.data.data.split(";")
      // operation for splitting error validation data
      const result = arr.reduce((allNames, name) => {
        const key = name.split(":");
        const keyTrimmed = key[0].trim()
        const valTrimmed = key[1].trim()
        return {
          ...allNames,
          [keyTrimmed]: valTrimmed,
        };
      }, {});
      validationError.value.name = result.name
      validationError.value.gender = result.gender
      validationError.value.date_of_birth = result.date_of_birth
      validationError.value.avatar_url = result.avatar_url
    }
    if (err.response && err.response.data && err.response.data.code === 500) {
      validationError.value.avatar_url = "*Required"
    }
  })
}
function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}
const publicUrl = import.meta.env.VITE_PUBLIC_URL
</script>
