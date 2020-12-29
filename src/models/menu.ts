import { Reducer } from 'redux';
import { Effect } from 'dva';

import { getList } from '../../src/api/api'


export interface StateType {
  menuList: any,
  page: number,
  pageSize: number
  total: number,
  typeList: any,
  type_id: number,
  privateStatus: boolean
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    getLists: Effect;
    getPage: Effect;
    cleanType: Effect; // 清除分类信息
    setType: Effect;
  };
  reducers: {
    changeMenuList: Reducer<StateType>;
    changeMenuPage: Reducer<StateType>;
    cleanTypeHandle: Reducer<StateType>;
    setTypeHandle: Reducer<StateType>
  };
}

const Model: LoginModelType = {
  namespace: 'menu',

  state: {
    menuList: [],
    page: 1,
    pageSize: 10,
    total: 0,
    typeList: [],
    type_id: null,
    privateStatus: false
  },

  effects: {
    *getLists({ payload }, { call, put, select }) {
      const page = yield select(state =>state.menu.page)
      const pageSize = yield select(state =>state.menu.pageSize)
      const blog_type_id = yield select(state => state.menu.type_id)
      const privateStatus = yield select(state => state.menu.privateStatus)
      
      const response = yield call(getList, {page, per_page: pageSize, blog_type_id });
      yield put({
        type: 'changeMenuList',
        payload: response,
      });
    },

    *getPage({payload}, { call, put }) {
      yield put({
        type: 'changeMenuPage',
        payload: payload.page
      });
    },

    // 清空分类信息
    *cleanType({ payload }, { call, put }) {
      console.log(111)
      yield put ({
        type: 'cleanTypeHandle',
      })
    },

    // 设置分类信息
    *setType({ payload }, { call, put }) {
      console.log(payload)
      yield put ({
        type: 'setTypeHandle',
        payload
      })
    }

  },

  reducers: {
    changeMenuList(state, { payload }) {
      return {
        ...state,
        menuList: payload.data.list,
        total: payload.data.count
      };
    },
    changeMenuPage(state, { payload }) {
      return {
        ...state,
        page: payload,
      }
    },
    cleanTypeHandle (state) {
      return {
        ...state,
        page: 1,
        total: 0,
        type_id: null
      }
    },
    setTypeHandle (state, { payload }) {
      return {
        ...state,
        page: 1,
        total: 0,
        type_id: payload.id
      }
    }
  },
};

export default Model;
