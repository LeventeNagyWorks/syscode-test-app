const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// Configuration
const PROFILE_SERVICE_URL = 'http://localhost:3000';
const ADDRESS_SERVICE_URL = 'http://localhost:3001';
const AUTH_USERNAME = 'admin';
const AUTH_PASSWORD = 'admin';
const TOTAL_STUDENTS = 10000;
const BATCH_SIZE = 50; // Number of concurrent requests
const RESULTS_FILE = 'load-test-results.json';

// Results storage
const results = {
  totalTime: 0,
  studentCreation: {
    totalTime: 0,
    averageTime: 0,
    minTime: Number.MAX_SAFE_INTEGER,
    maxTime: 0,
    times: [],
  },
  addressCreation: {
    totalTime: 0,
    averageTime: 0,
    minTime: Number.MAX_SAFE_INTEGER,
    maxTime: 0,
    times: [],
  },
  successCount: 0,
  failCount: 0,
};

// Generate a random student
function generateStudent() {
  const id = uuidv4();
  return {
    name: `Test Student ${id.substring(0, 8)}`,
    email: `student_${id.substring(0, 8)}@example.com`,
  };
}

// Generate a random address
function generateAddress(studentId) {
  return {
    studentId: studentId,
    address: `${Math.floor(Math.random() * 1000) + 1} ${['Main', 'Oak', 'Maple', 'Pine', 'Cedar'][Math.floor(Math.random() * 5)]} St, ${['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][Math.floor(Math.random() * 5)]}, ${['NY', 'CA', 'IL', 'TX', 'AZ'][Math.floor(Math.random() * 5)]} ${Math.floor(Math.random() * 90000) + 10000}`
  };
}

// Create a student and its address
async function createStudentAndAddress() {
  // Create student
  const student = generateStudent();
  const studentStartTime = Date.now();
  
  try {
    const studentResponse = await axios.post(`${PROFILE_SERVICE_URL}/students`, student, {
      headers: { 'Content-Type': 'application/json' }
    });
    const studentEndTime = Date.now();
    const studentDuration = studentEndTime - studentStartTime;
    
    // Record student creation time
    results.studentCreation.times.push(studentDuration);
    results.studentCreation.totalTime += studentDuration;
    results.studentCreation.minTime = Math.min(results.studentCreation.minTime, studentDuration);
    results.studentCreation.maxTime = Math.max(results.studentCreation.maxTime, studentDuration);
    
    // Create address for the student
    const studentId = studentResponse.data.id;
    const address = generateAddress(studentId);
    const addressStartTime = Date.now();
    
    try {
      const addressResponse = await axios.post(`${ADDRESS_SERVICE_URL}/addresses`, address, {
        headers: { 'Content-Type': 'application/json' },
        auth: {
          username: AUTH_USERNAME,
          password: AUTH_PASSWORD,
        },
      });
      const addressEndTime = Date.now();
      const addressDuration = addressEndTime - addressStartTime;
      
      // Record address creation time
      results.addressCreation.times.push(addressDuration);
      results.addressCreation.totalTime += addressDuration;
      results.addressCreation.minTime = Math.min(results.addressCreation.minTime, addressDuration);
      results.addressCreation.maxTime = Math.max(results.addressCreation.maxTime, addressDuration);
      
      results.successCount++;
      return { success: true };
    } catch (addressError) {
      console.error(`Error creating address: ${addressError.message}`);
      results.failCount++;
      return { success: false, error: addressError.message };
    }
  } catch (studentError) {
    console.error(`Error creating student: ${studentError.message}`);
    results.failCount++;
    return { success: false, error: studentError.message };
  }
}

// Process students in batches
async function processBatch(batchNumber, batchSize) {
  console.log(`Processing batch ${batchNumber}/${Math.ceil(TOTAL_STUDENTS / batchSize)}`);
  
  const promises = [];
  for (let i = 0; i < batchSize; i++) {
    if ((batchNumber - 1) * batchSize + i < TOTAL_STUDENTS) {
      promises.push(createStudentAndAddress());
    }
  }
  
  return Promise.all(promises);
}

// Calculate percentiles
function calculatePercentile(sortedArray, percentile) {
  const index = Math.floor(sortedArray.length * percentile / 100);
  return sortedArray[index];
}

// Main function to run the load test
async function runLoadTest() {
  console.log(`Starting load test: Creating ${TOTAL_STUDENTS} students with addresses...`);
  const startTime = Date.now();
  
  const batches = Math.ceil(TOTAL_STUDENTS / BATCH_SIZE);
  for (let i = 1; i <= batches; i++) {
    await processBatch(i, BATCH_SIZE);
  }
  
  const endTime = Date.now();
  const totalDuration = endTime - startTime;
  
  // Calculate final statistics
  results.totalTime = totalDuration;
  results.studentCreation.averageTime = results.studentCreation.totalTime / results.studentCreation.times.length;
  results.addressCreation.averageTime = results.addressCreation.totalTime / results.addressCreation.times.length;
  
  // Sort times for percentile calculations
  results.studentCreation.times.sort((a, b) => a - b);
  results.addressCreation.times.sort((a, b) => a - b);
  
  // Calculate percentiles
  results.studentCreation.percentiles = {
    p50: calculatePercentile(results.studentCreation.times, 50),
    p75: calculatePercentile(results.studentCreation.times, 75),
    p90: calculatePercentile(results.studentCreation.times, 90),
    p95: calculatePercentile(results.studentCreation.times, 95),
    p99: calculatePercentile(results.studentCreation.times, 99),
  };
  
  results.addressCreation.percentiles = {
    p50: calculatePercentile(results.addressCreation.times, 50),
    p75: calculatePercentile(results.addressCreation.times, 75),
    p90: calculatePercentile(results.addressCreation.times, 90),
    p95: calculatePercentile(results.addressCreation.times, 95),
    p99: calculatePercentile(results.addressCreation.times, 99),
  };
  
  // Print results
  console.log('\nLoad Test Results:');
  console.log(`Total time: ${totalDuration}ms (${(totalDuration / 1000 / 60).toFixed(2)} minutes)`);
  console.log(`Success count: ${results.successCount}`);
  console.log(`Fail count: ${results.failCount}`);
  
  console.log('\nStudent Creation:');
  console.log(`Average time: ${results.studentCreation.averageTime.toFixed(2)}ms`);
  console.log(`Min time: ${results.studentCreation.minTime}ms`);
  console.log(`Max time: ${results.studentCreation.maxTime}ms`);
  console.log('Percentiles:');
  console.log(`  50th: ${results.studentCreation.percentiles.p50}ms`);
  console.log(`  75th: ${results.studentCreation.percentiles.p75}ms`);
  console.log(`  90th: ${results.studentCreation.percentiles.p90}ms`);
  console.log(`  95th: ${results.studentCreation.percentiles.p95}ms`);
  console.log(`  99th: ${results.studentCreation.percentiles.p99}ms`);
  
  console.log('\nAddress Creation:');
  console.log(`Average time: ${results.addressCreation.averageTime.toFixed(2)}ms`);
  console.log(`Min time: ${results.addressCreation.minTime}ms`);
  console.log(`Max time: ${results.addressCreation.maxTime}ms`);
  console.log('Percentiles:');
  console.log(`  50th: ${results.addressCreation.percentiles.p50}ms`);
  console.log(`  75th: ${results.addressCreation.percentiles.p75}ms`);
  console.log(`  90th: ${results.addressCreation.percentiles.p90}ms`);
  console.log(`  95th: ${results.addressCreation.percentiles.p95}ms`);
  console.log(`  99th: ${results.addressCreation.percentiles.p99}ms`);
  
  // Calculate throughput
  const totalOperations = results.successCount + results.failCount;
  const throughputPerSecond = (totalOperations / (totalDuration / 1000)).toFixed(2);
  console.log(`\nThroughput: ${throughputPerSecond} operations/second`);
  
  // Save results to file
  fs.writeFileSync(RESULTS_FILE, JSON.stringify(results, null, 2));
  console.log(`\nDetailed results saved to ${RESULTS_FILE}`);
}

// Run the load test
runLoadTest().catch(error => {
  console.error('Load test failed:', error);
});

