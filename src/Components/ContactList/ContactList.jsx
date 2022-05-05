import React from 'react';
import { ContactItem, DeleteButton, Name, Number } from './ContactList.styled';
import { useSelector, useDispatch } from 'react-redux';
import { remove } from 'redux/reduxSlices';
import { toast } from 'react-toastify';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.items);
  const filter = useSelector(state => state.filter);

  const normalizedFilterName = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilterName)
  );

  const handleDelete = contactId => {
    dispatch(remove(contactId));
    toast.info(`Contact is deleted`);
  };

  return (
    <ul>
      {filteredContacts.map(({ id, name, number }) => (
        <ContactItem key={id}>
          <Name>{name}:</Name>
          <Number>{number}</Number>
          <DeleteButton type="delete" onClick={() => handleDelete(id)}>
            Delete
          </DeleteButton>
        </ContactItem>
      ))}
    </ul>
  );
};
