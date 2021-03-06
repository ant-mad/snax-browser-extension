import snaxDomains from 'config/snaxDomains';
import { config } from 'src/config';

export const isSnaxDomain = url => {
  if (!url) {
    if (config.allowAllUnknownDomains) {
      return true;
    } else {
      return false;
    }
  }

  const match = url.match(
    /^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/
  );

  if (match) {
    return snaxDomains.includes(match[2]);
  }

  return false;
};
