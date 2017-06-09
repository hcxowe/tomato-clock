<template>
    <div class="wrap">
        <!--<router-link :to="{ name: 'AccountLogin'}">登录</router-link>
        <router-link :to="{ name: 'AccountSigin'}">注册</router-link>-->
        <div class="header">
            <a href="/">
                <img class="logo" src="/static/logo.png"> 番茄时间管理
            </a>

            <button class="pull-right">马上开启</button>
        </div>

        <div class="purport-warp">
            <p>一次只做一件事</p>
            <p>想做到专注，你就必须坚决抛开各种杂念</p>
            <button class="btn-Start">马上开启</button>
        </div>

        <div class="question-wrap">
            <p>工作中是否遇到这些问题 ?</p>
            <div class="question">
                <p>小事忙一天，大事一样没办</p>
                <p>没想到一件事要做这么久</p>
                <p>没想到一件事越做越复杂</p>
                <p>头脑被各种想法占据</p>
                <p>把预估当承诺</p>
                <p>面对复杂，望而却步</p>
                <p>无聊琐事，越拖越久</p>
                <p>最后期限，步步紧逼</p>
                <p>一错再错，不长记性</p>
                <p>流程管理，纸上谈兵</p>
                <p>牵着不走，打着后退</p>
                <p>完美主义，碍手碍脚</p>
                <p>只顾低头干活，忘了抬头看路</p>
                <p>前怕狼，后怕虎，害怕失败和批评</p>
            </div>
            <p>番茄可以解决以上问题</p>
            <div class="anwser">
                <p>确定事情优先级</p>
                <p>及时反馈，发现预估与实际的时间差距</p>
                <p>计划外紧急事件干扰，需重新评估优先级</p>
                <p>突发奇想，暂时放入计划外紧急中</p>
                <p>评估好预计完成时间</p>
                <p>化整为零，从分片任务着手，解决复杂</p>
                <p>琐事也是事，多拖无益</p>
                <p>休息时安心休息，工作时一心一意</p>
                <p>记录，处理和可视化每日做过的任务</p>
                <p>跟踪每日数据，改进次日流程</p>
                <p>必须去做 与 我想要做 得出 我选择做</p>
                <p>还有更完美的方案 其实是另一种形式的拖延</p>
                <p>花一点时间巩固记忆，识别模式，做出结论</p>
                <p>为平凡添加乐趣</p>
            </div>
        </div>

        <div class="join-wrap">
            <p>现在就加入, 开始高效的完成工作吧 !</p>
            <button class="btn-Start">马上开启</button>
        </div>

        <div class="foolter">
            <p>版权所有, 盗版必究, 仅限个人使用</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Home'
    }
</script>

<style lang="less" scoped>
    button {
        width: 100px;
        height: 32px;
        font-size: 16px;
        outline: 0;
        color: white;
        border: 1px solid transparent;
        border-radius: 8px;
        transition: all .3s;
        background-color: lightcoral;

        &:hover {
            background-color: #da5454;
            box-shadow: 0 0 5px 0 #ccc;
        }
    }

    .btn-Start {
        margin-top: 30px;
        width: 150px;
        height: 48px;
    }
    
    .wrap {
        width: 100%;
        height: 100%;
        min-width: 1000px;
        overflow: auto;
    }

    .header {
        padding: 20px 50px;
        background-color: #F4F4F4;

        a {
            line-height: 32px;
            font-size: 20px;
            color: lightcoral;
            text-decoration: none;
        }
    }

    .purport-warp {
        padding: 50px 50px;
        background-color: #F4F4F4;
        text-align: center;

        p:nth-of-type(1) {
            font-size: 36px;
            font-weight: bold;
            color: #000;
        }

        p:nth-of-type(2) {
            font-size: 24px;
            color: #000;
        }
    }

    .question-wrap {
        padding: 30px;
        text-align: center;
        background-color: #F1604D;
        color: #FFF;
        font-size: 24px;
        font-weight: bold;

        &::after {
            display: block;
            content: ' ';
            height: 0;
            clear: both;
        }
    }

    .question {
        margin-top: 30px;
        margin-bottom: 50px;
        text-align: center;
        font-size: 16px;
        font-weight: normal;
    }

    .anwser {
        margin-top: 30px;
        text-align: center;
        font-size: 16px;
        font-weight: normal;
    }

    .join-wrap {
        text-align: center;
        padding: 50px 0 50px 0;
        background-color: #F4F4F4;

        p {
            color: #000;
            font-size: 30px;
            font-weight: bold;
        }
    }

    .foolter {
        padding: 20px 0 20px 0;
        background-color: #FFF;
        text-align: center;

        p {
            margin: 0;
            font-size: 15px;
            color: #000;
        }
    }
</style>