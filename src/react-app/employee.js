
import React, { useState,useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import countryList from 'country-list';
import Sidebar from './Sidebar';
import config from './config';

const Employee = () => {
  const [activeTab, setActiveTab] = useState('add-employee');
  const [employees, setEmployees] = useState([]);
  const [lastCreatedPartyId, setLastCreatedPartyId] = useState(null);
  const [lastCreatedClientId, setLastCreatedClientId] = useState(null);
  const navigate = useNavigate();
  const COUNTRIES = countryList.getNames();
  const [isEditMode, setIsEditMode] = useState(false);

  const [dependentPartyId, setDependentPartyId] = useState(null);
  const [showPartyDependentForm,setShowPartyDependentForm] = useState(false);
  const [partyDependentRel, setPartyDependentRel] = useState('')

  const[bankId, setBankId] = useState(null);
   const[contactId, setContactId] = useState(null);
   const[educationId, setEducationId] = useState(null);
   const[clientId, setClientId] = useState(null);
   const[experienceId, setExperienceId] = useState(null);
   const[addressId, setAddressId] = useState(null);
   const[immigrationId, setImmigrationId] = useState(null);
   const[visaHistoryId, setVisaHistoryId] = useState(null);

   const [dependentId, setDependentId] = useState(null);
   const [partyDependId, setPartyDependId] = useState(null);
   
  

 const [formData, setFormData] = useState({
    party_type: '', party_relationship: '', first_name: '', middle_name: '', last_name: '',
    date_of_birth: '', ssn: '', party_joining_date: '', city_of_birth: '', 
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

  const [dependentFormData , setDependentFormData] = useState({
    party_type:'Dependent',
    party_relationship:'',
    first_name:'',
    middle_name:'',
    last_name:'',
    date_of_birth:'',
    ssn:'',
    party_joining_date:'',
    city_of_birth:'',
    country_of_birth:'',
    country_of_citizenship:''

  })
  const[partyDependentData, setPartyDependentData] = useState({
    party_id_1:'',
    party_id_2:'',
    party_1_2_rel:'',
    party_depend_id:''  
  })
 

  const [editableForms, setEditableForms] = useState({
  party: false,
  bank: false,
  contact: false,
  education: false,
  client: false,
  experience: false,
  address: false,
  immigration: false,
  visaHistory: false,
  dependent: false,
});


const fetchPartyDetails = async(partyId) =>{
     console.log('=== fetchPartyDetails called with:', partyId);
    try{
      const  token = localStorage.getItem('authToken');
       console.log('token:', token);
      const headers ={
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      const partyRes = await fetch(`${config.BASE_URL}/party/party?party_id=${partyId}`,
        {headers}
      )
      console.log('party response status:',partyRes.status);
      if (partyRes.ok) {
        const party = await partyRes.json();
        console.log('party details:', party);
        setFormData({
          party_type:party.party_type || '',
          party_relationship: party.party_relationship || '',
          first_name: party.first_name || '',
          middle_name:party.middle_name || '',
          last_name: party.last_name || '',
          date_of_birth:party.date_of_birth || '',
          ssn:party.ssn || '',
          party_joining_date:party.party_joining_date || '',
          city_of_birth:party.city_of_birth || '',
          country_of_birth:party.country_of_birth || '',
          country_of_citizenship:party.country_of_citizenship || '',      
         });
         console.log('formData set')
      }

    const allBanksRes = await fetch(
         `${config.BASE_URL}/bank/get-all-banks`,
         { headers }
   );

    if (allBanksRes.ok) {
    const allBanks = await allBanksRes.json();
    console.log('all bank:', allBanks);

    const matchingBank = Array.isArray(allBanks)
    ? allBanks.find(c => c.party_id === partyId)
    : null;
  console.log('matching bank:', matchingBank);

  if (matchingBank) {
    setBankId(matchingBank.bank_id);
    setBankFormData({
      bank_name: matchingBank.bank_name || '',
      account_number: matchingBank.account_number || '',
      routing_number: matchingBank.routing_number || '',
      bank_status: matchingBank.bank_status || '',
      zip_code: matchingBank.zip_code || '',
    });
    console.log('Bank form filled!');
  } else {
    console.log('No Bank found for party_id:', partyId);
  }
} else {
  console.log('Get-All-Bank API failed:', allBanksRes.status);
}
      
        
       
      
      // ── Contact Details
    const allContactsRes = await fetch(
  `${config.BASE_URL}/contact/`,
  { headers }
   );

    if (allContactsRes.ok) {
    const allContacts = await allContactsRes.json();
    console.log('all contacts:', allContacts);

    const matchingContact = Array.isArray(allContacts)
    ? allContacts.find(c => c.party_id === partyId)
    : null;
  console.log('matching contact:', matchingContact);

  if (matchingContact) {
    setContactId(matchingContact.contact_id)
        setContactFormData({
      phone_number: matchingContact.phone_number || '',
      email: matchingContact.email || '',
    });
    console.log('Contact form filled!');
  } else {
    console.log('No contact found for party_id:', partyId);
  }
} else {
  console.log('Get-All-Contacts API failed:', allContactsRes.status);
}
    
    
      // ── Education Details
const allEducationRes = await fetch(
  `${config.BASE_URL}/education/get-all-education`,
  { headers }
);

if (allEducationRes.ok) {
  const allEducation = await allEducationRes.json();
  console.log('all education:', allEducation);

  const matchingEducation = Array.isArray(allEducation)
    ? allEducation.find(e => e.party_id === partyId)
    : null;
  console.log('matching education:', matchingEducation);

  if (matchingEducation) {
    setEducationId(matchingEducation.education_id)
    setEducationFormData({
      degree: matchingEducation.degree || '',
      university_name: matchingEducation.university_name || '',
      year_awarded: matchingEducation.year_awarded || '',
      coursework_details: matchingEducation.coursework_details || '',
    });
    console.log('Education form filled!');
  } else {
    console.log('No education found for party_id:', partyId);
  }
} else {
  console.log('Get-All-Education API failed:', allEducationRes.status);
}
        
    // ── Client form
const allClientsRes = await fetch(
  `${config.BASE_URL}/client/Get-All-Clients`,
  { headers }
);

if (allClientsRes.ok) {
  const allClients = await allClientsRes.json();
  console.log('all clients:', allClients);

  const matchingClients = Array.isArray(allClients)
    ? allClients.find(c => c.party_id === partyId)
    : null;
  console.log('matching clients:', matchingClients);

  if (matchingClients) {
    setClientId(matchingClients.client_id)
    setClientFormData({
      client_name: matchingClients.client_name || '',
      party_client_joining_date: matchingClients.party_client_joining_date || '',
    });
    console.log('Client form filled!');
  } else {
    console.log('No client found for party_id:', partyId);
  }
} else {
  console.log('Get-All-Clients API failed:', allClientsRes.status);
}

 //experience
const allExperienceRes = await fetch(
  `${config.BASE_URL}/experience/Get-All-Experience`,
  { headers }
);

if (allExperienceRes.ok) {
  const allExperience = await allExperienceRes.json();
  console.log('all experience:', allExperience);

  const matchingExperience = Array.isArray(allExperience)
    ? allExperience.find(e => e.party_id === partyId)
    : null;
  console.log('matching experience:', matchingExperience);

  if (matchingExperience) {
    setExperienceId(matchingExperience.experience_id)
    setExperienceFormData({
      employer_name:matchingExperience.employer_name || "",
    from_date:matchingExperience.from_date || "" ,
    to_date: matchingExperience.to_date || "",
    designation: matchingExperience.designation || "",
    role:matchingExperience.role || "" ,
    job_duties:matchingExperience.job_duties || "",
    });
    console.log('Experience form filled!');
  } else {
    console.log('No experience found for party_id:', partyId);
  }
} else {
  console.log('Get-All-Experience API failed:', allEducationRes.status);
}

// address
  const allAddressRes = await fetch(
  `${config.BASE_URL}/address/get-all-address`,
  { headers }
);

if (allAddressRes.ok) {
  const allAddress = await allAddressRes.json();
  console.log('all Address:', allAddress);

  const matchingAddress = Array.isArray(allAddress)
    ? allAddress.find(e => e.party_id === partyId)
    : null;
  console.log('matching address:', matchingAddress);

  if (matchingAddress) {
    setAddressId(matchingAddress.address_id)
    setAddressFormData({
    client_id:matchingAddress.client_id || "" ,
    address_type:matchingAddress.address_type || "" ,
    address_line_1: matchingAddress.address_line_1 || "",
    address_line_2: matchingAddress.address_line_2 || "",
    address_line_3:matchingAddress.address_line_3 || "" ,
    city:matchingAddress.city || "",
    state:matchingAddress.state || "",
    zipcode:matchingAddress.zipcode || "",
    country:matchingAddress.country || "",
    });
    console.log('Address form filled!');
  } else {
    console.log('No address found for party_id:', partyId);
  }
} else {
  console.log('Get-All-Address API failed:', allAddressRes.status);
}

// immigration

 const allImmigrationRes = await fetch(
  `${config.BASE_URL}/immigration`,
  { headers }
);

if (allImmigrationRes.ok) {
  const allImmigration = await allImmigrationRes.json();
  console.log('all immigration:', allImmigration);

  const matchingImmigration = Array.isArray(allImmigration)
    ? allImmigration.find(e => e.party_id === partyId)
    : null;
  console.log('matching immigration:', matchingImmigration);

  if (matchingImmigration) {
    setImmigrationId(matchingImmigration.immigration_id)
    setImmigrationFormData({
    current_status:matchingImmigration.current_status || "" ,
    status_requested:matchingImmigration.status_requested || "" ,
    current_status_expiration: matchingImmigration.current_status_expiration || "",
    consulate_city: matchingImmigration.consulate_city || "",
    consulate_country:matchingImmigration.consulate_country || "" ,
    i94_number:matchingImmigration.i94_number || "",
    i94_issue_date:matchingImmigration.i94_issue_date || "",
    i94_expiration:matchingImmigration.i94_expiration || "",
    last_arrival_date:matchingImmigration.last_arrival_date || "",
    passport_number:matchingImmigration.passport_number || "",
    passport_issue_date:matchingImmigration.passport_issue_date || "",
    passport_expiration_date: matchingImmigration.passport_expiration_date ||"",
    passport_place_of_issue:matchingImmigration.passport_place_of_issue ||"",

    });
    console.log('Immigration form filled!');
  } else {
    console.log('No Immigration found for party_id:', partyId);
  }
} else {
  console.log('Get-All-Immigration API failed:', allAddressRes.status);
}

//visa history
 const allVisaRes = await fetch(
  `${config.BASE_URL}/visahistory/Get-All-Visa-History`,
  { headers }
);

if (allVisaRes.ok) {
  const allVisa = await allVisaRes.json();
  console.log('all visa history:', allVisa);
  console.log('looking for party_id:', partyId)

  const matchingVisa = Array.isArray(allVisa)
    ? allVisa.find(e => e.party_id === partyId)
    : null;
  console.log('matching visa:', matchingVisa);

  if (matchingVisa) {
    console.log('visa keys:', Object.keys(matchingVisa));
    console.log('full visa:', JSON.stringify(matchingVisa))
    console.log('matching visa full object:', matchingVisa);
     setVisaHistoryId(matchingVisa.visa_id);
   // setVisaHistoryId(matchingVisa.visa_history_id || matchingVisa.visahistory_id || matchingVisa.id)
    setVisaHistoryFormData({
    visa_type:matchingVisa.visa_type || "" ,
    date_of_arrival:matchingVisa.date_of_arrival || "" ,
    date_of_departure: matchingVisa.date_of_departure || "",
    receipt_number: matchingVisa.receipt_number || "",
    

    });
    console.log('visa form filled!');
  } else {
    console.log('No visa found for party_id:', partyId);
  }
} else {
  console.log('Get-All-visa API failed:', allVisaRes.status);
}

//dependent 
// ── Dependent Details
const allDependentsRes = await fetch(
  `${config.BASE_URL}/partydependent/Get-All-Dependent`,
  { headers }
);

if (allDependentsRes.ok) {
  const allDependents = await allDependentsRes.json();
  console.log('all dependents:', allDependents);

  // Find dependent where party_id_1 matches our party
  const matchingDependent = Array.isArray(allDependents)
    ? allDependents.find(d => d.party_id_1 === partyId)
    : null;
  console.log('matching dependent:', matchingDependent);

  if (matchingDependent) {
    const dependentId = matchingDependent.party_id_2;
    console.log('dependent party_id_2:', dependentId);

      setDependentPartyId(dependentId);
    
    setPartyDependentRel(matchingDependent.party_1_2_rel || '');

   
    const allPartiesRes = await fetch(
      `${config.BASE_URL}/party/get-all-parties`,
      { headers }
    );

    if (allPartiesRes.ok) {
      const allParties = await allPartiesRes.json();
      console.log('all parties:', allParties);

      // Find party matching dependent party_id_2
      const dependentParty = Array.isArray(allParties)
        ? allParties.find(p => p.party_id === dependentId)
        : null;
      console.log('dependent party details:', dependentParty);

      if (dependentParty) {
      
        setDependentFormData({
          party_type: dependentParty.party_type || 'Dependent',
          party_relationship: dependentParty.party_relationship || '',
          first_name: dependentParty.first_name || '',
          middle_name: dependentParty.middle_name || '',
          last_name: dependentParty.last_name || '',
          date_of_birth: dependentParty.date_of_birth || '',
          ssn: dependentParty.ssn || '',
          party_joining_date: dependentParty.party_joining_date || '',
          city_of_birth: dependentParty.city_of_birth || '',
          country_of_birth: dependentParty.country_of_birth || '',
          country_of_citizenship: dependentParty.country_of_citizenship || '',
        });
        console.log('Dependent form filled!');
      }
    }
  } else {
    console.log('No dependent found for party_id:', partyId);
  }
} else {
  console.log('Get-All-Dependent API failed:', allDependentsRes.status);
}


}catch (error){
      console.error('Error fetching party details:',error);
    }
  }



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
    alert('Bank updated successfully!');
    setEditableForms(prev => ({ ...prev, bank: false }));
  } catch (error) {
    alert(`Failed: ${error.message}`);
  }
};

// ── Update Contact
const handleUpdateContact = async (e) => {
  e.preventDefault();
  console.log('contactId',contactId)
  try {
    const token = localStorage.getItem('authToken');
    const headers = { 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const url = `${config.BASE_URL}/contact/${contactId}`;
     console.log('Update URL:', url); 
    const response = await fetch(`${config.BASE_URL}/contact/${contactId}`, {
      method: 'PATCH', headers, body: JSON.stringify(contactFormData)
    });
    if (!response.ok) throw new Error('Failed to update contact');
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
    alert('Immigration updated successfully!');
    setEditableForms(prev => ({ ...prev, immigration: false }));
  } catch (error) {
    alert(`Failed: ${error.message}`);
  }
};

// ── Update Visa History
const handleUpdateVisaHistory = async (e) => {
  e.preventDefault();
  console.log('visaHistoryId',visaHistoryId)
  const partyId = lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId');
  try {
    const token = localStorage.getItem('authToken');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const response = await fetch(`${config.BASE_URL}/visahistory/Update-Visa-History?visa_id=${visaHistoryId}`, {
      method: 'PUT', headers, body: JSON.stringify(visaHistoryFormData)
    });
    if (!response.ok) throw new Error('Failed to update visa history');
    alert('Visa History updated successfully!');
    setEditableForms(prev => ({ ...prev, visaHistory: false }));
  } catch (error) {
    alert(`Failed: ${error.message}`);
  }
};

/*const handleUpdatePartyDependent = async (e) => {
  e.preventDefault();
 
  try {
    const token = localStorage.getItem('authToken');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const response = await fetch(`${config.BASE_URL}/partydependent/Update-Dependent?partyDepentent_id=${partyDependentId}`, {
      method: 'PUT', headers, body: JSON.stringify(partyDependentFormData)
    });
    if (!response.ok) throw new Error('Failed to update visa history');
    alert('Visa History updated successfully!');
    setEditableForms(prev => ({ ...prev, visaHistory: false }));
  } catch (error) {
    alert(`Failed: ${error.message}`);
  }
};*/



 useEffect(() =>{
    console.log('=== useeffect running==')
    const selectedEmployee = localStorage.getItem('selectedEmployee');
    console.log('selectedEmployee from localStorage:', selectedEmployee)
    if (selectedEmployee) {
      const emp = JSON.parse(selectedEmployee);
      console.log('editing employee:',emp);
      console.log('party_id:',emp.party_id)
      setIsEditMode(true);
      setLastCreatedPartyId(emp.party_id);
      localStorage.setItem('lastCreatedPartyId',emp.party_id);
      localStorage.removeItem('selectedEmployee');
      console.log('calling fetchPartyDetails:',emp.party_id)
      fetchPartyDetails(emp.party_id);
    }
    else{
      localStorage.removeItem('lastCreatedPartyId');
      localStorage.removeItem('lastCreatedClientId');
      setLastCreatedPartyId(null);
      setLastCreatedClientId(null);
    }
  },[]);

  const handleBack =() => {
    if(window.history.length >1) {
      navigate(-1);
    }
    else{
      navigate("/");
    }
  }
  
  const handleHome=() =>{
     window.location.href = '/welcomePage';
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressInputChange = (e) => {
    const { name, value } = e.target;
    setAddressFormData({ ...addressFormData, [name]: value });
  };

  const handleContactInputChange = (e) => {
    const { name, value } = e.target;
    setContactFormData({ ...contactFormData, [name]: value });
  };

  const handleBankInputChange = (e) => {
    const { name, value } = e.target;
    setBankFormData({ ...bankFormData, [name]: value });
  };

  const handleEducationInputChange = (e) => {
    const { name, value } = e.target;
    setEducationFormData({ ...educationFormData, [name]: value });
  };

  const handleExperienceInputChange = (e) => {
    const { name, value } = e.target;
    setExperienceFormData({ ...experienceFormData, [name]: value });
  };

  const handleClientInputChange = (e) => {
    const { name, value } = e.target;
    setClientFormData({ ...clientFormData, [name]: value });
  };

  const handleImmigrationInputChange = (e) => {
    const { name, value } = e.target;
    setImmigrationFormData({ ...immigrationFormData, [name]: value });
  };

  const handleVisaHistoryInputChange = (e) => {
    const { name, value } = e.target;
    setVisaHistoryFormData({ ...visaHistoryFormData, [name]: value });
  };

  const handleDependentInputChange = (e) => {
    const {name,value} = e.target;
    setDependentFormData({ ...dependentFormData, [name]:value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.first_name || !formData.last_name || !formData.date_of_birth || !formData.ssn) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      console.log('tokens:',token);
     

      const response = await fetch(`${config.BASE_URL}/party/create-party`, {
        method: 'POST', headers, body: JSON.stringify(formData)
      });

      const responseText = await response.text();
      if (!response.ok) throw new Error('Failed to save employee');

      const result = JSON.parse(responseText);
      const partyId = result.party_id || result.id || result.partyId;
      setLastCreatedPartyId(partyId);
      localStorage.setItem('lastCreatedPartyId', partyId);
      
      setEmployees([...employees, { id: partyId, party_id: partyId, ...formData }]);
      setFormData({
        party_type: '', party_relationship: '', first_name: '', middle_name: '', last_name: '',
        date_of_birth: '', ssn: '', party_joining_date: '', city_of_birth: '', 
        country_of_birth: '', country_of_citizenship: ''
      });

      alert('Employee saved successfully!');
    } catch (error) {
      alert(`Failed to save employee: ${error.message}`);
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
      console.log('token:',token)

      const addressData = {
        party_id: partyId,
        //client_id: addressFormData.client_id,
        client_id: addressFormData.client_id.trim() !== '' ? addressFormData.client_id : null,  
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
      setAddressFormData({
        party_id: '', client_id: '', address_type: '', address_line_1: '', address_line_2: '',
        address_line_3: '', city: '', state: '', zipcode: '', country: ''
      });
      alert('Address saved successfully!');
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
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${config.BASE_URL}/contact`, {
        method: 'POST', headers, body: JSON.stringify({  ...contactFormData, party_id: partyId})
      });

      if (!response.ok) throw new Error('Failed to save contact');
      setContactFormData({ party_id: '', phone_number: '', email: '' });
      alert('Contact saved successfully!');
    } catch (error) {
      alert(`Failed: ${error.message}`);
    }
  };

  const handleBankSubmit = async (e) => {
    e.preventDefault();
    const partyId = lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId');
    if (!partyId) { alert('Please add an employee first.'); setActiveTab('add-employee'); return; }

    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${config.BASE_URL}/bank`, {
        method: 'POST', headers, body: JSON.stringify({  ...bankFormData,party_id: partyId })
      });

      if (!response.ok) throw new Error('Failed to save bank');
      setBankFormData({ party_id: '', bank_name: '', account_number: '', routing_number: '', bank_status: '', zip_code: '' });
      alert('Bank saved successfully!');
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
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${config.BASE_URL}/education`, {
        method: 'POST', headers, 
        body: JSON.stringify({ 
          party_id: partyId, 
          degree: educationFormData.degree,
          university_name: educationFormData.university_name,
          year_awarded: parseInt(educationFormData.year_awarded),
          coursework_details: educationFormData.coursework_details
        })
      });

      if (!response.ok) throw new Error('Failed to save education');
      setEducationFormData({ party_id: '', degree: '', university_name: '', year_awarded: '', coursework_details: '' });
      alert('Education saved successfully!');
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
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${config.BASE_URL}/experience/Create-Experience`, {
        method: 'POST', headers, body: JSON.stringify({ ...experienceFormData,party_id: partyId  })
      });

      if (!response.ok) throw new Error('Failed to save experience');
      setExperienceFormData({ party_id: '', employer_name: '', from_date: '', to_date: '', designation: '', role: '', job_duties: '' });
      alert('Experience saved successfully!');
    } catch (error) {
      alert(`Failed: ${error.message}`);
    }
  };

  /*const handleClientSubmit = async (e) => {
    e.preventDefault();
    const partyId = lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId');
    if (!partyId) { alert('Please add an employee first.'); setActiveTab('add-employee'); return; }

    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch('http://genai-backend-alb-37507438.eu-north-1.elb.amazonaws.com/party-api/client/Create-Client', {
        method: 'POST', headers, body: JSON.stringify({  ...clientFormData, party_id: partyId })
      });

      if (!response.ok) throw new Error('Failed to save client');

      const responseText = await response.text();
      console.log('client api response:',responseText);
      const result = JSON.parse(responseText);
      console.log('parsed result:',result)
      const clientId = result.client_id || result.id || result.clientId;
      console.log('client ID:',clientId)
      if (clientId){
            setLastCreatedClientId(clientId);
            localStorage.setItem('lastCreatedClientId',clientId);
            setAddressFormData(prev =>({  ...prev, clinet_id: clientId}));

      }      
      setClientFormData({ party_id: '', client_name: '', party_client_joining_date: '' });
      alert('Client saved successfully!');
    } catch (error) {
      alert(`Failed: ${error.message}`);
    }
  };*/
   

  const handleClientSubmit = async (e) => {
  e.preventDefault();
  const partyId = lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId');
  if (!partyId) { alert('Please add an employee first.'); setActiveTab('add-employee'); return; }

  try {
    const token = localStorage.getItem('authToken');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${config.BASE_URL}/client/Create-Client`, {
      method: 'POST', headers, body: JSON.stringify({ ...clientFormData, party_id: partyId })
    });

    //  
    const responseText = await response.text();
    if (!response.ok) throw new Error('Failed to save client');

    const result = JSON.parse(responseText);
    console.log('Client result:', result);

    //  capture client_id and auto-fill address form
    const clientId = result.client_id;
    if (clientId) {
      setLastCreatedClientId(clientId);
      localStorage.setItem('lastCreatedClientId', clientId);
      setAddressFormData(prev => ({ ...prev, client_id: clientId }));
      console.log('client_id set:', clientId);
    }

    setClientFormData({ client_name: '', party_client_joining_date: '' });
    alert('Client saved successfully!');
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
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${config.BASE_URL}/immigration`, {
        method: 'POST', headers, body: JSON.stringify({  ...immigrationFormData,party_id: partyId })
      });

      if (!response.ok) throw new Error('Failed to save immigration');
      setImmigrationFormData({
        party_id: '', current_status: '', status_requested: '', current_status_expiration: '',
        consulate_city: '', consulate_country: '', i94_number: '', i94_issue_date: '',
        i94_expiration: '', last_arrival_date: '', passport_number: '', passport_issue_date: '',
        passport_expiration_date: '', passport_place_of_issue: ''
      });
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
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${config.BASE_URL}/visahistory/Create-Visa-History`, {
        method: 'POST', headers, body: JSON.stringify({  ...visaHistoryFormData,party_id: partyId, })
      });

      if (!response.ok) throw new Error('Failed to save visa history');
      setVisaHistoryFormData({ party_id: '', visa_type: '', date_of_arrival: '', date_of_departure: '', receipt_number: '' });
      
      alert('visa history saved successfully!');
     setAddressFormData({ client_id: '', address_type: '', address_line_1: '', address_line_2: '', address_line_3: '', city: '', state: '', zipcode: '', country: '' })
     

     
    } catch (error) {
      alert(`Failed: ${error.message}`);
    }
  };

  const handleDependentSubmit = async (e) => {
  e.preventDefault();
  const mainPartyId = lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId');
  if (!mainPartyId) { 
    alert('Please add an employee first.'); 
    return; 
  }

  try {
    const token = localStorage.getItem('authToken');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    
    const dependentPayload = {
      ...dependentFormData,
      party_type: 'Dependent',
      party_joining_date: null,
    };

    console.log('Creating dependent party:', dependentPayload);

    const dependentRes = await fetch(`${config.BASE_URL}/party/create-party`, {
      method: 'POST', headers,
      body: JSON.stringify(dependentPayload)
    });

    if (!dependentRes.ok) throw new Error('Failed to create dependent');

    const dependentResult = await dependentRes.json();
    console.log('Dependent created:', dependentResult);

   
    const allPartiesRes = await fetch(
      `${config.BASE_URL}/party/get-all-parties`,
      { headers }
    );

    if (allPartiesRes.ok) {
      const allParties = await allPartiesRes.json();

     
      const newDependent = Array.isArray(allParties)
        ? allParties.find(p => 
            p.first_name === dependentFormData.first_name &&
            p.last_name === dependentFormData.last_name &&
            p.ssn === dependentFormData.ssn &&
            p.party_type === 'Dependent'
          )
        : null;

      console.log('new dependent found:', newDependent);

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
  const mainPartyId = lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId')
  try {
    const token = localStorage.getItem('authToken');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const payload = {
      party_id_1: mainPartyId,
      party_id_2: dependentPartyId,
      party_1_2_rel: partyDependentRel,
    }
    console.log('Creating party dependent:', payload);
    const res = await fetch (`${config.BASE_URL}/partydependent/Create-party-dependent`, {
        method: 'POST', headers,
      body: JSON.stringify(payload)
    })
        if (!res.ok) throw new Error('Failed to create party dependent');
          const result = await res.json();
    console.log('Party dependent created:', result);

    alert('Dependent saved successfully!');

    // Reset everything
    setShowPartyDependentForm(false);
    setDependentPartyId(null);
    setPartyDependentRel('');
    setDependentFormData({
      party_type: 'Dependent',
      party_relationship: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      date_of_birth: '',
      ssn: '',
      party_joining_date: '',
      city_of_birth: '',
      country_of_birth: '',
      country_of_citizenship: ''
    });
  setLastCreatedPartyId(null);
    setLastCreatedClientId(null);
    localStorage.removeItem('lastCreatedPartyId');
    localStorage.removeItem('lastCreatedClientId');
  }catch (error) {
    alert(`Failed: ${error.message}`);
  }
};

const handleUpdateDependent = async (e) => {
  e.preventDefault();
  console.log('dependentPartyId:', dependentPartyId);

  try {
    const token = localStorage.getItem('authToken');
    const headers = { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(
      `${config.BASE_URL}/party/update-party?party_id=${dependentPartyId}`,
      { 
        method: 'PUT', 
        headers, 
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
      }
    );

    console.log('response status:', response.status);
    if (!response.ok) throw new Error(`Failed: ${response.status}`);
    alert('Dependent updated successfully!');
    setEditableForms(prev => ({ ...prev, dependent: false }));

  } catch (error) {
    alert(`Failed: ${error.message}`);
  }
};
  


  const deleteEmployee = (id) => {
    if (window.confirm('Are you sure?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

const EditButton = ({ formName }) => (
  isEditMode && (
    <button
      type="button"
      onClick={() => setEditableForms(prev => ({ ...prev, [formName]: !prev[formName] }))}
      style={{
        padding: '0.5rem 1.5rem',
        backgroundColor: editableForms[formName] ? '#dc3545' : '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '0.25rem',
        cursor: 'pointer',
        fontSize: '0.9rem'
      }}
    >
      {editableForms[formName] ? '✕ Cancel' : '✏️ Edit'}
    </button>
  )
);

 const inputStyle = { width: '100%', padding: '0.75rem', border: '1px solid #ced4da', borderRadius: '0.25rem', fontSize: '1rem' };
  const labelStyle = { display: 'block', marginBottom: '0.5rem', fontWeight: '500' };
  const buttonStyle = { width: '100%', padding: '0.75rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '0.25rem', fontSize: '1rem', fontWeight: '500', cursor: 'pointer' };
  const readOnlyStyle = { ...inputStyle, backgroundColor: '#e9ecef', cursor: 'not-allowed' };
  
  return (
    <div style={{ width: '100%', padding: '2rem', backgroundColor: '#eee', borderRadius: '8px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '600', textAlign: 'center', marginBottom: '2rem', color: 'white' }}>
        #
      </h1>
      { /*<button type="button" class="back-button"  onClick={handleBack}style={{color:'white',borderRadius:'70px',width:'50px',height:'40px',backgroundColor:"#3dce41",border:'none',}}>←</button>
       <button type="button" class="home-button" onClick={handleHome} style={{color:'white',backgroundColor:"#3dce41",height:'40px',borderRadius:'70px',border:'none',}}>Employee Home</button>*/}

  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

  <button
    type="button"
    className="back-button"
    onClick={handleBack}
    style={{
      color: 'white',
      borderRadius: '70px',
      width: '50px',
      height: '40px',
      backgroundColor: "#3dce41",
      border: 'none',
    }}
  >
    ←
  </button>

  <button
    type="button"
    className="home-button"
    onClick={handleHome}
    style={{
      color: 'white',
      backgroundColor: "#3dce41",
      height: '40px',
      borderRadius: '70px',
      border: 'none',
      padding: '0 16px',
    }}
  >
    Employee Home
  </button>

</div>
 <div style={{ display: 'flex' }}>
      <div style={{width:"240px"}}>
      
      <Sidebar
        activePage="add-employee"
        onShowEmployees={() => window.location.href = '/welcomePage?showEmployees=true'}
        onShowFolders={() => window.location.href = '/welcomePage'}
      />
      </div>
     
      <div style={{ flex: 1 ,marginLeft:'2rem'}}>


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
            { key:  'dependent',label:'Dependent'},
           ].map(tab => (
            <button key={tab.key} onClick={() => {
              console.log('tab clicked:',tab.key);
              if (tab.key === 'employee-home'){
                window.location.href = '/welcomePage';
              }
              else{
                setActiveTab(tab.key); 
              }
            }} style={{
              padding: '0.75rem 1rem', border: 'none',
              borderBottom: activeTab === tab.key ? '3px solid #007bff' : '3px solid transparent',
              backgroundColor: 'transparent',
              color: activeTab === tab.key ? '#007bff' : '#6c757d',
              fontWeight: activeTab === tab.key ? '600' : '400',
              fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.3s'
            }}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
     

      {/* Add Employee Tab */}
      {activeTab === 'add-employee' && (
  <div>
    {/* Title + Edit Button */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>
        {isEditMode ? 'View Employee' : 'Add New Employee'}
      </h2>
      {isEditMode && (
        <button
          type="button"
          onClick={() => setEditableForms(prev => ({ ...prev, party: !prev.party }))}
          style={{
            padding: '0.5rem 1.5rem',
            backgroundColor: editableForms.party ? '#dc3545' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          {editableForms.party ? '✕ Cancel' : '✏️ Edit'}
        </button>
      )}
    </div>

    <form
      onSubmit={isEditMode && editableForms.party ? handleUpdateParty : handleSubmit}
      style={{ maxWidth: '800px', margin: '0 auto' }}
    >
      {/* Party Type */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Party Type <span style={{ color: 'red' }}>*</span></label>
        <select name="party_type" value={formData.party_type} onChange={handleInputChange}
          style={isEditMode && !editableForms.party ? readOnlyStyle : inputStyle}
          disabled={isEditMode && !editableForms.party} required>
          <option value="">Select Party Type</option>
          <option value="Employee">Employee</option>
          <option value="Dependent">Dependent</option>
          <option value="Beneficiary">Beneficiary</option>
        </select>
      </div>

      {/* Party Relationship */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Party Relationship <span style={{ color: 'red' }}>*</span></label>
        <input type="text" name="party_relationship" value={formData.party_relationship}
          onChange={handleInputChange}
          style={isEditMode && !editableForms.party ? readOnlyStyle : inputStyle}
          disabled={isEditMode && !editableForms.party} required />
      </div>

      {/* First, Middle, Last Name */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <label style={labelStyle}>First Name <span style={{ color: 'red' }}>*</span></label>
          <input type="text" name="first_name" value={formData.first_name}
            onChange={handleInputChange}
            style={isEditMode && !editableForms.party ? readOnlyStyle : inputStyle}
            disabled={isEditMode && !editableForms.party} required />
        </div>
        <div>
          <label style={labelStyle}>Middle Name</label>
          <input type="text" name="middle_name" value={formData.middle_name}
            onChange={handleInputChange}
            style={isEditMode && !editableForms.party ? readOnlyStyle : inputStyle}
            disabled={isEditMode && !editableForms.party} />
        </div>
        <div>
          <label style={labelStyle}>Last Name <span style={{ color: 'red' }}>*</span></label>
          <input type="text" name="last_name" value={formData.last_name}
            onChange={handleInputChange}
            style={isEditMode && !editableForms.party ? readOnlyStyle : inputStyle}
            disabled={isEditMode && !editableForms.party} required />
        </div>
      </div>

      {/* Date of Birth and SSN */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <label style={labelStyle}>Date of Birth <span style={{ color: 'red' }}>*</span></label>
          <input type="date" name="date_of_birth" value={formData.date_of_birth}
            onChange={handleInputChange}
            style={isEditMode && !editableForms.party ? readOnlyStyle : inputStyle}
            disabled={isEditMode && !editableForms.party} required />
        </div>
        <div>
          <label style={labelStyle}>SSN <span style={{ color: 'red' }}>*</span></label>
          <input type="text" name="ssn" value={formData.ssn}
            onChange={handleInputChange}
            style={isEditMode && !editableForms.party ? readOnlyStyle : inputStyle}
            disabled={isEditMode && !editableForms.party}
            placeholder="XXX-XX-XXXX" maxLength={11} required />
        </div>
      </div>

      {/* Party Joining Date */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Party Joining Date</label>
        <input type="date" name="party_joining_date" value={formData.party_joining_date}
          onChange={handleInputChange}
          style={isEditMode && !editableForms.party ? readOnlyStyle : inputStyle}
          disabled={isEditMode && !editableForms.party} />
      </div>

      {/* City and Country of Birth */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <label style={labelStyle}>City of Birth</label>
          <input type="text" name="city_of_birth" value={formData.city_of_birth}
            onChange={handleInputChange}
            style={isEditMode && !editableForms.party ? readOnlyStyle : inputStyle}
            disabled={isEditMode && !editableForms.party} />
        </div>
        <div>
          <label style={labelStyle}>Country of Birth</label>
          <select name="country_of_birth" value={formData.country_of_birth}
            onChange={handleInputChange}
            style={isEditMode && !editableForms.party ? readOnlyStyle : inputStyle}
            disabled={isEditMode && !editableForms.party}>
            <option value="">Select Country</option>
            {COUNTRIES.map(c => (<option key={c} value={c}>{c}</option>))}
          </select>
        </div>
      </div>

      {/* Country of Citizenship */}
      <div style={{ marginBottom: '2rem' }}>
        <label style={labelStyle}>Country of Citizenship</label>
        <select name="country_of_citizenship" value={formData.country_of_citizenship}
          onChange={handleInputChange}
          style={isEditMode && !editableForms.party ? readOnlyStyle : inputStyle}
          disabled={isEditMode && !editableForms.party}>
          <option value="">Select Country</option>
          {COUNTRIES.map(c => (<option key={c} value={c}>{c}</option>))}
        </select>
      </div>

      {/* Buttons */}
      {!isEditMode && (
        <button type="submit" style={buttonStyle}>Save</button>
      )}
      {isEditMode && editableForms.party && (
        <button type="submit" style={buttonStyle}>Update Employee</button>
      )}

    </form>
  </div>
)}

      {/* Address Tab */}
      {activeTab === 'address' && (
  <div>
    {/* Title + Edit Button */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>
        {isEditMode ? 'View Address' : 'Add Address'}
      </h2>
      {isEditMode && (
        <button
          type="button"
          onClick={() => setEditableForms(prev => ({ ...prev, address: !prev.address }))}
          style={{
            padding: '0.5rem 1.5rem',
            backgroundColor: editableForms.address ? '#dc3545' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          {editableForms.address ? '✕ Cancel' : '✏️ Edit'}
        </button>
      )}
    </div>

    <form
      onSubmit={isEditMode && editableForms.address ? handleUpdateAddress : handleAddressSubmit}
      style={{ maxWidth: '800px', margin: '0 auto' }}
    >
      {/* Party ID */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Party ID <span style={{ color: 'red' }}>*</span></label>
        <input type="text"
          value={lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId') || ''}
          style={{ ...inputStyle, backgroundColor: '#e9ecef', cursor: 'not-allowed' }}
          readOnly disabled />
        <small style={{ color: '#6c757d', fontSize: '0.875rem' }}>Auto-filled from employee form</small>
      </div>

      {/* Client ID */}
    
<div style={{ marginBottom: '1.5rem' }}>
  <label style={labelStyle}>Client ID</label>
  <input type="text" name="client_id" value={addressFormData.client_id}
    onChange={handleAddressInputChange}
    style={{ ...inputStyle, backgroundColor: '#e9ecef', cursor: 'not-allowed' }}
    readOnly disabled />
  <small style={{ color: '#6c757d', fontSize: '0.875rem' }}>Auto-filled from client form</small>
</div>

      {/* Address Type */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Address Type</label>
        <select name="address_type" value={addressFormData.address_type}
          onChange={handleAddressInputChange}
          style={isEditMode && !editableForms.address ? readOnlyStyle : inputStyle}
          disabled={isEditMode && !editableForms.address}>
          <option value="">Select Address Type</option>
          <option value="Home">Home</option>
          <option value="Work">Work</option>
          <option value="Mailing">Mailing</option>
        </select>
      </div>

      {/* Address Line 1 */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Address Line 1 <span style={{ color: 'red' }}>*</span></label>
        <input type="text" name="address_line_1" value={addressFormData.address_line_1}
          onChange={handleAddressInputChange}
          style={isEditMode && !editableForms.address ? readOnlyStyle : inputStyle}
          disabled={isEditMode && !editableForms.address} required />
      </div>

      {/* Address Line 2 */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Address Line 2</label>
        <input type="text" name="address_line_2" value={addressFormData.address_line_2}
          onChange={handleAddressInputChange}
          style={isEditMode && !editableForms.address ? readOnlyStyle : inputStyle}
          disabled={isEditMode && !editableForms.address} />
      </div>

      {/* Address Line 3 */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Address Line 3</label>
        <input type="text" name="address_line_3" value={addressFormData.address_line_3}
          onChange={handleAddressInputChange}
          style={isEditMode && !editableForms.address ? readOnlyStyle : inputStyle}
          disabled={isEditMode && !editableForms.address} />
      </div>

      {/* City and State */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <label style={labelStyle}>City <span style={{ color: 'red' }}>*</span></label>
          <input type="text" name="city" value={addressFormData.city}
            onChange={handleAddressInputChange}
            style={isEditMode && !editableForms.address ? readOnlyStyle : inputStyle}
            disabled={isEditMode && !editableForms.address} required />
        </div>
        <div>
          <label style={labelStyle}>State <span style={{ color: 'red' }}>*</span></label>
          <input type="text" name="state" value={addressFormData.state}
            onChange={handleAddressInputChange}
            style={isEditMode && !editableForms.address ? readOnlyStyle : inputStyle}
            disabled={isEditMode && !editableForms.address} required />
        </div>
      </div>

      {/* Zip Code and Country */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <label style={labelStyle}>Zip Code <span style={{ color: 'red' }}>*</span></label>
          <input type="text" name="zipcode" value={addressFormData.zipcode}
            onChange={handleAddressInputChange}
            style={isEditMode && !editableForms.address ? readOnlyStyle : inputStyle}
            disabled={isEditMode && !editableForms.address}
            pattern="[0-9]{5}" required />
        </div>
        <div>
          <label style={labelStyle}>Country</label>
          <input type="text" name="country" value={addressFormData.country}
            onChange={handleAddressInputChange}
            style={isEditMode && !editableForms.address ? readOnlyStyle : inputStyle}
            disabled={isEditMode && !editableForms.address} />
        </div>
      </div>

      {/* Buttons */}
      {!isEditMode && (
        <button type="submit" style={buttonStyle}>Save Address</button>
      )}
      {isEditMode && editableForms.address && (
        <button type="submit" style={buttonStyle}>Update Address</button>
      )}

    </form>
  </div>
)}

      {/* Contact Tab */}
    {activeTab === 'contact' && (
  <div>
    {/* Title + Edit Button */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>
        {isEditMode ? 'View Contact Information' : 'Add Contact Information'}
      </h2>
      {isEditMode && (
        <button
          type="button"
          onClick={() => setEditableForms(prev => ({ ...prev, contact: !prev.contact }))}
          style={{
            padding: '0.5rem 1.5rem',
            backgroundColor: editableForms.contact ? '#dc3545' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          {editableForms.contact ? '✕ Cancel' : '✏️ Edit'}
        </button>
      )}
    </div>

    <form
      onSubmit={isEditMode && editableForms.contact ? handleUpdateContact : handleContactSubmit}
      style={{ maxWidth: '600px', margin: '0 auto' }}
    >
      {/* Party ID */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Party ID <span style={{ color: 'red' }}>*</span></label>
        <input type="text"
          value={lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId') || ''}
          style={{ ...inputStyle, backgroundColor: '#e9ecef', cursor: 'not-allowed' }}
          readOnly disabled />
      </div>

      {/* Phone Number */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Phone Number <span style={{ color: 'red' }}>*</span></label>
        <input type="tel" name="phone_number" value={contactFormData.phone_number}
          onChange={handleContactInputChange}
          style={isEditMode && !editableForms.contact ? readOnlyStyle : inputStyle}
          disabled={isEditMode && !editableForms.contact} required />
      </div>

      {/* Email */}
      <div style={{ marginBottom: '2rem' }}>
        <label style={labelStyle}>Email <span style={{ color: 'red' }}>*</span></label>
        <input type="email" name="email" value={contactFormData.email}
          onChange={handleContactInputChange}
          style={isEditMode && !editableForms.contact ? readOnlyStyle : inputStyle}
          disabled={isEditMode && !editableForms.contact} required />
      </div>

      {/* Buttons */}
      {!isEditMode && (
        <button type="submit" style={buttonStyle}>Save Contact</button>
      )}
      {isEditMode && editableForms.contact && (
        <button type="submit" style={buttonStyle}>Update Contact</button>
      )}

    </form>
  </div>
)}

      {/* Bank Tab */}
   {activeTab === 'bank' && (
  <div>
    {/* Title + Edit Button */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>
        {isEditMode ? 'View Bank Information' : 'Add Bank Information'}
      </h2>
      {isEditMode && (
        <button
          type="button"
          onClick={() => setEditableForms(prev => ({ ...prev, bank: !prev.bank }))}
          style={{
            padding: '0.5rem 1.5rem',
            backgroundColor: editableForms.bank ? '#dc3545' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          {editableForms.bank ? '✕ Cancel' : '✏️ Edit'}
        </button>
      )}
    </div>

    <form
      onSubmit={isEditMode && editableForms.bank ? handleUpdateBank : handleBankSubmit}
      style={{ maxWidth: '600px', margin: '0 auto' }}
    >
      {/* Party ID */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Party ID <span style={{ color: 'red' }}>*</span></label>
        <input type="text"
          value={lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId') || ''}
          style={{ ...inputStyle, backgroundColor: '#e9ecef', cursor: 'not-allowed' }}
          readOnly disabled />
      </div>

      {/* Bank Name */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Bank Name <span style={{ color: 'red' }}>*</span></label>
        <input type="text" name="bank_name" value={bankFormData.bank_name}
          onChange={handleBankInputChange}
          style={isEditMode && !editableForms.bank ? readOnlyStyle : inputStyle}
          disabled={isEditMode && !editableForms.bank} required />
      </div>

      {/* Account Number */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Account Number <span style={{ color: 'red' }}>*</span></label>
        <input type="text" name="account_number" value={bankFormData.account_number}
          onChange={handleBankInputChange}
          style={isEditMode && !editableForms.bank ? readOnlyStyle : inputStyle}
          disabled={isEditMode && !editableForms.bank} required />
      </div>

      {/* Routing Number */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Routing Number <span style={{ color: 'red' }}>*</span></label>
        <input type="text" name="routing_number" value={bankFormData.routing_number}
          onChange={handleBankInputChange}
          style={isEditMode && !editableForms.bank ? readOnlyStyle : inputStyle}
          disabled={isEditMode && !editableForms.bank}
           required />
      </div>

      {/* Bank Status */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Bank Status</label>
        <select name="bank_status" value={bankFormData.bank_status}
          onChange={handleBankInputChange}
          style={isEditMode && !editableForms.bank ? readOnlyStyle : inputStyle}
          disabled={isEditMode && !editableForms.bank}>
          <option value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* Zip Code */}
      <div style={{ marginBottom: '2rem' }}>
        <label style={labelStyle}>Zip Code</label>
        <input type="text" name="zip_code" value={bankFormData.zip_code}
          onChange={handleBankInputChange}
          style={isEditMode && !editableForms.bank ? readOnlyStyle : inputStyle}
          disabled={isEditMode && !editableForms.bank}
          pattern="[0-9]{5}" />
      </div>

      {/* Buttons */}
      {!isEditMode && (
        <button type="submit" style={buttonStyle}>Save Bank Information</button>
      )}
      {isEditMode && editableForms.bank && (
        <button type="submit" style={buttonStyle}>Update Bank</button>
      )}

    </form>
  </div>
)}

      {/* Education Tab */}
      {activeTab === 'education' && (
  <div>
    {/* Title + Edit Button */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>
        {isEditMode ? 'View Education Information' : 'Add Education Information'}
      </h2>
      {isEditMode && (
        <button
          type="button"
          onClick={() => setEditableForms(prev => ({ ...prev, education: !prev.education }))}
          style={{
            padding: '0.5rem 1.5rem',
            backgroundColor: editableForms.education ? '#dc3545' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          {editableForms.education ? '✕ Cancel' : '✏️ Edit'}
        </button>
      )}
    </div>

    <form
      onSubmit={isEditMode && editableForms.education ? handleUpdateEducation : handleEducationSubmit}
      style={{ maxWidth: '600px', margin: '0 auto' }}
    >
      {/* Party ID */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Party ID <span style={{ color: 'red' }}>*</span></label>
        <input type="text"
          value={lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId') || ''}
          style={{ ...inputStyle, backgroundColor: '#e9ecef', cursor: 'not-allowed' }}
          readOnly disabled />
      </div>

      {/* Degree */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Degree <span style={{ color: 'red' }}>*</span></label>
        <input type="text" name="degree" value={educationFormData.degree}
          onChange={handleEducationInputChange}
          style={isEditMode && !editableForms.education ? readOnlyStyle : inputStyle}
          disabled={isEditMode && !editableForms.education} required />
      </div>

      {/* University Name */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>University Name <span style={{ color: 'red' }}>*</span></label>
        <input type="text" name="university_name" value={educationFormData.university_name}
          onChange={handleEducationInputChange}
          style={isEditMode && !editableForms.education ? readOnlyStyle : inputStyle}
          disabled={isEditMode && !editableForms.education} required />
      </div>

      {/* Year Awarded */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Year Awarded <span style={{ color: 'red' }}>*</span></label>
        <input type="number" name="year_awarded" value={educationFormData.year_awarded}
          onChange={handleEducationInputChange}
          style={isEditMode && !editableForms.education ? readOnlyStyle : inputStyle}
          disabled={isEditMode && !editableForms.education}
          min="1950" max="2050" required />
      </div>

      {/* Coursework Details */}
      <div style={{ marginBottom: '2rem' }}>
        <label style={labelStyle}>Coursework Details</label>
        <textarea name="coursework_details" value={educationFormData.coursework_details}
          onChange={handleEducationInputChange}
          style={isEditMode && !editableForms.education ? readOnlyStyle : { ...inputStyle, minHeight: '100px', resize: 'vertical' }}
          disabled={isEditMode && !editableForms.education} />
      </div>

      {/* Buttons */}
      {!isEditMode && (
        <button type="submit" style={buttonStyle}>Save Education Information</button>
      )}
      {isEditMode && editableForms.education && (
        <button type="submit" style={buttonStyle}>Update Education</button>
      )}

    </form>
  </div>
)}

      {/* Experience Tab */}
     {activeTab === 'experience' && (
  <div>
    {/* Title + Edit Button */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>
        {isEditMode ? 'View Experience Information' : 'Add Experience Information'}
      </h2>
      {isEditMode && (
        <button
          type="button"
          onClick={() => setEditableForms(prev => ({ ...prev, experience: !prev.experience }))}
          style={{
            padding: '0.5rem 1.5rem',
            backgroundColor: editableForms.experience ? '#dc3545' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          {editableForms.experience ? '✕ Cancel' : '✏️ Edit'}
        </button>
      )}
    </div>

    <form
      onSubmit={isEditMode && editableForms.experience ? handleUpdateExperience : handleExperienceSubmit}
      style={{ maxWidth: '600px', margin: '0 auto' }}
    >
      {/* Party ID */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Party ID <span style={{ color: 'red' }}>*</span></label>
        <input type="text"
          value={lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId') || ''}
          style={{ ...inputStyle, backgroundColor: '#e9ecef', cursor: 'not-allowed' }}
          readOnly disabled />
      </div>

      {/* Employer Name */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Employer Name <span style={{ color: 'red' }}>*</span></label>
        <input type="text" name="employer_name" value={experienceFormData.employer_name}
          onChange={handleExperienceInputChange}
          style={isEditMode && !editableForms.experience ? readOnlyStyle : inputStyle}
          disabled={isEditMode && !editableForms.experience} required />
      </div>

      {/* From Date and To Date */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <label style={labelStyle}>From Date <span style={{ color: 'red' }}>*</span></label>
          <input type="date" name="from_date" value={experienceFormData.from_date}
            onChange={handleExperienceInputChange}
            style={isEditMode && !editableForms.experience ? readOnlyStyle : inputStyle}
            disabled={isEditMode && !editableForms.experience} required />
        </div>
        <div>
          <label style={labelStyle}>To Date <span style={{ color: 'red' }}>*</span></label>
          <input type="date" name="to_date" value={experienceFormData.to_date}
            onChange={handleExperienceInputChange}
            style={isEditMode && !editableForms.experience ? readOnlyStyle : inputStyle}
            disabled={isEditMode && !editableForms.experience} required />
        </div>
      </div>

      {/* Designation */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Designation <span style={{ color: 'red' }}>*</span></label>
        <input type="text" name="designation" value={experienceFormData.designation}
          onChange={handleExperienceInputChange}
          style={isEditMode && !editableForms.experience ? readOnlyStyle : inputStyle}
          disabled={isEditMode && !editableForms.experience} required />
      </div>

      {/* Role */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Role</label>
        <input type="text" name="role" value={experienceFormData.role}
          onChange={handleExperienceInputChange}
          style={isEditMode && !editableForms.experience ? readOnlyStyle : inputStyle}
          disabled={isEditMode && !editableForms.experience} />
      </div>

      {/* Job Duties */}
      <div style={{ marginBottom: '2rem' }}>
        <label style={labelStyle}>Job Duties</label>
        <textarea name="job_duties" value={experienceFormData.job_duties}
          onChange={handleExperienceInputChange}
          style={isEditMode && !editableForms.experience ? readOnlyStyle : { ...inputStyle, minHeight: '120px', resize: 'vertical' }}
          disabled={isEditMode && !editableForms.experience} />
      </div>

      {/* Buttons */}
      {!isEditMode && (
        <button type="submit" style={buttonStyle}>Save Experience Information</button>
      )}
      {isEditMode && editableForms.experience && (
        <button type="submit" style={buttonStyle}>Update Experience</button>
      )}

    </form>
  </div>
)}

      {/* Client Tab */}
     {activeTab === 'client' && (
  <div>
    {/* Title + Edit Button */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>
        {isEditMode ? 'View Client Information' : 'Add Client Information'}
      </h2>
      {isEditMode && (
        <button
          type="button"
          onClick={() => setEditableForms(prev => ({ ...prev, client: !prev.client }))}
          style={{
            padding: '0.5rem 1.5rem',
            backgroundColor: editableForms.client ? '#dc3545' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          {editableForms.client ? '✕ Cancel' : '✏️ Edit'}
        </button>
      )}
    </div>

    <form
      onSubmit={isEditMode && editableForms.client ? handleUpdateClient : handleClientSubmit}
      style={{ maxWidth: '600px', margin: '0 auto' }}
    >
      {/* Party ID */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Party ID <span style={{ color: 'red' }}>*</span></label>
        <input type="text"
          value={lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId') || ''}
          style={{ ...inputStyle, backgroundColor: '#e9ecef', cursor: 'not-allowed' }}
          readOnly disabled />
      </div>

      {/* Client Name */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Client Name <span style={{ color: 'red' }}>*</span></label>
        <input type="text" name="client_name" value={clientFormData.client_name}
          onChange={handleClientInputChange}
          style={isEditMode && !editableForms.client ? readOnlyStyle : inputStyle}
          disabled={isEditMode && !editableForms.client} required />
      </div>

      {/* Party Client Joining Date */}
      <div style={{ marginBottom: '2rem' }}>
        <label style={labelStyle}>Party Client Joining Date <span style={{ color: 'red' }}>*</span></label>
        <input type="date" name="party_client_joining_date"
          value={clientFormData.party_client_joining_date}
          onChange={handleClientInputChange}
          style={isEditMode && !editableForms.client ? readOnlyStyle : inputStyle}
          disabled={isEditMode && !editableForms.client} required />
      </div>

      {/* Buttons */}
      {!isEditMode && (
        <button type="submit" style={buttonStyle}>Save Client Information</button>
      )}
      {isEditMode && editableForms.client && (
        <button type="submit" style={buttonStyle}>Update Client</button>
      )}

    </form>
  </div>
)}

      {/* Immigration Tab */}
      {activeTab === 'immigration' && (
  <div>
    {/* Title + Edit Button */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>
        {isEditMode ? 'View Immigration Information' : 'Add Immigration Information'}
      </h2>
      {isEditMode && (
        <button
          type="button"
          onClick={() => setEditableForms(prev => ({ ...prev, immigration: !prev.immigration }))}
          style={{
            padding: '0.5rem 1.5rem',
            backgroundColor: editableForms.immigration ? '#dc3545' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          {editableForms.immigration ? '✕ Cancel' : '✏️ Edit'}
        </button>
      )}
    </div>

    <form
      onSubmit={isEditMode && editableForms.immigration ? handleUpdateImmigration : handleImmigrationSubmit}
      style={{ maxWidth: '800px', margin: '0 auto' }}
    >
      {/* Party ID */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Party ID <span style={{ color: 'red' }}>*</span></label>
        <input type="text"
          value={lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId') || ''}
          style={{ ...inputStyle, backgroundColor: '#e9ecef', cursor: 'not-allowed' }}
          readOnly disabled />
      </div>

      {/* Current Status and Status Requested */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <label style={labelStyle}>Current Status <span style={{ color: 'red' }}>*</span></label>
          <input type="text" name="current_status" value={immigrationFormData.current_status}
            onChange={handleImmigrationInputChange}
            style={isEditMode && !editableForms.immigration ? readOnlyStyle : inputStyle}
            disabled={isEditMode && !editableForms.immigration} required />
        </div>
        <div>
          <label style={labelStyle}>Status Requested</label>
          <input type="text" name="status_requested" value={immigrationFormData.status_requested}
            onChange={handleImmigrationInputChange}
            style={isEditMode && !editableForms.immigration ? readOnlyStyle : inputStyle}
            disabled={isEditMode && !editableForms.immigration} />
        </div>
      </div>

      {/* Current Status Expiration */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Current Status Expiration</label>
        <input type="date" name="current_status_expiration" value={immigrationFormData.current_status_expiration}
          onChange={handleImmigrationInputChange}
          style={isEditMode && !editableForms.immigration ? readOnlyStyle : inputStyle}
          disabled={isEditMode && !editableForms.immigration} />
      </div>

      {/* Consulate City and Country */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <label style={labelStyle}>Consulate City</label>
          <input type="text" name="consulate_city" value={immigrationFormData.consulate_city}
            onChange={handleImmigrationInputChange}
            style={isEditMode && !editableForms.immigration ? readOnlyStyle : inputStyle}
            disabled={isEditMode && !editableForms.immigration} />
        </div>
        <div>
          <label style={labelStyle}>Consulate Country</label>
          <input type="text" name="consulate_country" value={immigrationFormData.consulate_country}
            onChange={handleImmigrationInputChange}
            style={isEditMode && !editableForms.immigration ? readOnlyStyle : inputStyle}
            disabled={isEditMode && !editableForms.immigration} />
        </div>
      </div>

      {/* I-94 Number */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>I-94 Number</label>
        <input type="text" name="i94_number" value={immigrationFormData.i94_number}
          onChange={handleImmigrationInputChange}
          style={isEditMode && !editableForms.immigration ? readOnlyStyle : inputStyle}
          disabled={isEditMode && !editableForms.immigration} />
      </div>

      {/* I-94 Issue Date and Expiration */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <label style={labelStyle}>I-94 Issue Date</label>
          <input type="date" name="i94_issue_date" value={immigrationFormData.i94_issue_date}
            onChange={handleImmigrationInputChange}
            style={isEditMode && !editableForms.immigration ? readOnlyStyle : inputStyle}
            disabled={isEditMode && !editableForms.immigration} />
        </div>
        <div>
          <label style={labelStyle}>I-94 Expiration</label>
          <input type="date" name="i94_expiration" value={immigrationFormData.i94_expiration}
            onChange={handleImmigrationInputChange}
            style={isEditMode && !editableForms.immigration ? readOnlyStyle : inputStyle}
            disabled={isEditMode && !editableForms.immigration} />
        </div>
      </div>

      {/* Last Arrival Date */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Last Arrival Date</label>
        <input type="date" name="last_arrival_date" value={immigrationFormData.last_arrival_date}
          onChange={handleImmigrationInputChange}
          style={isEditMode && !editableForms.immigration ? readOnlyStyle : inputStyle}
          disabled={isEditMode && !editableForms.immigration} />
      </div>

      {/* Passport Number */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Passport Number <span style={{ color: 'red' }}>*</span></label>
        <input type="text" name="passport_number" value={immigrationFormData.passport_number}
          onChange={handleImmigrationInputChange}
          style={isEditMode && !editableForms.immigration ? readOnlyStyle : inputStyle}
          disabled={isEditMode && !editableForms.immigration} required />
      </div>

      {/* Passport Issue Date and Expiration */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <label style={labelStyle}>Passport Issue Date</label>
          <input type="date" name="passport_issue_date" value={immigrationFormData.passport_issue_date}
            onChange={handleImmigrationInputChange}
            style={isEditMode && !editableForms.immigration ? readOnlyStyle : inputStyle}
            disabled={isEditMode && !editableForms.immigration} />
        </div>
        <div>
          <label style={labelStyle}>Passport Expiration Date</label>
          <input type="date" name="passport_expiration_date" value={immigrationFormData.passport_expiration_date}
            onChange={handleImmigrationInputChange}
            style={isEditMode && !editableForms.immigration ? readOnlyStyle : inputStyle}
            disabled={isEditMode && !editableForms.immigration} />
        </div>
      </div>

      {/* Passport Place of Issue */}
      <div style={{ marginBottom: '2rem' }}>
        <label style={labelStyle}>Passport Place of Issue</label>
        <input type="text" name="passport_place_of_issue" value={immigrationFormData.passport_place_of_issue}
          onChange={handleImmigrationInputChange}
          style={isEditMode && !editableForms.immigration ? readOnlyStyle : inputStyle}
          disabled={isEditMode && !editableForms.immigration} />
      </div>

      {/* Buttons */}
      {!isEditMode && (
        <button type="submit" style={buttonStyle}>Save Immigration Information</button>
      )}
      {isEditMode && editableForms.immigration && (
        <button type="submit" style={buttonStyle}>Update Immigration</button>
      )}

    </form>
  </div>
)}
      {/* Visa History Tab */}
      {activeTab === 'visa-history' && (
  <div>
    {/* Title + Edit Button */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>
        {isEditMode ? 'View Visa History' : 'Add Visa History'}
      </h2>
      {isEditMode && (
        <button
          type="button"
          onClick={() => setEditableForms(prev => ({ ...prev, visaHistory: !prev.visaHistory }))}
          style={{
            padding: '0.5rem 1.5rem',
            backgroundColor: editableForms.visaHistory ? '#dc3545' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          {editableForms.visaHistory ? '✕ Cancel' : '✏️ Edit'}
        </button>
      )}
    </div>

    <form
      onSubmit={isEditMode && editableForms.visaHistory ? handleUpdateVisaHistory : handleVisaHistorySubmit}
      style={{ maxWidth: '600px', margin: '0 auto' }}
    >
      {/* Party ID */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Party ID <span style={{ color: 'red' }}>*</span></label>
        <input type="text"
          value={lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId') || ''}
          style={{ ...inputStyle, backgroundColor: '#e9ecef', cursor: 'not-allowed' }}
          readOnly disabled />
      </div>

      {/* Visa Type */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Visa Type <span style={{ color: 'red' }}>*</span></label>
        <input type="text" name="visa_type" value={visaHistoryFormData.visa_type}
          onChange={handleVisaHistoryInputChange}
          style={isEditMode && !editableForms.visaHistory ? readOnlyStyle : inputStyle}
          disabled={isEditMode && !editableForms.visaHistory} required />
      </div>

      {/* Date of Arrival and Departure */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <label style={labelStyle}>Date of Arrival <span style={{ color: 'red' }}>*</span></label>
          <input type="date" name="date_of_arrival" value={visaHistoryFormData.date_of_arrival}
            onChange={handleVisaHistoryInputChange}
            style={isEditMode && !editableForms.visaHistory ? readOnlyStyle : inputStyle}
            disabled={isEditMode && !editableForms.visaHistory} required />
        </div>
        <div>
          <label style={labelStyle}>Date of Departure</label>
          <input type="date" name="date_of_departure" value={visaHistoryFormData.date_of_departure}
            onChange={handleVisaHistoryInputChange}
            style={isEditMode && !editableForms.visaHistory ? readOnlyStyle : inputStyle}
            disabled={isEditMode && !editableForms.visaHistory} />
        </div>
      </div>

      {/* Receipt Number */}
      <div style={{ marginBottom: '2rem' }}>
        <label style={labelStyle}>Receipt Number <span style={{ color: 'red' }}>*</span></label>
        <input type="text" name="receipt_number" value={visaHistoryFormData.receipt_number}
          onChange={handleVisaHistoryInputChange}
          style={isEditMode && !editableForms.visaHistory ? readOnlyStyle : inputStyle}
          disabled={isEditMode && !editableForms.visaHistory} required />
      </div>

      {/* Buttons */}
      {!isEditMode && (
        <button type="submit" style={buttonStyle}>Save Visa History</button>
      )}
      {isEditMode && editableForms.visaHistory && (
        <button type="submit" style={buttonStyle}>Update Visa History</button>
      )}

    </form>
  </div>
)}

      {/*dependent tab*/}
     {activeTab === 'dependent' && (
  <div>
    {!showPartyDependentForm ? (
      <div>
        {/* Title + Edit Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>
            {isEditMode ? 'View Dependent' : 'Add Dependent'}
          </h2>
          {isEditMode && (
            <button
              type="button"
              onClick={() => setEditableForms(prev => ({ ...prev, dependent: !prev.dependent }))}
              style={{
                padding: '0.5rem 1.5rem',
                backgroundColor: editableForms.dependent ? '#dc3545' : '#28a745',
                color: 'white', border: 'none', borderRadius: '0.25rem',
                cursor: 'pointer', fontSize: '0.9rem'
              }}
            >
              {editableForms.dependent ? '✕ Cancel' : '✏️ Edit'}
            </button>
          )}
        </div>

        <form
          onSubmit={isEditMode && editableForms.dependent ? handleUpdateDependent : handleDependentSubmit}
          style={{ maxWidth: '800px', margin: '0 auto' }}
        >
          {/* Party Type */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Party Type</label>
            <input type="text" value="Dependent"
              style={{ ...inputStyle, backgroundColor: '#e9ecef', cursor: 'not-allowed' }}
              readOnly disabled />
          </div>

          {/* Relationship */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Relationship <span style={{ color: 'red' }}>*</span></label>
            <input type="text" name="party_relationship"
              value={dependentFormData.party_relationship}
              onChange={handleDependentInputChange}
              style={isEditMode && !editableForms.dependent ? readOnlyStyle : inputStyle}
              disabled={isEditMode && !editableForms.dependent}
              placeholder="e.g. daughter, son, spouse" required />
          </div>

          {/* First, Middle, Last Name */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={labelStyle}>First Name <span style={{ color: 'red' }}>*</span></label>
              <input type="text" name="first_name" value={dependentFormData.first_name}
                onChange={handleDependentInputChange}
                style={isEditMode && !editableForms.dependent ? readOnlyStyle : inputStyle}
                disabled={isEditMode && !editableForms.dependent} required />
            </div>
            <div>
              <label style={labelStyle}>Middle Name</label>
              <input type="text" name="middle_name" value={dependentFormData.middle_name}
                onChange={handleDependentInputChange}
                style={isEditMode && !editableForms.dependent ? readOnlyStyle : inputStyle}
                disabled={isEditMode && !editableForms.dependent} />
            </div>
            <div>
              <label style={labelStyle}>Last Name <span style={{ color: 'red' }}>*</span></label>
              <input type="text" name="last_name" value={dependentFormData.last_name}
                onChange={handleDependentInputChange}
                style={isEditMode && !editableForms.dependent ? readOnlyStyle : inputStyle}
                disabled={isEditMode && !editableForms.dependent} required />
            </div>
          </div>

          {/* Date of Birth and SSN */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={labelStyle}>Date of Birth <span style={{ color: 'red' }}>*</span></label>
              <input type="date" name="date_of_birth" value={dependentFormData.date_of_birth}
                onChange={handleDependentInputChange}
                style={isEditMode && !editableForms.dependent ? readOnlyStyle : inputStyle}
                disabled={isEditMode && !editableForms.dependent} required />
            </div>
            <div>
              <label style={labelStyle}>SSN <span style={{ color: 'red' }}>*</span></label>
              <input type="text" name="ssn" value={dependentFormData.ssn}
                onChange={handleDependentInputChange}
                style={isEditMode && !editableForms.dependent ? readOnlyStyle : inputStyle}
                disabled={isEditMode && !editableForms.dependent}
                placeholder="XXX-XX-XXXX" maxLength={11} required />
            </div>
          </div>

          {/* City and Country of Birth */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={labelStyle}>City of Birth</label>
              <input type="text" name="city_of_birth" value={dependentFormData.city_of_birth}
                onChange={handleDependentInputChange}
                style={isEditMode && !editableForms.dependent ? readOnlyStyle : inputStyle}
                disabled={isEditMode && !editableForms.dependent} />
            </div>
            <div>
              <label style={labelStyle}>Country of Birth</label>
              <select name="country_of_birth" value={dependentFormData.country_of_birth}
                onChange={handleDependentInputChange}
                style={isEditMode && !editableForms.dependent ? readOnlyStyle : inputStyle}
                disabled={isEditMode && !editableForms.dependent}>
                <option value="">Select Country</option>
                {COUNTRIES.map(c => (<option key={c} value={c}>{c}</option>))}
              </select>
            </div>
          </div>

          {/* Country of Citizenship */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Country of Citizenship</label>
            <select name="country_of_citizenship" value={dependentFormData.country_of_citizenship}
              onChange={handleDependentInputChange}
              style={isEditMode && !editableForms.dependent ? readOnlyStyle : inputStyle}
              disabled={isEditMode && !editableForms.dependent}>
              <option value="">Select Country</option>
              {COUNTRIES.map(c => (<option key={c} value={c}>{c}</option>))}
            </select>
          </div>

          {/* Buttons */}
          {!isEditMode && (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" style={{ ...buttonStyle, flex: 1 }}>
                Save Dependent
              </button>
              <button type="button"
                onClick={() => setShowPartyDependentForm(true)}
                style={{ ...buttonStyle, flex: 1 }}>
                Next →
              </button>
            </div>
          )}

          {isEditMode && (
            <div style={{ display: 'flex', gap: '1rem' }}>
              {editableForms.dependent && (
                <button type="submit" style={{ ...buttonStyle, flex: 1 }}>
                  Update Dependent
                </button>
              )}
              <button type="button"
                onClick={() => setShowPartyDependentForm(true)}
                style={{ ...buttonStyle, flex: 1 }}>
                Next →
              </button>
            </div>
          )}

        </form>
      </div>

    ) : (

      <div>
        {/* Title + Edit Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>
            {isEditMode ? 'View Party Dependent Relationship' : 'Add Party Dependent Relationship'}
          </h2>
          {isEditMode && (
            <button
              type="button"
              onClick={() => setEditableForms(prev => ({ ...prev, dependent: !prev.dependent }))}
              style={{
                padding: '0.5rem 1.5rem',
                backgroundColor: editableForms.dependent ? '#dc3545' : '#28a745',
                color: 'white', border: 'none', borderRadius: '0.25rem',
                cursor: 'pointer', fontSize: '0.9rem'
              }}
            >
              {editableForms.dependent ? '✕ Cancel' : '✏️ Edit'}
            </button>
          )}
        </div>

        <form onSubmit={handlePartyDependentSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>

          {/* Main Employee Party ID */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Main Employee Party ID (party_id_1)</label>
            <input type="text"
              value={lastCreatedPartyId || localStorage.getItem('lastCreatedPartyId') || ''}
              style={{ ...inputStyle, backgroundColor: '#e9ecef', cursor: 'not-allowed' }}
              readOnly disabled />
            <small style={{ color: '#6c757d' }}>Auto-filled</small>
          </div>

          {/* Dependent Party ID */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Dependent Party ID (party_id_2)</label>
            <input type="text"
              value={dependentPartyId || ''}
              style={{ ...inputStyle, backgroundColor: '#e9ecef', cursor: 'not-allowed' }}
              readOnly disabled />
            <small style={{ color: '#6c757d' }}>Auto-filled from dependent</small>
          </div>

          {/* Relationship */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={labelStyle}>Relationship <span style={{ color: 'red' }}>*</span></label>
            <input type="text"
              value={partyDependentRel}
              onChange={(e) => setPartyDependentRel(e.target.value)}
              style={isEditMode && !editableForms.dependent ? readOnlyStyle : inputStyle}
              disabled={isEditMode && !editableForms.dependent}
              placeholder="e.g. Son, Daughter, Spouse" required />
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            {/* Back — always visible */}
            <button type="button"
              onClick={() => setShowPartyDependentForm(false)}
              style={{ ...buttonStyle, width: 'auto', padding: '0.75rem 2rem' }}>
              ← Back
            </button>

            {/* Save — only in add mode */}
            {!isEditMode && (
              <button type="submit" style={buttonStyle}>
                Save Party Dependent
              </button>
            )}

            {/* Update — only in edit mode when editing */}
            {isEditMode && editableForms.dependent && (
              <button type="submit" style={buttonStyle}>
                Update Party Dependent
              </button>
            )}
          </div>

        </form>
      </div>
    )}
  </div>
)}




      {/* Employee List Tab */}
      {activeTab === 'employee-list' && (
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>All Employees ({employees.length})</h2>
          {employees.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#6c757d', padding: '2rem' }}>No employees added yet.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Name</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Party Type</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>DOB</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>SSN</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                      <td style={{ padding: '1rem' }}>{emp.first_name} {emp.middle_name} {emp.last_name}</td>
                      <td style={{ padding: '1rem' }}>{emp.party_type}</td>
                      <td style={{ padding: '1rem' }}>{emp.date_of_birth}</td>
                      <td style={{ padding: '1rem' }}>{emp.ssn}</td>
                      <td style={{ padding: '1rem' }}>
                        <button onClick={() => deleteEmployee(emp.id)} style={{
                          padding: '0.5rem 1rem', backgroundColor: '#dc3545', color: 'white',
                          border: 'none', borderRadius: '0.25rem', cursor: 'pointer', fontSize: '0.875rem'
                        }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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