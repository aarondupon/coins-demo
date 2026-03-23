import { useCallback, useState } from 'react';
import type { ChecklistItem } from './Checklist';

/** Set this node and all its descendants to the given value. */
const setNodeAndDescendants = (item: ChecklistItem, value: boolean): ChecklistItem => ({
  ...item,
  value,
  children: item.children?.map((child) => setNodeAndDescendants(child, value)),
});

/** Update a single node by id; cascades to children and recomputes parent. Exported for sectioned checklists. */
export const updateChecklistNode = (items: ChecklistItem[], id: string, value: boolean): ChecklistItem[] =>
  items.map((item) => {
    if (item.id === id) return setNodeAndDescendants(item, value);
    if (!item.children) return item;
    const children = updateChecklistNode(item.children, id, value);
    if (children === item.children) return item;
    const allTrue = children.every((child) => child.value === true);
    const noneTrue = children.every((child) => child.value === false);
    const nodeValue = allTrue ? true : noneTrue ? false : 'indeterminate';
    return { ...item, children, value: nodeValue };
  });

/** Checklist with sub-items. */
export function useChecklist(initial: ChecklistItem[]) {
  const [items, setItems] = useState(initial);

  const toggleItem = useCallback((id: string, value: boolean) => {
    setItems((curr) => updateChecklistNode(curr, id, value));
  }, []);

  const resetItems = useCallback(() => {
    setItems(initial);
  }, [initial]);

  const toggleAll = useCallback((value: boolean) => {
    setItems((curr) => curr.map((item) => setNodeAndDescendants(item, value)));
  }, []);

  return { items, toggleItem, resetItems, toggleAll };
}
