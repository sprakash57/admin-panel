import React from 'react';
import { autoUpdate, flip, offset, shift, useClick, useDismiss, useFloating, useInteractions } from '@floating-ui/react';
import { DropdownContainer, DropdownItem, DropdownLabel, DropwdownOptionContainer } from './styled';
import { TextField } from 'components/common/TextField';

interface Option {
  label: string;
  value: string;
}

interface Props {
  id: string;
  label: string;
  items: Option[];
  onSelect: (value: string) => void;
  reset?: boolean;
}

const DropdownField = ({ id, label, items, onSelect, reset = false }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [options, setOptions] = React.useState<Option[]>(items.map(item => ({ ...item })));
  const { refs, floatingStyles, context } = useFloating({
    placement: 'bottom-end',
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getFloatingProps, getReferenceProps } = useInteractions([click, dismiss]);

  React.useEffect(() => {
    if (reset) {
      setOptions(items);
    }
  }, [items, reset]);

  const handleClick = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <DropdownLabel id={id} ref={refs.setReference} {...getReferenceProps()}>
        <TextField variant='S2'>{label}</TextField>
      </DropdownLabel>
      {isOpen && (
        <DropwdownOptionContainer style={floatingStyles} ref={refs.setFloating} {...getFloatingProps()}>
          {options.map(({ label, value }) => (
            <DropdownItem key={value} onClick={() => handleClick(value)}>
              <TextField variant='S2'>{label}</TextField>
            </DropdownItem>
          ))}
        </DropwdownOptionContainer>
      )}
    </DropdownContainer>
  );
};

export default DropdownField;
