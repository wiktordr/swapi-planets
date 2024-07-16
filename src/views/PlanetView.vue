<script setup lang="ts">
import PlanetDetails from "../components/planet/PlanetDetails.vue";

type Props = {
  id: string;
};

defineProps<Props>();
</script>

<template>
  <main>
    <PlanetDetails :planet-id="id" />
  </main>
</template>
