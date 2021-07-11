import Vue from 'vue'
import { mapState, mapActions, mapMutations } from 'vuex'

import 'core/support/index.js'
import 'core/styles/index.scss'
import 'core/styles/scrollbar.scss'
import 'animate.css'

import FixedTools from 'core/editor/fixed-tools/index'
import EditorRightPanel from 'core/editor/right-panel/index'
import EditorCanvas from 'core/editor/canvas/index'
import EditorActionMenu from 'core/editor/header/action-menu'
import EditorLeftPanel from 'core/editor/left-panel/index'

import PreviewDialog from 'core/editor/modals/preview.vue'
import ScriptViewDialog from 'core/editor/modals/script-view.vue'
import ScriptListDialog from 'core/editor/modals/script-list.vue'

import store from 'core/store/index'
import router from 'core/router/index'
import i18n from '@/locales'
import '@/plugins/index'

window.EditorApp = new Vue() // event bus

const CoreEditor = {
  name: 'CoreEditor',
  store,
  i18n,
  router,
  props: {
    workId: {
      type: [Number, String]
    }
  },
  data: () => ({
    previewDialogVisible: false,
    propsPanelWidth: 320
  }),
  computed: {
    ...mapState('editor', {
      work: state => state.work
    }),
    ...mapState('dialog', [
      'editScript_dialog',
      'viewScript_dialog',
      'createScript_dialog',
      'allScriptList_dialog'
    ])
  },
  methods: {
    ...mapActions('editor', ['fetchWork']),
    ...mapMutations('dialog', ['updateDialog']),
    handlePreview () {
      this.previewDialogVisible = true
    }
  },
  render (h) {
    return (
      <a-layout>
        <EditorActionMenu onPreview={this.handlePreview} />
        <EditorLeftPanel />
        <EditorCanvas />
        <FixedTools />
        <EditorRightPanel />

        <PreviewDialog
          work={this.work}
          visible={this.previewDialogVisible}
          handleClose={() => {
            this.previewDialogVisible = false
          }}
        />
        <ScriptViewDialog
          zIndex={1001}
          visible={this.viewScript_dialog}
          handleClose={() => {
            this.updateDialog({ type: 'viewScript_dialog', value: false })
          }}
        />
        <ScriptListDialog
          zIndex={1001}
          visible={this.allScriptList_dialog}
          handleClose={() => {
            this.updateDialog({ type: 'allScriptList_dialog', value: false })
          }}
        />
      </a-layout>
    )
  }
}

// Vue install, Vue.use 会调用该方法。
CoreEditor.install = (Vue, opts = {}) => {
  Vue.component(CoreEditor.name, CoreEditor)
}

// 通过script标签引入Vue的环境
if (typeof window !== 'undefined' && window.Vue) {
  CoreEditor.install(window.Vue)
}

export default CoreEditor
