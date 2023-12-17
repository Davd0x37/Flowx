import { useState } from 'react';

export type TabId = string;

export interface Tab {
  id: TabId;
  name: string;
}

export interface TabsComposable {
  /**
   * Reactive box holding list of {@link Tab} elements
   *
   * @type {Tab[]} Reference with array of tabs
   * @memberof TabsComposable
   */
  tabs: Tab[];

  /**
   * Currently active tab
   *
   * @type {(TabId | null)} Tab reference or null
   * @memberof TabsComposable
   */
  activeTab: TabId | null;

  /**
   * Add new tab to the list
   *
   * @param {Tab} tab Tab object
   * @memberof TabsComposable
   */
  addTab: (tab: Tab) => void;

  /**
   * Change currently active tab
   *
   * @param {TabId} id Selected tab ID
   * @memberof TabsComposable
   */
  setActiveTab: (id: TabId) => void;

  /**
   * Set active first tab from list
   *
   * @memberof TabsComposable
   */
  activateFirstTab: () => void;
}

export const useTabs = (): TabsComposable => {
  const [tabs, $setTabs] = useState<Tab[]>([]);
  const [activeTab, $setActiveTab] = useState<TabId | null>(null);

  const addTab: TabsComposable['addTab'] = (tab: Tab) => {
    if (!tabs.find((extTab) => extTab.id === tab.id)) {
      $setTabs([...tabs, tab]);
    }
  };

  const setActiveTab: TabsComposable['setActiveTab'] = (id: TabId) => {
    if (tabs.find((tab) => tab.id === id)) {
      $setActiveTab(id);
    }
  };

  const activateFirstTab: TabsComposable['activateFirstTab'] = () => {
    const firstTab = tabs?.[0];
    if (typeof firstTab === 'undefined') return;

    setActiveTab(firstTab.id);
  };

  return {
    tabs,
    activeTab,
    addTab,
    setActiveTab,
    activateFirstTab,
  };
};
