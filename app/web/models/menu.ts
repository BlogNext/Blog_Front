import { Reducer } from 'redux';
import { Effect } from 'dva';

import { getList, login, getDetail } from '../api/api'
import { message } from 'antd';


export interface StateType {
  menuList: any,
  detail: any,
  detail_id: number | null,
  page: number,
  pageSize: number
  total: number,
  type_id: number | string | null
  token: string,
  loginStatus: boolean
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    getLists: Effect;
    getPage: Effect;
    cleanType: Effect; // 清除分类信息
    setType: Effect;
    toLogin: Effect;
    getDetailInfo: Effect;
    changeLoginStatus: Effect;
  };
  reducers: {
    changeMenuList: Reducer<StateType>;
    changeMenuPage: Reducer<StateType>;
    cleanTypeHandle: Reducer<StateType>;
    setTypeHandle: Reducer<StateType>;
    setLoginHandle: Reducer<StateType>;
    setLoginStatus: Reducer<StateType>;
    setDetail: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'menu',

  state: {
    menuList: [],
    page: 1,
    pageSize: 10,
    total: 0,
    type_id: null,
    detail: {},
    loginStatus: false,
    // token: localStorage.getItem('blog_token') || ''   //如果没有默认为空字符串
    token: '',
    detail_id: null
  },

  effects: {
    *getLists({ payload }, { call, put, select }) {
      
      const page = yield select(state =>state.menu.page)
      const pageSize = yield select(state =>state.menu.pageSize)
      const blog_type_id = yield select(state => state.menu.type_id)
      const response = yield call(getList, {page, per_page: pageSize, blog_type_id });
      if(response.code === 0) {
        
        yield put({
          type: 'changeMenuList',
          payload: response,
        });
      } else if(response.code === 10002) {
        // 缺少token
        yield put({
          type: 'setLoginStatus',
          payload: { status: true },
        });
      }
    },
    *getPage({payload}, { call, put }) {
      yield put({
        type: 'changeMenuPage',
        payload: payload.page
      });
    },

    // 清空分类信息
    *cleanType({ payload }, { call, put }) {
      yield put ({
        type: 'cleanTypeHandle',
      })
    },

    // 设置分类信息
    *setType({ payload }, { call, put, select }) {
      
      const blog_type_id = yield select(state => state.menu.type_id)
      if(payload.id === 'private' && blog_type_id === 'private') {
        const token = yield select(state =>state.menu.token)
        if(token === null || token === '') {
          // 未登录状态
          yield put({
            type: 'getLists',
            payload: {},
          });
        }
      }
      yield put ({
        type: 'setTypeHandle',
        payload
      })
    },

    // 登录
    *toLogin ({payload}, { call, put }) {
      const res = yield call(login, { ...payload })
      //  请求成功，保存token
      
      if(res.code === 0) {
        localStorage.setItem('blog_token', res.data)
        yield put({
          type: 'setLoginHandle',
          payload: res.data
        })
      } else {
        message.error(res.msg, 2);
        
      }
    },

    // 登录框 显示、关闭
    *changeLoginStatus({ payload }, {call, put}) {
      yield put ({
        type: 'setLoginStatus',
        payload
      })
    },

    *getDetailInfo({payload}, { call, put, select}) {
      const response = yield call(getDetail, {id: payload });
      if(response.code === 0) {
        yield put({
          type: 'setDetail',
          payload: response,
        });
        yield put({
          type: 'setDetailId',
          payload: payload,
        })
      } else if(response.code === 10002) {
        // 缺少token
        yield put({
          type: 'setLoginStatus',
          payload: { status: true },
        });
      }
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
    },
    // 登录成功，存储token
    setLoginHandle (state, { payload }) {
      return {
        ...state,
        token: payload,
        loginStatus: false
      }
    },

    setLoginStatus (state, { payload }) {
      return {
        ...state,
        loginStatus: payload.status
      }
    },
    setDetail(state, { payload }) {
      return {
        ...state,
        detail: payload.data
      }
    },
    setDetailId (state, { payload }) {
      return {
        ...state,
        detail_id: payload
      }
    }
  },
};

export default Model;
