import { SITE_CONFIG, SITE_URL } from '../lib/siteConfig';

export const POLICY_CONFIG = {
  lastUpdated: 'October 17, 2026',
  effectiveDate: 'October 17, 2026',
  version: '1.0',

  company: {
    name: SITE_CONFIG.name || 'Cobolt Machineries',
    legalName: SITE_CONFIG.legalName || 'Cobolt Machineries Private Limited',
    website: SITE_URL || 'https://www.coboltmachineries.com',
    email: SITE_CONFIG.email || 'infocobolt123@gmail.com',
    phone: SITE_CONFIG.phone || '+91 9061782023',
    phoneDisplay: '+91 9061782023',
    address: 'Veemboor Industrial Zone, Manjeri, Malappuram, Kerala, India - 676122',
    jurisdiction: 'Malappuram / Kerala, India',
    workingHours: 'Monday – Saturday: 9:00 AM – 8:00 PM IST',
  },

  policyLinks: [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Service', path: '/terms-of-service' },
    { name: 'Warranty Policy', path: '/warranty-policy' },
    { name: 'Return and Refund', path: '/return-refund-policy' },
    { name: 'Shipping Policy', path: '/shipping-policy' },
    { name: 'Partial COD Policy', path: '/partial-cod-policy' },
  ],
};
