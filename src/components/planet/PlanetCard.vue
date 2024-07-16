<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';
import { useRouter } from 'vue-router';
import { type Planet } from '../../service/api.service';
import { simpleDateFormat } from "../../helper/date-time.helper";

type Props = {
  planet: Planet
}

const props = defineProps<Props>();

const router = useRouter()

const planetId: ComputedRef<string | null> = computed(() => {
  const planetIdFromUrl = props.planet.url.match(/\/(\d+)\/$/);
  
  if (!planetIdFromUrl) {
    return null
  }
 
  return planetIdFromUrl[1];
});

const onClickReadMore = (planetId: string) => {
  router.push({
    name: "planet-details",
    params: {
      id: planetId
    }
  })
}
</script>

<template>
  <el-card class="planet-card">
    <template #header>
      <div class="card-header">
        <span>{{ planet.name }}</span>
      </div>
    </template>

    <template #default>
      <p>Population: {{ planet.population }}</p>
      <p>Rotation Period: {{ planet.rotation_period }}</p>
      <p>Climate: {{ planet.climate }}</p>
      <p>Gravity: {{ planet.gravity }}</p>
      <p>Created: {{ simpleDateFormat(planet.created) }}</p>
    </template>

    <template v-if="planetId" #footer>
      <el-button
        type="plain"
        @click="onClickReadMore(planetId)"
      >
        Read More
      </el-button>
    </template>
  </el-card>
</template>

<style lang="scss" scoped>

</style>
