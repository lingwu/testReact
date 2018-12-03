import usersService  from '../services/users.js'

export default{
  namespace:'users',
  state:{
    list:[],
    toatl:null
  },
  reducers:{
    safe(state,{paload:{data:list,total}}){
      return {...state,list,total}
    }
  },
  effects:{
    *fetch({payload:{page}},{call,put}){
      const {data,headers} = yield call(usersService.fetch,{page:page});
      yield put({type:'save',payload:{data,total:headers['x-total-count']}});
    }
  },
  subscriptions:{
    setup({dispatch,history}){
      return history.listen(({pathname,query})=>{
        if(pathname==='/users'){
          dispatch({
            type:'fetch',
            payload:query
          })
        }
      })
    }
  }
}
