<template>
  <modal title="Modal with form" @close="onClose">
    <template v-slot:body>
      <form @submit.prevent="onSubmit">
        <!-- Name -->
        <div class="form-item" :class="{ errorInput: validation.name.$error }">
          <label>Name:</label>
          <p class="errorText" v-if="validation.name.$error && !validation.name.$pending && !form.name">
            Field is required!
          </p>
          <p class="errorText" v-else-if="validation.name.$error && !validation.name.$pending && form.name.length < 4">
            Name must have at least 4 characters!
          </p>
          <input
            v-model="form.name"
            :class="{ error: validation.name.$error }"
            @blur="validation.name.$touch()"
          />
        </div>

        <!-- Email -->
        <div class="form-item" :class="{ errorInput: validation.email.$error }">
          <label>Email:</label>
          <p class="errorText" v-if="validation.email.$error && !validation.email.$pending && !form.email">
            Field is required!
          </p>
          <p class="errorText" v-else-if="validation.email.$error && !validation.email.$pending">
            Email is not correct!
          </p>
          <input
            v-model="form.email"
            :class="{ error: validation.email.$error }"
            @blur="validation.email.$touch()"
          />
        </div>

        <!-- Password -->
        <div class="form-item" :class="{ errorInput: validation.password.$error }">
          <label>Password:</label>
          <p class="errorText" v-if="validation.password.$error && !validation.password.$pending && !form.password">
            Field is required!
          </p>
          <p class="errorText" v-else-if="validation.password.$error && !validation.password.$pending && form.password.length < 6">
            Password must have at least 6 characters!
          </p>
          <input
            v-model="form.password"
            type="password"
            :class="{ error: validation.password.$error }"
            @blur="validation.password.$touch()"
          />
        </div>

        <!-- Confirm Password -->
        <div class="form-item" :class="{ errorInput: validation.confirmPassword.$error }">
          <label>Confirm Password:</label>
          <p class="errorText" v-if="validation.confirmPassword.$error && !validation.confirmPassword.$pending && form.confirmPassword !== form.password">
            Passwords must match!
          </p>
          <input
            v-model="form.confirmPassword"
            type="password"
            :class="{ error: validation.confirmPassword.$error }"
            @blur="validation.confirmPassword.$touch()"
          />
        </div>

        <button class="btn btnPrimary" :disabled="validation.$invalid">Submit!</button>
      </form>
    </template>
  </modal>
</template>

<script>
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, email, sameAs } from "@vuelidate/validators";
import modal from "@/components/UI/Modal.vue";

export default {
  components: { modal },
  setup(_, { emit }) {
    // Реактивное состояние формы
    const form = reactive({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    // Валидация с использованием Vuelidate
    const rules = {
      name: { required, minLength: minLength(4) },
      email: { required, email },
      password: { required, minLength: minLength(6) },
      confirmPassword: {
        required,
        sameAsPassword(value) {
          return value === form.password;
        }
      },
    };

    const validation = useVuelidate(rules, form);

    // Обработка отправки формы
    const onSubmit = () => {
      validation.value.$touch(); // Помечаем все поля как "проверенные"
      if (!validation.value.$invalid && form.confirmPassword === form.password) {
        // Если форма валидна и пароли совпадают
        console.log("Form Submitted Successfully:", {
          name: form.name,
          email: form.email,
          password: form.password,
        });

        resetForm(); // Сбрасываем форму
        emit("close"); // Закрываем модальное окно
      }
    };

    // Сброс формы
    const resetForm = () => {
      form.name = "";
      form.email = "";
      form.password = "";
      form.confirmPassword = "";
      validation.value.$reset(); // Сбрасываем состояние валидации
    };

    // Закрытие модального окна
    const onClose = () => {
      resetForm();
      emit("close");
    };

    return { form, validation, onSubmit, onClose };
  },
};
</script>

<style lang="scss">
.form-item .errorText {
  display: none;
  margin-bottom: 8px;
  font-size: 13.4px;
  color: red;
}
.form-item {
  &.errorInput .errorText {
    display: block;
  }
}
input.error {
  border-color: red;
}
</style>
