<template lang="pug">
div.container
  div.instruction
    div.instruction-title
      h1 空氣品質指標(AQI)
      div.instruction-custom-select
        select(@change="getAreaDataList")
          option(disabled selected) 請選擇地區
          template(v-for="county in counties")
            option {{ county }}
        i.fas.fa-sort
    div.instruction-status.font-open-sans
      div.bg-50
        p 0~50
      div
        p 良好
      div.bg-100
        p 51~100
      div
        p 普通
      div.bg-150
        p 101~150
      div
        p 對敏感族群
          br
          | 不健康
      div.bg-200
        p 151~200
      div
        p 對所有族群
          br
          | 不健康
      div.bg-300
        p 201~300
      div
        p 非常不健康
      div.bg-400
        p 301~400
      div
        p 危害
  div.aqi
    div.aqi-title
      h2 {{ currentCounty }}
      div.dashline
      span {{ lastUpdateTime }}
      span 更新
    div.aqi-info
      div(class="aqi-detail" v-if="selectedAreaDataList.length !== 0 && detail.SiteName")
        div.aqi-detail-title
          h3 {{ detail.SiteName }}
          p.bg-100.font-open-sans {{ detail.AQI }}
        div.aqi-detail-data
          ul
            li
              div
                p 臭氧
                span O3 (ppb)
              p {{ detail.O3 }}
            li
              div
                p 懸浮微粒
                span PM10 (μg/m³)
              p {{ detail.PM10 }}
            li
              div
                p 細懸浮微粒
                span PM2.5 (μg/m³)
              p {{ detail['PM2.5'] }}
            li
              div
                p 一氧化碳
                span CO (ppm)
              p {{ detail.CO }}
            li
              div
                p 二氧化硫
                span SO2 (ppb)
              p {{ detail.SO2 }}
            li
              div
                p 二氧化氮
                span NO2 (ppb)
              p {{ detail.NO2 }}
      div(class="aqi-area" v-if="selectedAreaDataList.length !== 0")
        template(v-for="area in selectedAreaDataList")
          div(class="font-open-sans" @click="checkDetail(area)")
            h4 {{ area.SiteName }}
            p(:class="aqiColor(area.AQI)") {{ area.AQI }}
  footer
    p 資料來源：行政院環境保護署
    p Copyright © 2019 HexSchool. All rights reserved.
</template>

<script>
import { computed, watch } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'App',
  setup() {
    const store = useStore();
    store.dispatch('init');
    const counties = computed(() => store.getters.counties);
    const selectedAreaDataList = computed(() => store.getters.selectedAreaDataList);
    const lastUpdateTime = computed(() => store.getters.lastUpdateTime);
    const currentCounty = computed(() => store.getters.currentCounty);
    const detail = computed(() => store.getters.detail);

    const getAreaDataList = (event) => {
      const selectedCoounty = event.target.value;
      store.commit('GET_COUNTY_DATA', selectedCoounty);
    };

    const aqiColor = (aqi) => {
      if (aqi > 0 && aqi <= 50) {
        return 'bg-50';
      }
      if (aqi >= 51 && aqi <= 100) {
        return 'bg-100';
      }
      if (aqi >= 101 && aqi <= 150) {
        return 'bg-150';
      }
      if (aqi > 151 && aqi <= 200) {
        return 'bg-200';
      }
      if (aqi >= 201 && aqi <= 300) {
        return 'bg-300';
      }
      if (aqi > 301) {
        return 'bg-400';
      }
      return 'bg-50';
    };

    const checkDetail = (data) => {
      store.commit('SET_DETAIL', data);
      if (window.innerWidth < 1024) {
        window.scrollTo(0, 286);
      }
    };

    watch(selectedAreaDataList, () => {
      store.commit('SET_DETAIL', selectedAreaDataList.value[0]);
    });

    return {
      selectedAreaDataList,
      getAreaDataList,
      lastUpdateTime,
      currentCounty,
      checkDetail,
      counties,
      aqiColor,
      detail,
    };
  },
};
</script>

<style lang="scss">

</style>
