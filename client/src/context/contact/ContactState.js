import React, { useReducer } from 'react';
import { v4 as uuid} from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CURRENT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

// set up Contact state with some initial state
const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id:1,
                name: 'Frank White',
                email: 'fwhite@gmail.com',
                phone: '760-222-2222',
                type: 'professional'
            },
            {
                id:2,
                name: 'Biggies Smalls',
                email: 'Bsmalls@gmail.com',
                phone: '777-777-7777',
                type: 'personal'
            },
            {
                id:3,
                name:'Jimmy Johnson',
                email: 'jjohnson@gmail.com',
                phone: '222-222-2222',
                type: 'professional'
            }
        ],
        current: null,
        filtered: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Actions
    // Add Contact
    const addContact = contact => {
        contact.id = uuid();
        dispatch({ type: ADD_CONTACT, payload: contact })
    }

    // Delete Contact
    const deleteContact = id => {
        dispatch({type: DELETE_CONTACT, payload: id})
    }

    // Set Current Contact
    const setCurrent = contact => {
        dispatch({type: SET_CURRENT, payload:contact});
    }

    // Clear Current Contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT })
    }

    // Update Contact
    const updateContact = contact => {
        dispatch({type: UPDATE_CURRENT, payload: contact });
    };

    // Filter Contacts
    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text});
    }

    // Clear filter
    const clearFilter = () => {
        dispatch({type: CLEAR_FILTER});
    }

    return (
        <ContactContext.Provider 
        value={{ 
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered, 
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter
        }}
        >
            { props.children}
        </ContactContext.Provider>
    )
};

export default ContactState;