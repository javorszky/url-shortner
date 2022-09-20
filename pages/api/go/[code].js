import { getLink } from '../../../utils/getUtils';

export default async function handler(req, res) {
  const { code } = req.query;

  const longUrl = await getLink(code);

  res.redirect(307, longUrl);
}
