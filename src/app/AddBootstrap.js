// "use client";
// import {useEffect} from 'react';

// export default function AddBootstrap() {
//     useEffect(() => {
//         // @ts-ignore
//         import("bootstrap/dist/js/bootstrap.bundle.min.js");
//     }, []);

//     return <></>;
// }
// "use client";
// import { useEffect } from "react";

// export default function AddBootstrap() {
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       require("bootstrap/dist/js/bootstrap.bundle.min.js");
//     }
//   }, []);

//   return null; // No need to return an empty fragment
// }

// "use client";
// import { useEffect } from "react";

// export default function AddBootstrap() {
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       require("bootstrap/dist/js/bootstrap.bundle.min.js");
//     }
//   }, []);

//   return null; // No need to return an empty fragment
// }


"use client";
import { useEffect } from "react";

export default function AddBootstrap() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle.min.js")
        .then(() => {
          console.log("Bootstrap JS loaded");
        })
        .catch((err) => console.error("Bootstrap loading error:", err));
    }
  }, []);

  return null;
}
