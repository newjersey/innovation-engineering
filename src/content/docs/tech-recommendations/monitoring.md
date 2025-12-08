---
title: Monitoring
wip: true
---

- Ensure you have some cloud-based logging in place that will allow you to debug failures. You must be informed _when_ something fails, be able to figure out _why_, and take actionable steps to _resolve_ for the user.
- Set up monitoring alerts - your dev team should be receiving some kind of notification (likely email or Slack) if your application has unexpected behavior
    - Example alerts include repeated HTTP request or async job run errors, dramatic spikes in traffic, memory or CPU usage exceeding a threshold
- Set up cost tracking - you should be receiving notifications (likely email or Slack) if your cloud usage exceeds a certain threshold that would result in over-budget issues.
