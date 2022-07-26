import { useCallback, useEffect, useRef, useState } from "react";

export const useInfiniteLoading = (props) => {
  const { getItems } = props; /* 1 */
  const [items, setItems] = useState([]);
  const pageToLoad = useRef(0); /* 2 */
  const initialPageLoaded = useRef(false);
  const [hasMore, setHasMore] = useState(false);

  const loadItems = useCallback(async () => {
    /* 3 */
    pageToLoad.current = pageToLoad.current + 1;
    const data = await getItems({
      page: pageToLoad.current,
    });
    setHasMore(data.data.next); /* 4 */
    console.log(data.data.next);
    setItems((prevItems) => [...prevItems, ...data.data.data]);
  }, [pageToLoad, getItems]);

  useEffect(() => {
    if (initialPageLoaded.current) {
      return;
    }

    loadItems(); /* 5 */
    initialPageLoaded.current = true;
  }, [loadItems]);

  return {
    items,
    hasMore,
    loadItems,
  };
};
