import http from "k6/http";
import { check } from "k6";

const BASE_URL = "http://localhost:5000";

export const options = {
  vus: 200,
  duration: "1m",
};

export function setup() {
  const urls = [];

  for (let i = 0; i < 100; i++) {
    const res = http.post(
      `${BASE_URL}/shorten`,
      JSON.stringify({
        url: `https://example.com/${i}`,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (res.status !== 201) {
      throw new Error(`Failed to create URL: ${res.status}`);
    }
    urls.push(JSON.parse(res.body).data.url);
  }

  return { urls };
}

export default function (data) {
  const url = data.urls[Math.floor(Math.random() * data.urls.length)];
  const res = http.get(url, {
    redirects: 0,
  });

  check(res, {
    "redirect returned 302": (r) => r.status === 302,
  });
}
