import { RouteRecordRaw } from 'vue-router';

export interface FeatureLocales {
  [key: PropertyKey]: Record<PropertyKey, unknown>;
}

export type FeatureRoutes = RouteRecordRaw;

export type FeatureStore<T> = T;

type FeatureName = string;

export interface Feature<StoreType> {
  [key: PropertyKey]: unknown;
  locales: FeatureLocales;
  routes: FeatureRoutes;
  store: StoreType;
}

const featuresStore: Map<FeatureName, Feature<any>> = new Map();

export const getFeatures = () => featuresStore;

export const getFeature = (featureName: FeatureName) => featuresStore.get(featureName);

export const installFeature = <StoreType>(featureName: FeatureName, feature: Feature<StoreType>) => {
  if (featuresStore.has(featureName)) return;

  featuresStore.set(featureName, feature);

  return feature;
};
