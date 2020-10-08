<template>
  <div>
    <!-- "!!" converts a truthy value into a real boolean -->
    <section>
      <base-dialog
        :show="!!error"
        title="An Error Occured!"
        @close="handleError"
      >
        <p>{{ error }}</p>
      </base-dialog>
      <CoachFilter @change-filter="setFilters" />
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh</base-button
          >
          <base-button link to="/auth?redirect=register" v-if="!isLoggedIn"
            >Login to register as a Coach</base-button
          >
          <base-button
            link
            to="'/register"
            v-if="isLoggedIn && !isCoach && !isLoading"
            >Register a Coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <BaseSpinner />
        </div>
        <ul v-else-if="hasCoaches">
          <CoachItem
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :areas="coach.areas"
            :rate="coach.hourlyRate"
          />
        </ul>
        <h3 v-else>No coaches found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem';
import CoachFilter from '../../components/coaches/CoachFilter';
export default {
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backened: true,
        career: true,
      },
    };
  },

  components: {
    CoachItem,
    CoachFilter,
  },

  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },

    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },

    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },

    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },

  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },

    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/LOAD_COACHES', {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong';
      }

      this.isLoading = false;
    },

    handleError() {
      this.error = null;
    },
  },

  created() {
    this.loadCoaches();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>