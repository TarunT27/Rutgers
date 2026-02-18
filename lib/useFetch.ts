"use client";

import { useEffect, useState } from "react";

export function useFetch<T>(url: string, enabled = true) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(enabled);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    let active = true;
    setLoading(true);
    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        if (!active) return;
        setData(d);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [url, enabled]);

  return { data, loading };
}
