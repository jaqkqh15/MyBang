import {
  // Login
  FETCH_USER_INFO,
  FETCH_SESSION,
  
  FETCH_MEMBER_LIST,
  FETCH_MEMBER,

  // 매물 게시판
  FETCH_PRODUCT_LIST,
  FETCH_PRODUCT,
  FETCH_VILLA_LIST,
  FETCH_VILLA,

  // 찜하기 
  FETCH_LIKED_PRODUCT_LIST,
  FETCH_PRODUCT_INFO,


  FETCH_GONGZI_LIST,
    FETCH_GONGZI,



  //뉴스 크롤링
  CRAWL_START,


} 

from './mutation-types'


import axios from 'axios'
import cookies from 'vue-cookies'

export default {
  fetchUserInfo ({ commit }, userId) {
    return axios.get(`http://localhost:7777/member/mypage/${userId}`).then(res => {
      console.log(res.data)
      cookies.set('session', res.data.userId)
      commit(FETCH_USER_INFO, res.data)
    })
  },
  fetchSession ({ commit }, session) {
    commit(FETCH_SESSION, session)
  },
  fetchMemberList ({ commit }) {
    return axios.get('http://localhost:7777/member/memberlists')
            .then((res) => {
                commit(FETCH_MEMBER_LIST, res.data)
            })
  },
  fetchMember ({ commit }, memberNo) {
    return axios.get(`http://localhost:7777/member/${memberNo}`)
            .then((res) => {
                commit(FETCH_MEMBER, res.data)
            })
  },
  // 매물 게시판
  fetchProductList ({commit}) {
      return axios.get('http://localhost:7777/product/list')
          .then((res) =>{
              commit(FETCH_PRODUCT_LIST, res.data)
          })
  },
  fetchProduct({ commit }, productNo) {
      return axios.get(`http://localhost:7777/product/${productNo}`)
      .then((res) => {
          commit(FETCH_PRODUCT, res.data)
      })
  },
  fetchVillaList ({commit}) {
      return axios.get('http://localhost:7777/villa/lists')
          .then((res) =>{
              commit(FETCH_VILLA_LIST, res.data)
          })
  },
  fetchVilla({ commit }, villaNo) {
      return axios.get(`http://localhost:7777/villa/${villaNo}`)
      .then((res) => {
          commit(FETCH_VILLA, res.data)
      })
  },
  // 찜하기
  fetchLikedProductList ({ commit }, payload) {
    return axios.get(`http://localhost:7777/product/likedProductList/${payload}`)
            .then((res) => {
                //alert(JSON.stringify(res.data))
                commit(FETCH_LIKED_PRODUCT_LIST, res.data)
      })
  },
  fetchProductInfo({ commit }, payload) {
    return axios.get(`http://localhost:7777/product/getProductInfo/${payload}`)
      .then(res => {
        commit(FETCH_PRODUCT_INFO, res.data);
      });
    },

  fetchGongziList ({ commit }) {
      return axios.get('http://localhost:7777/gongzi/list')
              .then((res) => {
                  commit(FETCH_GONGZI_LIST, res.data)
              })
  },
  fetchGongzi ({ commit }, gongziNo) {
      return axios.get(`http://localhost:7777/gongzi/${gongziNo}`)
              .then((res) => {
                  commit(FETCH_GONGZI, res.data)
              })

            },
 

  

  // 뉴스 크롤링
  async crawlFind ({ commit }, category) {
    axios.get('http://localhost:7777/' + `${category}`)
            .then(({ data }) => {
                commit(CRAWL_START, data)

                // if (window.location.pathname !== '/daumNewsCrawler') {
                //     router.push('/daumNewsCrawler')
                // }
            })
},


}