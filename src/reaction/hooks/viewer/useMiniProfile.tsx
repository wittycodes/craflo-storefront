import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import useStores from "hooks/useStores";
import miniProfileQuery from "./miniProfile.gql";

/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useMiniProfile() {
  const { authStore } = useStores();
  const {accessToken } = authStore;

  const { loading, data, refetch } = useQuery(miniProfileQuery, {
    skip: !accessToken
  });

  const viewer = data && data.viewer;

  useEffect(() => {
    if (!viewer && accessToken) {
      refetch();
    }
  }, [accessToken, viewer]);

  return {
    data,
    loading,
    refetch
  };
}
