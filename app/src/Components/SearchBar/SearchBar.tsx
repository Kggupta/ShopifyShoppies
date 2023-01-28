import React, { useCallback, useEffect, useState } from "react";
import { Icon, Autocomplete } from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";
import { useLazyQuery } from "@apollo/client";
import { LOAD_TITLE } from "../../graphql/query";
import { OptionDescriptor } from "@shopify/polaris/build/ts/latest/src/types";
import { useDispatch } from "react-redux";
import { setMovies } from "../../actions";

export default function SearchBar() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const deselectedOptions: any = [];

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<OptionDescriptor[]>(deselectedOptions);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [movieType, { data }] = useLazyQuery(LOAD_TITLE, {
    variables: {
      title: inputValue,
    },
  });

  useEffect(() => {
    console.log(inputValue);
    movieType();
  }, [inputValue, movieType]);

  useEffect(() => {
    let movies: OptionDescriptor[] = [];
    if (data?.search) {
      dispatch(setMovies(data?.search));
      setOptions([]);
    }
    setOptions(movies);
    setLoading(false);
  }, [data, dispatch]);

  const updateText = useCallback(
    (value) => {
      setInputValue(value);
      if (!loading) {
        setLoading(true);
      }
      if (value === "") {
        setOptions(deselectedOptions);
        setLoading(false);
        return;
      }
      movieType();
    },
    [deselectedOptions, loading, movieType]
  );

  const updateSelection = useCallback(
    (selected) => {
      for (let i = 0; i < options.length; i++) {
        if (options[i].value === selected[0]) {
          const idx = (options[i]?.label as string).indexOf("(");
          const data = (options[i]?.label as string).substring(0, idx).trim();
          setInputValue(data);
          setSelectedOptions(selected);
        }
      }
    },
    [options]
  );

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Nominate Films :"
      value={inputValue}
      prefix={<Icon source={SearchMinor} color="base" />}
      placeholder="Search"
      autoComplete=""
    />
  );

  function onClicking(e: KeyboardEvent) {
    if (data?.search) {
      dispatch(setMovies(data?.search));
      setOptions([]);
    }
  }

  return (
    <div style={{ height: "15vh" }} onKeyPress={(e: any) => onClicking(e)}>
      <Autocomplete
        options={options}
        selected={selectedOptions}
        onSelect={updateSelection}
        textField={textField}
      />
    </div>
  );
}
