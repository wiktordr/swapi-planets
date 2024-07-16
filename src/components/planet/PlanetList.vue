<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { getPlanetsPage, type Planet } from "../../service/api.service";
import { useRouter, onBeforeRouteUpdate } from "vue-router";
import PlanetCard from "./PlanetCard.vue";

type Props = {
  pageId: string | null;
};

const props = defineProps<Props>();

const router = useRouter();

const planets = ref<Planet[]>([]);
const currentPage = ref<string>(props.pageId || "1");
const totalItems = ref<number>(1);
const searchQuery = ref<string>("");
const sortKey = ref<keyof Planet>("name");

const fetchPlanets = async (page: string = "1", searchValue?: string) => {
  const response = await getPlanetsPage(page, searchValue);

  planets.value = response.data.results;
  totalItems.value = response.data.count;
};

const onSearchPlanets = async (value: string) => {
  await fetchPlanets("1", value);
  currentPage.value = "1";
};

const sortedPlanets = computed(() => {
  return planets.value.sort((a: Planet, b: Planet) => {
    if (sortKey.value === "population" || sortKey.value === "rotation_period") {
      return Number(a[sortKey.value]) - Number(b[sortKey.value]);
    }

    return a[sortKey.value].localeCompare(b[sortKey.value]);
  });
});

const onPageChange = (page: number) => {
  router.push({
    name: "planet-list",
    params: {
      page: page,
    },
  });
};

onBeforeRouteUpdate(async (to) => {
  await fetchPlanets(to.params.page as string, searchQuery.value);
});

onMounted(() => {
  fetchPlanets(currentPage.value);
});
</script>

<template>
  <div class="planet-list">
    <div class="planet-list__settings">
      <el-input
        v-model="searchQuery"
        class="planet-list__settings-item"
        placeholder="Search for planets"
        @input="onSearchPlanets"
      />

      <el-select
        v-model="sortKey"
        class="planet-list__settings-item"
        placeholder="Sort by"
      >
        <el-option value="name" :label="'Name'" />
        <el-option value="population" :label="'Population'" />
        <el-option value="rotation_period" :label="'Rotation Period'" />
      </el-select>
    </div>

    <div class="planet-list__cards" v-if="planets">
      <PlanetCard
        v-for="planet in sortedPlanets"
        :key="planet.name"
        :planet="planet"
      />
    </div>

    <div class="planet-list__loading" v-else>Loading data...</div>

    <el-pagination
      :default-current-page="parseInt(currentPage)"
      size="small"
      background
      layout="prev, pager, next"
      :total="totalItems"
      class="planet-list__pagination"
      @change="onPageChange"
    />
  </div>
</template>

<style lang="scss" scoped>
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.planet-list {
  &__settings {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;

    @media (max-width: 900px) {
      flex-direction: column;
    }

    &-item {
      max-width: 15rem;
      margin-bottom: 1rem;
    }
  }

  &__cards {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(3, 1fr);

    @media (max-width: 900px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 540px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  &__loading {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 500;

    animation: blink 2s infinite;
  }

  &__pagination {
    justify-content: center;
    margin-top: 1.5rem;
  }
}
</style>
