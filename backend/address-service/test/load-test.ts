/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// Konfiguráció
const API_URL = 'http://localhost:3001';
const AUTH_HEADER = 'Basic ' + Buffer.from('admin:password').toString('base64');
const NUM_ADDRESSES = 10000;

// Segédfüggvény a random cím generálásához
function generateRandomAddress(): string {
  const streets = ['Main St', 'Broadway', 'Park Ave', 'Oak St', 'Maple Ave'];
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
  const states = ['NY', 'CA', 'IL', 'TX', 'AZ'];

  const streetNumber = Math.floor(Math.random() * 1000) + 1;
  const street = streets[Math.floor(Math.random() * streets.length)];
  const city = cities[Math.floor(Math.random() * cities.length)];
  const state = states[Math.floor(Math.random() * states.length)];
  const zipCode = Math.floor(Math.random() * 90000) + 10000;

  return `${streetNumber} ${street}, ${city}, ${state} ${zipCode}`;
}

// Segédfüggvény a címek létrehozásához
async function createAddress(address: string): Promise<string> {
  try {
    const response = await axios.post(
      `${API_URL}/addresses`,
      { address },
      {
        headers: {
          Authorization: AUTH_HEADER,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data.id;
  } catch (error) {
    console.error('Error creating address:', error.message);
    throw error;
  }
}

// Fő függvény a load teszt futtatásához
async function runLoadTest() {
  console.log(`Starting load test: Creating ${NUM_ADDRESSES} addresses...`);

  const startTime = Date.now();
  const addressIds: string[] = [];

  // Címek létrehozása
  for (let i = 0; i < NUM_ADDRESSES; i++) {
    try {
      const address = generateRandomAddress();
      const id = await createAddress(address);
      addressIds.push(id);

      if ((i + 1) % 100 === 0) {
        console.log(`Created ${i + 1} addresses...`);
      }
    } catch (error) {
      console.error(`Failed to create address ${i + 1}:`, error.message);
    }
  }

  const endTime = Date.now();
  const totalTime = (endTime - startTime) / 1000; // másodpercben

  console.log(`Load test completed!`);
  console.log(`Total time: ${totalTime.toFixed(2)} seconds`);
  console.log(
    `Average time per address: ${(totalTime / NUM_ADDRESSES).toFixed(4)} seconds`,
  );
  console.log(
    `Addresses created per second: ${(NUM_ADDRESSES / totalTime).toFixed(2)}`,
  );
}

// Load teszt futtatása
runLoadTest().catch((error) => {
  console.error('Load test failed:', error);
  process.exit(1);
});
