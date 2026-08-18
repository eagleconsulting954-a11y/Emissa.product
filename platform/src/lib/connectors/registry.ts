export type ConnectorProvider =
  | 'utilityapi'
  | 'arcadia'
  | 'walmart_retail_link'
  | 'sap_ariba'
  | 'coupa'
  | 'wex'
  | 'fuelman'
  | 'quickbooks'
  | 'netsuite'
  | 'salesforce'
  | 'slack'
  | 'twilio'
  | 'resend'
  | 'patch'
  | 'cloverly';

export type ConnectorDefinition = {
  provider: ConnectorProvider;
  label: string;
  category: 'utility' | 'retailer' | 'procurement' | 'fleet' | 'accounting' | 'crm' | 'notification' | 'offset';
  auth: 'oauth2' | 'api_key' | 'service_account';
  requiredEnv: string[];
  capabilities: string[];
};

export const CONNECTORS: ConnectorDefinition[] = [
  { provider: 'utilityapi', label: 'UtilityAPI', category: 'utility', auth: 'api_key', requiredEnv: ['UTILITYAPI_TOKEN'], capabilities: ['meters','electricity_usage','gas_usage'] },
  { provider: 'arcadia', label: 'Arcadia', category: 'utility', auth: 'api_key', requiredEnv: ['ARCADIA_API_KEY'], capabilities: ['utility_accounts','interval_usage','bills'] },
  { provider: 'walmart_retail_link', label: 'Walmart Retail Link', category: 'retailer', auth: 'service_account', requiredEnv: ['WALMART_CLIENT_ID','WALMART_CLIENT_SECRET'], capabilities: ['purchase_orders','shipments','supplier_programs'] },
  { provider: 'sap_ariba', label: 'SAP Ariba', category: 'procurement', auth: 'oauth2', requiredEnv: ['ARIBA_CLIENT_ID','ARIBA_CLIENT_SECRET','ARIBA_REDIRECT_URI'], capabilities: ['purchase_orders','suppliers','invoices'] },
  { provider: 'coupa', label: 'Coupa', category: 'procurement', auth: 'oauth2', requiredEnv: ['COUPA_BASE_URL','COUPA_CLIENT_ID','COUPA_CLIENT_SECRET'], capabilities: ['purchase_orders','suppliers','invoices'] },
  { provider: 'wex', label: 'WEX', category: 'fleet', auth: 'api_key', requiredEnv: ['WEX_API_KEY'], capabilities: ['fuel_transactions','vehicle_usage'] },
  { provider: 'fuelman', label: 'Fuelman', category: 'fleet', auth: 'api_key', requiredEnv: ['FUELMAN_API_KEY'], capabilities: ['fuel_transactions','vehicle_usage'] },
  { provider: 'quickbooks', label: 'QuickBooks Online', category: 'accounting', auth: 'oauth2', requiredEnv: ['QUICKBOOKS_CLIENT_ID','QUICKBOOKS_CLIENT_SECRET','QUICKBOOKS_REDIRECT_URI'], capabilities: ['expenses','vendors','accounts','invoices'] },
  { provider: 'netsuite', label: 'NetSuite', category: 'accounting', auth: 'oauth2', requiredEnv: ['NETSUITE_ACCOUNT_ID','NETSUITE_CLIENT_ID','NETSUITE_CLIENT_SECRET'], capabilities: ['transactions','vendors','subsidiaries'] },
  { provider: 'salesforce', label: 'Salesforce', category: 'crm', auth: 'oauth2', requiredEnv: ['SALESFORCE_CLIENT_ID','SALESFORCE_CLIENT_SECRET','SALESFORCE_REDIRECT_URI'], capabilities: ['accounts','contacts','opportunities'] },
  { provider: 'slack', label: 'Slack', category: 'notification', auth: 'oauth2', requiredEnv: ['SLACK_CLIENT_ID','SLACK_CLIENT_SECRET','SLACK_REDIRECT_URI'], capabilities: ['alerts','deadline_reminders'] },
  { provider: 'twilio', label: 'Twilio', category: 'notification', auth: 'api_key', requiredEnv: ['TWILIO_ACCOUNT_SID','TWILIO_AUTH_TOKEN','TWILIO_FROM_NUMBER'], capabilities: ['sms_reminders'] },
  { provider: 'resend', label: 'Resend', category: 'notification', auth: 'api_key', requiredEnv: ['RESEND_API_KEY','RESEND_FROM_EMAIL'], capabilities: ['email_alerts','certificate_expiration','deadline_reminders'] },
  { provider: 'patch', label: 'Patch', category: 'offset', auth: 'api_key', requiredEnv: ['PATCH_API_KEY'], capabilities: ['offset_inventory','quotes','purchases'] },
  { provider: 'cloverly', label: 'Cloverly', category: 'offset', auth: 'api_key', requiredEnv: ['CLOVERLY_API_KEY'], capabilities: ['offset_inventory','quotes','purchases'] },
];

export function connectorReadiness() {
  return CONNECTORS.map((connector) => ({
    ...connector,
    configured: connector.requiredEnv.every((key) => Boolean(process.env[key])),
    missing: connector.requiredEnv.filter((key) => !process.env[key]),
  }));
}
