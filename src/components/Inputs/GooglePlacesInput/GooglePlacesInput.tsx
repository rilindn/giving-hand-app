import React, { useState, useMemo, SyntheticEvent } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import '@reach/combobox/styles.css';
import { Autocomplete, TextField } from '@mui/material';
import { ILocation } from 'interfaces/product';
import { Control, Controller, FieldPathValue } from 'react-hook-form';
import { FieldPath, FieldValues, FieldErrors } from 'react-hook-form/dist/types';
import styles from './GooglePlacesInput.module.scss';

const libraries: ('drawing' | 'geometry' | 'localContext' | 'places' | 'visualization')[] = ['places'];

interface Props {
  location: ILocation | undefined;
  setLocation: (val: ILocation) => void;
  name: string;
  label: string;
  control: Control<any>;
  errors?: FieldErrors | any;
}

const GooglePlacesInput: React.FC<Props> = ({ location, setLocation, ...rest }) => {
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY!;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey,
    libraries
  });
  const [recenter, setRecenter] = useState<boolean>(false);
  const center = useMemo(() => ({ lat: 42.605341172965126, lng: 20.843444824218754 }), []);

  if (!isLoaded) return <div>Loading...</div>;

  const handleOnChange = (e: google.maps.MapMouseEvent) => {
    // setRecenter(false);
    // const lat = e.latLng?.lat();
    // const lng = e.latLng?.lng();
    // if (lat && lng) {
    //   setLocation({ lat, lng });
    // }
  };

  return (
    <>
      <div>
        <PlacesAutocomplete
          setLocation={(val: ILocation) => {
            setLocation(val);
            setRecenter(true);
          }}
          {...rest}
        />
      </div>

      <GoogleMap
        zoom={8}
        mapContainerStyle={{ height: 250, borderRadius: 15 }}
        center={(recenter && location) || center}
        onClick={handleOnChange}
      >
        {location && <MarkerF position={location} draggable={true} onDragEnd={handleOnChange} />}
      </GoogleMap>
    </>
  );
};

interface IPlacesAutoComplete {
  name: string;
  label: string;
  control: Control<any>;
  setLocation: (val: ILocation) => void;
  errors?: FieldErrors | any;
}

const PlacesAutocomplete: React.FC<IPlacesAutoComplete> = ({ name, label, errors, control, setLocation }) => {
  const {
    value,
    setValue,
    suggestions: { data },
    clearSuggestions
  } = usePlacesAutocomplete();

  const handleSelect = async (
    event: SyntheticEvent<Element, Event>,
    newValue: { label: string; value: string } | null,
    onChangeVal: (...event: any[]) => void
  ) => {
    onChangeVal(event);

    const address = newValue?.label;
    if (!address) return;

    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setLocation({ lat, lng, address });
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event?.target?.value);
  };
  return (
    <div className={styles.select}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }: IController) => (
          <Autocomplete
            options={data.map(({ place_id, description }) => {
              return { label: description, value: place_id };
            })}
            onChange={(e, val) => handleSelect(e, val, onChange)}
            className={styles.input}
            renderInput={(params) => <TextField onChange={handleOnChange} margin="normal" label={label} {...params} />}
          />
        )}
      />
      {errors?.[name] && <span className={styles.error}>{errors?.[name]?.message}</span>}
    </div>
  );
};

interface IController {
  field: {
    onChange: (...event: any[]) => void;
    value: FieldPathValue<FieldValues, FieldPath<FieldValues>>;
  };
}

export default GooglePlacesInput;
