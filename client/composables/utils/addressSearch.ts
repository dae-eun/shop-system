interface AddressData {
  // Define the properties of the address data object
  // based on the data structure returned by the callback
  // from the daum.Postcode API
  // Example properties:
  zonecode: string
  address: string
  // Add more properties as needed
}

interface AddressCallback {
  (data: AddressData): void
}

declare global {
  interface Window {
    daumPostcode: any
    daum: any
  }
}

export const addressSearch = (callback: AddressCallback): void => {
  const script: HTMLScriptElement = document.createElement('script');
  script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  script.onload = function () {
    window.daumPostcode = new window.daum.Postcode({
      oncomplete(data: AddressData) {
        callback(data);
      },
    }).open();
  };
  document.head.appendChild(script);
};

// export const addressSearch = (callback) => {
//   const script = document.createElement('script');
//   script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
//   script.onload = function () {
//     window.daumPostcode = new window.daum.Postcode({
//       oncomplete(data) {
//         callback(data);
//       },
//     }).open();
//   };
//   document.head.appendChild(script);
// };
