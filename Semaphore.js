class Semaphore {
  constructor(max) {
    this.tasks = [];
    this.counter = max;
  }

  acquire() {
    return new Promise((resolve) => {
      if(this.counter > 0) {
        this.counter--;
        resolve();
      } else {
        this.tasks.push(resolve);
      }
    })
  }

  release() {
    if (this.tasks.length > 0) {
      const next = this.tasks.shift();
      next();
    } else {
      this.counter++;
    }
  }
}


// Example
const semaphore = new Semaphore(2);

const criticalSection = async() => {
  await semaphore.acquire();
  try {
    // Critical section
  } finally {
    semaphore.release();
  }
}
