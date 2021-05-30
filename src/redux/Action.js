export function UserAction(tipe, value) {
  return { type: "SET_USER", tipeInput: tipe, valueInput: value };
}
