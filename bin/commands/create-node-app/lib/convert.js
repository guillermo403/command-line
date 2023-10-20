export const JsonToString = (json) => {
  try {
    return JSON.stringify(json, null, 2)
  } catch (error) {
    return json
  }
}
