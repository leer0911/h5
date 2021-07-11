import RenderShortcutsPanel from './shortcuts-panel/index'
import RenderPageManager from './page-manager/index'

export default {
  name: 'EditorLeftPanel',
  render (h) {
    return (
      <a-layout-sider width="300" theme='light' style={{ background: '#fff', padding: '12px', paddingLeft: 0 }}>
        <a-tabs
          style="height: 100%;"
          tabBarGutter={10}
          tabPosition="left"
        >
          <a-tab-pane key="plugin-list" tab="组件">
            <RenderShortcutsPanel />
          </a-tab-pane>
          <a-tab-pane key='page-manager' tab="页面">
            <RenderPageManager />
          </a-tab-pane>
        </a-tabs>
      </a-layout-sider>
    )
  }
}
