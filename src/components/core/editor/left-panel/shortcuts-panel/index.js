import ShortcutButton from './shortcut-button'
import langMixin from 'core/mixins/i18n'
import dragMixin from 'core/mixins/drag'
import loadPluginsMixin from 'core/plugins/index'
import { mapActions } from 'vuex'

export default {
  mixins: [langMixin, dragMixin, loadPluginsMixin],
  data: () => ({
    npmPackages: []
  }),
  methods: {
    ...mapActions('editor', [
      'elementManager',
      'pageManager',
      'saveWork',
      'setEditingPage'
    ]),
    ...mapActions('loading', {
      updateLoading: 'update'
    }),
    clone (elementShortcutConfig) {
      this.elementManager({
        type: 'add',
        value: elementShortcutConfig
      })
    }
  },
  render (h) {
    return (
      <a-row gutter={10} style="max-height: calc(100vh - 150px);overflow: auto;margin:0;">
        {
          [].concat(this.pluginsList, this.npmPackages)
            .filter(plugin => plugin.visible)
            .map(plugin => (
              <a-col span={12} style={{ marginTop: '10px' }}>
                <ShortcutButton
                  clickFn={this.clone.bind(this, plugin)}
                  mousedownFn={this.handleDragStartFromMixin.bind(this, plugin)}
                  title={plugin.i18nTitle[this.currentLang] || plugin.title}
                  faIcon={plugin.icon}
                  disabled={plugin.disabled}
                />
              </a-col>
            ))
        }
      </a-row>
    )
  }
}
