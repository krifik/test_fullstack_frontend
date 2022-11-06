<template>
  <TransitionRoot appear
                  :show="isOpen"
                  as="template">
    <Dialog as="div"
            @close="closeModal"
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
                Add Data Student
              </DialogTitle>
              <form @submit.prevent="storeDataStudent"
                    class="w-full max-w-sm mt-8">
                <div class="md:flex md:items-center mb-6">
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
                           v-model="form.name">
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
                           v-model="form.gender"
                           value="M"
                           type="radio">
                    <span class="mr-2">M</span>
                    <input class=" leading-tight"
                           v-model="form.gender"
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
                           v-model="form.date_of_birth">
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
                </div>
                <div class="mt-4">
                  <button type="submit"
                          class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          :disabled="isStore">
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
import { ref, watchEffect } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { useStudentStore } from '../stores/student';

const isOpen = ref(props.isModalInsertOpen)
const props = defineProps({
  isModalInsertOpen: Boolean
})
const form = ref({
  name: "",
  gender: "",
  avatar_url: "",
  date_of_birth: ""
})
const validationError = ref({
  name: "",
  gender: "",
  avatar_url: "",
  date_of_birth: ""
})
function closeModal() {
  isOpen.value = false
}
const uploadFile = (e) => {
  form.value.avatar_url = e.target.files[0]
}
function IsEmptyOrWhiteSpace(str) {
  return (str.match(/^\s*$/) || []).length > 0;
}
watchEffect(() => {
  if (IsEmptyOrWhiteSpace(form.value.date_of_birth.toString())) {
    validationError.value.date_of_birth = "cannot be blank."
  } else {
    validationError.value.date_of_birth = ""
  }
})
const emit = defineEmits(['regetStudent'])
const studentStore = useStudentStore()
const isStore = ref(false)
const storeDataStudent = () => {
  isStore.value = true
  studentStore.storeDataStudent(form.value).then((res) => {
    emit("regetStudent")
    isOpen.value = false
    emit("close")
    isStore.value = false


  }).catch((err) => {
    isStore.value = false
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
      validationError.value.avatar_url = ""
    }
    if (err.response && err.response.data && err.response.data.code === 500) {
      validationError.value.avatar_url = "*Required"
    }
  })
}
function openModal() {
  isOpen.value = true
}
</script>
