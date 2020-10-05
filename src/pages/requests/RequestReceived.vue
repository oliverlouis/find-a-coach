<template>
  <section>
    <base-dialog :show="!!error" title="An Error Occured!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-card>
      <header>
        <h2>Requests Received</h2>
        <BaseSpinner v-if="isLoading" />
        <ul v-else-if="hasRequests && !isLoading">
          <RequestItem
            v-for="request in receivedRequests"
            :key="request.id"
            :email="request.userEmail"
            :message="request.message"
          />
        </ul>
        <h3 v-else>You haven't received any requests yet.</h3>
      </header>
    </base-card>
  </section>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem';
export default {
  components: {
    RequestItem,
  },

  data() {
    return {
      isLoading: false,
      error: null,
    };
  },

  computed: {
    receivedRequests() {
      return this.$store.getters['requests/requests'];
    },

    hasRequests() {
      return this.$store.getters['requests/hasRequests'];
    },
  },

  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('requests/FETCH_REQUESTS');
      } catch (error) {
        this.error = error.message || 'Failed to fetch requests.';
      }
      this.isLoading = false;
    },

    handleError() {
      this.error = null;
    },
  },

  created() {
    this.loadRequests();
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>