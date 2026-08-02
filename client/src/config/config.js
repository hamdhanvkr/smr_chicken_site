export const API_URL =
    window.location.hostname === "localhost"
        ? "http://localhost:5000/api"
        : "/api";

export const IMAGE_URL =
    window.location.hostname === "localhost"
        ? "http://localhost:5000/uploads"
        : "/uploads";
        


// export const API_URL =
//     window.location.hostname === "localhost"
//         ? "http://localhost:5000/api"
//         : "/api";

// export const IMAGE_URL =
//     window.location.hostname === "localhost"
//         // ? "http://localhost:5000/uploads"
//         ? "https://smrchicken.com/uploads"
//         : "/uploads";