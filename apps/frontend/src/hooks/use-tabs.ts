import { useState } from 'react'

interface Tab {
  id: TabId
  name: string
}

type TabId = string

interface TabsComposable {
  /**
   * Set active first tab from list
   *
   * @memberof TabsComposable
   */
  activateFirstTab: () => void

  /**
   * Currently active tab
   *
   * @type {(TabId | null)} Tab reference or null
   * @memberof TabsComposable
   */
  activeTab: null | TabId

  /**
   * Add new tab to the list
   *
   * @param {Tab} tab Tab object
   * @memberof TabsComposable
   */
  addTab: (tab: Tab) => void

  /**
   * Change currently active tab
   *
   * @param {TabId} id Selected tab ID
   * @memberof TabsComposable
   */
  setActiveTab: (id: TabId) => void

  /**
   * Reactive box holding list of {@link Tab} elements
   *
   * @type {Tab[]} Reference with array of tabs
   * @memberof TabsComposable
   */
  tabs: Tab[]
}

function useTabs(): TabsComposable {
  const [tabs, $setTabs] = useState<Tab[]>([])
  const [activeTab, $setActiveTab] = useState<null | TabId>(null)

  const addTab: TabsComposable['addTab'] = (tab: Tab) => {
    if (!tabs.find((extTab) => extTab.id === tab.id)) {
      $setTabs([...tabs, tab])
    }
  }

  const setActiveTab: TabsComposable['setActiveTab'] = (id: TabId) => {
    if (tabs.find((tab) => tab.id === id)) {
      $setActiveTab(id)
    }
  }

  const activateFirstTab: TabsComposable['activateFirstTab'] = () => {
    const firstTab = tabs?.[0]
    if (typeof firstTab === 'undefined') return

    setActiveTab(firstTab.id)
  }

  return {
    activateFirstTab,
    activeTab,
    addTab,
    setActiveTab,
    tabs,
  }
}

export type { Tab, TabId, TabsComposable }

export { useTabs }
