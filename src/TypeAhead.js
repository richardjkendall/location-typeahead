import React, { useState } from 'react';

import { AsyncTypeahead } from 'react-bootstrap-typeahead';

import 'react-bootstrap-typeahead/css/Typeahead.css';

const SEARCH_URI = 'https://location.richardjameskendall.com/typeahead';

const AsyncExample = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const summariseAddress = (address) => {
    var addressString = "";
    if(address.unitNumber && address.unitTypeCode) {
      addressString = address.unitTypeCode + " " + address.unitNumber + " ";
    }
    if(address.levelNumber && address.levelTypeCode) {
      addressString = address.levelTypeCode + " " + address.levelNumber + " ";
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

    fetch(`${SEARCH_URI}?filter=${query}`)
      .then((resp) => resp.json())
      .then((locations) => {
        const options = locations.map((location) => ({
          address: summariseAddress(location),
          id: location.gnafId
        }));

        console.log(options);

        setOptions(options);
        setIsLoading(false);
      });
  };

  return (
    <AsyncTypeahead
      id="async-example"
      isLoading={isLoading}
      labelKey="address"
      minLength={5}
      onSearch={handleSearch}
      options={options}
      placeholder="Type your address"
      filterBy={() => true}
    />
  );
};

export default AsyncExample;