import { InjectionKey, type Ref, ref } from 'vue';

export type TabId = string;

export interface Tab {
  id: TabId;
  name: string;
}

export interface TabsComposable {
  /**
   * Reactive box holding list of {@link Tab} elements
   *
   * @type {Ref<Tab[]>} Reference with array of tabs
   * @memberof TabsComposable
   */
  tabs: Ref<Tab[]>;

  /**
   * Currently active tab
   *
   * @type {(Ref<TabId | null>)} Tab reference or null
   * @memberof TabsComposable
   */
  activeTab: Ref<TabId | null>;

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

export const tabsComposableSymbol: InjectionKey<TabsComposable> = Symbol('TabsComposable');

export const useTabs = (): TabsComposable => {
  const tabs: Ref<Tab[]> = ref([]);
  const activeTab: Ref<TabId | null> = ref(null);

  const addTab: TabsComposable['addTab'] = (tab: Tab) => {
    if (!tabs.value.find((extTab) => extTab.id === tab.id)) {
      tabs.value.push(tab);
    }
  };

  const setActiveTab: TabsComposable['setActiveTab'] = (id: TabId) => {
    if (tabs.value.find((tab) => tab.id === id)) {
      activeTab.value = id;
    }
  };

  const activateFirstTab: TabsComposable['activateFirstTab'] = () => {
    const firstTab = tabs.value?.[0];
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
