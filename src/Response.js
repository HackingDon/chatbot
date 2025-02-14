function Response(query) {
  debugger
  if (query.includes("Hi") || query.includes("hi")) {
    return "Hello!🥱";
  } else if (query.includes("How") || query.includes("how")) {
    return "I am Good!🤗";
  } else if (query.includes("time")) {
    const time = new Date();
    return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}🕠`;
  } else {
    return "Thank You! Bye👋";
  }
}
export default Response;
