<template>
    <div>
        <div align="center">
            <h1>로그인</h1>
        </div>
        <member-login-form @submit="onSubmit"/>
    </div>
</template>

<script>
import MemberLoginForm from '@/components/member/MemberLoginForm.vue'

import axios from 'axios'
import { mapActions, mapState } from 'vuex'
import Vue from 'vue'
import cookies from 'vue-cookies'
Vue.use(cookies)

export default {
    name: 'MemberLoginPage',
    components: {
        MemberLoginForm
    },
   data() {
    return {
      id: "",
      pw: "",
    }
  },
  mounted () {
        // this.fetchSession(this.$cookies.get('session'))
        // if (this.session != null) {
        //     this.$store.state.isLogin = true
        //     this.$store.state.userInfo = this.fetchUserInfo(this.$cookies.get('session'))
        // }
    },
    computed: {
        ...mapState(['session'])
    },
    methods: {
        ...mapActions(['fetchUserInfo']),
        onSubmit (payload) {

            if (this.session == null) {
                const { id, pw } = payload
                axios.post('http://localhost:7777/member/login', { userId: id, password: pw, auth: null })
                .then(res => {

                    if (res.data != "") {
                        alert('환영합니다! ')

                        this.$store.commit('USER_LOGIN', true)

                        this.fetchUserInfo(id)
                        if (res.data.auth == '관리자'){
                           this.$router.push({name: 'HostPage'})
                       }else{
                        this.$router.push({name: 'Home'})
                       }

                    }else {

                        alert('로그인 실패! - ' + res.data)
                    }
                    this.$router.go()
                })
                .catch(res => {
                    alert(res.response.data.message)
                })
            }else {
            alert('이미 로그인 되어 있습니다: ' + this.$store.state.session.userId)
            }
        },
        
        
    }
}
</script>


<style scoped>
h1 {
    font-size: 33px;
    font-weight: bold;
    width: 100%;
    color: #000;
    margin-top: 50px;
}
</style>