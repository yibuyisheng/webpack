<template>
    <div id="app">
        <img src="./assets/logo.png">
        {{#router}}
        <router-view></router-view>
        {{else}}
        <hello></hello>
        {{/router}}

        <el-dialog class="global-error-dialog"
            :title="globalErrorTitle"
            v-model="globalErrorVisible"
            size="tiny"
            :close-on-click-modal="false">
            <div class="content"><i class="el-icon-circle-cross"></i>{{ globalErrorContent }}</div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="closeGlobalErrorDialog" size="small">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
{{#unless router}}
import Hello from './components/Hello';

{{/unless}}
export default {
    name: 'app',
    data() {
        return {
            globalErrorTitle: '错误',
            globalErrorVisible: false,
            globalErrorContent: ''
        };
    },
    computed: {
        ...mapState(['globalErrorList'])
    },
    watch: {
        globalErrorList() {
            if (this.globalErrorList && this.globalErrorList.length) {
                this.globalErrorVisible = true;
                this.globalErrorContent = this.globalErrorList[0].message;
                this.globalErrorTitle = this.globalErrorList[0].name || '错误';
            }
        }
    },
    methods: {
        ...mapMutations(['unshiftGlobalError']),

        closeGlobalErrorDialog() {
            this.globalErrorVisible = false;
            this.unshiftGlobalError();
        }
    },
    components: {
        Hello
    }
};
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
