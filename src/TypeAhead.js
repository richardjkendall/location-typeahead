import React, { useState } from 'react';

import { AsyncTypeahead } from 'react-bootstrap-typeahead';

import 'react-bootstrap-typeahead/css/Typeahead.css';

const SEARCH_URI = 'https://loc-k8s.richardjameskendall.com/typeahead';

const AsyncExample = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [queryStart, setQueryStart] = useState(0);
  const [queryEnd, setQueryEnd] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState("");

  const summariseAddress = (address) => {
    var addressString = "";
    if(address.addressSiteName) {
      addressString = address.addressSiteName + " ";
    }
    if(address.unitNumber && address.unitTypeCode) {
      addressString = addressString + address.unitTypeCode + " " + address.unitNumber + " ";
    }
    if(address.levelNumber && address.levelTypeCode) {
      addressString = addressString + address.levelTypeCode + " " + address.levelNumber + " ";
    }
    if(address.roadNumber1) {
      if(address.roadNumber2) {
        addressString = addressString + address.roadNumber1 + "-" + address.roadNumber2 + " ";
      } else {
        addressString = addressString + address.roadNumber1 + " ";
      }
    } else {
      if(address.lotNumber) {
        addressString = addressString + "LOT " + address.lotNumber + " ";
      }
    }
    addressString = addressString + address.roadName + " " + address.roadTypeCode + " " + address.localityName + " " + address.stateCode + " " + address.postCode;
    return addressString;
  };

  const handleSearch = (query) => {
    setIsLoading(true);
    setQueryStart(new Date().getTime());

    fetch(`${SEARCH_URI}?filter=${query}&limit=20`)
      .then((resp) => resp.json())
      .then((locations) => {
        setQueryEnd(new Date().getTime());

        const options = locations.map((location) => ({
          address: summariseAddress(location),
          id: location.gnafId
        }));

        console.log(options);

        setOptions(options);
        setIsLoading(false);
      });
  };

  const handleSelect = (e) => {
    console.log(e);
    if(e.length > 0) {
      setSelectedAddress(e[0].id);
    }
  };

  return (
    <div>
      <AsyncTypeahead
        id="async-example"
        isLoading={isLoading}
        labelKey="address"
        minLength={5}
        onSearch={handleSearch}
        options={options}
        placeholder="Type your address"
        filterBy={() => true}
        onChange={handleSelect}
      />
      {queryStart > 0 && <p style={{marginTop: "10px"}}>Query time {queryEnd - queryStart}ms</p>}
      {selectedAddress !== "" && <p>Selected address: {selectedAddress}</p>}
    </div>
  );
};

export default AsyncExample;
