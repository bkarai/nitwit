import { publicIpv4 } from 'public-ip';
import { DNS } from '@google-cloud/dns';

console.log("Fetching public IP");

const currentIp = await publicIpv4();

console.log(`current public IP: ${currentIp}`);

const dns = new DNS();

const [zones] = await dns.getZones();

const nitwitZone = zones.find((zone) => {
  return zone.metadata.dnsName === 'play-nitwit-game.com.'
});

if (!nitwitZone) {
  console.error("Failed to find nitwit zone");
  process.exit(1);
}

const [records] = await nitwitZone.getRecords();
const aRecords = records.filter(({ type }) => type === 'A');

console.log(`Found ${aRecords.length} A records in zone`);

const newRecords = [];
let syncNeeded = false;

aRecords.forEach((record) => {
  const [dnsIp] = record.data;

  newRecords.push(nitwitZone.record('A', {
    name: record.name,
    data: currentIp,
    ttl: 300,
  }));

  if (dnsIp !== currentIp) {
    syncNeeded = true;
    console.log("Detected change in IP address");
  }
});

if (newRecords.length > 0 && syncNeeded) {
  console.log("Updating IP via google cloud dns API");
  nitwitZone.replaceRecords('A', newRecords, (err, change, apiResponse) => {
    if (!err) {
      console.log("Changes applied successfully");
    } else {
      console.error(err);
      process.exit(1);
    }
  });
} else {
  console.log("No changes required");
}
