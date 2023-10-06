export type FeatureName = PropertyKey;

export type Feature<Type> = {
  [Key in keyof Type]: Type[Key] extends (...args: any[]) => any
    ? (...args: Parameters<Type[Key]>) => ReturnType<Type[Key]>
    : Type[Key];
};

export type FeatureType<T> = {
  name: string;
  feature: T;
};

export type FeatureStore<T extends Feature<unknown>> = Map<FeatureName, T>;

let User = {
  name: 'user',
  getUser: () => {
    return User.name;
  },
  setUser: (user: string) => {
    User.name = user;
  },
};

const featureStore: FeatureStore<Feature<unknown>> = new Map();

featureStore.set('user', {
  name: 'user',
  feature: User,
});

function installFeature<T extends Feature<unknown>>(feature: FeatureType<T>) {
  featureStore.set(feature.name, feature);
}

// type MapKeys<T> = T extends Map<infer K, any> ? K : never;

function getFeature<T extends Feature<unknown>>(featureName: FeatureName) {
  return featureStore.get(featureName)
}

installFeature({ name: 'user', feature: User });

type MapKeys<T> = T extends Map<infer K, any> ? K : never;
type MapValues<T> = T extends Map<any, infer V> ? V : never;
const testxd: MapKeys<typeof featureStore> = {}
type MapType<K extends MapKeys<typeof featureStore>, V extends MapValues<typeof featureStore>> = {
  [key in K]: V;
};

const mapType: MapType<MapKeys<typeof featureStore>, MapValues<typeof featureStore>> = {

};

let xd = getFeature('name')
