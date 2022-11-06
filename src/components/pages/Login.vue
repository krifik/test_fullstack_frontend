<template>
  <div>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <div class="flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg"
               class="w-20 h-20 text-blue-600"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor">
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path
                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-center">Login to your account</h3>
        <div v-if="isMessageError"
             class="flex bg-red-300 rounded-sm">
          <h3 class="flex-auto text-l font-normal text-center">{{ validationError.message }}</h3>
          <button @click="closeMessageError"
                  class="flex-none pr-1">
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
        </div>
        <form @submit.prevent="login">
          <div class="mt-4">
            <div>
              <label class="block"
                     for="email">Email</label>
              <input type="text"
                     v-model="form.email"
                     placeholder="Email"
                     class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
              <span class="text-xs tracking-wide text-red-600"
                    v-if="validationError.password !== ''"> {{ validationError && "Email " + validationError.email
                    }}
              </span>
            </div>
            <div class="mt-4">
              <label class="block">Password</label>
              <input type="password"
                     v-model="form.password"
                     placeholder="Password"
                     class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
              <span class="text-xs tracking-wide text-red-600"
                    v-if="validationError.password !== ''"> {{ "Password " +
                        validationError.password
                    }}
              </span>
            </div>
            <div class="flex items-baseline justify-between">

              <button type="submit"
                      class="px-6 py-2 mt-4 text-white  rounded-lg hover:bg-blue-900"
                      :class="[isLogin ? 'bg-blue-900' : 'bg-blue-600']"
                      :disabled="isLogin">
                <font-awesome-icon :class="[isLogin ? '' : 'hidden']"
                                   icon="fa-solid fa-circle-notch"
                                   class="animate-spin mr-1" />{{ isLogin ? "Processing..." : "Login" }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from "../../stores/auth"
import { useRouter } from "vue-router"
const router = useRouter()
const authStore = useAuthStore()
const form = ref({
  email: "",
  password: ""
})
const validationError = ref({
  email: "",
  password: "",
  message: ""
})
const isLogin = ref(false)
const isMessageError = ref(false)
const closeMessageError = () => {
  isMessageError.value = !isMessageError.value
}
const login = () => {
  isLogin.value = true

  authStore.login(form.value).then((res) => {
    router.push({ name: "student" })
    localStorage.setItem("token", res.data.token)
  }).catch((err) => {
    if (err.response && err.response.data && err.response.data.data) {
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
      validationError.value.email = result.email
      validationError.value.password = result.password
      validationError.value.message = err.response.data.message
      isMessageError.value = !isMessageError.value
      setTimeout(() => {
        isMessageError.value = false
      }, 4000)
    }
  })
}
</script>

<style lang="scss" scoped>

</style>