import React from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import { Container } from './styled';
import { TextField } from 'components/common/TextField';

const DndKitDemo = () => {
  const [languages, setLanguages] = React.useState([
    'JavaScript',
    'Python',
    'Ruby',
    'Rust',
    'Golang',
    'C++',
    'HTML',
    'Java',
  ]);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (active.id !== over?.id) {
      setLanguages(prev => {
        const activeId = prev.indexOf(active.id as string);
        const overId = prev.indexOf(over?.id as string);
        return arrayMove(prev, activeId, overId);
      });
    }
  };

  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <TextField variant='H3'>Best Programming languages</TextField>
        <Container>
          <SortableContext items={languages}>
            {languages.map(lang => (
              <SortableItem key={lang} language={lang} />
            ))}
          </SortableContext>
        </Container>
      </DndContext>
    </>
  );
};

export default DndKitDemo;
