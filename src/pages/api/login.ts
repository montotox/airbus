import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  token: string;
  key: string;
  email: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await fetch("https://1c8a-82-215-107-1.ngrok-free.app", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  }).then((res) => res.json());
  res.status(200).json(response);
  res.end();
}
