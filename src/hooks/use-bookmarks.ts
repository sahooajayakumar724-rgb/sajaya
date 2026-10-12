import { useCallback, useEffect, useState } from "react";

const KEY = "studyspark-bookmarks";

export function useBookmarks() {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    try { setIds(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch { /* ignore */ }
  }, []);
  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);
  return { ids, toggle, has: (id: string) => ids.includes(id) };
}
