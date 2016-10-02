const sumObjectValues = (obj, identifier) => {
  return obj
    .map((el) => { return el[identifier] })
    .reduce((prev, next) => { return (prev += next) }, 0)
}

export default sumObjectValues
