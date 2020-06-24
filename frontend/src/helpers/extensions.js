import moment from "moment";

export function comparaDates(date) {
    console.log(date);
    const dateActual = new Date();
    const dateFromForm = new Date(date);
    let dates = ""
    if(dateActual.getTime() > dateFromForm.getTime()) {
        return true
    } else {
      return false;
    }
}