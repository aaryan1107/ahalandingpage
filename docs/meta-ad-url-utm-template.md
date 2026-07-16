# Meta Ad Destination URL UTM Template

Every Meta ad that sends traffic to `ahanexcruise.com` must include the required GA4 UTM fields:

```text
https://ahanexcruise.com/?utm_source=facebook&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{adset.name}}&utm_term={{ad.name}}&campaign_id={{campaign.id}}&adset_id={{adset.id}}&ad_id={{ad.id}}&campaign_name={{campaign.name}}&adset_name={{adset.name}}&ad_name={{ad.name}}
```

Use this in Meta Ads Manager as the website URL/query parameters for website destination ads.

Why this matters:

- `utm_source=facebook` keeps GA4 source readable.
- `utm_medium=paid_social` separates paid Meta traffic from organic social.
- `utm_campaign={{campaign.name}}` keeps GA4 campaign names human-readable instead of falling back to numeric Meta IDs.
- `campaign_id`, `adset_id`, and `ad_id` are still stored separately for joining the website session back to exact Meta objects.
- `utm_content={{adset.name}}` and `utm_term={{ad.name}}` preserve creative/targeting context for dashboard analysis.

After saving this in Meta, run one test click and confirm the landing URL includes at least:

```text
utm_source=facebook
utm_medium=paid_social
utm_campaign=<campaign name>
```
