import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  token: string;
  key: string;
  email: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.body);
  const { email, password } = req.body;
  console.log(email, password);
  return res.status(200).json({
    token: "b3edb1fd2303b3aa62e5bf5ef87895c7e030075c",
    key: "b3edb1fd2303b3aa62e5bf5ef87895c7e030075c",
    email: "hiancdtrsnm@gmail.com",
  });
}
