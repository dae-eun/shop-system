export const addressSearch = (callback) => {
    const script = document.createElement('script');
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.onload = function () {
        window.daumPostcode = new window.daum.Postcode({
            oncomplete: function (data) {
                callback(data);
            },
        }).open();
    };
    document.head.appendChild(script);
}