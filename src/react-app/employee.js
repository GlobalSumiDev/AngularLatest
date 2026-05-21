import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import countryList from 'country-list';
import Sidebar from './Sidebar';
import config from './config';
import Select from 'react-select';

const Employee = () => {
  const [activeTab, setActiveTab] = useState('add-employee');
  const [employees, setEmployees] = useState([]);
  const [lastCreatedPartyId, setLastCreatedPartyId] = useState(null); 
  const [lastCreatedClientId, setLastCreatedClientId] = useState(null);
  const navigate = useNavigate();
  const COUNTRIES = countryList.getNames();
  const [isEditMode, setIsEditMode] = useState(false);

  const [dependentPartyId, setDependentPartyId] = useState(null);
  const [showPartyDependentForm, setShowPartyDependentForm] = useState(false);
  const [partyDependentRel, setPartyDependentRel] = useState('');

  const[usernames, setUsernames] = useState([]);
  const[searchTerm, setSearchTerm] = useState('');
  const[filteredUsers,setFilteredUsers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userOptions, setUserOptions] = useState([]);

  // ── Single IDs for update APIs
  const [bankId, setBankId] = useState(null);
  const [contactId, setContactId] = useState(null);
  const [educationId, setEducationId] = useState(null);
  const [clientId, setClientId] = useState(null);
  const [experienceId, setExperienceId] = useState(null);
  const [addressId, setAddressId] = useState(null);
  const [immigrationId, setImmigrationId] = useState(null);
  const [visaHistoryId, setVisaHistoryId] = useState(null);
  const [dependentId, setDependentId] = useState(null);
  const [partyDependId, setPartyDependId] = useState(null);

  // ── Multiple Records Arrays
  const [bankRecords, setBankRecords] = useState([]);
  const [contactRecords, setContactRecords] = useState([]);
  const [educationRecords, setEducationRecords] = useState([]);
  const [clientRecords, setClientRecords] = useState([]);
  const [experienceRecords, setExperienceRecords] = useState([]);
  const [addressRecords, setAddressRecords] = useState([]);
  const [immigrationRecords, setImmigrationRecords] = useState([]);
  const [visaHistoryRecords, setVisaHistoryRecords] = useState([]);
  const [dependentRecords, setDependentRecords] = useState([]);

  // ── Selected Record Index for each form
  const [selectedBankIndex, setSelectedBankIndex] = useState(null);
  const [selectedContactIndex, setSelectedContactIndex] = useState(null);
  const [selectedEducationIndex, setSelectedEducationIndex] = useState(null);
  const [selectedClientIndex, setSelectedClientIndex] = useState(null);
  const [selectedExperienceIndex, setSelectedExperienceIndex] = useState(null);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [selectedImmigrationIndex, setSelectedImmigrationIndex] = useState(null);
  const [selectedVisaIndex, setSelectedVisaIndex] = useState(null);
  const [selectedDependentIndex, setSelectedDependentIndex] = useState(null);

 const [showAddBank, setShowAddBank] = useState(false);
const [showAddContact, setShowAddContact] = useState(false);
const [showAddEducation, setShowAddEducation] = useState(false);
const [showAddClient, setShowAddClient] = useState(false);
const [showAddExperience, setShowAddExperience] = useState(false);
const [showAddAddress, setShowAddAddress] = useState(false);
const [showAddImmigration, setShowAddImmigration] = useState(false);
const [showAddVisa, setShowAddVisa] = useState(false);
const [showAddDependent, setShowAddDependent] = useState(false);

  // ── Form Data States
  const [formData, setFormData] = useState({
    party_type: '', party_relationship: '', first_name: '', middle_name: '', last_name: '',
    date_of_birth: '', ssn: '', assigned_user_id:'',party_joining_date: '', city_of_birth: '',
    country_of_birth: '', country_of_citizenship: ''
  });

  const [addressFormData, setAddressFormData] = useState({
    party_id: '', client_id: '', address_type: '', address_line_1: '', address_line_2: '',
    address_line_3: '', city: '', state: '', zipcode: '', country: ''
  });

  const [contactFormData, setContactFormData] = useState({
    party_id: '', phone_number: '', email: ''
  });

  const [bankFormData, setBankFormData] = useState({
    party_id: '', bank_name: '', account_number: '', routing_number: '', bank_status: '', zip_code: ''
  });

  const [educationFormData, setEducationFormData] = useState({
    party_id: '', degree: '', university_name: '', year_awarded: '', coursework_details: ''
  });

  const [experienceFormData, setExperienceFormData] = useState({
    party_id: '', employer_name: '', from_date: '', to_date: '', designation: '', role: '', job_duties: ''
  });

  const [clientFormData, setClientFormData] = useState({
    party_id: '', client_name: '', party_client_joining_date: ''
  });

  const [immigrationFormData, setImmigrationFormData] = useState({
    party_id: '', current_status: '', status_requested: '', current_status_expiration: '',
    consulate_city: '', consulate_country: '', i94_number: '', i94_issue_date: '',
    i94_expiration: '', last_arrival_date: '', passport_number: '', passport_issue_date: '',
    passport_expiration_date: '', passport_place_of_issue: ''
  });

  const [visaHistoryFormData, setVisaHistoryFormData] = useState({
    party_id: '', visa_type: '', date_of_arrival: '', date_of_departure: '', receipt_number: ''
  });

  const [dependentFormData, setDependentFormData] = useState({
    party_type: 'Dependent', party_relationship: '', first_name: '', middle_name: '',
    last_name: '', date_of_birth: '', ssn: '', party_joining_date: '',
    city_of_birth: '', country_of_birth: '', country_of_citizenship: ''
  });

  const [partyDependentData, setPartyDependentData] = useState({
    party_id_1: '', party_id_2: '', party_1_2_rel: '', party_depend_id: ''
  });

  const [editableForms, setEditableForms] = useState({
    party: false, bank: false, contact: false, education: false, client: false,
    experience: false, address: false, immigration: false, visaHistory: false, dependent: false,
  });


  const handleUsernameSearch = (e) =>{
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = usernames.filter((u) =>
      u.username.toLowerCase().includes(value.toLowerCase())
  )
  setFilteredUsers(filtered)
  }

  // ── Styles
  const inputStyle = { width: '100%', padding: '0.75rem', border: '1px solid #ced4da', borderRadius: '0.25rem', fontSize: '1rem', boxSizing: 'border-box' };
  const labelStyle = { display: 'block', marginBottom: '0.5rem', fontWeight: '500' };
  const buttonStyle = { width: '100%', padding: '0.75rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '0.25rem', fontSize: '1rem', fontWeight: '500', cursor: 'pointer' };
  const readOnlyStyle = { ...inputStyle, backgroundColor: '#e9ecef', cursor: 'not-allowed' };

  const recordCardStyle = (isSelected) => ({
    padding: '1rem',
    border: isSelected ? '2px solid #007bff' : '1px solid #dee2e6',
    borderRadius: '0.5rem',
    marginBottom: '0.75rem',
    cursor: 'pointer',
    backgroundColor: isSelected ? '#f0f7ff' : 'white',
    transition: 'all 0.2s'
  });

  // ── fetchPartyDetails
  const fetchPartyDetails = async (partyId) => {
    console.log('=== fetchPartyDetails called with:', partyId);
    try {
      const token = localStorage.getItem('authToken');
      console.log('token:', token);
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      
      const allPartiesForFormRes = await fetch(`${config.BASE_URL}/party/get-all-parties`, { headers });
      if (allPartiesForFormRes.ok) {
        const allPartiesForForm = await allPartiesForFormRes.json();
        const party = Array.isArray(allPartiesForForm)
          ? allPartiesForForm.find(p => p.party_id === partyId)
          : null;
        if (party) {
          setFormData({
            party_type: party.party_type || '',
            party_relationship: party.party_relationship || '',
            first_name: party.first_name || '',
            middle_name: party.middle_name || '',
            last_name: party.last_name || '',
            date_of_birth: party.date_of_birth || '',
            ssn: party.ssn || '',
            assigned_user_id:party.assigned_to||'',
            party_joining_date: party.party_joining_date || '',
            city_of_birth: party.city_of_birth || '',
            country_of_birth: party.country_of_birth || '',
            country_of_citizenship: party.country_of_citizenship || '',
          });
          console.log('formData set');
        }
      }

      

      // ── Bank — use direct party API
const bankRes = await fetch(
  `${config.BASE_URL}/bank/party/${partyId}`,
  { headers }
);

if (bankRes.ok) {
  const bankData = await bankRes.json();
  console.log('bank data:', bankData);

  // ← API returns array of banks for this party
  const banks = Array.isArray(bankData) ? bankData : [bankData];
  setBankRecords(banks);

  // ← Auto select first record
  if (banks.length > 0) {
    setBankId(banks[0].bank_id);
    setBankFormData({
      bank_name: banks[0].bank_name || '',
      account_number: banks[0].account_number || '',
      routing_number: banks[0].routing_number || '',
      bank_status: banks[0].bank_status || '',
      zip_code: banks[0].zip_code || '',
    });
    setSelectedBankIndex(0);
  }
} else {
  console.log('Bank API failed:', bankRes.status);
}

const contactRes = await fetch(
  `${config.BASE_URL}/contact/party/${partyId}`,
  { headers }
);

if (contactRes.ok) {
  const contactData = await contactRes.json();
  console.log('contact data:', contactData);
  const contacts = Array.isArray(contactData) ? contactData : [contactData];
  setContactRecords(contacts);
 if (contacts.length > 0) {
    setContactId(contacts[0].contact_id);
    setContactFormData({
     phone_number:contacts[0].phone_number || "",
      email: contacts[0].email || "",
       });
    setSelectedContactIndex(0);
  }
} else {
  console.log('Contact API failed:', contactRes.status);
}


 const educationRes = await fetch(
  `${config.BASE_URL}/education/party/${partyId}`,
  { headers }
);
if (educationRes.ok) {
  const educationData = await educationRes.json();
  console.log('education data:', educationData);
  const educations = Array.isArray(educationData) ? educationData : [educationData];
  setEducationRecords(educations);
 if (educations.length > 0) {
    setEducationId(educations[0].education_id);
    setEducationFormData({
     degree: educations[0].degree || '',
     university_name: educations[0].university_name || '',
     year_awarded: educations[0].year_awarded || '',
     coursework_details: educations[0].coursework_details || '',
      });
    setSelectedEducationIndex(0);
  }
} else {
  console.log('Education API failed:', educationRes.status);
}

    const clientRes = await fetch(
  `${config.BASE_URL}/client/party/${partyId}`,
  { headers }
);

if (clientRes.ok) {
  const clientData = await clientRes.json();
  console.log('client data:', clientData);
  const clients = Array.isArray(clientData) ? clientData : [clientData];
  setClientRecords(clients);
   if (clients.length > 0) {
    setClientId(clients[0].client_id);
    setClientFormData({
      client_name: clients[0].client_name || "",
      party_client_joining_date:clients[0].party_client_joining_date || "",
    });
    setSelectedClientIndex(0);
  }
} else {
  console.log('Client API failed:', clientRes.status);
}

 const experienceRes = await fetch(
  `${config.BASE_URL}/experience/party/${partyId}`,
  { headers }
);

if (experienceRes.ok) {
  const experienceData = await experienceRes.json();
  console.log('experience data:', experienceData);
  const experiences = Array.isArray(experienceData) ? experienceData : [experienceData];
  setExperienceRecords(experiences);
   if (experiences.length > 0) {
    setExperienceId(experiences[0].experience_id);
    setExperienceFormData({
     employer_name: experiences[0].employer_name || '',
      from_date: experiences[0].from_date || '',
      to_date: experiences[0].to_date || '',
      designation: experiences[0].designation || '',
      role: experiences[0].role || '',
      job_duties: experiences[0].job_duties || '',
    });
    setSelectedExperienceIndex(0);
  }
} else {
  console.log('Experience API failed:', experienceRes.status);
}

const addressRes = await fetch(
  `${config.BASE_URL}/address/party/${partyId}`,
  { headers }
);

if (addressRes.ok) {
  const addressData = await addressRes.json();
  console.log('Address data:', addressData);
  const addresss = Array.isArray(addressData) ? addressData : [addressData];
  setAddressRecords(addresss);
   if (addresss.length > 0) {
    setAddressId(addresss[0].address_id);
    setAddressFormData({
    

      client_id: addresss[0].client_id || '',
      address_type: addresss[0].address_type || '',
      address_line_1: addresss[0].address_line_1 || '',
      address_line_2: addresss[0].address_line_2 || '',
      address_line_3: addresss[0].address_line_3 || '',
      city: addresss[0].city || '',
      state: addresss[0].state || '',
      zipcode: addresss[0].zipcode || '',
      country: addresss[0].country || '',
    });
    setSelectedAddressIndex(0);
  }
} else {
  console.log('Address API failed:', addressRes.status);
}

 const immigrationRes = await fetch(
  `${config.BASE_URL}/immigration/party/${partyId}`,
  { headers }
);

if (immigrationRes.ok) {
  const immigrationData = await immigrationRes.json();
  console.log('Immigration data:', immigrationData);
  const immigrations = Array.isArray(immigrationData) ? immigrationData : [immigrationData];
  setImmigrationRecords(immigrations);
 if (immigrations.length > 0) {
    setImmigrationId(immigrations[0].immigration_id);
    setImmigrationFormData({
      current_status: immigrations[0].current_status || '',
      status_requested: immigrations[0].status_requested || '',
      current_status_expiration: immigrations[0].current_status_expiration || '',
      consulate_city: immigrations[0].consulate_city || '',
      consulate_country: immigrations[0].consulate_country || '',
      i94_number: immigrations[0].i94_number || '',
      i94_issue_date: immigrations[0].i94_issue_date || '',
      i94_expiration: immigrations[0].i94_expiration || '',
      last_arrival_date: immigrations[0].last_arrival_date || '',
      passport_number: immigrations[0].passport_number || '',
      passport_issue_date:immigrations[0].passport_issue_date || '',
      passport_expiration_date: immigrations[0].passport_expiration_date || '',
      passport_place_of_issue:immigrations[0].passport_place_of_issue || ''
       });
    setSelectedImmigrationIndex(0);
  }
} else {
  console.log('Immigration API failed:', immigrationRes.status);
}

   const visaHistoryRes = await fetch(
  `${config.BASE_URL}/visahistory/party/${partyId}`,
  { headers }
);

if (visaHistoryRes.ok) {
  const visaHistoryData = await visaHistoryRes.json();
  console.log('visaHistory data:', visaHistoryData);
  const visaHistories = Array.isArray(visaHistoryData) ? visaHistoryData : [visaHistoryData];
  setVisaHistoryRecords(visaHistories);
   if (visaHistories.length > 0) {
    setVisaHistoryId(visaHistories[0].visa_id);
     console.log('visaHistoryId set to:', visaHistories[0].visa_id);
    setVisaHistoryFormData({
     
 
      visa_type: visaHistories[0].visa_type || '',
      date_of_arrival: visaHistories[0].date_of_arrival || '',
      date_of_departure: visaHistories[0].date_of_departure || '',
      receipt_number: visaHistories[0].receipt_number || '',

    });
    setSelectedVisaIndex(0);
  }
} else {
  console.log('Visahistory API failed:', visaHistoryRes.status);
}
   
  


      // ── Dependent — filter ALL records
      const allDependentsRes = await fetch(`${config.BASE_URL}/partydependent/Get-All-Dependent`, { headers });
      if (allDependentsRes.ok) {
        const allDependents = await allDependentsRes.json();
        const matchingDependents = Array.isArray(allDependents)
          ? allDependents.filter(d => d.party_id_1 === partyId)
          : [];

        if (matchingDependents.length > 0) {
          const allPartiesRes = await fetch(`${config.BASE_URL}/party/get-all-parties`, { headers });
          if (allPartiesRes.ok) {
            const allParties = await allPartiesRes.json();
            const dependentDetails = matchingDependents.map(dep => {
              const depParty = allParties.find(p => p.party_id === dep.party_id_2);
              return { ...dep, ...(depParty || {}) };
            });
            setDependentRecords(dependentDetails);
            console.log('Dependent records:', dependentDetails);

           if (dependentDetails.length > 0) {
        setDependentPartyId(dependentDetails[0].party_id_2 || dependentDetails[0].party_id);
        setPartyDependentRel(dependentDetails[0].party_1_2_rel || '');
        setDependentFormData({
          party_type: dependentDetails[0].party_type || 'Dependent',
          party_relationship: dependentDetails[0].party_relationship || '',
          first_name: dependentDetails[0].first_name || '',
          middle_name: dependentDetails[0].middle_name || '',
          last_name: dependentDetails[0].last_name || '',
          date_of_birth: dependentDetails[0].date_of_birth || '',
          ssn: dependentDetails[0].ssn || '',
          party_joining_date: dependentDetails[0].party_joining_date || '',
          city_of_birth: dependentDetails[0].city_of_birth || '',
          country_of_birth: dependentDetails[0].country_of_birth || '',
          country_of_citizenship: dependentDetails[0].country_of_citizenship || '',
        });
        setSelectedDependentIndex(0);
      }
     }
        }
      } else {
        console.log('Get-All-Dependent API failed:', allDependentsRes.status);
      }

    } catch (error) {
      console.error('Error fetching party details:', error);
    }
  };

  // ── Update Party
  const handleUpdateParty = async (e) => {
    e.preventDefault();
    const partyId = lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId');
    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const response = await fetch(`${config.BASE_URL}/party/update-party?party_id=${partyId}`, {
        method: 'PUT', headers, body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error('Failed to update party');
      alert('Employee updated successfully!');
      setEditableForms(prev => ({ ...prev, party: false }));
    } catch (error) {
      alert(`Failed: ${error.message}`);
    }
  };

  // ── Update Bank
  const handleUpdateBank = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const response = await fetch(`${config.BASE_URL}/bank/${bankId}`, {
        method: 'PUT', headers, body: JSON.stringify(bankFormData)
      });
      if (!response.ok) throw new Error('Failed to update bank');
      // Update the record in the list
      setBankRecords(prev => prev.map((b, i) => i === selectedBankIndex ? { ...b, ...bankFormData } : b));
      alert('Bank updated successfully!');
      setEditableForms(prev => ({ ...prev, bank: false }));
    } catch (error) {
      alert(`Failed: ${error.message}`);
    }
  };

  // ── Update Contact
  const handleUpdateContact = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const response = await fetch(`${config.BASE_URL}/contact/${contactId}`, {
        method: 'PATCH', headers, body: JSON.stringify(contactFormData)
      });
      if (!response.ok) throw new Error('Failed to update contact');
      setContactRecords(prev => prev.map((c, i) => i === selectedContactIndex ? { ...c, ...contactFormData } : c));
      alert('Contact updated successfully!');
      setEditableForms(prev => ({ ...prev, contact: false }));
    } catch (error) {
      alert(`Failed: ${error.message}`);
    }
  };

  // ── Update Education
  const handleUpdateEducation = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const response = await fetch(`${config.BASE_URL}/education/${educationId}`, {
        method: 'PUT', headers, body: JSON.stringify(educationFormData)
      });
      if (!response.ok) throw new Error('Failed to update education');
      setEducationRecords(prev => prev.map((e, i) => i === selectedEducationIndex ? { ...e, ...educationFormData } : e));
      alert('Education updated successfully!');
      setEditableForms(prev => ({ ...prev, education: false }));
    } catch (error) {
      alert(`Failed: ${error.message}`);
    }
  };

  // ── Update Client
  const handleUpdateClient = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const response = await fetch(`${config.BASE_URL}/client/Update-Client?client_id=${clientId}`, {
        method: 'PUT', headers, body: JSON.stringify(clientFormData)
      });
      if (!response.ok) throw new Error('Failed to update client');
      setClientRecords(prev => prev.map((c, i) => i === selectedClientIndex ? { ...c, ...clientFormData } : c));
      alert('Client updated successfully!');
      setEditableForms(prev => ({ ...prev, client: false }));
    } catch (error) {
      alert(`Failed: ${error.message}`);
    }
  };

  // ── Update Experience
  const handleUpdateExperience = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const response = await fetch(`${config.BASE_URL}/experience/Update-Experience?experience_id=${experienceId}`, {
        method: 'PUT', headers, body: JSON.stringify(experienceFormData)
      });
      if (!response.ok) throw new Error('Failed to update experience');
      setExperienceRecords(prev => prev.map((e, i) => i === selectedExperienceIndex ? { ...e, ...experienceFormData } : e));
      alert('Experience updated successfully!');
      setEditableForms(prev => ({ ...prev, experience: false }));
    } catch (error) {
      alert(`Failed: ${error.message}`);
    }
  };

  // ── Update Address
  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const response = await fetch(`${config.BASE_URL}/address/update-address?address_id=${addressId}`, {
        method: 'PUT', headers, body: JSON.stringify(addressFormData)
      });
      if (!response.ok) throw new Error('Failed to update address');
      setAddressRecords(prev => prev.map((a, i) => i === selectedAddressIndex ? { ...a, ...addressFormData } : a));
      alert('Address updated successfully!');
      setEditableForms(prev => ({ ...prev, address: false }));
    } catch (error) {
      alert(`Failed: ${error.message}`);
    }
  };

  // ── Update Immigration
  const handleUpdateImmigration = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const response = await fetch(`${config.BASE_URL}/immigration/${immigrationId}`, {
        method: 'PATCH', headers, body: JSON.stringify(immigrationFormData)
      });
      if (!response.ok) throw new Error('Failed to update immigration');
      setImmigrationRecords(prev => prev.map((im, i) => i === selectedImmigrationIndex ? { ...im, ...immigrationFormData } : im));
      alert('Immigration updated successfully!');
      setEditableForms(prev => ({ ...prev, immigration: false }));
    } catch (error) {
      alert(`Failed: ${error.message}`);
    }
  };

  // ── Update Visa History
  const handleUpdateVisaHistory = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const response = await fetch(`${config.BASE_URL}/visahistory/Update-Visa-History?visa_id=${visaHistoryId}`, {
        method: 'PUT', headers, body: JSON.stringify(visaHistoryFormData)
      });
      if (!response.ok) throw new Error('Failed to update visa history');
      setVisaHistoryRecords(prev => prev.map((v, i) => i === selectedVisaIndex ? { ...v, ...visaHistoryFormData } : v));
      alert('Visa History updated successfully!');
      setEditableForms(prev => ({ ...prev, visaHistory: false }));
    } catch (error) {
      alert(`Failed: ${error.message}`);
    }
  };

  // ── Update Dependent
  const handleUpdateDependent = async (e) => {
    e.preventDefault();
    console.log('dependentPartyId:', dependentPartyId);
    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const response = await fetch(`${config.BASE_URL}/party/update-party?party_id=${dependentPartyId}`, {
        method: 'PUT', headers,
        body: JSON.stringify({
          party_type: dependentFormData.party_type || 'Dependent',
          party_relationship: dependentFormData.party_relationship || '',
          first_name: dependentFormData.first_name || '',
          middle_name: dependentFormData.middle_name || '',
          last_name: dependentFormData.last_name || '',
          date_of_birth: dependentFormData.date_of_birth || '',
          ssn: dependentFormData.ssn || '',
          city_of_birth: dependentFormData.city_of_birth || '',
          country_of_birth: dependentFormData.country_of_birth || '',
          country_of_citizenship: dependentFormData.country_of_citizenship || '',
          party_joining_date: null,
        })
      });
      if (!response.ok) throw new Error(`Failed: ${response.status}`);
      setDependentRecords(prev => prev.map((d, i) => i === selectedDependentIndex ? { ...d, ...dependentFormData } : d));
      alert('Dependent updated successfully!');
      setEditableForms(prev => ({ ...prev, dependent: false }));
    } catch (error) {
      alert(`Failed: ${error.message}`);
    }
  };

 // ── useEffect
useEffect(() => {
  console.log('=== useeffect running==');

  const token = localStorage.getItem('authToken');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${config.BASE_URL}/user/getusers`, { headers });
      const data = await res.json();
      const options = data.map((user) => ({
        value: user.id,
        label: user.username
      }));
      setUserOptions(options);
      console.log('user options loaded:', options);
      return options;
    } catch (err) {
      console.error('Error fetching users:', err);
      return [];
    }
  };

  const selectedEmployee = localStorage.getItem('selectedEmployee');

  if (selectedEmployee) {
    const emp = JSON.parse(selectedEmployee);
    console.log('editing employee:', emp);
    setIsEditMode(true);
    setLastCreatedPartyId(emp.party_id);
    localStorage.setItem('lastCreatedPartyId', emp.party_id);
    localStorage.removeItem('selectedEmployee');

    fetchUsers().then(() => {
      console.log('calling fetchPartyDetails:', emp.party_id);
      fetchPartyDetails(emp.party_id);
    });

  } else {
    fetchUsers();
    localStorage.removeItem('lastCreatedPartyId');
    localStorage.removeItem('lastCreatedClientId');
    setLastCreatedPartyId(null);
    setLastCreatedClientId(null);
  }
}, []);

 const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  const handleHome = () => { window.location.href = '/welcomePage'; };

  // ── Input Handlers
  const handleInputChange = (e) => { const { name, value } = e.target; setFormData({ ...formData, [name]: value }); };
  const handleAddressInputChange = (e) => { const { name, value } = e.target; setAddressFormData({ ...addressFormData, [name]: value }); };
  const handleContactInputChange = (e) => { const { name, value } = e.target; setContactFormData({ ...contactFormData, [name]: value }); };
  const handleBankInputChange = (e) => { const { name, value } = e.target; setBankFormData({ ...bankFormData, [name]: value }); };
  const handleEducationInputChange = (e) => { const { name, value } = e.target; setEducationFormData({ ...educationFormData, [name]: value }); };
  const handleExperienceInputChange = (e) => { const { name, value } = e.target; setExperienceFormData({ ...experienceFormData, [name]: value }); };
  const handleClientInputChange = (e) => { const { name, value } = e.target; setClientFormData({ ...clientFormData, [name]: value }); };
  const handleImmigrationInputChange = (e) => { const { name, value } = e.target; setImmigrationFormData({ ...immigrationFormData, [name]: value }); };
  const handleVisaHistoryInputChange = (e) => { const { name, value } = e.target; setVisaHistoryFormData({ ...visaHistoryFormData, [name]: value }); };
  const handleDependentInputChange = (e) => { const { name, value } = e.target; setDependentFormData({ ...dependentFormData, [name]: value }); };

  // ── Submit Handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.first_name || !formData.last_name || !formData.date_of_birth || !formData.ssn) {
      alert('Please fill in all required fields.'); return;
    }
    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      console.log('Creating party with data:', JSON.stringify(formData));
    console.log('token:', token);

      const response = await fetch(`${config.BASE_URL}/party/create-party`, {
        method: 'POST', headers, body: JSON.stringify(formData)
      });
     const responseText = await response.text();

      console.log('response status:', response.status);
      console.log('response body:', responseText);

    
      if (!response.ok) throw new Error('Failed to save employee');
      const result = JSON.parse(responseText);
      const partyId = result.party_id || result.id || result.partyId;
      setLastCreatedPartyId(partyId);
      localStorage.setItem('lastCreatedPartyId', partyId);
      setEmployees([...employees, { id: partyId, party_id: partyId, ...formData }]);
      setFormData({ party_type: '', party_relationship: '', first_name: '', middle_name: '', last_name: '', date_of_birth: '', ssn: '', party_joining_date: '', city_of_birth: '', country_of_birth: '', country_of_citizenship: '' });
      alert('Employee saved successfully!');
    } catch (error) {
      alert(`Failed to save employee: ${error.message}`);
    }
  };

  const handleBankSubmit = async (e) => {
    e.preventDefault();
    const partyId = lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId');
    if (!partyId) { alert('Please add an employee first.'); setActiveTab('add-employee'); return; }
    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const response = await fetch(`${config.BASE_URL}/bank`, {
        method: 'POST', headers, body: JSON.stringify({ ...bankFormData, party_id: partyId })
      });
      if (!response.ok) throw new Error('Failed to save bank');
      const result = await response.json();
      const newRecord = { ...bankFormData, party_id: partyId, bank_id: result.bank_id || result.id };
      setBankRecords(prev => [...prev, newRecord]);
      setBankFormData({ bank_name: '', account_number: '', routing_number: '', bank_status: '', zip_code: '' });
      alert('Bank saved successfully!');
    } catch (error) {
      alert(`Failed: ${error.message}`);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const partyId = lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId');
    if (!partyId) { alert('Please add an employee first.'); setActiveTab('add-employee'); return; }
    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const response = await fetch(`${config.BASE_URL}/contact`, {
        method: 'POST', headers, body: JSON.stringify({ ...contactFormData, party_id: partyId })
      });
      if (!response.ok) throw new Error('Failed to save contact');
      const result = await response.json();
      const newRecord = { ...contactFormData, party_id: partyId, contact_id: result.contact_id || result.id };
      setContactRecords(prev => [...prev, newRecord]);
      setContactFormData({ phone_number: '', email: '' });
      alert('Contact saved successfully!');
    } catch (error) {
      alert(`Failed: ${error.message}`);
    }
  };

  const handleEducationSubmit = async (e) => {
    e.preventDefault();
    const partyId = lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId');
    if (!partyId) { alert('Please add an employee first.'); setActiveTab('add-employee'); return; }
    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const response = await fetch(`${config.BASE_URL}/education`, {
        method: 'POST', headers,
        body: JSON.stringify({ party_id: partyId, degree: educationFormData.degree, university_name: educationFormData.university_name, year_awarded: parseInt(educationFormData.year_awarded), coursework_details: educationFormData.coursework_details })
      });
      if (!response.ok) throw new Error('Failed to save education');
      const result = await response.json();
      const newRecord = { ...educationFormData, party_id: partyId, education_id: result.education_id || result.id };
      setEducationRecords(prev => [...prev, newRecord]);
      setEducationFormData({ degree: '', university_name: '', year_awarded: '', coursework_details: '' });
      alert('Education saved successfully!');
    } catch (error) {
      alert(`Failed: ${error.message}`);
    }
  };

  const handleClientSubmit = async (e) => {
    e.preventDefault();
    const partyId = lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId');
    if (!partyId) { alert('Please add an employee first.'); setActiveTab('add-employee'); return; }
    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const response = await fetch(`${config.BASE_URL}/client/Create-Client`, {
        method: 'POST', headers, body: JSON.stringify({ ...clientFormData, party_id: partyId })
      });
      const responseText = await response.text();
      if (!response.ok) throw new Error('Failed to save client');
      const result = JSON.parse(responseText);
      const newClientId = result.client_id;
      if (newClientId) {
        setLastCreatedClientId(newClientId);
        localStorage.setItem('lastCreatedClientId', newClientId);
        setAddressFormData(prev => ({ ...prev, client_id: newClientId }));
      }
      const newRecord = { ...clientFormData, party_id: partyId, client_id: newClientId };
      setClientRecords(prev => [...prev, newRecord]);
      setClientFormData({ client_name: '', party_client_joining_date: '' });
      alert('Client saved successfully!');
    } catch (error) {
      alert(`Failed: ${error.message}`);
    }
  };

  const handleExperienceSubmit = async (e) => {
    e.preventDefault();
    const partyId = lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId');
    if (!partyId) { alert('Please add an employee first.'); setActiveTab('add-employee'); return; }
    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const response = await fetch(`${config.BASE_URL}/experience/Create-Experience`, {
        method: 'POST', headers, body: JSON.stringify({ ...experienceFormData, party_id: partyId })
      });
      if (!response.ok) throw new Error('Failed to save experience');
      const result = await response.json();
      const newRecord = { ...experienceFormData, party_id: partyId, experience_id: result.experience_id || result.id };
      setExperienceRecords(prev => [...prev, newRecord]);
      setExperienceFormData({ employer_name: '', from_date: '', to_date: '', designation: '', role: '', job_duties: '' });
      alert('Experience saved successfully!');
    } catch (error) {
      alert(`Failed: ${error.message}`);
    }
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    const partyId = lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId');
    if (!partyId) { alert('Please add an employee first.'); setActiveTab('add-employee'); return; }
    if (!addressFormData.address_line_1 || !addressFormData.city || !addressFormData.state || !addressFormData.zipcode) {
      alert('Please fill in all required address fields.'); return;
    }
    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const addressData = {
        party_id: partyId,
        client_id: addressFormData.client_id && addressFormData.client_id.trim() !== '' ? addressFormData.client_id : null,
        address_type: addressFormData.address_type,
        address_line_1: addressFormData.address_line_1,
        address_line_2: addressFormData.address_line_2,
        address_line_3: addressFormData.address_line_3,
        city: addressFormData.city,
        state: addressFormData.state,
        zipcode: addressFormData.zipcode,
        country: addressFormData.country
      };
      const response = await fetch(`${config.BASE_URL}/address/create-address`, {
        method: 'POST', headers, body: JSON.stringify(addressData)
      });
      if (!response.ok) throw new Error('Failed to save address');
      const result = await response.json();
      const newRecord = { ...addressData, address_id: result.address_id || result.id };
      setAddressRecords(prev => [...prev, newRecord]);
      setAddressFormData({ client_id: addressFormData.client_id, address_type: '', address_line_1: '', address_line_2: '', address_line_3: '', city: '', state: '', zipcode: '', country: '' });
      alert('Address saved successfully!');
    } catch (error) {
      alert(`Failed: ${error.message}`);
    }
  };

  const handleImmigrationSubmit = async (e) => {
    e.preventDefault();
    const partyId = lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId');
    if (!partyId) { alert('Please add an employee first.'); setActiveTab('add-employee'); return; }
    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const response = await fetch(`${config.BASE_URL}/immigration`, {
        method: 'POST', headers, body: JSON.stringify({ ...immigrationFormData, party_id: partyId })
      });
      if (!response.ok) throw new Error('Failed to save immigration');
      const result = await response.json();
      const newRecord = { ...immigrationFormData, party_id: partyId, immigration_id: result.immigration_id || result.id };
      setImmigrationRecords(prev => [...prev, newRecord]);
      setImmigrationFormData({ current_status: '', status_requested: '', current_status_expiration: '', consulate_city: '', consulate_country: '', i94_number: '', i94_issue_date: '', i94_expiration: '', last_arrival_date: '', passport_number: '', passport_issue_date: '', passport_expiration_date: '', passport_place_of_issue: '' });
      alert('Immigration saved successfully!');
    } catch (error) {
      alert(`Failed: ${error.message}`);
    }
  };

  const handleVisaHistorySubmit = async (e) => {
    e.preventDefault();
    const partyId = lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId');
    if (!partyId) { alert('Please add an employee first.'); setActiveTab('add-employee'); return; }
    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const response = await fetch(`${config.BASE_URL}/visahistory/Create-Visa-History`, {
        method: 'POST', headers, body: JSON.stringify({ ...visaHistoryFormData, party_id: partyId })
      });
      if (!response.ok) throw new Error('Failed to save visa history');
      const result = await response.json();
      const newRecord = { ...visaHistoryFormData, party_id: partyId, visa_id: result.visa_id || result.id };
      setVisaHistoryRecords(prev => [...prev, newRecord]);
      setVisaHistoryFormData({ visa_type: '', date_of_arrival: '', date_of_departure: '', receipt_number: '' });
      alert('Visa history saved successfully!');
    } catch (error) {
      alert(`Failed: ${error.message}`);
    }
  };

  const handleDependentSubmit = async (e) => {
    e.preventDefault();
    const mainPartyId = lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId');
    if (!mainPartyId) { alert('Please add an employee first.'); return; }
    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const dependentPayload = { ...dependentFormData, party_type: 'Dependent', party_joining_date: null };
      const dependentRes = await fetch(`${config.BASE_URL}/party/create-party`, {
        method: 'POST', headers, body: JSON.stringify(dependentPayload)
      });
      if (!dependentRes.ok) throw new Error('Failed to create dependent');
      const dependentResult = await dependentRes.json();
      console.log('Dependent created:', dependentResult);
      const allPartiesRes = await fetch(`${config.BASE_URL}/party/get-all-parties`, { headers });
      if (allPartiesRes.ok) {
        const allParties = await allPartiesRes.json();
        const newDependent = Array.isArray(allParties)
          ? allParties.find(p => p.first_name === dependentFormData.first_name && p.last_name === dependentFormData.last_name && p.ssn === dependentFormData.ssn && p.party_type === 'Dependent')
          : null;
        if (newDependent) {
          setDependentPartyId(newDependent.party_id);
          setPartyDependentRel(dependentFormData.party_relationship || '');
          setShowPartyDependentForm(true);
        } else {
          alert('Could not find created dependent. Please try again.');
        }
      }
    } catch (error) {
      alert(`Failed: ${error.message}`);
    }
  };

  const handlePartyDependentSubmit = async (e) => {
    e.preventDefault();
    const mainPartyId = lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId');
    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': '*'};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const payload = { party_id_1: mainPartyId, party_id_2: dependentPartyId, party_1_2_rel: partyDependentRel };
      const res = await fetch(`${config.BASE_URL}/partydependent/Create-party-dependent`, {
        method: 'POST', headers, body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to create party dependent');
      const result = await res.json();
      const newRecord = { ...dependentFormData, party_id_1: mainPartyId, party_id_2: dependentPartyId, party_1_2_rel: partyDependentRel };
      setDependentRecords(prev => [...prev, newRecord]);
      alert('Dependent saved successfully!');
      setShowPartyDependentForm(false);
      setDependentPartyId(null);
      setPartyDependentRel('');
      setDependentFormData({ party_type: 'Dependent', party_relationship: '', first_name: '', middle_name: '', last_name: '', date_of_birth: '', ssn: '', party_joining_date: '', city_of_birth: '', country_of_birth: '', country_of_citizenship: '' });
    } catch (error) {
      alert(`Failed: ${error.message}`);
    }
  };

  const deleteEmployee = (id) => {
    if (window.confirm('Are you sure?')) setEmployees(employees.filter(emp => emp.id !== id));
  };

  // ── Reusable Records List Component
  const RecordsList = ({ records, selectedIndex, onSelect, columns }) => {
  if (records.length === 0) return null;
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem', color: '#495057', borderBottom: '1px solid #dee2e6', paddingBottom: '0.5rem' }}>
        Added Records ({records.length})
      </h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '0.5rem', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <thead>
            <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '600', fontSize: '0.875rem' }}>#</th>
              {columns.map((col, i) => (
                <th key={i} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '600', fontSize: '0.875rem' }}>{col.label}</th>
              ))}
              <th style={{ padding: '0.75rem 1rem', textAlign: 'center', fontWeight: '600', fontSize: '0.875rem' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={index}
                style={{
                  backgroundColor: selectedIndex === index ? '#f0f7ff' : index % 2 === 0 ? '#ffffff' : '#f8f9fa',
                  borderBottom: '1px solid #dee2e6',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onClick={() => onSelect(index, record)}
              >
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', fontWeight: '600', color: '#495057' }}>{index + 1}</td>
                {columns.map((col, i) => (
                  <td key={i} style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#495057' }}>
                    {record[col.key] || '-'}
                  </td>
                ))}
                <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onSelect(index, record); }}
                    style={{
                      padding: '0.3rem 0.75rem',
                      backgroundColor: selectedIndex === index ? '#0056b3' : '#007bff',
                      color: 'white', border: 'none', borderRadius: '0.25rem',
                      cursor: 'pointer', fontSize: '0.8rem'
                    }}>
                    {selectedIndex === index ? '✓ Selected' : 'View'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

  return (
    <div style={{ width: '100%', padding: '2rem', backgroundColor: '#eee', borderRadius: '8px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '600', textAlign: 'center', marginBottom: '2rem', color: 'white' }}>#</h1>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button type="button" onClick={handleBack} style={{ color: 'white', borderRadius: '70px', width: '50px', height: '40px', backgroundColor: "#3dce41", border: 'none' }}>←</button>
        <button type="button" onClick={handleHome} style={{ color: 'white', backgroundColor: "#3dce41", height: '40px', borderRadius: '70px', border: 'none', padding: '0 16px' }}>Employee Home</button>
      </div>

      <div style={{ display: 'flex' }}>
        <div style={{ width: "240px" }}>
          <Sidebar activePage="add-employee" onShowEmployees={() => window.location.href = '/welcomePage?showEmployees=true'} onShowFolders={() => window.location.href = '/welcomePage'} />
        </div>

        <div style={{ flex: 1, marginLeft: '2rem' }}>
          {/* Tabs */}
          <div style={{ borderBottom: '2px solid #dee2e6', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[
                { key: 'add-employee', label: 'Add Employee' },
                { key: 'bank', label: 'Bank' },
                { key: 'contact', label: 'Contact' },
                { key: 'education', label: 'Education' },
                { key: 'client', label: 'Client' },
                { key: 'experience', label: 'Experience' },
                { key: 'address', label: 'Address' },
                { key: 'immigration', label: 'Immigration' },
                { key: 'visa-history', label: 'Visa History' },
                { key: 'dependent', label: 'Dependent' },
              ].map(tab => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
                  padding: '0.75rem 1rem', border: 'none',
                  borderBottom: activeTab === tab.key ? '3px solid #007bff' : '3px solid transparent',
                  backgroundColor: 'transparent',
                  color: activeTab === tab.key ? '#007bff' : '#6c757d',
                  fontWeight: activeTab === tab.key ? '600' : '400',
                  fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.3s'
                }}>{tab.label}</button>
              ))}
            </div>
          </div>

          {/* ═══════════════════════════════════════════
              ADD EMPLOYEE TAB
          ═══════════════════════════════════════════ */}
          {activeTab === 'add-employee' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>{isEditMode ? 'View Employee' : 'Add New Employee'}</h2>
                {isEditMode && (
                  <button type="button" onClick={() => setEditableForms(prev => ({ ...prev, party: !prev.party }))}
                    style={{ padding: '0.5rem 1.5rem', backgroundColor: editableForms.party ? '#dc3545' : '#28a745', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
                    {editableForms.party ? '✕ Cancel' : '✏️ Edit'}
                  </button>
                )}
              </div>
              <form onSubmit={isEditMode && editableForms.party ? handleUpdateParty : handleSubmit} style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={labelStyle}>Party Type <span style={{ color: 'red' }}>*</span></label>
                  <select name="party_type" value={formData.party_type} onChange={handleInputChange} style={isEditMode && !editableForms.party ? readOnlyStyle : inputStyle} disabled={isEditMode && !editableForms.party} required>
                    <option value="">Select Party Type</option>
                    <option value="Employee">Employee</option>
                    <option value="Dependent">Dependent</option>
                    <option value="Beneficiary">Beneficiary</option>
                  </select>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={labelStyle}>Party Relationship <span style={{ color: 'red' }}>*</span></label>
                  <input type="text" name="party_relationship" value={formData.party_relationship} onChange={handleInputChange} style={isEditMode && !editableForms.party ? readOnlyStyle : inputStyle} disabled={isEditMode && !editableForms.party} required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div><label style={labelStyle}>First Name <span style={{ color: 'red' }}>*</span></label><input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} style={isEditMode && !editableForms.party ? readOnlyStyle : inputStyle} disabled={isEditMode && !editableForms.party} required /></div>
                  <div><label style={labelStyle}>Middle Name</label><input type="text" name="middle_name" value={formData.middle_name} onChange={handleInputChange} style={isEditMode && !editableForms.party ? readOnlyStyle : inputStyle} disabled={isEditMode && !editableForms.party} /></div>
                  <div><label style={labelStyle}>Last Name <span style={{ color: 'red' }}>*</span></label><input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} style={isEditMode && !editableForms.party ? readOnlyStyle : inputStyle} disabled={isEditMode && !editableForms.party} required /></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div><label style={labelStyle}>Date of Birth <span style={{ color: 'red' }}>*</span></label><input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleInputChange} style={isEditMode && !editableForms.party ? readOnlyStyle : inputStyle} disabled={isEditMode && !editableForms.party} required /></div>
                  <div><label style={labelStyle}>SSN <span style={{ color: 'red' }}>*</span></label><input type="text" name="ssn" value={formData.ssn} onChange={handleInputChange} style={isEditMode && !editableForms.party ? readOnlyStyle : inputStyle} disabled={isEditMode && !editableForms.party} placeholder="XXX-XX-XXXX" maxLength={11} required /></div>
                </div>
                 
               <div style={{ marginBottom: '1.5rem' }}>
  <label style={labelStyle}>Username <span style={{ color: 'red' }}>*</span></label>
  {isEditMode && !editableForms.party ? (
    
    <input
      type="text"
      value={userOptions.find(u => u.value === formData.assigned_user_id)?.label || formData.assigned_user_id || ''}
      style={readOnlyStyle}
      readOnly disabled />
  ) : (
    //  Searchable dropdown in edit/add mode
    <Select
      options={userOptions}
      placeholder="Search Username..."
      isSearchable
      value={userOptions.find(u => u.value === formData.assigned_user_id) || null}
      onChange={(selectedOption) => {
        setFormData(prev => ({
          ...prev,
          assigned_user_id: selectedOption ? selectedOption.value : ''
        }));
      }}
      styles={{
        control: (base) => ({
          ...base,
          padding: '0.2rem',
          borderColor: '#ced4da',
          fontSize: '1rem',
        })
         }}
       />
       )}
</div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={labelStyle}>Party Joining Date</label>
                  <input type="date" name="party_joining_date" value={formData.party_joining_date} onChange={handleInputChange} style={isEditMode && !editableForms.party ? readOnlyStyle : inputStyle} disabled={isEditMode && !editableForms.party} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div><label style={labelStyle}>City of Birth</label><input type="text" name="city_of_birth" value={formData.city_of_birth} onChange={handleInputChange} style={isEditMode && !editableForms.party ? readOnlyStyle : inputStyle} disabled={isEditMode && !editableForms.party} /></div>
                  <div>
                    <label style={labelStyle}>Country of Birth</label>
                    <select name="country_of_birth" value={formData.country_of_birth} onChange={handleInputChange} style={isEditMode && !editableForms.party ? readOnlyStyle : inputStyle} disabled={isEditMode && !editableForms.party}>
                      <option value="">Select Country</option>{COUNTRIES.map(c => (<option key={c} value={c}>{c}</option>))}
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: '2rem' }}>
                  <label style={labelStyle}>Country of Citizenship</label>
                  <select name="country_of_citizenship" value={formData.country_of_citizenship} onChange={handleInputChange} style={isEditMode && !editableForms.party ? readOnlyStyle : inputStyle} disabled={isEditMode && !editableForms.party}>
                    <option value="">Select Country</option>{COUNTRIES.map(c => (<option key={c} value={c}>{c}</option>))}
                  </select>
                </div>
                {!isEditMode && <button type="submit" style={buttonStyle}>Save Employee</button>}
                {isEditMode && editableForms.party && <button type="submit" style={buttonStyle}>Update Employee</button>}
              </form>
            </div>
          )}

          {/* ═══════════════════════════════════════════
              BANK TAB
          ═══════════════════════════════════════════ */}
          {activeTab === 'bank' && (
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>Bank Information</h2>

              {/* Records List */}
              <RecordsList
                records={bankRecords}
                selectedIndex={selectedBankIndex}
                onSelect={(index, record) => {
                  setSelectedBankIndex(index);
                  setBankId(record.bank_id);
                  setBankFormData({ bank_name: record.bank_name || '', account_number: record.account_number || '', routing_number: record.routing_number || '', bank_status: record.bank_status || '', zip_code: record.zip_code || '' });
                  setEditableForms(prev => ({ ...prev, bank: false }));
                }}
                columns={[
                   { label: 'Bank Name', key: 'bank_name' },
                   { label: 'Account Number', key: 'account_number' },
                   { label: 'Routing Number', key: 'routing_number' },
                   { label: 'Status', key: 'bank_status' },
                   { label: 'Zip Code', key: 'zip_code' },
                ]}
              />

              {/* Selected Record Form */}
              {selectedBankIndex !== null && (
                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #dee2e6', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>Bank {selectedBankIndex + 1} Details</h3>
                    <button type="button" onClick={() => setEditableForms(prev => ({ ...prev, bank: !prev.bank }))}
                      style={{ padding: '0.4rem 1rem', backgroundColor: editableForms.bank ? '#dc3545' : '#28a745', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
                      {editableForms.bank ? '✕ Cancel' : '✏️ Edit'}
                    </button>
                  </div>
                  <form onSubmit={handleUpdateBank} style={{ maxWidth: '600px' }}>
                    <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Bank Name</label><input type="text" name="bank_name" value={bankFormData.bank_name} onChange={handleBankInputChange} style={!editableForms.bank ? readOnlyStyle : inputStyle} disabled={!editableForms.bank} /></div>
                    <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Account Number</label><input type="text" name="account_number" value={bankFormData.account_number} onChange={handleBankInputChange} style={!editableForms.bank ? readOnlyStyle : inputStyle} disabled={!editableForms.bank} /></div>
                    <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Routing Number</label><input type="text" name="routing_number" value={bankFormData.routing_number} onChange={handleBankInputChange} style={!editableForms.bank ? readOnlyStyle : inputStyle} disabled={!editableForms.bank} /></div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={labelStyle}>Bank Status</label>
                      <select name="bank_status" value={bankFormData.bank_status} onChange={handleBankInputChange} style={!editableForms.bank ? readOnlyStyle : inputStyle} disabled={!editableForms.bank}>
                        <option value="">Select Status</option><option value="Active">Active</option><option value="Inactive">Inactive</option><option value="Pending">Pending</option>
                      </select>
                    </div>
                    <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Zip Code</label><input type="text" name="zip_code" value={bankFormData.zip_code} onChange={handleBankInputChange} style={!editableForms.bank ? readOnlyStyle : inputStyle} disabled={!editableForms.bank} /></div>
                    {editableForms.bank && <button type="submit" style={buttonStyle}>Update Bank</button>}
                  </form>
                </div>
              )}

              {/* Add New Bank */}
              {/* ── Add New Button — shown in both modes */}
             <div style={{ borderTop: '2px solid #dee2e6', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
                {!showAddBank ? (
                   <button
                   type="button"
                   onClick={() => {
                   setBankFormData({ bank_name: '', account_number: '', routing_number: '', bank_status: '', zip_code: '' });
                   setSelectedBankIndex(null);  // ← deselect current record
                   setShowAddBank(true);
                  }}
               style={{ padding: '0.75rem 1.5rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', fontSize: '1rem' }}
            >
             + Add New Bank
           </button>
          ) : (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#28a745' }}>+ Add New Bank</h3>
        <button type="button" onClick={() => setShowAddBank(false)}
          style={{ padding: '0.4rem 1rem', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
          ✕ Cancel
        </button>
      </div>
      <form onSubmit={async (e) => { await handleBankSubmit(e); setShowAddBank(false); }} style={{ maxWidth: '600px' }}>
        <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Party ID</label><input type="text" value={lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId') || ''} style={{ ...inputStyle, backgroundColor: '#e9ecef', cursor: 'not-allowed' }} readOnly disabled /></div>
        <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Bank Name <span style={{ color: 'red' }}>*</span></label><input type="text" name="bank_name" value={bankFormData.bank_name} onChange={handleBankInputChange} style={inputStyle} required /></div>
        <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Account Number <span style={{ color: 'red' }}>*</span></label><input type="text" name="account_number" value={bankFormData.account_number} onChange={handleBankInputChange} style={inputStyle} required /></div>
        <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Routing Number <span style={{ color: 'red' }}>*</span></label><input type="text" name="routing_number" value={bankFormData.routing_number} onChange={handleBankInputChange} style={inputStyle} required /></div>
        <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Bank Status</label><select name="bank_status" value={bankFormData.bank_status} onChange={handleBankInputChange} style={inputStyle}><option value="">Select Status</option><option value="Active">Active</option><option value="Inactive">Inactive</option><option value="Pending">Pending</option></select></div>
        <div style={{ marginBottom: '1.5rem' }}><label style={labelStyle}>Zip Code</label><input type="text" name="zip_code" value={bankFormData.zip_code} onChange={handleBankInputChange} style={inputStyle} /></div>
        <button type="submit" style={buttonStyle}>Save Bank</button>
      </form>
    </div>
  )}
</div>
            </div>
          )}

          {/* ═══════════════════════════════════════════
              CONTACT TAB
          ═══════════════════════════════════════════ */}
          {activeTab === 'contact' && (
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>Contact Information</h2>
              <RecordsList
               records={contactRecords}
               selectedIndex={selectedContactIndex}
                onSelect={(index, record) => {
                setSelectedContactIndex(index);
                setContactId(record.contact_id);
                setContactFormData({ phone_number: record.phone_number || '', email: record.email || '' });
                setEditableForms(prev => ({ ...prev, contact: false }));
               }}
               columns={[
                 { label: 'Phone Number', key: 'phone_number' },
                 { label: 'Email', key: 'email' },
              ]}
              />
              {selectedContactIndex !== null && (
                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #dee2e6', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>Contact {selectedContactIndex + 1} Details</h3>
                    <button type="button" onClick={() => setEditableForms(prev => ({ ...prev, contact: !prev.contact }))} style={{ padding: '0.4rem 1rem', backgroundColor: editableForms.contact ? '#dc3545' : '#28a745', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>{editableForms.contact ? '✕ Cancel' : '✏️ Edit'}</button>
                  </div>
                  <form onSubmit={handleUpdateContact} style={{ maxWidth: '600px' }}>
                    <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Phone Number</label><input type="tel" name="phone_number" value={contactFormData.phone_number} onChange={handleContactInputChange} style={!editableForms.contact ? readOnlyStyle : inputStyle} disabled={!editableForms.contact} /></div>
                    <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Email</label><input type="email" name="email" value={contactFormData.email} onChange={handleContactInputChange} style={!editableForms.contact ? readOnlyStyle : inputStyle} disabled={!editableForms.contact} /></div>
                    {editableForms.contact && <button type="submit" style={buttonStyle}>Update Contact</button>}
                  </form>
                </div>
              )}
              <div style={{ borderTop: '2px solid #dee2e6', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
  {!showAddContact ? (
    <button type="button"
      onClick={() => {
        setContactFormData({ phone_number: '', email: '' });
        setSelectedContactIndex(null);
        setShowAddContact(true);
      }}
      style={{ padding: '0.75rem 1.5rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', fontSize: '1rem' }}>
      + Add New Contact
    </button>
  ) : (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#28a745' }}>+ Add New Contact</h3>
        <button type="button" onClick={() => setShowAddContact(false)}
          style={{ padding: '0.4rem 1rem', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
          ✕ Cancel
        </button>
      </div>
      <form onSubmit={async (e) => { await handleContactSubmit(e); setShowAddContact(false); }} style={{ maxWidth: '600px' }}>
        <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Party ID</label><input type="text" value={lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId') || ''} style={{ ...inputStyle, backgroundColor: '#e9ecef', cursor: 'not-allowed' }} readOnly disabled /></div>
        <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Phone Number <span style={{ color: 'red' }}>*</span></label><input type="tel" name="phone_number" value={contactFormData.phone_number} onChange={handleContactInputChange} style={inputStyle} required /></div>
        <div style={{ marginBottom: '1.5rem' }}><label style={labelStyle}>Email <span style={{ color: 'red' }}>*</span></label><input type="email" name="email" value={contactFormData.email} onChange={handleContactInputChange} style={inputStyle} required /></div>
        <button type="submit" style={buttonStyle}>Save Contact</button>
      </form>
    </div>
  )}
</div>
            </div>
          )}

          {/* 
              EDUCATION TAB
         */}
          {activeTab === 'education' && (
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>Education Information</h2>
              <RecordsList
                  records={educationRecords}
                  selectedIndex={selectedEducationIndex}
                  onSelect={(index, record) => {
                  setSelectedEducationIndex(index);
                  setEducationId(record.education_id);
                  setEducationFormData({ degree: record.degree || '', university_name: record.university_name || '', year_awarded: record.year_awarded || '', coursework_details: record.coursework_details || '' });
                 setEditableForms(prev => ({ ...prev, education: false }));
               }}
               columns={[
                    { label: 'Degree', key: 'degree' },
                    { label: 'University', key: 'university_name' },
                    { label: 'Year Awarded', key: 'year_awarded' },
                ]}
              />
              {selectedEducationIndex !== null && (
                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #dee2e6', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>Education {selectedEducationIndex + 1} Details</h3>
                    <button type="button" onClick={() => setEditableForms(prev => ({ ...prev, education: !prev.education }))} style={{ padding: '0.4rem 1rem', backgroundColor: editableForms.education ? '#dc3545' : '#28a745', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>{editableForms.education ? '✕ Cancel' : '✏️ Edit'}</button>
                  </div>
                  <form onSubmit={handleUpdateEducation} style={{ maxWidth: '600px' }}>
                    <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Degree</label><input type="text" name="degree" value={educationFormData.degree} onChange={handleEducationInputChange} style={!editableForms.education ? readOnlyStyle : inputStyle} disabled={!editableForms.education} /></div>
                    <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>University Name</label><input type="text" name="university_name" value={educationFormData.university_name} onChange={handleEducationInputChange} style={!editableForms.education ? readOnlyStyle : inputStyle} disabled={!editableForms.education} /></div>
                    <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Year Awarded</label><input type="number" name="year_awarded" value={educationFormData.year_awarded} onChange={handleEducationInputChange} style={!editableForms.education ? readOnlyStyle : inputStyle} disabled={!editableForms.education} min="1950" max="2050" /></div>
                    <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Coursework Details</label><textarea name="coursework_details" value={educationFormData.coursework_details} onChange={handleEducationInputChange} style={!editableForms.education ? readOnlyStyle : { ...inputStyle, minHeight: '100px', resize: 'vertical' }} disabled={!editableForms.education} /></div>
                    {editableForms.education && <button type="submit" style={buttonStyle}>Update Education</button>}
                  </form>
                </div>
              )}
            {!showAddEducation ? (
  <button type="button" onClick={() => { setEducationFormData({ degree: '', university_name: '', year_awarded: '', coursework_details: '' }); setSelectedEducationIndex(null); setShowAddEducation(true); }}
    style={{ padding: '0.75rem 1.5rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', fontSize: '1rem' }}>
    + Add New Education
  </button>
      ) : (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
      <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#28a745' }}>+ Add New Education</h3>
      <button type="button" onClick={() => setShowAddEducation(false)} style={{ padding: '0.4rem 1rem', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>✕ Cancel</button>
    </div>
    <form onSubmit={async (e) => { await handleEducationSubmit(e); setShowAddEducation(false); }} style={{ maxWidth: '600px' }}>
      <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Party ID</label><input type="text" value={lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId') || ''} style={{ ...inputStyle, backgroundColor: '#e9ecef', cursor: 'not-allowed' }} readOnly disabled /></div>
      <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Degree <span style={{ color: 'red' }}>*</span></label><input type="text" name="degree" value={educationFormData.degree} onChange={handleEducationInputChange} style={inputStyle} required /></div>
      <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>University Name <span style={{ color: 'red' }}>*</span></label><input type="text" name="university_name" value={educationFormData.university_name} onChange={handleEducationInputChange} style={inputStyle} required /></div>
      <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Year Awarded <span style={{ color: 'red' }}>*</span></label><input type="number" name="year_awarded" value={educationFormData.year_awarded} onChange={handleEducationInputChange} style={inputStyle} min="1950" max="2050" required /></div>
      <div style={{ marginBottom: '1.5rem' }}><label style={labelStyle}>Coursework Details</label><textarea name="coursework_details" value={educationFormData.coursework_details} onChange={handleEducationInputChange} style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }} /></div>
      <button type="submit" style={buttonStyle}>Save Education</button>
    </form>
  </div>
       )}
            </div>
          )}

          {/* 
              CLIENT TAB
           */}
          {activeTab === 'client' && (
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>Client Information</h2>
              <RecordsList
                records={clientRecords}
                selectedIndex={selectedClientIndex}
                onSelect={(index, record) => {
                setSelectedClientIndex(index);
                setClientId(record.client_id);
                setClientFormData({ client_name: record.client_name || '', party_client_joining_date: record.party_client_joining_date || '' });
                setEditableForms(prev => ({ ...prev, client: false }));
             }}
            columns={[
                { label: 'Client Name', key: 'client_name' },
                { label: 'Joining Date', key: 'party_client_joining_date' },
            ]}
              />
              {selectedClientIndex !== null && (
                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #dee2e6', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>Client {selectedClientIndex + 1} Details</h3>
                    <button type="button" onClick={() => setEditableForms(prev => ({ ...prev, client: !prev.client }))} style={{ padding: '0.4rem 1rem', backgroundColor: editableForms.client ? '#dc3545' : '#28a745', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>{editableForms.client ? '✕ Cancel' : '✏️ Edit'}</button>
                  </div>
                  <form onSubmit={handleUpdateClient} style={{ maxWidth: '600px' }}>
                    <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Client Name</label><input type="text" name="client_name" value={clientFormData.client_name} onChange={handleClientInputChange} style={!editableForms.client ? readOnlyStyle : inputStyle} disabled={!editableForms.client} /></div>
                    <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Party Client Joining Date</label><input type="date" name="party_client_joining_date" value={clientFormData.party_client_joining_date} onChange={handleClientInputChange} style={!editableForms.client ? readOnlyStyle : inputStyle} disabled={!editableForms.client} /></div>
                    {editableForms.client && <button type="submit" style={buttonStyle}>Update Client</button>}
                  </form>
                </div>
              )}
             {!showAddClient ? (
          <button type="button" onClick={() => { setClientFormData({ client_name: '', party_client_joining_date: '' }); setSelectedClientIndex(null); setShowAddClient(true); }}
         style={{ padding: '0.75rem 1.5rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', fontSize: '1rem' }}>
    + Add New Client
  </button>
) : (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
      <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#28a745' }}>+ Add New Client</h3>
      <button type="button" onClick={() => setShowAddClient(false)} style={{ padding: '0.4rem 1rem', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>✕ Cancel</button>
    </div>
    <form onSubmit={async (e) => { await handleClientSubmit(e); setShowAddClient(false); }} style={{ maxWidth: '600px' }}>
      <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Party ID</label><input type="text" value={lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId') || ''} style={{ ...inputStyle, backgroundColor: '#e9ecef', cursor: 'not-allowed' }} readOnly disabled /></div>
      <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Client Name <span style={{ color: 'red' }}>*</span></label><input type="text" name="client_name" value={clientFormData.client_name} onChange={handleClientInputChange} style={inputStyle} required /></div>
      <div style={{ marginBottom: '1.5rem' }}><label style={labelStyle}>Party Client Joining Date <span style={{ color: 'red' }}>*</span></label><input type="date" name="party_client_joining_date" value={clientFormData.party_client_joining_date} onChange={handleClientInputChange} style={inputStyle} required /></div>
      <button type="submit" style={buttonStyle}>Save Client</button>
    </form>
  </div>
)}
            </div>
          )}

          {/* 
              EXPERIENCE TAB
           */}
          {activeTab === 'experience' && (
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>Experience Information</h2>
              <RecordsList
               records={experienceRecords}
               selectedIndex={selectedExperienceIndex}
               onSelect={(index, record) => {
               setSelectedExperienceIndex(index);
               setExperienceId(record.experience_id);
               setExperienceFormData({ employer_name: record.employer_name || '', from_date: record.from_date || '', to_date: record.to_date || '', designation: record.designation || '', role: record.role || '', job_duties: record.job_duties || '' });
               setEditableForms(prev => ({ ...prev, experience: false }));
             }}
           columns={[
                 { label: 'Employer Name', key: 'employer_name' },
                 { label: 'Designation', key: 'designation' },
                 { label: 'From Date', key: 'from_date' },
                 { label: 'To Date', key: 'to_date' },
               ]}
              />
              {selectedExperienceIndex !== null && (
                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #dee2e6', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>Experience {selectedExperienceIndex + 1} Details</h3>
                    <button type="button" onClick={() => setEditableForms(prev => ({ ...prev, experience: !prev.experience }))} style={{ padding: '0.4rem 1rem', backgroundColor: editableForms.experience ? '#dc3545' : '#28a745', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>{editableForms.experience ? '✕ Cancel' : '✏️ Edit'}</button>
                  </div>
                  <form onSubmit={handleUpdateExperience} style={{ maxWidth: '600px' }}>
                    <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Employer Name</label><input type="text" name="employer_name" value={experienceFormData.employer_name} onChange={handleExperienceInputChange} style={!editableForms.experience ? readOnlyStyle : inputStyle} disabled={!editableForms.experience} /></div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div><label style={labelStyle}>From Date</label><input type="date" name="from_date" value={experienceFormData.from_date} onChange={handleExperienceInputChange} style={!editableForms.experience ? readOnlyStyle : inputStyle} disabled={!editableForms.experience} /></div>
                      <div><label style={labelStyle}>To Date</label><input type="date" name="to_date" value={experienceFormData.to_date} onChange={handleExperienceInputChange} style={!editableForms.experience ? readOnlyStyle : inputStyle} disabled={!editableForms.experience} /></div>
                    </div>
                    <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Designation</label><input type="text" name="designation" value={experienceFormData.designation} onChange={handleExperienceInputChange} style={!editableForms.experience ? readOnlyStyle : inputStyle} disabled={!editableForms.experience} /></div>
                    <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Role</label><input type="text" name="role" value={experienceFormData.role} onChange={handleExperienceInputChange} style={!editableForms.experience ? readOnlyStyle : inputStyle} disabled={!editableForms.experience} /></div>
                    <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Job Duties</label><textarea name="job_duties" value={experienceFormData.job_duties} onChange={handleExperienceInputChange} style={!editableForms.experience ? readOnlyStyle : { ...inputStyle, minHeight: '100px', resize: 'vertical' }} disabled={!editableForms.experience} /></div>
                    {editableForms.experience && <button type="submit" style={buttonStyle}>Update Experience</button>}
                  </form>
                </div>
              )}
            {!showAddExperience ? (
              <button type="button" onClick={() => { setExperienceFormData({ employer_name: '', from_date: '', to_date: '', designation: '', role: '', job_duties: '' }); setSelectedExperienceIndex(null); setShowAddExperience(true); }}
             style={{ padding: '0.75rem 1.5rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', fontSize: '1rem' }}>
             + Add New Experience
           </button>
          ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#28a745' }}>+ Add New Experience</h3>
               <button type="button" onClick={() => setShowAddExperience(false)} style={{ padding: '0.4rem 1rem', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>✕ Cancel</button>
         </div>
          <form onSubmit={async (e) => { await handleExperienceSubmit(e); setShowAddExperience(false); }} style={{ maxWidth: '600px' }}>
           <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Party ID</label><input type="text" value={lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId') || ''} style={{ ...inputStyle, backgroundColor: '#e9ecef', cursor: 'not-allowed' }} readOnly disabled /></div>
         <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Employer Name <span style={{ color: 'red' }}>*</span></label><input type="text" name="employer_name" value={experienceFormData.employer_name} onChange={handleExperienceInputChange} style={inputStyle} required /></div>
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
           <div><label style={labelStyle}>From Date <span style={{ color: 'red' }}>*</span></label><input type="date" name="from_date" value={experienceFormData.from_date} onChange={handleExperienceInputChange} style={inputStyle} required /></div>
            <div><label style={labelStyle}>To Date <span style={{ color: 'red' }}>*</span></label><input type="date" name="to_date" value={experienceFormData.to_date} onChange={handleExperienceInputChange} style={inputStyle} required /></div>
          </div>
            <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Designation <span style={{ color: 'red' }}>*</span></label><input type="text" name="designation" value={experienceFormData.designation} onChange={handleExperienceInputChange} style={inputStyle} required /></div>
            <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Role</label><input type="text" name="role" value={experienceFormData.role} onChange={handleExperienceInputChange} style={inputStyle} /></div>
           <div style={{ marginBottom: '1.5rem' }}><label style={labelStyle}>Job Duties</label><textarea name="job_duties" value={experienceFormData.job_duties} onChange={handleExperienceInputChange} style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }} /></div>
             <button type="submit" style={buttonStyle}>Save Experience</button>
          </form>
          </div>
         )}
            </div>
          )}

          {/* 
              ADDRESS TAB
           */}
          {activeTab === 'address' && (
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>Address Information</h2>
              <RecordsList
               records={addressRecords}
               selectedIndex={selectedAddressIndex}
               onSelect={(index, record) => {
               setSelectedAddressIndex(index);
               setAddressId(record.address_id);
               setAddressFormData({ client_id: record.client_id || '', address_type: record.address_type || '', address_line_1: record.address_line_1 || '', address_line_2: record.address_line_2 || '', address_line_3: record.address_line_3 || '', city: record.city || '', state: record.state || '', zipcode: record.zipcode || '', country: record.country || '' });
               setEditableForms(prev => ({ ...prev, address: false }));
              }}
           columns={[
              { label: 'Address Type', key: 'address_type' },
              { label: 'Address Line 1', key: 'address_line_1' },
              { label: 'City', key: 'city' },
              { label: 'State', key: 'state' },
              { label: 'Zip Code', key: 'zipcode' },
            ]}
              />
              {selectedAddressIndex !== null && (
                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #dee2e6', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>Address {selectedAddressIndex + 1} Details</h3>
                    <button type="button" onClick={() => setEditableForms(prev => ({ ...prev, address: !prev.address }))} style={{ padding: '0.4rem 1rem', backgroundColor: editableForms.address ? '#dc3545' : '#28a745', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>{editableForms.address ? '✕ Cancel' : '✏️ Edit'}</button>
                  </div>
                  <form onSubmit={handleUpdateAddress} style={{ maxWidth: '600px' }}>
                    <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Client ID</label><input type="text" name="client_id" value={addressFormData.client_id} onChange={handleAddressInputChange} style={{ ...inputStyle, backgroundColor: '#e9ecef', cursor: 'not-allowed' }} readOnly disabled /></div>
                    <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Address Type</label><select name="address_type" value={addressFormData.address_type} onChange={handleAddressInputChange} style={!editableForms.address ? readOnlyStyle : inputStyle} disabled={!editableForms.address}><option value="">Select Address Type</option><option value="Home">Home</option><option value="Work">Work</option><option value="Mailing">Mailing</option></select></div>
                    <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Address Line 1</label><input type="text" name="address_line_1" value={addressFormData.address_line_1} onChange={handleAddressInputChange} style={!editableForms.address ? readOnlyStyle : inputStyle} disabled={!editableForms.address} /></div>
                    <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Address Line 2</label><input type="text" name="address_line_2" value={addressFormData.address_line_2} onChange={handleAddressInputChange} style={!editableForms.address ? readOnlyStyle : inputStyle} disabled={!editableForms.address} /></div>
                    <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Address Line 3</label><input type="text" name="address_line_3" value={addressFormData.address_line_3} onChange={handleAddressInputChange} style={!editableForms.address ? readOnlyStyle : inputStyle} disabled={!editableForms.address} /></div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div><label style={labelStyle}>City</label><input type="text" name="city" value={addressFormData.city} onChange={handleAddressInputChange} style={!editableForms.address ? readOnlyStyle : inputStyle} disabled={!editableForms.address} /></div>
                      <div><label style={labelStyle}>State</label><input type="text" name="state" value={addressFormData.state} onChange={handleAddressInputChange} style={!editableForms.address ? readOnlyStyle : inputStyle} disabled={!editableForms.address} /></div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div><label style={labelStyle}>Zip Code</label><input type="text" name="zipcode" value={addressFormData.zipcode} onChange={handleAddressInputChange} style={!editableForms.address ? readOnlyStyle : inputStyle} disabled={!editableForms.address} /></div>
                      <div><label style={labelStyle}>Country</label><input type="text" name="country" value={addressFormData.country} onChange={handleAddressInputChange} style={!editableForms.address ? readOnlyStyle : inputStyle} disabled={!editableForms.address} /></div>
                    </div>
                    {editableForms.address && <button type="submit" style={buttonStyle}>Update Address</button>}
                  </form>
                </div>
              )}
            {!showAddAddress ? (
            <button type="button" onClick={() => { setAddressFormData({ client_id: addressFormData.client_id, address_type: '', address_line_1: '', address_line_2: '', address_line_3: '', city: '', state: '', zipcode: '', country: '' }); setSelectedAddressIndex(null); setShowAddAddress(true); }}
             style={{ padding: '0.75rem 1.5rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', fontSize: '1rem' }}>
           + Add New Address
         </button>
         ) : (
           <div>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
           <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#28a745' }}>+ Add New Address</h3>
           <button type="button" onClick={() => setShowAddAddress(false)} style={{ padding: '0.4rem 1rem', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>✕ Cancel</button>
          </div>
         <form onSubmit={async (e) => { await handleAddressSubmit(e); setShowAddAddress(false); }} style={{ maxWidth: '600px' }}>
        <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Party ID</label><input type="text" value={lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId') || ''} style={{ ...inputStyle, backgroundColor: '#e9ecef', cursor: 'not-allowed' }} readOnly disabled /></div>
        <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Client ID</label><input type="text" value={addressFormData.client_id} style={{ ...inputStyle, backgroundColor: '#e9ecef', cursor: 'not-allowed' }} readOnly disabled /></div>
        <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Address Type</label><select name="address_type" value={addressFormData.address_type} onChange={handleAddressInputChange} style={inputStyle}><option value="">Select</option><option value="Home">Home</option><option value="Work">Work</option><option value="Mailing">Mailing</option></select></div>
        <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Address Line 1 <span style={{ color: 'red' }}>*</span></label><input type="text" name="address_line_1" value={addressFormData.address_line_1} onChange={handleAddressInputChange} style={inputStyle} required /></div>
        <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Address Line 2</label><input type="text" name="address_line_2" value={addressFormData.address_line_2} onChange={handleAddressInputChange} style={inputStyle} /></div>
        <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Address Line 3</label><input type="text" name="address_line_3" value={addressFormData.address_line_3} onChange={handleAddressInputChange} style={inputStyle} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div><label style={labelStyle}>City <span style={{ color: 'red' }}>*</span></label><input type="text" name="city" value={addressFormData.city} onChange={handleAddressInputChange} style={inputStyle} required /></div>
        <div><label style={labelStyle}>State <span style={{ color: 'red' }}>*</span></label><input type="text" name="state" value={addressFormData.state} onChange={handleAddressInputChange} style={inputStyle} required /></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div><label style={labelStyle}>Zip Code <span style={{ color: 'red' }}>*</span></label><input type="text" name="zipcode" value={addressFormData.zipcode} onChange={handleAddressInputChange} style={inputStyle} required /></div>
        <div><label style={labelStyle}>Country</label><input type="text" name="country" value={addressFormData.country} onChange={handleAddressInputChange} style={inputStyle} /></div>
       </div>
      <button type="submit" style={buttonStyle}>Save Address</button>
      </form>
     </div>
        )}
            </div>
          )}

          {/* 
              IMMIGRATION TAB
          */}
          {activeTab === 'immigration' && (
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>Immigration Information</h2>
              
              <RecordsList
                 records={immigrationRecords}
                 selectedIndex={selectedImmigrationIndex}
                 onSelect={(index, record) => {
                 setSelectedImmigrationIndex(index);
                 setImmigrationId(record.immigration_id);
                 setImmigrationFormData({ current_status: record.current_status || '', status_requested: record.status_requested || '', current_status_expiration: record.current_status_expiration || '', consulate_city: record.consulate_city || '', consulate_country: record.consulate_country || '', i94_number: record.i94_number || '', i94_issue_date: record.i94_issue_date || '', i94_expiration: record.i94_expiration || '', last_arrival_date: record.last_arrival_date || '', passport_number: record.passport_number || '', passport_issue_date: record.passport_issue_date || '', passport_expiration_date: record.passport_expiration_date || '', passport_place_of_issue: record.passport_place_of_issue || '' });
                 setEditableForms(prev => ({ ...prev, immigration: false }));
               }}
          columns={[
               { label: 'Current Status', key: 'current_status' },
               { label: 'Status Requested', key: 'status_requested' },
               { label: 'Passport Number', key: 'passport_number' },
               { label: 'Expiration Date', key: 'passport_expiration_date' },
             ]}
              />
              {selectedImmigrationIndex !== null && (
                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #dee2e6', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>Immigration {selectedImmigrationIndex + 1} Details</h3>
                    <button type="button" onClick={() => setEditableForms(prev => ({ ...prev, immigration: !prev.immigration }))} style={{ padding: '0.4rem 1rem', backgroundColor: editableForms.immigration ? '#dc3545' : '#28a745', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>{editableForms.immigration ? '✕ Cancel' : '✏️ Edit'}</button>
                  </div>
                  <form onSubmit={handleUpdateImmigration} style={{ maxWidth: '800px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div><label style={labelStyle}>Current Status</label><input type="text" name="current_status" value={immigrationFormData.current_status} onChange={handleImmigrationInputChange} style={!editableForms.immigration ? readOnlyStyle : inputStyle} disabled={!editableForms.immigration} /></div>
                      <div><label style={labelStyle}>Status Requested</label><input type="text" name="status_requested" value={immigrationFormData.status_requested} onChange={handleImmigrationInputChange} style={!editableForms.immigration ? readOnlyStyle : inputStyle} disabled={!editableForms.immigration} /></div>
                    </div>
                    <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Current Status Expiration</label><input type="date" name="current_status_expiration" value={immigrationFormData.current_status_expiration} onChange={handleImmigrationInputChange} style={!editableForms.immigration ? readOnlyStyle : inputStyle} disabled={!editableForms.immigration} /></div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div><label style={labelStyle}>Consulate City</label><input type="text" name="consulate_city" value={immigrationFormData.consulate_city} onChange={handleImmigrationInputChange} style={!editableForms.immigration ? readOnlyStyle : inputStyle} disabled={!editableForms.immigration} /></div>
                      <div><label style={labelStyle}>Consulate Country</label><input type="text" name="consulate_country" value={immigrationFormData.consulate_country} onChange={handleImmigrationInputChange} style={!editableForms.immigration ? readOnlyStyle : inputStyle} disabled={!editableForms.immigration} /></div>
                    </div>
                    <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>I-94 Number</label><input type="text" name="i94_number" value={immigrationFormData.i94_number} onChange={handleImmigrationInputChange} style={!editableForms.immigration ? readOnlyStyle : inputStyle} disabled={!editableForms.immigration} /></div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div><label style={labelStyle}>I-94 Issue Date</label><input type="date" name="i94_issue_date" value={immigrationFormData.i94_issue_date} onChange={handleImmigrationInputChange} style={!editableForms.immigration ? readOnlyStyle : inputStyle} disabled={!editableForms.immigration} /></div>
                      <div><label style={labelStyle}>I-94 Expiration</label><input type="date" name="i94_expiration" value={immigrationFormData.i94_expiration} onChange={handleImmigrationInputChange} style={!editableForms.immigration ? readOnlyStyle : inputStyle} disabled={!editableForms.immigration} /></div>
                    </div>
                    <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Last Arrival Date</label><input type="date" name="last_arrival_date" value={immigrationFormData.last_arrival_date} onChange={handleImmigrationInputChange} style={!editableForms.immigration ? readOnlyStyle : inputStyle} disabled={!editableForms.immigration} /></div>
                    <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Passport Number</label><input type="text" name="passport_number" value={immigrationFormData.passport_number} onChange={handleImmigrationInputChange} style={!editableForms.immigration ? readOnlyStyle : inputStyle} disabled={!editableForms.immigration} /></div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div><label style={labelStyle}>Passport Issue Date</label><input type="date" name="passport_issue_date" value={immigrationFormData.passport_issue_date} onChange={handleImmigrationInputChange} style={!editableForms.immigration ? readOnlyStyle : inputStyle} disabled={!editableForms.immigration} /></div>
                      <div><label style={labelStyle}>Passport Expiration Date</label><input type="date" name="passport_expiration_date" value={immigrationFormData.passport_expiration_date} onChange={handleImmigrationInputChange} style={!editableForms.immigration ? readOnlyStyle : inputStyle} disabled={!editableForms.immigration} /></div>
                    </div>
                    <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Passport Place of Issue</label><input type="text" name="passport_place_of_issue" value={immigrationFormData.passport_place_of_issue} onChange={handleImmigrationInputChange} style={!editableForms.immigration ? readOnlyStyle : inputStyle} disabled={!editableForms.immigration} /></div>
                    {editableForms.immigration && <button type="submit" style={buttonStyle}>Update Immigration</button>}
                  </form>
                </div>
              )}
              {!showAddImmigration ? (
             <button type="button" onClick={() => { setImmigrationFormData({ current_status: '', status_requested: '', current_status_expiration: '', consulate_city: '', consulate_country: '', i94_number: '', i94_issue_date: '', i94_expiration: '', last_arrival_date: '', passport_number: '', passport_issue_date: '', passport_expiration_date: '', passport_place_of_issue: '' }); setSelectedImmigrationIndex(null); setShowAddImmigration(true); }}
          style={{ padding: '0.75rem 1.5rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', fontSize: '1rem' }}>
       + Add New Immigration
       </button>
          ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#28a745' }}>+ Add New Immigration</h3>
           <button type="button" onClick={() => setShowAddImmigration(false)} style={{ padding: '0.4rem 1rem', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>✕ Cancel</button>
        </div>
       <form onSubmit={async (e) => { await handleImmigrationSubmit(e); setShowAddImmigration(false); }} style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Party ID</label><input type="text" value={lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId') || ''} style={{ ...inputStyle, backgroundColor: '#e9ecef', cursor: 'not-allowed' }} readOnly disabled /></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div><label style={labelStyle}>Current Status <span style={{ color: 'red' }}>*</span></label><input type="text" name="current_status" value={immigrationFormData.current_status} onChange={handleImmigrationInputChange} style={inputStyle} required /></div>
        <div><label style={labelStyle}>Status Requested</label><input type="text" name="status_requested" value={immigrationFormData.status_requested} onChange={handleImmigrationInputChange} style={inputStyle} /></div>
      </div>
      <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Current Status Expiration</label><input type="date" name="current_status_expiration" value={immigrationFormData.current_status_expiration} onChange={handleImmigrationInputChange} style={inputStyle} /></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div><label style={labelStyle}>Consulate City</label><input type="text" name="consulate_city" value={immigrationFormData.consulate_city} onChange={handleImmigrationInputChange} style={inputStyle} /></div>
        <div><label style={labelStyle}>Consulate Country</label><input type="text" name="consulate_country" value={immigrationFormData.consulate_country} onChange={handleImmigrationInputChange} style={inputStyle} /></div>
      </div>
      <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>I-94 Number</label><input type="text" name="i94_number" value={immigrationFormData.i94_number} onChange={handleImmigrationInputChange} style={inputStyle} /></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div><label style={labelStyle}>I-94 Issue Date</label><input type="date" name="i94_issue_date" value={immigrationFormData.i94_issue_date} onChange={handleImmigrationInputChange} style={inputStyle} /></div>
        <div><label style={labelStyle}>I-94 Expiration</label><input type="date" name="i94_expiration" value={immigrationFormData.i94_expiration} onChange={handleImmigrationInputChange} style={inputStyle} /></div>
      </div>
      <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Last Arrival Date</label><input type="date" name="last_arrival_date" value={immigrationFormData.last_arrival_date} onChange={handleImmigrationInputChange} style={inputStyle} /></div>
      <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Passport Number <span style={{ color: 'red' }}>*</span></label><input type="text" name="passport_number" value={immigrationFormData.passport_number} onChange={handleImmigrationInputChange} style={inputStyle} required /></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div><label style={labelStyle}>Passport Issue Date</label><input type="date" name="passport_issue_date" value={immigrationFormData.passport_issue_date} onChange={handleImmigrationInputChange} style={inputStyle} /></div>
        <div><label style={labelStyle}>Passport Expiration Date</label><input type="date" name="passport_expiration_date" value={immigrationFormData.passport_expiration_date} onChange={handleImmigrationInputChange} style={inputStyle} /></div>
      </div>
      <div style={{ marginBottom: '1.5rem' }}><label style={labelStyle}>Passport Place of Issue</label><input type="text" name="passport_place_of_issue" value={immigrationFormData.passport_place_of_issue} onChange={handleImmigrationInputChange} style={inputStyle} /></div>
      <button type="submit" style={buttonStyle}>Save Immigration</button>
    </form>
  </div>
)}
            </div>
          )}

          {/* 
              VISA HISTORY TAB
           */}
          {activeTab === 'visa-history' && (
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>Visa History</h2>
              
              <RecordsList
                 records={visaHistoryRecords}
                 selectedIndex={selectedVisaIndex}
                 onSelect={(index, record) => {
                 setSelectedVisaIndex(index);
                 setVisaHistoryId(record.visa_id);
                 setVisaHistoryFormData({ visa_type: record.visa_type || '', date_of_arrival: record.date_of_arrival || '', date_of_departure: record.date_of_departure || '', receipt_number: record.receipt_number || '' });
                 setEditableForms(prev => ({ ...prev, visaHistory: false }));
                }}
            columns={[
                 { label: 'Visa Type', key: 'visa_type' },
                 { label: 'Date of Arrival', key: 'date_of_arrival' },
                 { label: 'Date of Departure', key: 'date_of_departure' },
                 { label: 'Receipt Number', key: 'receipt_number' },
              ]}
              />
              {selectedVisaIndex !== null && (
                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #dee2e6', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>Visa {selectedVisaIndex + 1} Details</h3>
                    <button type="button" onClick={() => setEditableForms(prev => ({ ...prev, visaHistory: !prev.visaHistory }))} style={{ padding: '0.4rem 1rem', backgroundColor: editableForms.visaHistory ? '#dc3545' : '#28a745', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>{editableForms.visaHistory ? '✕ Cancel' : '✏️ Edit'}</button>
                  </div>
                  <form onSubmit={handleUpdateVisaHistory} style={{ maxWidth: '600px' }}>
                    <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Visa Type</label><input type="text" name="visa_type" value={visaHistoryFormData.visa_type} onChange={handleVisaHistoryInputChange} style={!editableForms.visaHistory ? readOnlyStyle : inputStyle} disabled={!editableForms.visaHistory} /></div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div><label style={labelStyle}>Date of Arrival</label><input type="date" name="date_of_arrival" value={visaHistoryFormData.date_of_arrival} onChange={handleVisaHistoryInputChange} style={!editableForms.visaHistory ? readOnlyStyle : inputStyle} disabled={!editableForms.visaHistory} /></div>
                      <div><label style={labelStyle}>Date of Departure</label><input type="date" name="date_of_departure" value={visaHistoryFormData.date_of_departure} onChange={handleVisaHistoryInputChange} style={!editableForms.visaHistory ? readOnlyStyle : inputStyle} disabled={!editableForms.visaHistory} /></div>
                    </div>
                    <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Receipt Number</label><input type="text" name="receipt_number" value={visaHistoryFormData.receipt_number} onChange={handleVisaHistoryInputChange} style={!editableForms.visaHistory ? readOnlyStyle : inputStyle} disabled={!editableForms.visaHistory} /></div>
                    {editableForms.visaHistory && <button type="submit" style={buttonStyle}>Update Visa History</button>}
                  </form>
                </div>
              )}
            {!showAddVisa ? (
          <button type="button" onClick={() => { setVisaHistoryFormData({ visa_type: '', date_of_arrival: '', date_of_departure: '', receipt_number: '' }); setSelectedVisaIndex(null); setShowAddVisa(true); }}
           style={{ padding: '0.75rem 1.5rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', fontSize: '1rem' }}>
           + Add New Visa History
          </button>
         ) : (
        <div>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#28a745' }}>+ Add New Visa History</h3>
           <button type="button" onClick={() => setShowAddVisa(false)} style={{ padding: '0.4rem 1rem', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>✕ Cancel</button>
        </div>
        <form onSubmit={async (e) => { await handleVisaHistorySubmit(e); setShowAddVisa(false); }} style={{ maxWidth: '600px' }}>
          <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Party ID</label><input type="text" value={lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId') || ''} style={{ ...inputStyle, backgroundColor: '#e9ecef', cursor: 'not-allowed' }} readOnly disabled /></div>
           <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Visa Type <span style={{ color: 'red' }}>*</span></label><input type="text" name="visa_type" value={visaHistoryFormData.visa_type} onChange={handleVisaHistoryInputChange} style={inputStyle} required /></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div><label style={labelStyle}>Date of Arrival <span style={{ color: 'red' }}>*</span></label><input type="date" name="date_of_arrival" value={visaHistoryFormData.date_of_arrival} onChange={handleVisaHistoryInputChange} style={inputStyle} required /></div>
            <div><label style={labelStyle}>Date of Departure</label><input type="date" name="date_of_departure" value={visaHistoryFormData.date_of_departure} onChange={handleVisaHistoryInputChange} style={inputStyle} /></div>
           </div>
           <div style={{ marginBottom: '1.5rem' }}><label style={labelStyle}>Receipt Number <span style={{ color: 'red' }}>*</span></label><input type="text" name="receipt_number" value={visaHistoryFormData.receipt_number} onChange={handleVisaHistoryInputChange} style={inputStyle} required /></div>
            <button type="submit" style={buttonStyle}>Save Visa History</button>
        </form>
  </div>
)}
            </div>
          )}

          {/* 
              DEPENDENT TAB
           */}
          {activeTab === 'dependent' && (
            <div>
              {!showPartyDependentForm ? (
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>Dependent Information</h2>
                   
                  <RecordsList
                    records={dependentRecords}
                    selectedIndex={selectedDependentIndex}
                    onSelect={(index, record) => {
                    setSelectedDependentIndex(index);
                    setDependentPartyId(record.party_id_2 || record.party_id);
                    setPartyDependentRel(record.party_1_2_rel || '');
                    setDependentFormData({ party_type: record.party_type || 'Dependent', party_relationship: record.party_relationship || '', first_name: record.first_name || '', middle_name: record.middle_name || '', last_name: record.last_name || '', date_of_birth: record.date_of_birth || '', ssn: record.ssn || '', party_joining_date: record.party_joining_date || '', city_of_birth: record.city_of_birth || '', country_of_birth: record.country_of_birth || '', country_of_citizenship: record.country_of_citizenship || '' });
                    setEditableForms(prev => ({ ...prev, dependent: false }));
                  }}
               columns={[
                     { label: 'First Name', key: 'first_name' },
                     { label: 'Last Name', key: 'last_name' },
                     { label: 'Relationship', key: 'party_relationship' },
                     { label: 'Date of Birth', key: 'date_of_birth' },
                   ]}
                  />
                  {selectedDependentIndex !== null && (
                    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #dee2e6', marginBottom: '2rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>Dependent {selectedDependentIndex + 1} Details</h3>
                        <button type="button" onClick={() => setEditableForms(prev => ({ ...prev, dependent: !prev.dependent }))} style={{ padding: '0.4rem 1rem', backgroundColor: editableForms.dependent ? '#dc3545' : '#28a745', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>{editableForms.dependent ? '✕ Cancel' : '✏️ Edit'}</button>
                      </div>
                      <form onSubmit={handleUpdateDependent} style={{ maxWidth: '800px' }}>
                        <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Party Type</label><input type="text" value="Dependent" style={{ ...inputStyle, backgroundColor: '#e9ecef', cursor: 'not-allowed' }} readOnly disabled /></div>
                        <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Relationship</label><input type="text" name="party_relationship" value={dependentFormData.party_relationship} onChange={handleDependentInputChange} style={!editableForms.dependent ? readOnlyStyle : inputStyle} disabled={!editableForms.dependent} /></div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                          <div><label style={labelStyle}>First Name</label><input type="text" name="first_name" value={dependentFormData.first_name} onChange={handleDependentInputChange} style={!editableForms.dependent ? readOnlyStyle : inputStyle} disabled={!editableForms.dependent} /></div>
                          <div><label style={labelStyle}>Middle Name</label><input type="text" name="middle_name" value={dependentFormData.middle_name} onChange={handleDependentInputChange} style={!editableForms.dependent ? readOnlyStyle : inputStyle} disabled={!editableForms.dependent} /></div>
                          <div><label style={labelStyle}>Last Name</label><input type="text" name="last_name" value={dependentFormData.last_name} onChange={handleDependentInputChange} style={!editableForms.dependent ? readOnlyStyle : inputStyle} disabled={!editableForms.dependent} /></div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                          <div><label style={labelStyle}>Date of Birth</label><input type="date" name="date_of_birth" value={dependentFormData.date_of_birth} onChange={handleDependentInputChange} style={!editableForms.dependent ? readOnlyStyle : inputStyle} disabled={!editableForms.dependent} /></div>
                          <div><label style={labelStyle}>SSN</label><input type="text" name="ssn" value={dependentFormData.ssn} onChange={handleDependentInputChange} style={!editableForms.dependent ? readOnlyStyle : inputStyle} disabled={!editableForms.dependent} maxLength={11} /></div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                          <div><label style={labelStyle}>City of Birth</label><input type="text" name="city_of_birth" value={dependentFormData.city_of_birth} onChange={handleDependentInputChange} style={!editableForms.dependent ? readOnlyStyle : inputStyle} disabled={!editableForms.dependent} /></div>
                          <div><label style={labelStyle}>Country of Birth</label><select name="country_of_birth" value={dependentFormData.country_of_birth} onChange={handleDependentInputChange} style={!editableForms.dependent ? readOnlyStyle : inputStyle} disabled={!editableForms.dependent}><option value="">Select Country</option>{COUNTRIES.map(c => (<option key={c} value={c}>{c}</option>))}</select></div>
                        </div>
                        <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Country of Citizenship</label><select name="country_of_citizenship" value={dependentFormData.country_of_citizenship} onChange={handleDependentInputChange} style={!editableForms.dependent ? readOnlyStyle : inputStyle} disabled={!editableForms.dependent}><option value="">Select Country</option>{COUNTRIES.map(c => (<option key={c} value={c}>{c}</option>))}</select></div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                          {editableForms.dependent && <button type="submit" style={{ ...buttonStyle, flex: 1 }}>Update Dependent</button>}
                          <button type="button" onClick={() => setShowPartyDependentForm(true)} style={{ ...buttonStyle, flex: 1, backgroundColor: '#6c757d' }}>Next → View Relationship</button>
                        </div>
                      </form>
                    </div>
                  )}
                 {!showAddDependent ? (
  <button type="button" onClick={() => { setDependentFormData({ party_type: 'Dependent', party_relationship: '', first_name: '', middle_name: '', last_name: '', date_of_birth: '', ssn: '', party_joining_date: '', city_of_birth: '', country_of_birth: '', country_of_citizenship: '' }); setSelectedDependentIndex(null); setShowAddDependent(true); }}
    style={{ padding: '0.75rem 1.5rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', fontSize: '1rem' }}>
    + Add New Dependent
  </button>
) : (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
      <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#28a745' }}>+ Add New Dependent</h3>
      <button type="button" onClick={() => setShowAddDependent(false)} style={{ padding: '0.4rem 1rem', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>✕ Cancel</button>
    </div>
    <form onSubmit={async (e) => { await handleDependentSubmit(e); setShowAddDependent(false); }} style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Party Type</label><input type="text" value="Dependent" style={{ ...inputStyle, backgroundColor: '#e9ecef', cursor: 'not-allowed' }} readOnly disabled /></div>
      <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Relationship <span style={{ color: 'red' }}>*</span></label><input type="text" name="party_relationship" value={dependentFormData.party_relationship} onChange={handleDependentInputChange} style={inputStyle} placeholder="e.g. daughter, son, spouse" required /></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div><label style={labelStyle}>First Name <span style={{ color: 'red' }}>*</span></label><input type="text" name="first_name" value={dependentFormData.first_name} onChange={handleDependentInputChange} style={inputStyle} required /></div>
        <div><label style={labelStyle}>Middle Name</label><input type="text" name="middle_name" value={dependentFormData.middle_name} onChange={handleDependentInputChange} style={inputStyle} /></div>
        <div><label style={labelStyle}>Last Name <span style={{ color: 'red' }}>*</span></label><input type="text" name="last_name" value={dependentFormData.last_name} onChange={handleDependentInputChange} style={inputStyle} required /></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div><label style={labelStyle}>Date of Birth <span style={{ color: 'red' }}>*</span></label><input type="date" name="date_of_birth" value={dependentFormData.date_of_birth} onChange={handleDependentInputChange} style={inputStyle} required /></div>
        <div><label style={labelStyle}>SSN <span style={{ color: 'red' }}>*</span></label><input type="text" name="ssn" value={dependentFormData.ssn} onChange={handleDependentInputChange} style={inputStyle} placeholder="XXX-XX-XXXX" maxLength={11} required /></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div><label style={labelStyle}>City of Birth</label><input type="text" name="city_of_birth" value={dependentFormData.city_of_birth} onChange={handleDependentInputChange} style={inputStyle} /></div>
        <div><label style={labelStyle}>Country of Birth</label><select name="country_of_birth" value={dependentFormData.country_of_birth} onChange={handleDependentInputChange} style={inputStyle}><option value="">Select Country</option>{COUNTRIES.map(c => (<option key={c} value={c}>{c}</option>))}</select></div>
      </div>
      <div style={{ marginBottom: '1.5rem' }}><label style={labelStyle}>Country of Citizenship</label><select name="country_of_citizenship" value={dependentFormData.country_of_citizenship} onChange={handleDependentInputChange} style={inputStyle}><option value="">Select Country</option>{COUNTRIES.map(c => (<option key={c} value={c}>{c}</option>))}</select></div>
      <button type="submit" style={buttonStyle}>Save Dependent</button>
    </form>
  </div>
)}
                </div>
              ) : (
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>Party Dependent Relationship</h2>
                  <form onSubmit={handlePartyDependentSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '1.5rem' }}><label style={labelStyle}>Main Employee Party ID (party_id_1)</label><input type="text" value={lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId') || ''} style={{ ...inputStyle, backgroundColor: '#e9ecef', cursor: 'not-allowed' }} readOnly disabled /><small style={{ color: '#6c757d' }}>Auto-filled</small></div>
                    <div style={{ marginBottom: '1.5rem' }}><label style={labelStyle}>Dependent Party ID (party_id_2)</label><input type="text" value={dependentPartyId || ''} style={{ ...inputStyle, backgroundColor: '#e9ecef', cursor: 'not-allowed' }} readOnly disabled /><small style={{ color: '#6c757d' }}>Auto-filled from dependent</small></div>
                    <div style={{ marginBottom: '2rem' }}><label style={labelStyle}>Relationship <span style={{ color: 'red' }}>*</span></label><input type="text" value={partyDependentRel} onChange={(e) => setPartyDependentRel(e.target.value)} style={inputStyle} placeholder="e.g. Son, Daughter, Spouse" required /></div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button type="button" onClick={() => setShowPartyDependentForm(false)} style={{ ...buttonStyle, width: 'auto', padding: '0.75rem 2rem', backgroundColor: '#6c757d' }}>← Back</button>
                      <button type="submit" style={buttonStyle}>Save Party Dependent</button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Employee;