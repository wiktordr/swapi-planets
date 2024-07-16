<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getPlanet, type Planet } from '../../service/api.service';
import { simpleDateFormat } from "../../helper/date-time.helper";

const route = useRoute();
const planet = ref<Planet | null>(null);

const fetchPlanetDetails = async (id: string) => {
  const response = await getPlanet(id);
  planet.value = response.data;
};

onMounted(() => {
  const id = route.params.id as string;
  fetchPlanetDetails(id);
});
</script>

<template>
  <div v-if="planet" class="planet-detail">
    <h1 class="planet-detail__header">{{ planet.name }}</h1>
    <div class="planet-detail__info">
      <p class="planet-detail__info-text">
        <span class="planet-detail__info-text-label">Population:</span>
        <span class="planet-detail__info-text-value">{{ planet.population }}</span>
      </p>
      <p class="planet-detail__info-text">
        <span class="planet-detail__info-text-label">Rotation Period:</span>
        <span class="planet-detail__info-text-value">{{ planet.rotation_period }}</span>
      </p>
      <p class="planet-detail__info-text">
        <span class="planet-detail__info-text-label">Climate:</span>
        <span class="planet-detail__info-text-value">{{ planet.climate }}</span>
      </p>
      <p class="planet-detail__info-text">
        <span class="planet-detail__info-text-label">Gravity:</span>
        <span class="planet-detail__info-text-value">{{ planet.gravity }}</span>
      </p>
      <p class="planet-detail__info-text">
        <span class="planet-detail__info-text-label">Terrain:</span>
        <span class="planet-detail__info-text-value">{{ planet.terrain }}</span>
      </p>
      <p class="planet-detail__info-text">
        <span class="planet-detail__info-text-label">Surface Water:</span>
        <span class="planet-detail__info-text-value">{{ planet.surface_water }}</span>
      </p>
      <p class="planet-detail__info-text">
        <span class="planet-detail__info-text-label">Orbital Period:</span>
        <span class="planet-detail__info-text-value">{{ planet.orbital_period }}</span>
      </p>
      <p class="planet-detail__info-text">
        <span class="planet-detail__info-text-label">Diameter:</span>
        <span class="planet-detail__info-text-value">{{ planet.diameter }}</span>
      </p>
      <p class="planet-detail__info-text">
        <span class="planet-detail__info-text-label">Created:</span>
        <span class="planet-detail__info-text-value">{{ simpleDateFormat(planet.created) }}</span>
      </p>
    </div>
    <div class="planet-detail__back">
      <RouterLink to="/planet-list/1">
        <el-button type="plain">Back to planet list</el-button>
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.planet-detail {
  max-width: 450px;
  margin: 0 auto;
  
  &__header {
    font-size: 2rem;
    text-align: center;
  }

  &__info {
    &-text {
      display: flex;
      flex-direction: column;
      padding-bottom: 1rem;
      margin-bottom: 1rem;
      border-bottom: 1px #545454 solid;

      &:last-child {
        border-bottom: none;
      }

      &-label {
        font-weight: 600;
        color: #adadad;
      }
    }
  }

  &__back {
    margin-top: 1rem;
  }
}
</style>
