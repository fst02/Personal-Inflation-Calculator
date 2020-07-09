<template>
  <div class="w-50 mx-auto">
    <b-form @submit.prevent="register">
      <h1>Regisztráció</h1>
      <b-alert show variant="danger" v-if="error">{{ $t("validationErrors.general")}}</b-alert>
      <b-form-group label="Felhasználónév">
        <b-form-input type="text" v-model="user.nickname" @input="$v.user.nickname.$touch()" />
        <b-alert show variant="danger" v-if="getFieldBackendError('nickname')">
          {{ $t("validationErrors.nickname") }}
        </b-alert>
        <div v-if="$v.user.nickname.$dirty">
          <b-alert show variant="danger" v-if="!$v.user.nickname.required">
            Felhasználónév megadása kötelező
          </b-alert>
          <b-alert show variant="danger" v-if="!$v.user.nickname.minLength">
            A felhasználónévnek legalább 3 karakter hosszúnak kell lennie
          </b-alert>
        </div>
      </b-form-group>
      <b-form-group label="Email">
        <b-form-input type="email" v-model="user.email" @input="$v.user.email.$touch()" />
        <b-alert show variant="danger" v-if="getFieldBackendError('email')">
          {{ $t("validationErrors.email") }}
        </b-alert>
        <div v-if="$v.user.email.$dirty">
          <b-alert show variant="danger" v-if="!$v.user.email.required" >
            Email megadása kötelező
          </b-alert>
          <b-alert show variant="danger" v-if="!$v.user.email.email">
            Érvényes email cím megadása kötelező
          </b-alert>
        </div>
      </b-form-group>

      <b-form-group label="Jelszó">
        <b-form-input type="password" v-model="user.password" @input="$v.user.password.$touch()" />
        <div v-if="$v.user.password.$dirty">
          <b-alert show variant="danger" v-if="!$v.user.password.required">
            Jelszó megadása kötelező
          </b-alert>
          <b-alert show variant="danger" v-if="!$v.user.password.minLength">
            A jelszónak legalább 6 karakter hosszúnak kell lennie
          </b-alert>
        </div>
      </b-form-group>

      <b-form-group label="Jelszó ismétlés">
        <b-form-input type="password" v-model="repeatPassword"
        @input="$v.repeatPassword.$touch()" />
        <div v-if="$v.repeatPassword.$dirty">
          <b-alert show variant="danger" v-if="!$v.repeatPassword.required">
            Jelszó ismétlés megadása kötelező
          </b-alert>
          <b-alert show variant="danger" v-if="!$v.repeatPassword.sameAsPassword">
            A két jelszónak egyeznie kell
          </b-alert>
        </div>
      </b-form-group>
      <div class="text-right">
        <b-button variant="outline-success" type="submit" class="mr-2">Regisztráció</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios';
import {
  required,
  minLength,
  email,
  sameAs,
} from 'vuelidate/lib/validators';
import UserDto from '../dtos/UserDto';

export default {
  name: 'Registration',
  data: () => ({
    user: new UserDto(),
    repeatPassword: '',
    file: null,
    error: null,
  }),
  validations: {
    user: {
      nickname: { required, minLength: minLength(3) },
      email: { required, email },
      password: { required, minLength: minLength(6) },
    },
    repeatPassword: {
      required,
      sameAsPassword: sameAs(function getPassword() { return this.user.password; }),
    },
  },
  methods: {
    getFieldBackendError(field) {
      return this.error?.errors?.find((error) => error.path === field);
    },
    async register() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      try {
        await axios.post(
          `${process.env.VUE_APP_API_ENDPOINT}/registration`,
          this.user,
        );
        this.$router.push('/signin?success=true');
      } catch (err) {
        this.error = err.response.data;
      }
    },
  },
};
</script>
