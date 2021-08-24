import httpCodes from 'http-status-codes';

const { StatusCodes, getReasonPhrase } = httpCodes;

const { INTERNAL_SERVER_ERROR } = StatusCodes;

export default function errorHandler(err, req, res) {
  return res.status(INTERNAL_SERVER_ERROR)
    .json({ message: getReasonPhrase(INTERNAL_SERVER_ERROR) });
}
