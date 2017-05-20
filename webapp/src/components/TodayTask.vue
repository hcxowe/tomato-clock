<template>
    <div class="wrap">
        <p class="today-title">今日任务</p>

        <div class="today-list">
            <ul v-if="type == 'finish'">
                <li><a class="text-finish" href="javacript:void(0);">一个已完成的任务</a></li>
            </ul>
            <ul v-else-if="type == 'unfinished'">
                <li><a href="javacript:void(0);">一个未完成的任务</a></li>
            </ul>
        </div>

        <div class="today-type">
            <span :class="{ 'active-type': type == 'unfinished' }" @click="type='unfinished'">未完成</span>
            <span :class="{ 'active-type': type == 'finish' }" @click="type='finish'">已完成</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TodayTask',
        data () {
            return {
                type: 'unfinished'
            }
        }
    }
</script>

<style lang="less" scoped>
    .wrap {
        position: relative;
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
    }

    .today-title {
        padding: 5px;
        text-align: center;
        font-size: 18px;
        border-bottom: 1px solid #ccc;
        margin: 0;
    }

    .today-list {
        position: absolute;
        top: 36px;
        bottom: 40px;
        left: 0;
        right: 0;
        overflow: auto;

        ul {
            list-style: none;
            padding: 0;

            li {
                width: 100%;
                border-bottom: 1px solid #ccc;
            }
            
            a {
                display: inline-block;
                padding: 5px;
                width: 100%;
                color: #000;
                text-align: center;
                text-decoration: none;

                &:hover {
                    color: lightcoral;
                }
            }
        }

        .text-finish {
            text-decoration: line-through;
        }
    }

    .today-type {
        position: absolute;
        left: 0; right: 0; bottom: 0;
        height: 40px;
        border-top: 1px solid #ccc;

        span {
            float: left;
            width: 50%;
            height: 100%;
            line-height: 40px;
            text-align: center;

            &:hover {
                background-color: #E6E6E6;
            }
        }

        span + span {
            border-left: 1px solid #ccc;
        }

        .active-type {
            background-color: #E6E6E6;
        }
    }
</style>


