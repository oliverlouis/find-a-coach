<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" fixed title="Authenticating...">
      <BaseSpinner />
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!formIsValid">
          Please enter a valid email and password. Password must be at least 6
          characters long
        </p>
        <base-button>{{ loginButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuth">{{
          switchModeButtonCaption
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },

  methods: {
    async submitForm() {
      //Form Validation
      this.formIsValid = true;
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;

      const actionPayload = {
        //payload refactored into a constant to DRY
        email: this.email,
        password: this.password,
      };

      //Dispatch Login or Sign Up actions
      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', actionPayload);
        } else {
          await this.$store.dispatch('SIGN_UP', actionPayload);
        }
      } catch (error) {
        this.error =
          error.message || 'Failed to authenticate. Try again later.';
      }

      this.isLoading = false;
    },

    switchAuth() {
      if (this.mode === 'login') {
        //Change authentication mode (login or sign up)
        this.mode = 'signup';
      } else if (this.mode === 'signup') {
        this.mode = 'login';
      }
    },

    handleError() {
      //Set this.error back to null so that modal disappears on click
      this.error = null;
    },
  },

  computed: {
    loginButtonCaption() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'Sign Up';
      }
    },

    switchModeButtonCaption() {
      if (this.mode === 'login') {
        return 'Sign up';
      } else {
        return 'Login';
      }
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>