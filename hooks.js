import React, { useReducer } from "react";
import { useState, useEffect } from "react";

export function useObjectState(defVal) {
  const [obj, setObj] = useState(defVal);

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

export function useObjectReducer(fieldsWithDefVals) {
  const [state, dispatch] = useReducer(reducer, fieldsWithDefVals);

  //newFieldsVal={[field_name]: [field_value], ...}
  function reducer(state, newFieldsVal) {
    console.log("updating ", newFieldsVal);
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

export function useArrayState(defVal) {
  const [arr, setArr] = useState(defVal ? defVal : []);

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

export const useEffectOnlyOnce = (func) => useEffect(func, []);
