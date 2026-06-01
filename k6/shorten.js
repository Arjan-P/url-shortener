import http from "k6/http";
import { check } from "k6";

const BASE_URL = "http://localhost:5000";

export const options = {
  vus: 50,
  duration: "30s",
};

export default function () {
  const payload = JSON.stringify({
    url: `https://example.com/${__VU}/${__ITER}`,
  });

  const res = http.post(`${BASE_URL}/shorten`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  check(res, {
    "status is 201": (r) => r.status === 201,
  });
}
