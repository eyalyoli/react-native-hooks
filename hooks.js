import React, { useReducer } from "react";
import { useState, useEffect } from "react";

/**
 * A hook that uses useState with an object
 * @param {*} PropsWithDefaultValues object with all needed props and their initial value
 * @returns [state, setProp] state - the state object, setProp - dispatch 
 * changes one (given prop name & prop value) or multiple props (given an 
 * object { prop: value, ...}) in object state
 */
export function useObjectState(PropsWithDefaultValues) {
  const [obj, setObj] = useState(PropsWithDefaultValues);

  return [
    obj,
    (newData, newVal) => {
      let tmp = newData;
      if (typeof newVal !== "undefined") {
        tmp = {};
        tmp[newData] = newVal;
      }
      setObj({ ...obj, ...tmp });
    },
  ];
}

/**
 * Same as useObjectState but uses useReducer instead of useState
 *  (better performance for complex cases)
 * @param {*} PropsWithDefaultValues object with all needed props 
 * and their initial value
 * @returns [state, setProp] state - the state object, setProp - dispatch 
 * changes one (given prop name & prop value) or multiple props (given an 
 * object { prop: value, ...}) in object state
 */
export function useObjectReducer(PropsWithDefaultValues) {
  const [state, dispatch] = useReducer(reducer, PropsWithDefaultValues);

  //newFieldsVal={[field_name]: [field_value], ...}
  function reducer(state, newFieldsVal) {
    return { ...state, ...newFieldsVal };
  }

  return [
    state,
    (newFieldsVal, newVal) => {
      if (typeof newVal !== "undefined") {
        const tmp = {};
        tmp[newFieldsVal] = newVal;
        dispatch(tmp);
      } else {
        dispatch(newFieldsVal);
      }
    },
  ];
}

/**
 * A hook based on useState for easy management of array items
 * @param {*} defaultValues an initial array filled with elements
 * @returns [arr, add, remove, setArr] arr - the array state, add - dispatch to add one element to the array
 * remove - removes element, setArr - overrides the whole array state
 */
export function useArrayState(defaultValues) {
  const [arr, setArr] = useState(defaultValues ? defaultValues : []);

  function add(item) {
    let newArr = [];
    if (arr) newArr = arr;

    newArr = newArr.concat(item);
    setArr(newArr);
  }

  function remove(item, isIndex = false) {
    if (!arr || arr.length <= 0) return;

    setArr(
      arr.filter((it, i) => {
        if (isIndex) return i !== item;
        else return it !== item;
      })
    );
  }

  return [arr, add, remove, setArr];
}

// eslint-disable-next-line react-hooks/exhaustive-deps
export const useEffectOnlyOnce = (func) => useEffect(func, []);
