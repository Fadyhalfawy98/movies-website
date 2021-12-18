const HandleButtonTransfer = (history, path, label)  => {

  if (label === "Signup") return history.replace(path);

  return history.push(path);
}

export default HandleButtonTransfer;