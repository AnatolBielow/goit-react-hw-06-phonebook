import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Phonebook,
  PhonebookContainer,
  Title,
  TitleContacts,
} from './Base.styled';
import { Filter } from './Filter';
import { ContactList } from './ContactList';
import { ContactForm } from './ContactForm';
import { useSelector } from 'react-redux';

export default function App() {
  const contacts = useSelector(state => state.items);

  return (
    <Phonebook>
      <ToastContainer />
      <PhonebookContainer>
        <Title>Phonebook</Title>
        <ContactForm />
      </PhonebookContainer>
      <PhonebookContainer>
        <TitleContacts>Contacts</TitleContacts>
        {contacts.length > 0 ? (
          <div>
            <Filter />
            <ContactList />
          </div>
        ) : (
          <div>This is no contacts in Phonebook</div>
        )}
      </PhonebookContainer>
    </Phonebook>
  );
}
