import { useSortable } from '@dnd-kit/sortable';
import { Handle, Item } from './styled';
import { TextField } from 'components/common/TextField';
import { CSS } from '@dnd-kit/utilities';

export function SortableItem({ language }: { language: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, setActivatorNodeRef } = useSortable({
    id: language,
  });

  return (
    <Item
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}
    >
      <TextField variant='P2'>{language}</TextField>
      <Handle ref={setActivatorNodeRef} {...listeners}>
        {'::'}
      </Handle>
    </Item>
  );
}
