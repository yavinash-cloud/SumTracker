// components/ContactTypeahead.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { useNavigate, useLocation } from "react-router-dom";
import config from "../config/config";

interface Contact {
  id: number;
  company_name: string;
}

interface SelectedOption {
  value: number;
  label: string;
}

const ContactTypeahead = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchContacts = async (searchTerm: string) => {
      try {
        const response = await axios.get(
          `https://inventory-dev-295903.appspot.com/contacts/`,
          {
            params: {
              search: searchTerm,
            },
            headers: {
              Authorization: `Token b80d6cd828de414021d722911c663737dc1f2998`,
            },
          }
        );
        console.log({ response });
        setContacts(response.data.results);
      } catch (error) {
        console.log({ error });
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts("");
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const contactId = params.get("contact");
    setSelectedContact(contactId ? parseInt(contactId, 10) : null);
  }, [location.search]);

  const handleContactChange = (selectedOption: SelectedOption | null) => {
    const contactId = selectedOption ? selectedOption.value : null;

    setSelectedContact(contactId);

    if (contactId !== null) {
      const params = new URLSearchParams({ contact: contactId.toString() });
      navigate(`?${params.toString()}`);
    } else {
      navigate("/");
    }
  };

  const resetFilters = () => {
    setSelectedContact(null);
    const params = new URLSearchParams({
      paginate: "true",
      limit: "25",
      offset: "0",
    });
    navigate(`?${params.toString()}`);
  };

  console.log(contacts);
  const options = contacts.map((contact) => ({
    value: contact.id,
    label: contact.company_name,
  }));

  return (
    <div>
      <Select
        options={options}
        value={options.find((option) => option.value === selectedContact)}
        onChange={handleContactChange}
        placeholder="Search for a contact..."
      />
      <button onClick={resetFilters}>Reset</button>
    </div>
  );
};

export default ContactTypeahead;
