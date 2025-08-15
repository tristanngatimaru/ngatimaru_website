// Simple client-side rate limiting
// This won't stop determined attackers but prevents accidental spam

class SimpleRateLimiter {
  constructor() {
    this.submissions = new Map();
  }

  canSubmit(formType) {
    const now = Date.now();
    const key = `${formType}_submissions`;
    const lastSubmissions = this.submissions.get(key) || [];

    // Remove submissions older than 5 minutes
    const recentSubmissions = lastSubmissions.filter(
      (time) => now - time < 300000
    );

    // Allow max 3 submissions per 5 minutes
    if (recentSubmissions.length >= 3) {
      return false;
    }

    // Record this submission
    recentSubmissions.push(now);
    this.submissions.set(key, recentSubmissions);
    return true;
  }

  getTimeUntilNextAllowed(formType) {
    const key = `${formType}_submissions`;
    const submissions = this.submissions.get(key) || [];
    if (submissions.length < 3) return 0;

    const oldestRelevant = Math.min(...submissions.slice(-3));
    const timeLeft = 300000 - (Date.now() - oldestRelevant);
    return Math.max(0, Math.ceil(timeLeft / 1000 / 60)); // minutes
  }
}

export const rateLimiter = new SimpleRateLimiter();
