import React, { useState } from 'react';
import { ButtonSubmit, FormLabel, Icon } from './ContactForm.styled';
import { AiOutlineUserAdd, AiOutlinePhone } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { formattedNumber } from 'Helpers/formattedNumber';
import { toast } from 'react-toastify';
import { add, setFilter } from 'redux/reduxSlices';
import { nanoid } from 'nanoid';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.items);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const addContact = ({ name, number }) => {
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
    dispatch(add(newContact));
    dispatch(setFilter(''));
  };

  const handleSubmit = e => {
    e.preventDefault();
    addContact({name, number})
    resetForm();
    toast.success(`Contact ${name} is added to Phoonebook!`);
  };

  const inputValue = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormLabel htmlFor="name">Name</FormLabel>
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={inputValue}
      />
      <Icon>
        <AiOutlineUserAdd />
      </Icon>

      <FormLabel htmlFor="number">Number</FormLabel>
      <input
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={inputValue}
      />
      <Icon>
        <AiOutlinePhone />
      </Icon>
      <ButtonSubmit type="submit">Submit</ButtonSubmit>
    </form>
  );
};
