import { useQuery } from "@tanstack/react-query";

import { getMenus } from "@/api/endpoints/menus";
import { queryKeys } from "@/query/keys";

export function useMenus(storeId?: string | number) {
  const query = useQuery({
    queryKey: storeId ? queryKeys.restaurant.menus(storeId) : ["restaurant", "menus", "disabled"],
    queryFn: () => getMenus(String(storeId)),
    enabled: !!storeId,
  });

  return {
    ...query,
    activeMenus: query.data ?? [],
    menus: query.data ?? [],
  };
}
