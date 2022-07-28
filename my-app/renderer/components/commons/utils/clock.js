const clock = document.querySelector("h2#clock");

const getClock = () => {
  const date = new Date();
  const yyyy = String(date.getFullYear());
  const mm = String(date.getMonth() + 1);
  const dd = String(date.getDay());
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const result = `${hours}:${minutes}:${seconds}`;
};
