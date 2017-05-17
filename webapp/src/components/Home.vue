<template>
    <div>
        <router-link :to="{ name: 'AccountLogin'}">登录</router-link>
        <router-link :to="{ name: 'AccountSigin'}">注册</router-link>
    </div>
</template>

<script>
    export default {
        name: 'Home'
    }
</script>