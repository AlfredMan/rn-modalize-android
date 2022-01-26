import axios from "axios";

export const FB_FUNC_URL = `https://europe-west2-baolondon-ae6db.cloudfunctions.net`;
export const postFbFunc = async ({
  endpoint,
  data,
}: {
  endpoint: string;
  data?: any;
}) => axios.post(`${FB_FUNC_URL}/sumbit_order_number_and_update_points`, data);
// (
//   await fetch(`${FB_FUNC_URL}/sumbit_order_number_and_update_points`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       // Accept: "application/json",
//     },
//     body: JSON.stringify(data),
//   })
// )
// .json();

// .then(function (response) {
//   console.log(response);
// })
// .catch(function (error) {
//   console.log(error);
// });
