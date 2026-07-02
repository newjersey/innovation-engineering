---
title: Monitoring & Analytics
wip: true
---

## Analytics

We use Google Analytics with Looker Studio

[Guide to setting up Google Analytics](/innovation-engineering/guides/monitoring/setting-up-google-analytics/)

## Monitoring

- Ensure you have some cloud-based logging in place that will allow you to debug failures. You must be informed _when_ something fails, be able to figure out _why_, and take actionable steps to _resolve_ for the user.
  - By default, AWS Cloudwatch log groups are encrypted with a default AWS key and have an indefinite retention time. This is sufficient to meet the requirements of the [SISM (AU-07)](https://www.cyber.nj.gov/grants-and-resources/state-resources/statewide-information-security-manual-sism), that data be encrypted at rest and logs be retained for at least 1 year.
    - If desired, Cloudwatch can be configured to instead [use KMS key for encryption](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html), which would allow us to rotate the key, and potentially destroy it and render the logs unreadable if needed
    - Cloudwatch can also be configured to retain logs for 1 year (instead of indefinitely), to reduce the surface of exposure should if the logs were to get exposed
- Set up monitoring alerts - your dev team should be receiving some kind of notification (likely email or Slack) if your application has unexpected behavior
  - Example alerts include repeated HTTP request or async job run errors, dramatic spikes in traffic, memory or CPU usage exceeding a threshold
- Set up cost tracking - you should be receiving notifications (likely email or Slack) if your cloud usage exceeds a certain threshold that would result in over-budget issues.

## Guides

- [Guide to setting up Google Analytics](/innovation-engineering/guides/monitoring/setting-up-google-analytics/)
- [Guide to setting up CloudWatch Dashboards](/innovation-engineering/guides/monitoring/setting-up-cloudwatch-dashboards/)
