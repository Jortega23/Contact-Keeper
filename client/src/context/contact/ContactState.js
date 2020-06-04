import React, { useReducer } from 'react';
import uuid from 'uuid';
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
        ]
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Actions
    // Add Contact

    // Delete Contact

    // Set Current Contact

    // Clear Current Contact

    // Update Contact

    // Filter Contacts

    // Clear filter


    return (
        <ContactContext.Provider 
        value={{contacts: state.contacts}}
        >
            { props.children}
        </ContactContext.Provider>
    )
};

export default ContactState;