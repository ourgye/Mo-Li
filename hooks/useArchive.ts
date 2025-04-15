import Realm from "realm";
import { useEffect, useState } from "react";
import { getAllArchives } from "@/db/crud/archive-method";
import Archive from "@/db/schema/archive";

const useArchive = (realm: Realm) => {
  const [data, setData] = useState<Realm.Results<Archive>>();

  useEffect(() => {
    const objects = getAllArchives(realm);
    setData(objects);

    const listener = (
      newObjects: Realm.OrderedCollection<
        Realm.Object<Archive, never> & Archive,
        [number, Realm.Object<Archive, never> & Archive]
      >,
    ) => {
      const nextArchive = newObjects.sorted("order", true);
      setData(nextArchive);
    };
    objects?.addListener(listener);

    return () => {
      objects?.removeListener(listener);
    };
  }, [realm]);

  return data;
};

export { useArchive };
