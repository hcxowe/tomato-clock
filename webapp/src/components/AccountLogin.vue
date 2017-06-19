<template>
    <div class="wrap">
        <div class="login-container">
            <p class="login-title">番茄时间管理</p>

            <p class="login-login">用户登陆</p>
            <div class="input-wrap">
                <input type="text" v-model="email" @input="onInput" @keyup.enter="onLogin" placeholder="请输入登录邮箱">
            </div>
            <div class="input-wrap">
                <input type="password" v-model="password" @input="onInput" @keyup.enter="onLogin" placeholder="请输入登录密码">
            </div>
            <div class="login-msg" v-show="isError">
                <p>{{ errorMsg }}</p>
            </div>
            <div class="input-wrap">
                <button @click="onLogin">登录<i v-show="isLoging" class="fa fa-spinner fa-spin fa-fw"></i></button>
            </div>

            <div>
                尚未注册? 点击<router-link class="link-sigin" :to="{ name: 'AccountSigin' }"> 注册</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from '../store/types.js'

    export default {
        name: 'AccountLogin',
        data () {
            return {
                email: 'hcxowe@126.com',
                password: '111111',
                isLoging: false,
                isError: false,
                errorMsg: ''
            }
        },
        methods: {
            onLogin: function(evt) {
                if (this.isLoging == true) {
                    return;
                }

                this.isLoging = true;

                var self = this;
                this.$http.post('/api/user/login', { email: this.email, passWD: this.password }).then((ret) => {
                    this.isLoging = false;
                    
                    if (ret.body.code == 200) {
                        this.$store.commit(types.LOGINUSER, ret.body.body);
                        this.$router.replace({ name: 'TomatoHome' });
                        return;
                    }
                    else {
                        this.errorMsg = ret.body.msg;
                        this.isError  = true;
                    }
                }, (err) => {
                    this.errorMsg = '网络请求失败';
                    this.isError  = true;
                });

                // this.$store.dispatch(types.LOGINUSER, {
                //     email: this.email,
                //     password: this.password
                // }).then(() => {
                //     self.$router.replace({ name: 'TomatoHome' });
                //     this.isLoging = false;
                // }, (msg) => {
                //     self.errorMsg = msg;
                //     self.isError = true;
                //     this.isLoging = false;
                // });
            },
            onInput: function() {
                this.isError = false;
            }
        }
    }
</script>

<style lang="less" scoped>
    .wrap {
        padding: 50px;
        width: 100%;
        height: 100%;
    }

    .login-container {
        margin: 0 auto;
        width: 400px; 

        .login-title {
            padding: 30px; 
            margin-bottom: 50px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
        }

        .login-login {
            font-size: 18px;
            color: lightcoral;    
        }
        
        .link-sigin {
            color: lightcoral;
            font-size: 16px;
            outline: 0;
            text-decoration: none;

            &:hover {
                color: lightcoral;
            }
        }

        .login-msg {
            color: red;
        }
    }

    .input-wrap {
        margin-top: 10px;
        margin-bottom: 10px;

        input {
            width: 100%;
            padding: 8px;
            font-size: 16px;
            outline: 0;
            border: 1px solid #ccc;
            border-radius: 4px;
            transition: all .3s;

            &:focus {
                border-color: #2194E6;
                box-shadow: 0 0 5px 0 #ccc;
            }
        }

        button {
            width: 100%;
            padding: 8px;
            font-size: 16px;
            outline: 0;
            color: white;
            border: 1px solid transparent;
            border-radius: 4px;
            transition: all .3s;
            background-color: lightcoral;

            &:hover {
                background-color: #da5454;
                box-shadow: 0 0 5px 0 #ccc;
            }
        }
    }
</style>