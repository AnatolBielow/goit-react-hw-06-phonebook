import React from 'react';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formattedNumber } from '../Helpers/formattedNumber';

import {
  Phonebook,
  PhonebookContainer,
  Title,
  TitleContacts,
} from './Base.styled';
import { Filter } from './Filter';
import { ContactList } from './ContactList';
import { ContactForm } from './ContactForm';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove, setFilter } from 'redux/reduxSlices';

export default function App() {

  const dispatch = useDispatch();

  const contacts = useSelector(state => state.items);
  const filter = useSelector(state => state.filter);

  const handleSubmit = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number: formattedNumber(number),
    };

    for (let i = 0; i < contacts.length; i++) {
      const normalizedName = contacts[i].name.toLowerCase();
      const oldNumber = contacts[i].number;

      if (newContact.name.toLowerCase() === normalizedName) {
        return toast.error(`Sorry, but ${name} is already in contacts!`);
      }
      if (newContact.number === oldNumber) {
        return toast.error(
          `Sorry, but ${number} belongs to ${contacts[i].name}!`
        );
      }
    }
 
    dispatch(add(newContact))
    resetFilter();
    toast.success(`Contact ${name} is added to Phoonebook!`);
  };

  const onSearching = e => {
    dispatch(setFilter(e.target.value));
  };

  const resetFilter = () => {
    dispatch(setFilter(''));
  };

  const handleDelete = contactId => {
    dispatch(remove(contactId))
    toast.info(`Contact is deleted`);
  };

  const normalizedFilterName = filter.toLowerCase();
  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilterName)
  );

  return (
    <Phonebook>
      <ToastContainer />
      <PhonebookContainer>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={handleSubmit} />
      </PhonebookContainer>
      <PhonebookContainer>
        <TitleContacts>Contacts</TitleContacts>
        {contacts.length > 0 ? (
          <div>
            <Filter value={filter} onChange={onSearching} />
            <ContactList contacts={filterContacts} onDelete={handleDelete} />
          </div>
        ) : (
          <div>This is no contacts in Phonebook</div>
        )}
      </PhonebookContainer>
    </Phonebook>
  );
}
