import { createStore } from 'vuex';
import axios from 'axios';

const api = `https://api.allorigins.win/get?url=${encodeURIComponent('https://data.epa.gov.tw/api/v1/aqx_p_432?offset=0&limit=1000&api_key=68f55ed5-f6e4-49a1-8de1-373eb07bce09')}`;
// const api = 'https://data.epa.gov.tw/api/v1/aqx_p_432?offset=0&limit=1000&api_key=68f55ed5-f6e4-49a1-8de1-373eb07bce09';
const config = {
  headers: {
    Origin: 'http://localhost:8080',
  },
};

export default createStore({
  state: {
    counties: [],
    allData: [],
    selectedAreaDataList: [],
    lastUpdateTime: '',
    detail: {},
  },
  actions: {
    async init({ commit }) {
      const res = await axios.get(api, {}, config);
      const { records } = JSON.parse(res.data.contents);
      commit('SET_COUNTIES', records);
      commit('SET_ALL_DATA', records);
      commit('SET_UPDATE_TIME');
    },
  },
  mutations: {
    SET_COUNTIES(state, dataList) {
      const countyList = [];

      dataList.forEach((data) => {
        if (countyList.includes(data.County)) return;
        countyList.push(data.County);
      });

      state.counties = countyList;
      console.log('[Vuex counties]', state.counties);
    },
    SET_ALL_DATA(state, dataList) {
      state.allData = dataList;
      console.log('[Vuex allData]', state.allData);
    },
    GET_COUNTY_DATA(state, county) {
      const dataList = [];

      state.allData.forEach((data) => {
        if (county === data.County) {
          dataList.push(data);
        }
      });

      state.selectedAreaDataList = dataList;
      console.log('[Vuex selectedAreaDataList]', state.selectedAreaDataList);
    },
    SET_UPDATE_TIME(state) {
      const publishTime = state.allData[0].PublishTime;
      const slicedSring = publishTime.slice(0, publishTime.length - 3);

      state.lastUpdateTime = slicedSring;
      console.log('[Vuex lastUpdateTime]', state.lastUpdateTime);
    },
    SET_DETAIL(state, data) {
      state.detail = data;

      console.log('[Vuex detail]', state.detail);
    },
  },
  getters: {
    counties(state) {
      return state.counties;
    },
    allData(state) {
      return state.allData;
    },
    selectedAreaDataList(state) {
      return state.selectedAreaDataList;
    },
    lastUpdateTime(state) {
      return state.lastUpdateTime;
    },
    currentCounty(state) {
      if (state.selectedAreaDataList.length === 0) {
        return '';
      }
      return state.selectedAreaDataList[0].County;
    },
    detail(state) {
      return state.detail;
    },
  },
  modules: {
  },
});
