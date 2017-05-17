<template>
    <div class="main-wrap">
        <router-view></router-view>
    </div>
</template>

<style lang="less" scope>
    html,
    body {
        width: 100%;
        height: 100%;
        overflow: hidden;
        font-family: '微软雅黑', sans-serif;
    }

    .main-wrap {
        position: relative;
        width: 100%;
        height: 100%;
    }
</style>