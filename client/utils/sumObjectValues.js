const sumObjectValues = (arr, identifier) => {
  return arr
    .map((el) => { return el[identifier] })
    .reduce((prev, next) => { return (prev += next) }, 0)
}

export default sumObjectValues
