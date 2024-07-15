class Mutex {
  constructor() {
    this.queue = [];
    this.locked = false;
  }

  lock() {
    return new Promise ((resolve) => {
      if(this.locked) {
        this.queue.push(resolve);
      } else {
        this.locked = true;
        resolve();
      }
    })
  }

  unlock() {
    if (this.queue.length > 0) {
      const next = this.queue.shift();
      next();
    } else {
      this.locked = false;
    }
  }
}


// Example
const mutex = new Mutex();

const criticalSection = async() => {
  await mutex.lock();
  try {
    // Critical section
  } finally {
    mutex.unlock();
  }
}