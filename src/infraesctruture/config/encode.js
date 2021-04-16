const defaultEncodeLength = 12;

const encodeConfig = {
  encodeLength: parseInt(process.env.ENCODE_LENGTH) || defaultEncodeLength,
};

export { encodeConfig };
