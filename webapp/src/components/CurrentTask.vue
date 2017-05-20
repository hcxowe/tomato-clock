<template>
    <div class="wrap">
        <p class="current-title">当前任务</p>

        <div class="clock-container">
            <div class="count-down-container">
                <span class="clock">{{ countTimeStr }}</span>
                <span class="count-down-slider" :style="{ width: (1500 - countTime) / 15 + '%' }"></span>
            </div>
            <div class="buttons-container">
                <button class="btn-start" v-show="!isStart" @click="onStart">开始</button>
                <button class="btn-break" v-show="isStart" @click="onBreak">打断</button>
                <button class="btn-cancle" v-show="isStart" @click="onBreak">取消</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CurrentTask',
        data () {
            return {
                isStart: false,
                countTime: 1500,
                timer: null
            }
        },
        computed: {
            countTimeStr: function() {
                var m = Math.floor(this.countTime / 60);
                var s = this.countTime % 60;

                return (m < 10 ? ('0' + m) : m) + ':' + (s < 10 ? ('0' + s) : s);
            }
        },
        methods: {
            onStart: function() {
                this.isStart = !this.isStart;
                this.timer = setInterval(() => {
                    if (this.countTime <=0) {
                        this.initStatus();
                        return;
                    }

                    this.countTime -= 1;
                }, 1000);
            },
            onBreak: function() {
                this.initStatus();
            },
            initStatus: function() {
                clearInterval(this.timer);
                this.countTime = 1500;
                this.isStart = false;
                this.timer = null;
            }
        }
    }
</script>

<style lang="less" scoped>
    .wrap {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
    }

    .clock-container {
        position: relative;
        height: 60px;
        
        .count-down-container {
            position: absolute;
            top: 0; left: 0; bottom: 0; right: 60px;
            border: 1px solid #ccc;

            .clock {
                display: inline-block;
                width: 100%;
                line-height: 60px;
                font-size: 24px;
                font-weight: bold;
                text-align: center;
            }

            .count-down-slider {
                position: absolute;
                top: 0; left: 0;
                background-color: #ccc;
                height: 100%;
            }
        }

        .buttons-container {
            float: right;
            width: 60px;
            height: 100%;

            .btn-start {
                width: 100%;
                height: 100%;
            }

            .btn-break {
                width: 100%;
                height: 50%;

                padding: 0px;
                font-size: 14px;           
            }
            .btn-cancle {
                width: 100%;
                height: 50%;

                padding: 0px;
                font-size: 14px;       
            } 
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
        background-color: #da5454;

        &:hover {
            background-color: lightcoral;
            box-shadow: 0 0 5px 0 #ccc;
        }
    }

    .current-title {
        padding: 5px;
        text-align: center;
        font-size: 18px;
        border-bottom: 1px solid #ccc;
        margin: 0;
    }
</style>
