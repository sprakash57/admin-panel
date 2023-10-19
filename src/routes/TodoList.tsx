import React from 'react';
import { TodosList, TodosListContainer, TodosListRow } from './styled';
import { TodoItem } from './Home';
import { TextField } from 'components/common/TextField';
import DropdownField from 'components/common/DropdownField/DropdownField';
import { redirect } from 'react-router-dom';
import { baseUrl } from 'helpers/constants';
import MemoModal from 'components/Modal';

const TodoList = () => {
  const [items, setItems] = React.useState<TodoItem[]>([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const abortController = new AbortController();

  const actions = [
    { label: 'View', value: 'view' },
    { label: 'Duplicate', value: 'duplicate' },
    { label: 'Delete', value: 'delete' },
  ];

  const handleSelect = (value: string, id: number) => {
    console.log({ value, id });
    if (value === 'view') {
      return redirect(`/todos/${id}`);
    }
  };

  const handleConfirm = async () => {
    try {
      const resp = await fetch(baseUrl.list, { signal: abortController.signal });
      console.log('confirm', { abortController });
      if (resp.ok) {
        const data = (await resp.json()) as TodoItem[];
        setItems(data);
      }
      const resp2 = await fetch(`${baseUrl.list}/3`, { signal: abortController.signal });
      if (resp2.ok) {
        const data = (await resp2.json()) as TodoItem[];
        console.log({ data });
      }
    } catch (error) {
      console.log(error);
      if ((error as { name: string }).name === 'AbortError') {
        console.log({ error });
      } else {
        console.error(error);
      }
    }
  };

  const handleCancel = () => {
    abortController.abort();
    console.log('cancel', { abortController });
    setModalOpen(false);
  };

  return (
    <TodosListContainer>
      <div>
        <button onClick={() => setModalOpen(true)}>Fetch</button>
      </div>
      <TodosList>
        {items.map(({ title, id }) => (
          <TodosListRow key={id.toString()}>
            <TextField variant='S1'>{title}</TextField>
            <DropdownField
              id='actions'
              label='Option'
              items={actions}
              onSelect={(value: string) => handleSelect(value, id)}
            />
          </TodosListRow>
        ))}
      </TodosList>
      <MemoModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div>
          <button onClick={handleConfirm}>Confirm</button>
        </div>
        <div>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </MemoModal>
    </TodosListContainer>
  );
};

export default TodoList;
