<!-- eslint-disable vue/multi-word-component-names -->

<script lang="ts">
  import axios from "axios";
  import { APIURL } from "@/constants";
  import BookingForm from "../components/BookingForm.vue";

  export default {
    name: "Catalog",
    components: {
      BookingForm
    },
    data() {
      return {
        selectedCatalogId: undefined,
        displayBookingForm: false,
        catalog: []
      };
    },
    methods: {
      async getCatalog() {
        const { data } = await axios.get(`${APIURL}/catalog`);
        this.catalog = data;
      },
      book(catalogId: string) {
        this.selectedCatalogId = (catalogId as any);
        this.displayBookingForm = true;
      },
      displayMessage() {
        alert("Booking successful");
      }
    },
    beforeMount() {
      this.getCatalog();
    }
  };
</script>

<template>
	<Card v-for="c of (catalog as any)" :key="c.id">
		<template #header>
			<img :alt="c.description" :src="c.image_url" style="width: 400px; border-radius: 5px; object-fit: contain;" />
		</template>
		<template #title> {{ c.name }} </template>
		<template #content>
			{{ c.description }}
		</template>
		<template #footer>
			<Button icon="pi pi-check" label="Book" class="p-button-secondary" @click="book(c.id)" />
			<Dialog header="Create Booking" v-model:visible="displayBookingForm">
				<BookingForm
					@booking-form-close="
						displayBookingForm = false;
						displayMessage();
					"
					:selectedCatalogId="selectedCatalogId"
				/>
			</Dialog>
		</template>
	</Card>
</template>
