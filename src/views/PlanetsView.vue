<script setup lang="ts">
import PlanetList from "../components/planet/PlanetList.vue";
import { getPlanet } from "../../service/api.service";

type Props = {
  page: string;
};

defineProps<Props>();
</script>

<template>
  <main>
    <PlanetList :page-id="page" />
  </main>
</template>
