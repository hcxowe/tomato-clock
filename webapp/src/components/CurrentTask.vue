<template>
    <div class="wrap">
        <p class="current-title">当前任务</p>

        <div class="clock-container" v-show="currentTask.taskID">
            <div class="count-down-container">
                <span class="clock">{{ countTimeStr }}</span>
                <span class="count-down-slider" :style="{ width: (1500 - countTime) / 15 + '%' }"></span>
            </div>
            <div class="buttons-container">
                <button class="btn-start" v-show="!isStart" @click="onStart">开始</button>
                <button class="btn-break" v-show="isStart" @click="onBreak">打断</button>
            </div>
        </div>

        <div class="record-container">
            <ul>
                <li v-for="item in currentTask.potomaTime">
                    <p class="year-month">
                        {{ item.year }}年
                        <br>
                        {{ item.month }}月{{ item.day }}日
                    </p>

                    <label class="time-interval">{{ item.startTime }} - {{ item.endTime }}</label>

                    <span class="status-span" :style="{ color: item.status == 1 ? 'green' : 'red' }">{{ item.status == 1 ? '完成' : '打断' }}</span>
                </li>
            </ul>
        </div>

        <div class="statistics-container">
            <p>
                总计 <span class="total">{{ currentTask.potomaTime.length }}</span> 个番茄钟, 完成 <span class="finish"> {{ finishCount }} </span> 个, 打断 <span class="break"> {{ breakCount }} </span> 个 
            </p>
        </div>
    </div>
</template>

<script>
    import * as types from '../store/types.js'
    import moment from 'moment'

    export default {
        name: 'CurrentTask',
        data () {
            return {
                isStart: false,
                countTime: 1500,
                timer: null,
                year: '',
                month: '',
                day: '',
                startTime: '',
                endTime: ''
            }
        },
        computed: {
            currentTask: function() {
                return this.$store.state.userInfo.currentTask;
            },
            countTimeStr: function() {
                var m = Math.floor(this.countTime / 60);
                var s = this.countTime % 60;

                return (m < 10 ? ('0' + m) : m) + ':' + (s < 10 ? ('0' + s) : s);
            },
            finishCount: function() {
                return this.currentTask.potomaTime.filter(function(value) {
                    return value.status === 1;
                }).length;
            },
            breakCount: function() {
                return this.currentTask.potomaTime.filter(function(value) {
                    return value.status === 0;
                }).length;
            }
        },
        methods: {
            onStart: function() {
                this.isStart = !this.isStart;
                this.startInit();
                this.timer = setInterval(() => {
                    if (this.countTime <=0) {
                        this.initStatus();
                        this.finishPomato(1);
                        return;
                    }

                    this.countTime -= 1;
                }, 1000);

                this.$store.commit(types.EXCUTINGPOMATO);                
            },
            onBreak: function() {
                this.initStatus();
                this.finishPomato(0);
            },
            initStatus: function() {
                clearInterval(this.timer);
                this.countTime = 1500;
                this.isStart = false;
                this.timer = null;
            },
            startInit: function() {
                var now = moment();
                this.year = '' + now.year();
                this.month = now.month() + 1 + '';
                this.day = '' + now.date();

                this.startTime = '' + (now.hour() > 9 ? now.hour() : ('0' + now.hour())) + ':' + (now.minute() > 9 ? now.minute() : ('0' + now.minute())) + ':' + (now.second() > 9 ? now.second() : ('0' + now.second()));
            },
            finishPomato: function(status) {
                var now = moment();
                this.endTime = '' + (now.hour() > 9 ? now.hour() : ('0' + now.hour())) + ':' + (now.minute() > 9 ? now.minute() : ('0' + now.minute())) + ':' + (now.second() > 9 ? now.second() : ('0' + now.second()));

                var pomato = {
                    year: this.year,
                    month: this.month,
                    day: this.day,
                    startTime: this.startTime,
                    endTime: this.endTime,
                    status: status
                };

                console.log(pomato);

                this.$http.post('/api/activity/finishTomato', { 
                    userID: this.$store.state.userInfo.userID, 
                    projectID: this.currentTask.projectID,
                    taskID: this.currentTask.taskID,
                    pomato: pomato
                }).then((ret) => {
                    if (ret.body.code != 200) {
                        console.error(ret.body.msg);
                        return;
                    }

                    this.$store.commit(types.FINISHPOMATO, {
                        taskID: this.currentTask.taskID,
                        pomato: pomato
                    });
                }, (err) => {
                    console.error(err);
                });

                // this.$store.dispatch(types.FINISHPOMATO, {
                //     taskID: this.currentTask.taskID,
                //     pomato: {
                //         year: this.year,
                //         month: this.month,
                //         day: this.day,
                //         startTime: this.startTime,
                //         endTime: this.endTime,
                //         status: status
                //     }
                // });
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
                z-index: 9;
            }

            .count-down-slider {
                position: absolute;
                top: 0; left: 0;
                background-color: #ccc;
                height: 100%;
                z-index: 0;
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
                height: 100%;

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

    .record-container {
        position: absolute;
        top: 96px; left: 0; right: 0; bottom: 40px;
        padding: 5px;

        ul {
            list-style: none;
            padding: 0;

            li {
                border: 1px solid #ccc;
                margin-bottom: 5px;
            }
        }

        .year-month {
            display: inline-block;
            background-color: #ccc;
            color: white;
            font-size: 16px;
            text-align: center;
            padding: 5px;
            font-weight: bold;
            margin: 0;
            vertical-align: middle;
        }

        .time-interval {
            margin: 0;
            font-size: 20px;
            margin-left: 20px;
            vertical-align: middle;
        }

        .status-span {
            margin-left: 20px;
            color: green;
            font-size: 16px;
            font-weight: bold;
            vertical-align: middle;
        }
    }

    .statistics-container {
        position: absolute;
        left: 0; right: 0; bottom: 0;
        height: 40px;
        border-top: 1px solid #ccc;
        line-height: 40px;
        text-align: center;

        .total {
            font-size: 16px;
            font-weight: bold;
        }

        .finish {
            color: green;
            font-size: 16px;
            font-weight: bold;
        }

        .break {
            color: red;
            font-size: 16px;
            font-weight: bold;
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
